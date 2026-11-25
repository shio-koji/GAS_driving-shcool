#!/usr/bin/env node
// slides.md（原稿）と template.html（デザイン）から index.html を生成する。
// 使い方: node build.mjs          … 1回だけ生成
//         node build.mjs --watch  … slides.md を保存するたびに生成
import { existsSync, readFileSync, writeFileSync, watch } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const SRC = join(DIR, 'slides.md');
const TEMPLATE = join(DIR, 'template.html');
const OUT = join(DIR, 'index.html');

const escapeHtml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// **強調**（青）、!!注意!!（オレンジ）、`コード`
function inline(s) {
  return s
    .replace(/`([^`]+)`/g, (_, c) => `<code>${escapeHtml(c)}</code>`)
    .replace(/\*\*(.+?)\*\*/g, '<span class="em">$1</span>')
    .replace(/__(.+?)__/g, '<span class="label">$1</span>')
    .replace(/!!(.+?)!!/g, '<span class="warn">$1</span>');
}

// 行末の {.a .b} をクラス名として取り出す
function splitClasses(line) {
  const m = line.match(/\s*\{((?:\.[\w-]+\s*)+)\}\s*$/);
  if (!m) return [line, ''];
  return [line.slice(0, m.index), m[1].trim().split(/\s+/).map(c => c.slice(1)).join(' ')];
}

const cls = (...names) => {
  const c = names.filter(Boolean).join(' ');
  return c ? ` class="${c}"` : '';
};

const isBlockStart = l => /^(#|- |\d+\. |> |\||:::|```|<|!\[)/.test(l);

// スライド本文・カード本文のブロックを HTML にする（ctx: 'slide' | 'card'）
function parseBlocks(lines, ctx) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (line.startsWith('#')) {
      throw new Error(`見出し「${line}」はここでは使えません`);
    }

    if (line.startsWith('```')) {
      const code = [];
      for (i++; i < lines.length && !lines[i].startsWith('```'); i++) code.push(lines[i]);
      i++;
      out.push(`<div class="code">${escapeHtml(code.join('\n'))}</div>`);
      continue;
    }

    if (line.startsWith(':::')) {
      const [name, ...args] = line.slice(3).trim().split(/\s+/);
      // 入れ子の :::名前 … ::: も数えて、対応する「:::」までを中身とする
      const inner = [];
      let depth = 1;
      for (i++; i < lines.length; i++) {
        const t = lines[i].trim();
        if (t === ':::' && --depth === 0) break;
        if (/^:::\S/.test(t)) depth++;
        inner.push(lines[i]);
      }
      if (i >= lines.length) throw new Error(`「:::${name}」が「:::」で閉じられていません`);
      i++;
      out.push(container(name, args, inner));
      continue;
    }

    // ![説明](images/xxx.png) … 画像。ファイルがなければ点線の枠を出す
    const [imgLine, imgCls] = splitClasses(line);
    const img = imgLine.match(/^!\[(.*?)\]\((.+?)\)\s*$/);
    if (img) {
      const [, alt, src] = img;
      out.push(existsSync(join(DIR, src))
        ? `<img${cls('shot', imgCls)} src="${src}" alt="${alt}" onerror="this.style.display='none'">`
        : `<div${cls('shot', 'placeholder', imgCls)}>画像：${inline(alt)}<small>${src} を置くと表示されます</small></div>`);
      i++;
      continue;
    }

    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      out.push(table(rows));
      continue;
    }

    // 箇条書き。行頭にスペース2つ以上の「  - 」は、直前の項目の第2階層になる
    if (line.startsWith('- ') || /^\d+\. /.test(line)) {
      const ordered = !line.startsWith('- ');
      const isTop = l => (ordered ? /^\d+\. /.test(l) : l.startsWith('- '));
      const items = [];
      while (i < lines.length) {
        const l = lines[i];
        if (/^ {2,}- /.test(l) && items.length) { items[items.length - 1].sub.push(l.trim().slice(2)); i++; continue; }
        if (!isTop(l)) break;
        items.push({ text: l.replace(/^(- |\d+\. )/, ''), sub: [] });
        i++;
      }
      // 「→ 」で始まる項目は、前の項目から導かれる結論として矢印で示す
      const li = (t, inner = '') => (t.startsWith('→ ')
        ? `<li class="then">${inline(t.slice(2))}${inner}</li>`
        : `<li>${inline(t)}${inner}</li>`);
      const sub = it => (it.sub.length ? `<ul class="sub">${it.sub.map(t => li(t)).join('')}</ul>` : '');
      if (ctx === 'card' && !ordered) {
        out.push(`<div class="rows">${items.map(it => {
          const [text, c] = splitClasses(it.text);
          return `<div${cls('draft', c)}>${inline(text)}</div>`;
        }).join('')}</div>`);
      } else if (ordered) {
        out.push(`<ol class="nums">${items.map(it => `<li><div>${inline(it.text)}${sub(it)}</div></li>`).join('')}</ol>`);
      } else {
        out.push(`<ul class="points">${items.map(it => li(it.text, sub(it))).join('')}</ul>`);
      }
      continue;
    }

    if (line.startsWith('<')) {
      const raw = [];
      while (i < lines.length && lines[i].trim()) raw.push(lines[i++]);
      out.push(raw.join('\n'));
      continue;
    }

    // 段落（> で始まると補足の小さい文字）。段落内の改行はそのまま改行になる
    const note = line.startsWith('> ');
    const para = [];
    if (note) {
      while (i < lines.length && lines[i].startsWith('> ')) para.push(lines[i++].slice(2));
    } else {
      while (i < lines.length && lines[i].trim() && (para.length === 0 || !isBlockStart(lines[i]))) para.push(lines[i++]);
    }
    const [last, c] = splitClasses(para[para.length - 1]);
    para[para.length - 1] = last;
    const base = note ? 'note' : ctx === 'card' ? '' : 'lead';
    out.push(`<p${cls(base, c)}>${para.map(inline).join('<br>')}</p>`);
  }
  return out;
}

function table(rows) {
  const cells = rows
    .filter(r => !/^\|\s*:?-+/.test(r))
    .map(r => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim()));
  const [head, ...body] = cells;
  return `<table class="mini"><tr>${head.map(c => `<th>${inline(c)}</th>`).join('')}</tr>`
    + body.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')
    + '</table>';
}

function container(name, args, lines) {
  switch (name) {
    case 'cards': return cards(args, lines);
    case 'flow': return flow(args, lines);
    case 'chips': return chips(args, lines);
    case 'prompt': return prompt(args, lines);
    case 'rows': return rowList(lines);
    case 'terms': return terms(lines);
    case 'cols': return cols(args, lines);
    case 'html': return lines.join('\n');
    default: throw new Error(`不明なブロック「:::${name}」`);
  }
}

// :::cols … 左右2列。「+++」の行で列を区切る。各列の中は通常のスライドと同じ書き方
function cols(args, lines) {
  const parts = [[]];
  let depth = 0;
  for (const l of lines) {
    const t = l.trim();
    if (depth === 0 && t === '+++') { parts.push([]); continue; }
    if (/^:::\S/.test(t)) depth++;
    else if (t === ':::') depth--;
    parts[parts.length - 1].push(l);
  }
  return `<div${cls('cols', ...args)}>`
    + parts.map(p => `<div class="col">${parseBlocks(p, 'slide').join('\n')}</div>`).join('')
    + '</div>';
}

// :::cards 2 … #### ラベル / ### 見出し / 本文 で1枚のカード
function cards(args, lines) {
  const n = args.find(a => /^\d$/.test(a)) || '2';
  const extra = args.filter(a => !/^\d$/.test(a));
  const list = [];
  let cur = null;
  const start = () => { cur = { cls: [], label: '', title: '', body: [] }; list.push(cur); };
  const hasBody = () => cur.body.some(l => l.trim());
  for (const l of lines) {
    if (l.startsWith('#### ')) {
      if (!cur || cur.label || cur.title || hasBody()) start();
      const [text, c] = splitClasses(l.slice(5));
      cur.label = text;
      if (c) cur.cls.push(c);
    } else if (l.startsWith('### ')) {
      if (!cur || cur.title || hasBody()) start();
      const [text, c] = splitClasses(l.slice(4));
      cur.title = text;
      if (c) cur.cls.push(c);
    } else {
      if (!cur) { if (!l.trim()) continue; start(); }
      cur.body.push(l);
    }
  }
  return `<div${cls('grid', 'g' + n, ...extra)}>`
    + list.map(c => `<div${cls('card', ...c.cls)}>`
      + (c.label ? `<div class="label">${inline(c.label)}</div>` : '')
      + (c.title ? `<h3>${inline(c.title)}</h3>` : '')
      + parseBlocks(c.body, 'card').join('')
      + '</div>').join('')
    + '</div>';
}

// :::flow … - 名前 | 補足 {.accent} の箱を → でつなぐ。-> 文字 で矢印を指定
function flow(args, lines) {
  const parts = [];
  let afterNode = false;
  for (const l of lines) {
    if (!l.trim()) continue;
    if (l.trim() === '->' || l.startsWith('-> ')) {
      parts.push(`<div class="arrow">${inline(l.slice(3).trim() || '→')}</div>`);
      afterNode = false;
      continue;
    }
    if (!l.startsWith('- ')) throw new Error(`:::flow の中は「- 」か「-> 」で始めてください: 「${l}」`);
    const [text, c] = splitClasses(l.slice(2));
    const [main, sub] = text.split(' | ');
    if (afterNode) parts.push('<div class="arrow">→</div>');
    parts.push(`<div${cls('node', c)}>${inline(main)}${sub ? `<small>${inline(sub)}</small>` : ''}</div>`);
    afterNode = true;
  }
  return `<div${cls('flow', ...args)}>${parts.join('')}</div>`;
}

// :::chips … - ラベル / -> 区切り記号
function chips(args, lines) {
  const parts = lines.filter(l => l.trim()).map(l => {
    if (l.startsWith('->')) return `<span class="arrow">${inline(l.slice(2).trim() || '›')}</span>`;
    return `<span class="chip">${inline(l.replace(/^- /, ''))}</span>`;
  });
  return `<div${cls('chips', ...args)}>${parts.join('')}</div>`;
}

// :::prompt … 1行が1段落。> で始まる行は見本の枠
function prompt(args, lines) {
  const out = [];
  let sample = [];
  const flush = () => {
    if (sample.length) out.push(`<p class="sample">${sample.map(inline).join('<br>')}</p>`);
    sample = [];
  };
  for (const l of lines) {
    if (!l.trim()) { flush(); continue; }
    if (l.startsWith('> ')) { sample.push(l.slice(2)); continue; }
    flush();
    out.push(`<p>${inline(l)}</p>`);
  }
  flush();
  return `<div${cls('prompt', ...args)}>${out.join('')}</div>`;
}

// :::rows … - ① 本文
function rowList(lines) {
  return '<div class="rows">' + lines.filter(l => l.trim()).map(l => {
    const [text, c] = splitClasses(l);
    const m = text.match(/^- (\S+)\s+(.*)$/);
    if (!m) throw new Error(`:::rows の行は「- 番号 本文」の形にしてください: 「${l}」`);
    return `<div${cls('row', c)}><span class="k">${m[1]}</span><span>${inline(m[2])}</span></div>`;
  }).join('') + '</div>';
}

// :::terms … ### グループ / - **用語** 説明
function terms(lines) {
  return '<div class="terms">' + lines.filter(l => l.trim()).map(l => {
    if (l.startsWith('### ')) {
      const [text, c] = splitClasses(l.slice(4));
      return `<div${cls('group', c)}>${inline(text)}</div>`;
    }
    const m = l.match(/^- \*\*(.+?)\*\*\s*(.*)$/);
    if (!m) throw new Error(`:::terms の行は「- **用語** 説明」の形にしてください: 「${l}」`);
    return `<div class="term"><b>${inline(m[1])}</b>　<span>${inline(m[2])}</span></div>`;
  }).join('') + '</div>';
}

const OPTION = /^<!--\s*(title|section|chapter|group|pill|tight)\b/;

function renderSlide(chunk) {
  const opts = {};
  const lines = [];
  for (const l of chunk.split('\n')) {
    if (/^\s*<!--.*-->\s*\S/.test(l)) throw new Error(`設定のコメントの後ろに文字があります。改行してください: 「${l}」`);
    const m = l.trim().match(/^<!--\s*([\w-]+)(?:\s*:\s*(.*?))?\s*-->$/);
    if (m) opts[m[1]] = m[2] ?? true;
    else lines.push(l);
  }
  let h1 = '';
  let h2 = '';
  const rest = lines.filter(l => {
    if (l.startsWith('# ')) { h1 = l.slice(2); return false; }
    if (l.startsWith('## ')) { h2 = l.slice(3); return false; }
    return true;
  });

  if (opts.title) {
    const sub = rest.filter(l => l.trim()).join('<br>');
    return `<section class="slide title"><h1>${inline(h1)}</h1>${sub ? `<p class="sub">${inline(sub)}</p>` : ''}</section>`;
  }
  if (opts.section) {
    return `<section class="slide section"><div class="no">${opts.section}</div><h1>${inline(h1)}</h1></section>`;
  }
  if (h1) throw new Error('「# 」は title / section のスライドでだけ使えます');

  const chapter = (opts.chapter ? ` data-chapter="${opts.chapter}"` : '') + (opts.group ? ` data-group="${opts.group}"` : '');
  const pill = opts.pill ? `<span class="pill">${opts.pill}</span>` : '';
  return `<section${cls('slide', opts.tight && 'tight')}${chapter}>`
    + pill
    + (h2 ? `<h2>${inline(h2)}</h2>` : '')
    + `<div class="body">\n${parseBlocks(rest, 'slide').join('\n')}\n</div></section>`;
}

// 行頭が // の行は自分用コメントとして捨てる（コードの枠 ``` の中は残す）
function dropLineComments(text) {
  let inCode = false;
  return text.split('\n').filter(l => {
    if (l.startsWith('```')) inCode = !inCode;
    return inCode || !l.trimStart().startsWith('//');
  }).join('\n');
}

function build() {
  const md = dropLineComments(readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n'))
    // コメントは自分用メモとして捨てる。ただしスライドの設定（<!-- title --> など）は残す
    .replace(/<!--[\s\S]*?-->/g, m => (OPTION.test(m) ? m : ''));
  const chunks = md.split(/^---$/m).map(c => c.trim()).filter(Boolean);
  const slides = chunks.map((c, k) => {
    try {
      return renderSlide(c);
    } catch (e) {
      throw new Error(`${k + 1}枚目のスライド: ${e.message}`);
    }
  });
  const html = readFileSync(TEMPLATE, 'utf8').replace('{{SLIDES}}', () => slides.join('\n\n'));
  writeFileSync(OUT, html);
  console.log(`${new Date().toLocaleTimeString('ja-JP')}  index.html を生成しました（${slides.length}枚）`);
}

function run() {
  try {
    build();
    return true;
  } catch (e) {
    console.error(`エラー: ${e.message}`);
    return false;
  }
}

if (process.argv.includes('--watch')) {
  run();
  let timer;
  watch(DIR, (_, name) => {
    if (name !== 'slides.md' && name !== 'template.html') return;
    clearTimeout(timer);
    timer = setTimeout(run, 100);
  });
  console.log('slides.md の保存を監視しています（Ctrl+C で終了）');
} else if (!run()) {
  process.exit(1);
}
