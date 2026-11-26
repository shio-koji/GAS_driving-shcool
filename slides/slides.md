<!--
このファイルがスライドの原稿です。編集して保存したら、VS Code で Cmd+Shift+B を押すと index.html が更新されます。
（ブラウザは再読み込みしてください。表示中のスライド番号は保たれます）

■ 書き方の早見表
  スライドの区切り        行に「---」だけを書く
  見出し                 ## 見出し
  箇条書き               - 項目
  第2階層の箇条書き       行頭にスペース2つ：  - 項目（「- 」や「1. 」の直後に書く）
  下線つきのラベル        __ラベル__
  結論（同じ階層の帰結）   - → 結論（「だから」の代わり。行頭の点が矢印になる）
  番号付き               1. 項目
  本文（灰色の大きめ文字） ふつうに書く。段落内の改行はそのまま改行になる
  補足（小さい文字）      > 補足
  強調（青）             **強調**
  注意（オレンジ）        !!注意!!
  見た目の追加           行末に {.center}（中央寄せ） {.big}（大きく太く） {.strong}（太く） {.box}（灰色の枠） {.statement}（特大）

■ スライドの組み立て方は .claude/skills/bullet-slides/SKILL.md を参照（見出し＋2階層の箇条書き。図や画像は補助）

■ スライドの設定（スライドの先頭に1行のHTMLコメントで書く。実例は下のスライドを参照）
  title          表紙
  section: 1     章扉（# 章名 を書く）
  chapter: 導入  左上の章ラベルを指定（ふだんは直前の章扉から自動）
  pill: 実演     見出しの上にバッジ
  tight          ブロックの間隔を詰める

■ 図のブロック（「:::名前」から「:::」まで）
  :::cards 2      カードを2列に並べる（3, 4 も可）。#### 小ラベル / ### カード見出し {.accent|.warn|.small} / 本文 / - 枠付きの行 {.bad}
  :::flow         - 箱の名前 | 補足 {.accent|.ghost|.dim|.warn|.wide} を自動で → でつなぐ。-> 文字 で矢印を指定。「:::flow small」で小さく、「:::flow plain」で枠なし
  :::chips        - ラベル を丸いタグで並べる。-> › で区切り記号
  :::prompt       依頼文の枠。1行が1段落。> で始まる行は見本の枠。「:::prompt big」で大きく
  :::rows         - ① 本文 の形で、番号付きの行を並べる
  :::terms        ### グループ名 / - **用語** 説明。グループ名の行末に {.newcol} で、そこから右の列へ
  :::html         HTML をそのまま書く（複雑な図用）
  ```             コード（黒い枠）
  ![説明](images/ファイル名.png)   画像（slides/images/ に置く。まだ無いときは点線の枠が出る）。行末に {.short} で低めの枠
  :::cols         左右2列。「+++」だけの行で左右を区切る。列の中には他のブロックも書ける

■ コメント（スライドには出ない）
  行の先頭に // を書くと、その行はコメントになる
  例）// ここの例は差し替えたい
  長いメモは、このメモのように「<!」「--」〜「--」「>」で囲んでもよい
-->

<!-- title -->
# 初心者向けGAS講座

AIにプログラミングさせる

---
<!-- chapter: 導入 -->
## 今日のゴール

1. GASがどこで・誰として・何をきっかけに動くかわかる
2. 「入力」と「出力」でAIにプログラムを頼める
3. AIが作ったプログラムを安全に試し、結果を確かめられる

> **今日やらないこと：**プログラミング文法の学習 {.box}

---
<!-- chapter: 導入 -->
## 今日の流れ

1. コンピュータとプログラム
2. GASとは何か
3. プログラムをAIに書いてもらう
4. 実演：AIと一緒に動かしてみる
5. GASを使う段取りと、安全に使うために
6. まとめと、もっと知りたい人へ

---

<!-- section: 1 -->
# コンピュータとプログラム

---

## PCはすべてプログラムで動いている

:::cols
- どの操作も、裏でプログラムが動いている
  - 例：ファイルをコピー → 別のフォルダに貼り付け → 開く → 文言を書き換えて保存
- マウスとキーボードの操作は、プログラムを呼び出す入口
  - 同じ手順は、命令を書いても実行できる（右の下）
  - マウスでやっても、命令でやっても結果は同じ
+++
:::html
<div style="display:flex; flex-direction:column; gap:10px">
  <div class="mock-window">
    <div class="bar"><i></i><i></i><i></i></div>
    <div class="content" style="gap:12px; align-items:center; font-size:14px">
      <div class="file" style="font-size:12px"><svg viewBox="0 0 40 50"><path d="M3 2h22l12 12v34H3z" fill="#fff" stroke="#2557d6" stroke-width="2.5"/><path d="M25 2v12h12" fill="none" stroke="#2557d6" stroke-width="2.5"/><path d="M9 24h22M9 31h22M9 38h13" stroke="#9db0e0" stroke-width="2.5"/></svg>報告書.txt</div>
      <div style="display:flex; flex-direction:column; gap:4px">
        <div>① 右クリック › コピー</div>
        <div>② 「保存用」フォルダに貼り付け</div>
        <div>③ ダブルクリックで開く</div>
        <div>④ 「4月」を<b style="color:var(--accent)">「5月」</b>に書き換えて保存</div>
      </div>
    </div>
  </div>
  <div class="note" style="text-align:center">↓ 同じことを命令で書くと（読まなくてOK）</div>
  <div class="mock-code" style="font-size:13px"><span class="k">import</span> shutil
<span class="c"># ①② コピーして、保存用フォルダに貼り付け</span>
shutil.copy(<span class="s">"報告書.txt"</span>, <span class="s">"保存用/報告書.txt"</span>)
<span class="c"># ③ 開いて、中身を読む</span>
text = open(<span class="s">"保存用/報告書.txt"</span>).read()
<span class="c"># ④ 「4月」を「5月」に書き換えて保存</span>
open(<span class="s">"保存用/報告書.txt"</span>, <span class="s">"w"</span>).write(text.replace(<span class="s">"4月"</span>, <span class="s">"5月"</span>))</div>
</div>
:::
:::
---

## GUIのおかげで意識せずに済む

:::cols
- GUI＝画面を見て操作するための仕組み
  - ボタンやメニューなど
- GUIがプログラムを使いやすい形に**包んでいる**
  - 例：「保存」ボタンを押すと、裏で保存のプログラムが動く
+++
:::html
<div class="wrap-outer">
  <div class="wrap-label">GUI<small>ボタン・メニュー</small></div>
  <div class="mock-window">
    <div class="bar"><i></i><i></i><i></i></div>
    <div class="content"><div class="mock-btns"><span>保存</span><span class="sub">コピー</span><span class="sub">送信</span></div></div>
  </div>
  <div class="wrap-inner">
    <div class="wrap-label light">プログラム<small>コード</small></div>
    <div class="mock-code"><span class="k">function</span> save() {
  file.write(data);
}</div>
  </div>
</div>
:::
:::

---

## GUIはレトルト、プログラミングは手作り

:::cols
- __レトルトカレー＝GUI__
  - 用意された商品から選んで温めるだけで手軽
  - 用意されたもの以外は作れない
- __手作りカレー＝プログラミング__
  - 材料と手順を自分で組み合わせ、こだわれる
  - 作り方を指示する必要がある
- レトルトも誰かの手作り
  - 普段使うアプリも、誰かがプログラミングして作ったもの
+++
:::html
<div class="wrap-outer">
  <div class="wrap-label">レトルトカレー＝GUI<small>包み</small></div>
  <div class="mock-window">
    <div class="bar"><i></i><i></i><i></i></div>
    <div class="content"><div class="mock-btns"><span>保存</span><span class="sub">コピー</span><span class="sub">送信</span></div></div>
  </div>
  <div class="wrap-inner">
    <div class="wrap-label light">手作りカレー＝プログラム<small>中身</small></div>
    <div class="mock-code"><span class="k">function</span> save() {
  file.write(data);
}</div>
  </div>
</div>
:::
:::

---

<!-- section: 2 -->
# GASとは何か

---

## GASを一言でいうと

- **Googleのサービスを、プログラムで動かすための仕組み**
  - 正式名称は Google Apps Script（グーグル・アップス・スクリプト）
  - 例：スプレッドシートの一覧から、Gmailの下書きを一度に作る
- ブラウザだけで使え、Googleアカウントがあれば始められる
  - 自分のPCに何かをインストールする必要はない

---

## プログラミングに必要なもの

:::cols wide
- **言語**：指示を書く言葉
  - JavaScript、Pythonなど多数
- **エディタ**：コードを書くための専用のメモ帳
- **実行環境**：プログラムを動かす場所
  - 自分のPC、または遠くのサーバー（中身はコンピュータ）
- **操作できる対象**：ファイル、Webサービス、機器など
- 普通はこれらを自分でそろえる
  - インストールや設定が必要
+++
:::html
<div class="icon-grid">
  <div class="icon-tile"><svg viewBox="0 0 72 72"><rect x="6" y="10" width="60" height="40" rx="10" fill="#fff" stroke="#2557d6" stroke-width="3"/><path d="M22 50l-6 12 16-12" fill="#fff" stroke="#2557d6" stroke-width="3" stroke-linejoin="round"/><text x="36" y="37" text-anchor="middle" font-family="Menlo,monospace" font-size="18" font-weight="700" fill="#2557d6">{ }</text></svg>言語<small>指示を書く言葉</small></div>
  <div class="icon-tile"><svg viewBox="0 0 72 72"><rect x="12" y="6" width="44" height="58" rx="5" fill="#fff" stroke="#2557d6" stroke-width="3"/><path d="M20 20h28M20 29h28M20 38h20M20 47h24" stroke="#9db0e0" stroke-width="3"/><path d="M50 46l12-12 5 5-12 12-7 2z" fill="#2557d6"/></svg>エディタ<small>書くためのメモ帳</small></div>
  <div class="icon-tile"><svg viewBox="0 0 72 72"><rect x="4" y="12" width="38" height="28" rx="4" fill="#fff" stroke="#2557d6" stroke-width="3"/><path d="M16 48h14M23 40v8" stroke="#2557d6" stroke-width="3"/><rect x="48" y="10" width="20" height="13" rx="3" fill="#fff" stroke="#2557d6" stroke-width="3"/><rect x="48" y="27" width="20" height="13" rx="3" fill="#fff" stroke="#2557d6" stroke-width="3"/><rect x="48" y="44" width="20" height="13" rx="3" fill="#fff" stroke="#2557d6" stroke-width="3"/><circle cx="53" cy="16.5" r="1.8" fill="#2557d6"/><circle cx="53" cy="33.5" r="1.8" fill="#2557d6"/><circle cx="53" cy="50.5" r="1.8" fill="#2557d6"/><text x="23" y="68" text-anchor="middle" font-size="9" fill="#6e6e73">PC</text><text x="58" y="68" text-anchor="middle" font-size="9" fill="#6e6e73">サーバー</text></svg>実行環境<small>動かす場所</small></div>
  <div class="icon-tile"><svg viewBox="0 0 72 72"><path d="M6 14h16l8 8v22H6z" fill="#fff" stroke="#2557d6" stroke-width="3"/><rect x="36" y="16" width="30" height="22" rx="3" fill="#fff" stroke="#2557d6" stroke-width="3"/><path d="M36 18l15 11 15-11" fill="none" stroke="#2557d6" stroke-width="3"/><path d="M20 64a10 10 0 0 1 2-20 14 14 0 0 1 27 3 9 9 0 0 1 1 17z" fill="#fff" stroke="#2557d6" stroke-width="3"/></svg>操作対象<small>ファイル・メールなど</small></div>
</div>
:::
:::

---
## GASの場合

:::cols wide
- 必要なものが全部ブラウザの中にそろっている
  - **言語**：JavaScript
  - **エディタ**：Apps Scriptエディタ（ブラウザで開く）
  - **実行環境**：Googleのサーバー
- 操作できるのはGoogleのサービス
  - スプレッドシート、Gmail、Drive、カレンダー、フォームなど
- → 準備は不要
+++
:::html
<div class="icon-grid">
  <div class="icon-tile"><svg viewBox="0 0 72 72"><rect x="6" y="10" width="60" height="40" rx="10" fill="#fff" stroke="#2557d6" stroke-width="3"/><path d="M22 50l-6 12 16-12" fill="#fff" stroke="#2557d6" stroke-width="3" stroke-linejoin="round"/><text x="36" y="37" text-anchor="middle" font-family="Menlo,monospace" font-size="18" font-weight="700" fill="#2557d6">{ }</text></svg>言語<small>JavaScript</small></div>
  <div class="icon-tile"><svg viewBox="0 0 72 72"><rect x="12" y="6" width="44" height="58" rx="5" fill="#fff" stroke="#2557d6" stroke-width="3"/><path d="M20 20h28M20 29h28M20 38h20M20 47h24" stroke="#9db0e0" stroke-width="3"/><path d="M50 46l12-12 5 5-12 12-7 2z" fill="#2557d6"/></svg>エディタ<small>Apps Scriptエディタ</small></div>
  <div class="icon-tile"><svg viewBox="0 0 72 72"><rect x="4" y="12" width="38" height="28" rx="4" fill="#fff" stroke="#2557d6" stroke-width="3"/><path d="M16 48h14M23 40v8" stroke="#2557d6" stroke-width="3"/><rect x="48" y="10" width="20" height="13" rx="3" fill="#fff" stroke="#2557d6" stroke-width="3"/><rect x="48" y="27" width="20" height="13" rx="3" fill="#fff" stroke="#2557d6" stroke-width="3"/><rect x="48" y="44" width="20" height="13" rx="3" fill="#fff" stroke="#2557d6" stroke-width="3"/><circle cx="53" cy="16.5" r="1.8" fill="#2557d6"/><circle cx="53" cy="33.5" r="1.8" fill="#2557d6"/><circle cx="53" cy="50.5" r="1.8" fill="#2557d6"/><text x="23" y="68" text-anchor="middle" font-size="9" fill="#6e6e73">PC</text><text x="58" y="68" text-anchor="middle" font-size="9" fill="#6e6e73">サーバー</text></svg>実行環境<small>Googleのサーバー</small></div>
  <div class="icon-tile"><svg viewBox="0 0 72 72"><path d="M6 14h16l8 8v22H6z" fill="#fff" stroke="#2557d6" stroke-width="3"/><rect x="36" y="16" width="30" height="22" rx="3" fill="#fff" stroke="#2557d6" stroke-width="3"/><path d="M36 18l15 11 15-11" fill="none" stroke="#2557d6" stroke-width="3"/><path d="M20 64a10 10 0 0 1 2-20 14 14 0 0 1 27 3 9 9 0 0 1 1 17z" fill="#fff" stroke="#2557d6" stroke-width="3"/></svg>操作対象<small>Googleのサービス</small></div>
</div>
:::
:::
---

## GASの見取り図

- プログラムは「きっかけ」で動き出す
  - 今日のきっかけは、エディタの「実行」ボタン
- 動いたプログラムが、Googleの各サービスを読み書きする
- すべて「誰かの権限」の範囲で動く

:::html
<div style="border:2px dashed var(--line); border-radius:20px; padding:28px 32px 22px; position:relative">
  <div class="note" style="position:absolute; top:-18px; left:28px; background:#fff; padding:0 12px">誰かの権限の範囲</div>
  <div class="flow">
    <div class="node">きっかけ<small>実行ボタン</small></div>
    <div class="arrow">→</div>
    <div class="node accent">プログラム</div>
    <div class="arrow">⇄<small style="display:block; font-size:16px">読む・書く</small></div>
    <div style="display:flex; flex-direction:column; gap:10px">
      <div class="chips"><span class="chip">スプレッドシート</span><span class="chip">Gmail</span><span class="chip">Drive</span></div>
      <div class="chips"><span class="chip">カレンダー</span><span class="chip">フォーム</span></div>
    </div>
  </div>
</div>
:::

---
## 誰として動くか

:::cols text
- 実行した人（または設定した人）の**権限**で動く
  - その人が触れるものには、プログラムも触れる
- 良い面：自分ができることは、そのまま任せられる
  - 例：編集できるシートなら、プログラムも書き込める
- 注意点：自分が触れるものは全部、プログラムも触れる
  - 例：自分のGmail全体、共有ドライブの大事なファイル
  - AIのコードが、意図しないものを書き換えることもある
- → 権限の扱いが大事（詳しくは 5-5 権限）
+++
:::html
<div class="nest" style="padding:18px">
  <div class="t">あなたが触れる範囲</div>
  <div class="chips" style="gap:8px">
    <span class="chip" style="font-size:16px; padding:6px 14px">自分のGmail</span>
    <span class="chip" style="font-size:16px; padding:6px 14px">編集できるシート</span>
    <span class="chip" style="font-size:16px; padding:6px 14px">共有ドライブ</span>
    <span class="chip" style="font-size:16px; padding:6px 14px">カレンダー</span>
  </div>
  <div class="note" style="margin-top:12px; text-align:center; color:var(--accent); font-weight:700">＝ プログラムが触れる範囲</div>
</div>
:::
:::
---

<!-- section: 3 -->
# プログラムをAIに書いてもらう

---

## 最初の型は「入力」と「出力」

- どんなプログラムも「入力 → 変換 → 出力」でできている
  - **入力**：どこから、何を読むか　／　**出力**：どこへ、どんな形で出すか
  - **変換**：入力を出力に変える処理
- 人が決めるのは、入力と出力だけでいい
  - 変換はAIが考える。カレーなら、材料と完成形を伝えれば作り方はAIが考える
- 完璧な依頼文はいらない。この型で、まず一度動かしてみる

:::flow
- 入力 | どこから、何を読むか {.accent .wide}
- 変換 | AIが考える {.ghost .wide}
- 出力 | どこへ、どんな形で出すか {.accent .wide}
:::

---

## 大きな仕組みも、入れ子の「入力→変換→出力」

- 変換の中も、小さな「入力→変換→出力」に分けられる
  - 前の処理の出力が、次の処理の入力になる
- システムやプログラムの多くは、この入れ子で説明できる
  - あとでAIにコードを説明させるときにも、この見方を使う

:::html
<div style="display:flex; flex-direction:column; gap:8px">
  <div class="flow small" style="gap:10px">
    <div class="node accent">入力<small>シートの一覧</small></div><div class="arrow">→</div>
    <div class="node" style="border-color:var(--accent); border-style:dashed">変換<small>▼ 下で拡大</small></div><div class="arrow">→</div>
    <div class="node accent">出力<small>Gmailの下書き</small></div>
  </div>
  <div class="zoom">
    <div class="zoom-label">変換の中を拡大すると</div>
    <div class="mini-row">
    <div class="mini-ipo"><div class="h">① 一覧を読む</div>
      <div class="r"><b>入力</b>シートの一覧</div><div class="r mid"><b>変換</b>1行ずつに分ける</div><div class="r"><b>出力</b>1行分のデータ</div></div>
      <div class="mini-arrow">→</div>
    <div class="mini-ipo"><div class="h">② 文面を作る</div>
      <div class="r"><b>入力</b>1行分のデータ（宛先・名前）</div><div class="r mid"><b>変換</b>見本の文面に当てはめる</div><div class="r"><b>出力</b>メールの文面</div></div>
      <div class="mini-arrow">→</div>
    <div class="mini-ipo"><div class="h">③ 下書きにする</div>
      <div class="r"><b>入力</b>宛先と文面</div><div class="r mid"><b>変換</b>Gmailに渡す</div><div class="r"><b>出力</b>下書き</div></div>
    </div>
  </div>
</div>
:::
---

## 例：今日の実演の入力と出力

- 今日の実演：一覧から、連絡メールの下書きを作る
  - **入力**：スプレッドシートの一覧（A列：宛先、B列：名前）
  - **出力**：一人ずつのGmailの下書き（宛名入り）
- 入力と出力は「場所」まで具体的に書く
  - どのファイルの、どのシートの、どの列か。出力は完成見本を1つ見せる
- 送信ではなく下書きにするのは、間違えても取り返しがつくから

:::flow
- 入力 | シートの一覧 {.accent .wide}
- 変換 | AIが考える {.ghost .wide}
- 出力 | Gmailの下書き {.accent .wide}
:::

---
## ただし「決まりごと」は書く

- AIが知りようのない業務のルールは書く
  - 例：対応済みは除く、「様」をつける、空欄は飛ばす
- 書かないと、!!AIが推測で埋める!!

---
## 決まりごとを書かないと

:::cols
- 決まりごとの有無で、AIの結果が変わる
  - なし：A列（宛先）が空欄でも、宛先のない下書きができる
  - あり：空欄の行は飛ばされる

| A 宛先 | B 名前 |
|---|---|
| tanaka@… | 田中 |
| （空欄） | 佐藤 |
| suzuki@… | 鈴木 |
+++
:::cards 1 compact
### 決まりごと なし {.warn}
- 宛先：tanaka@… ／ 田中様
- 宛先：!!（空っぽのまま）!! ／ 佐藤様 {.bad}
- 宛先：suzuki@… ／ 鈴木様

### 「A列が空欄なら飛ばす」あり {.accent}
- 宛先：tanaka@… ／ 田中様
- 宛先：suzuki@… ／ 鈴木様
:::
:::

---
## 実演で使う依頼文

- 型に当てはめると、こうなる

:::prompt
Google Apps Scriptで書いてください。
**入力：**スプレッドシート「○○」の A列（宛先）・B列（名前）
**出力：**Gmailの下書き（送信はしない）。文面の見本：
> 田中様
> いつもご支援いただき、ありがとうございます。（以下、全員共通の本文）
**決まりごと：**A列（宛先）が空欄の行は飛ばす
:::

---

<!-- section: 4 -->
# 実演：AIと一緒に動かしてみる

---
## 実演の流れ

1. 依頼文をAIに渡し、コードを受け取る
2. Apps Scriptに貼り付ける
3. 実行する
4. 承認画面で許可する
5. 結果を確認する

---
<!-- pill: 実演 -->
## 依頼文をAIに渡し、コードを受け取る

- AIに依頼して、コードを受け取る
  - 3章の依頼文をそのまま渡す
  - 返ってきたコードを丸ごとコピーする

![AIに依頼文を渡して、コードが返ってきた画面](images/03-ai-chat.png) {.short}

---

## Apps Scriptエディタの開き方

:::cols text
- スプレッドシートから開く（今日はこちら）
  - スプレッドシートを開き、メニューの「拡張機能」›「Apps Script」
  - そのシートに紐づいたプロジェクトが開く
- 単独で開く
  - script.google.com を開き、「新しいプロジェクト」
+++
![スプレッドシートの「拡張機能」メニュー](images/09-open-editor.png)
:::

---
## Apps Scriptエディタの見方

// 画像には ①〜⑤ の番号を書き込んでおく
:::cols
1. **ファイル一覧**：プロジェクトのファイルが並ぶ
2. **コードを書く場所**：AIが作ったコードを貼る
3. **保存**：貼ったら、まず保存
4. **関数の選択と「実行」ボタン**
5. **実行ログ**：結果やエラーが出る
  - いわゆるコンソール

> ※ 画面はGoogleの更新で変わることがある
+++
![Apps Scriptエディタの全体（①〜⑤の番号つき）](images/08-editor-tour.png)
:::

---
<!-- pill: 実演 -->
## Apps Scriptに貼り付けて実行する

- エディタに貼って実行する
  - コードを②に貼り、③で保存する
  - ④で関数を選んで実行する

![Apps Scriptエディタにコードを貼り付けた画面](images/04-apps-script-editor.png) {.short}

---
## 承認画面の読み方

:::cols
- 初回の実行時に、許可を求める画面が出る
- 2つを確かめてから許可する
  - 何へのアクセスを求めているか
  - 依頼した内容に見合っているか
+++
![初回実行時に出る承認画面](images/05-consent.png)
:::

---
<!-- pill: 実演 -->
## 結果を確認する

- 決まりごとどおりにできたか確かめる
  - Gmailの「下書き」を開く

![Gmailの「下書き」に並んだメール](images/06-gmail-drafts.png) {.short}

---

## AIに中身を説明してもらう

- 構造をつかむ頼み方
  - 「このコードを入力・変換・出力に分けて説明して。変換の部分は、さらに入力・変換・出力の入れ子に分けて」
- ほかにも便利な頼み方
  - 「全体の流れを図（フローチャート）で示して」
  - 「このコードが読む・書く・消す・送るものを一覧にして」
  - 「失敗しそうな場面と、そのとき何が起きるかを教えて」
  - 「実行する前に確かめるべき点を挙げて」
- ただし正しさは**結果で**確かめる
  - 説明は全体をつかむためのもの

---

<!-- section: 5 -->
# GASを使う段取りと、<br>安全に使うために

---

<!-- group: 5-1 段取り -->
## GASを使う段取り

- __上流__：何を作るか決める
  - ①業務を選ぶ　②入力と出力を決める　③依頼文を書く
- __下流__：作って、動かして、直す
  - ④コードを作ってもらう　⑤貼り付けて実行　⑥結果を確かめる　⑦直す　⑧定期実行で運用

:::cards 4 steps
#### ① 上流
### 業務を選ぶ {.accent}

#### ② 上流
### 入力と出力を決める {.accent}

#### ③ 上流
### 依頼文を書く {.accent}

#### ④ 下流
### コードを作ってもらう

#### ⑤ 下流
### 貼り付けて実行

#### ⑥ 下流
### 結果を確かめる

#### ⑦ 下流
### 直す

#### ⑧ 下流
### 定期実行で運用
:::

---

<!-- group: 5-2 AIとの付き合い方 -->
## どの工程でもAIに聞ける

:::cols
- **迷ったらAIに聞く。これに尽きる**
  - 下流も上流も、右のように聞けばいい
- __上流__の判断は人の役割。でも判断材料はAIに出してもらえる
  - 例：「この業務、自動化できそう？」

![「claudeに言われるがままに買い物をして…ワイがフィジカルAIや」（Xの投稿）](images/sns-physical-ai.png)
+++
:::rows
- ① 「この業務、自動化できそう？」 {.up}
- ② 「入力と出力を整理するのを手伝って」 {.up}
- ③ 「この依頼文で足りないことはある？」 {.up}
- ⑤ 「どこに貼ればいい？どう実行する？」
- ⑥ 「テスト用のダミーデータを作って」
- ⑦ 「このエラーはどういう意味？」
- ⑧ 「毎朝9時に動かすにはどうする？」
:::
:::

---

## AIの言っていることを、AIに聞いて理解する（1/2）

- AIの説明が分からなければ、そのままAIに聞き返す
  - 「初心者でも分かるように言い直して」
  - 「このシステムを理解するのに必要な基礎の単語や概念をリストアップして、説明して」
  - 「このコード全体の流れを、図を使って説明して」
- コツ：AIの画面を2つ並べて開く
  - 「AIに解説してもらう画面」と「AIの解説を解説してもらう画面」

---

## AIの言っていることを、AIに聞いて理解する（2/2）

- 分かるようになるほど、AIの間違いに気づける
  - AIは間違えることもある。理解する力が、確かめる力になる
- 根拠：経験のある開発者も、分からないコードをAIに説明させている
  - 「仕組みが分からなかったので、GPT-3に聞いた」（"I could not figure out how it works. So I asked GPT-3."）
  - 「言うことは何でも信じられるわけではない。ペダルのこぎ方は自分で知っておく必要がある」（"You can't trust anything it says" / "You still have to know how to pedal!"）
  - 出典：Simon Willison「Using GPT-3 to explain how code works」2022年7月

---

<!-- group: 5-3 結果の確かめ方 -->
## 人がやること：決める・確かめる

- AIに任せきれないことが4つある
  - 何を作るかを**決める**、権限を**承認する**
  - 結果が正しいかを**確かめる**、AIに渡してよい情報かを**判断する**
- 特に大事なのは、結果が正しいかを確かめること
  - 出力が正しいと確かめられれば、変換（コード）の中身は気にしなくていい（かなり極論）
  - 期待する結果を先に決め、少量のダミーデータで試す
  - 空欄・重複など、いろいろな入力で試すほど安心

:::flow
- 入力 | ダミーデータ {.accent .wide}
- 変換 | 中身は見なくていい {.ghost .wide}
- 出力 | ここを確かめる {.accent .wide}
:::

---
## エラーは日常

- エラーはAIに直してもらえばいい
  - エラーメッセージをそのままAIに貼る

:::flow
- エラーメッセージ {.warn}
-> → そのまま貼る →
- AI {.accent}
- 直ったコード
:::

![実行ログに出たエラーメッセージ](images/07-error.png) {.short}

---

<!-- group: 5-4 自動で動かす -->
## きっかけ（トリガー）の種類

- プログラムは「きっかけ」があって初めて動く。GASではトリガーと呼ぶ
- __実行ボタン（手動）__：人が押したときに動く
  - 例：エディタの「実行」、シートに置いたボタンやメニュー
- __スケジュール（時間主導型）__：決まった時刻・間隔で動く
  - 例：毎朝9時に、近い期日をSlackに知らせる
- __イベント駆動__：何かが起きたときに動く
  - 例：フォームが送信されたとき、シートが編集されたとき
- → 自動で動くものは、設定した人の権限で動く。止め方も決めておく

---

<!-- group: 5-5 権限 -->
## 権限の基本（読む・書く・消す・実行する）

:::cols
- __read（読む）__：中身を見るだけ。何も変わらない
  - 例：シートの値を読む、メールを検索する
- __write（書く）__：中身を作る・変える
  - 例：シートに書き込む、メールの下書きを作る
- __delete（消す）__：消す。元に戻せないことがある
  - 例：行・ファイル・メールを消す
+++
- __execute（実行する）__：プログラムを動かす
  - 例：GASのスクリプトを実行する
- __＋α__：外への操作や、権限の管理
  - 例：メールを送る、共有設定を変える
- → 権限は必要な分だけにするほど安全
  - 例：読むだけなら「閲覧者」で足りる
- → read以外は外の世界を変える
  - まず下書き・コピー・バックアップで試す
:::

---
## 権限の種類

- __ファイルの共有権限__：人がファイルに何をできるか
  - 閲覧者・閲覧者（コメント可）・編集者・オーナー
  - プログラムは、実行する人が触れるファイルにしか触れない
- __スクリプトの権限（スコープ）__：プログラムに何を許すか
  - 初回の承認画面で許可する（例：スプレッドシートの編集、Gmailの送信）
- __実行する人__：誰の権限で動くか
  - 手動なら実行した人、トリガーなら設定した人
  - Webアプリは「自分」か「アクセスしているユーザー」を選ぶ
- __公開範囲__：Webアプリを誰が使えるか
  - 自分のみ／組織内の全員／Googleアカウントを持つ全員／全員

---
## 権限と機密情報

- 許可する前、AIに渡す前に確かめる
  - 承認画面で何へのアクセスを求めているか
  - 依頼者の個人情報・事件の情報は!!AIに貼らない!!

---

<!-- group: 5-6 個人情報 -->
## 個人情報をAIに渡すときの判定基準

- __ライン1 学習に使われないか__：サービスとプランで決まる
  - 例：Gemini APIの無料枠は製品改善に使われ、人が読むこともある。有料枠は使われない
- __ライン2 外に出してよい情報か__：利用目的と本人の同意で決まる
  - 集めたときの利用目的の範囲内か
  - 本人の同意なく、出力以外の目的（学習など）で扱われるサービスに入れていないか
- → ライン1を守るのは絶対。ライン2の判定は、結構グレーゾーン
  - 学習に使われるサービスには、個人情報を入れない
  - ライン2で迷ったら、名前を伏せる、ダミーに置き換える、責任者に相談する

---
## 有料版AIに渡してよいかのチェック（1/3）

- __① 情報の種類__：要配慮個人情報が含まれていないか
  - 病歴、犯罪の経歴、犯罪の被害を受けた事実、信条、社会的身分など
  - 含まれるなら、原則として渡さない
  - 根拠：個人情報保護法 第2条第3項
- __② 利用目的__：集めたときに示した目的の範囲内か
  - 確かめる文書：プライバシーポリシー、申込フォームの同意文、委任契約書
  - 例：「活動の連絡のため」に集めたメールアドレスで、連絡文を作る → 範囲内
  - 根拠：個人情報保護法 第18条第1項、個人情報保護委員会の注意喚起（1）①

---

## 有料版AIに渡してよいかのチェック（2/3）

- __③ 契約・同意の文言__：外部サービスに預けることが許されているか
  - 「業務委託先に提供することがある」「外部サービスで処理する」などの記載
  - 秘密保持の条項で、第三者への開示が禁じられていないか
  - 根拠：個人情報保護法 第27条第1項（本人の同意）・第5項第1号（委託）。秘密保持は各契約書による
- __④ AIサービスの契約__：入力を学習などに使わないと約束しているか
  - 例：Gemini APIの有料枠は、製品改善に使わないと規約に明記
  - 無料枠や個人のアカウントでは満たさない
  - 根拠：個人情報保護委員会の注意喚起（1）②、Gemini API 追加利用規約

---

## 有料版AIに渡してよいかのチェック（3/3）

- __⑤ 事業者とサーバの国__：海外か
  - 海外なら、本人への情報提供や同意など、追加の手続きが要ることがある
  - 根拠：個人情報保護法 第28条第1項、個人情報保護委員会 Q&A 10-25・12-3
- __⑥ 団体の承認__：責任者が了解し、記録を残したか
  - 根拠：個人情報保護法 第23条（安全管理措置）
---
## 委託先に渡せるなら、AIにも渡せるか

- 考え方は近い：外に預け、決めた目的の範囲だけで扱ってもらう
  - 委託：利用目的の範囲内なら本人の同意は不要。ただし委託先を監督する義務がある（法27条5項1号、法25条）
  - クラウド：事業者がデータを取り扱わない契約なら「提供」に当たらない（Q&A 7-53）
- ただし自動的には同じにならない
  - 契約書の「委託先」に、AIサービスが含まれるとは限らない
  - AI事業者が学習などに使わない契約か、別に確かめる
  - 海外の事業者・サーバなら追加の手続きが要ることがある（法28条、Q&A 10-25・12-3）
  - 生成AIが「取り扱わない」に当たるかは、Q&Aに明記がない

---
## 判定基準の根拠（1/2）

- 個人情報保護委員会「生成AIサービスの利用に関する注意喚起等」2023年6月2日
  - 「特定された当該個人情報の利用目的を達成するために必要な範囲内であることを十分に確認すること」
  - 「あらかじめ本人の同意を得ることなく…個人データを含むプロンプトを入力し、当該個人データが当該プロンプトに対する応答結果の出力以外の目的で取り扱われる場合…個人情報保護法の規定に違反することとなる可能性がある」
- Gemini API 追加利用規約（2026年3月23日発効）
  - 無料枠："Do not submit sensitive, confidential, or personal information to the Unpaid Services."
  - 有料枠："Google doesn't use your prompts ... or responses to improve our products"

---
## 判定基準の根拠（2/2）

- 個人情報保護法（令和8年11月2日施行の版で確認）
  - 第2条第3項：要配慮個人情報＝「人種、信条、社会的身分、病歴、犯罪の経歴、犯罪により害を被った事実」など
  - 第18条第1項：「利用目的の達成に必要な範囲を超えて、個人情報を取り扱ってはならない」
  - 第27条第5項第1号：利用目的の範囲内で「取扱いの全部又は一部を委託することに伴って」提供される場合は第三者に当たらない
- 個人情報保護委員会「ガイドラインに関するQ&A」（令和8年10月30日更新）
  - Q7-53：クラウド事業者が「個人データを取り扱わないこととなっている場合」は提供に当たらない。例：「契約条項によって…取り扱わない旨が定められており、適切にアクセス制御を行っている場合」
  - Q10-25：その場合も、外国の制度を把握した安全管理措置と、サーバの所在国などを本人に示すことが必要


---

## 世の中の社用AIは、どう成り立っているか

- __法人向けのプランを契約する__
  - 入力を学習に使わないこと、データの扱いを契約で約束してもらう
  - 例：Google Workspace の Gemini、ChatGPT の法人向けプラン（Business・Enterprise）
- __社内ガイドラインで、使ってよいツールと入れてよい情報を決める__
  - 例：公開情報はOK／社外秘は法人向けのツールだけ／個人情報は原則入れない
  - 個人で契約したAIや無料版は、業務では使わない
- __ひな形をもとにルールを作る__
  - 例：日本ディープラーニング協会「生成AIの利用ガイドライン」（2023年5月公開、無料）
- → グレーゾーンを一人ひとりに判断させず、組織として決めている
  - 出典：Google「Generative AI in Google Workspace Privacy Hub」、OpenAI「Business data privacy, security, and compliance」
---

<!-- group: 5-7 一人ではまだやらないこと -->
## 一人ではまだやらないこと（1/3）

- !!他人に届く処理を、いきなり本番で!!（一斉メール送信、Slackへの投稿など）
  - 理由：届いたものは取り消せない。間違いが大勢に広がる
  - やってよい条件：自分宛てや少人数のテストで何度か確かめたら
- !!共有のファイルを直接いじる!!（チームのシートやフォルダ）
  - 理由：壊すと自分だけの問題では済まない
  - やってよい条件：コピーで確かめ、持ち主の了解を得たら
- !!削除・上書きをする処理!!
  - 理由：元に戻せないことがある
  - やってよい条件：バックアップを取り、戻し方（版の履歴・ゴミ箱）を確かめたら

---
## 一人ではまだやらないこと（2/3）

- !!個人情報を扱う仕組み!!（依頼者・支援者の情報）
  - 理由：漏れたときの影響が大きい。AIに渡せない情報もある
  - やってよい条件：団体の情報管理ルールを確認し、責任者の了解を得たら
- !!誰でも見られる形で公開する!!（Webアプリの公開範囲を「全員」に、など）
  - 理由：URLを知る人なら誰でもデータに触れられる
  - やってよい条件：公開範囲（組織内のみ、など）とアクセス権を理解したら

---
## 一人ではまだやらないこと（3/3）

- !!黙って自動で動かし続ける!!（トリガーでの定期実行）
  - 理由：作った人しか止め方・直し方を知らない状態になる
  - やってよい条件：動く内容・時刻・止め方を書き残し、引き継げる人ができたら
- !!複数人で同時に、同じGASを編集する!!
  - 理由：誰が何を変えたか分からなくなり、他の人の変更を上書きすることがある
  - やってよい条件：Git／GitHubで変更の履歴を管理できるようになったら
- 迷ったら、詳しい人に一度見てもらう

---

<!-- group: 5-8 向いている業務 -->
## 向いている業務

- 向いている業務の特徴
  - 繰り返しがある
  - ルールが決まっている
  - Googleのサービス内で完結する
- 根拠：ルールが決まった定型業務は自動化の代表例
  - 「ルールやフローが決まっていて、処理に人の判断が不要な定型業務は、RPAで自動化できる代表的な仕事です。」
  - 出典：NTT東日本「RPAに向いている・向いていない業務10選」2026年3月更新（RPAの話だが、GASにも当てはまる）

---

<!-- section: 6 -->
# まとめと、<br>もっと知りたい人へ

---
## 今日のまとめ

1. PCはプログラムで動いている。GUIはそれを包んでいる
2. GASは、Googleのサービスを自分の権限で動かすプログラム
3. 依頼の型は「入力」と「出力」（＋決まりごと）
4. 迷ったらAIに聞く。決める・確かめるは人
5. 権限は必要な分だけ。個人情報は判定基準で確かめてから
6. 「できる」と知っているだけで、自動化の選択肢が増える

---
## 次回以降の候補

- トリガーの設定
- Slack連携
- 宿題を題材にした実践

---

## GASでできること・上限

- __できること__：Googleのサービスを読み書きし、外のサービスともつながる
  - スプレッドシート：読み書き、並べ替え、集計／Gmail：検索、下書き、送信
  - Drive：ファイルの作成・移動・名前の変更／カレンダー・フォーム：予定の登録、回答の受け取り
  - 外のサービス：APIを通してSlackなどに投稿
- __上限__（無料のGoogleアカウント／Google Workspace）
  - 1回の実行時間：6分まで（どちらも）
  - メールの宛先数：1日100件／1日1,500件
  - トリガーで動いた合計時間：1日90分／1日6時間
  - 出典：Google「Quotas for Google Services」（Apps Script のガイド）

---
## 成果の上限は、使う人の知識で決まる（1/2）

:::cols text
- AIを使った成果物の質は、使う人の力に左右される
  - 大学生100人が、vibe codingでアプリを作った研究
  - 文章力とCS（情報科学）の成績が高いほど、出来がよかった
  - CSの成績は、一般的な認知能力を差し引いても効いていた
  - 出典：Thorgeirsson, Weidmann, Su「Computer Science Achievement and Writing Skills Predict Vibe Coding Proficiency」CHI 2026（arXiv:2603.14133）
+++
![論文を紹介する投稿](images/sns-saru.png)
:::

---
## 成果の上限は、使う人の知識で決まる（2/2）

- 知らないことは、AIに聞くことすらできない
  - 「AIから出力を引き出すのに使う自分の知識がボトルネック」「全く知らないことはAIに聞けない」（Xの投稿より）
- → だから知識を少しずつ増やす。この章の最後の用語集もその入口

![「自分の知識がボトルネック」の投稿](images/sns-knowledge.png) {.short}

---
## 入れ子で伝える

- 細かく調整したいときは、変換を小さく分けて伝える
  - 例：未処理の行を選ぶ → 文面を作る → 下書きにする
  - それぞれが小さな「入力 → 変換 → 出力」
- 根拠：一度に頼みすぎると、AIは混乱しがち
  - "If you ask for too much in one go, it's likely to get confused or produce a "jumbled mess" that's hard to untangle."
  - 出典：Addy Osmani「My LLM coding workflow going into 2026」2026年1月（執筆当時 Google）

---
## AIと人が両方編集できる中間物を作る

- AIの成果物を直したいときは、AIも人も編集できる形を間に挟む
  - 例：このスライドもMarkdownの原稿から作っている
- 根拠：MarkdownはAIとやりとりする共通語になっている
  - "Plain text won. As the lingua franca for interacting with LLMs, Markdown is now ubiquitous."
  - 出典：Jorge Arango「The Resurgence of Plain Text in the Age of AI」2024年12月

:::flow small
- 中間物 | Markdownなど {.accent}
- 完成品 | スライド・HTML
:::

---
## ルールベースとLLMベース

- __ルールベース__：決めた規則どおりに処理する
  - 入力の形が厳格（決まった列、決まった書式）
  - 同じ入力なら、いつも同じ結果
  - 例：GASで書いた普通のプログラム
- __LLMベース__：LLM（大規模言語モデル）が文脈から判断して処理する
  - 曖昧な入力も扱える（自由記述、表記ゆれ）
  - 結果が毎回少し変わり、間違うこともある
  - 例：ChatGPT・Gemini・Claudeの中身がLLM
- → 決まった処理はルールベース、曖昧な判断はLLMベースが向く

---
## LLMにプログラムを書かせるか、直接やらせるか

- __LLMにプログラムを書かせて実行する__
  - LLMが働くのは書くときだけ。何度でも同じ結果になる
  - 処理するデータをLLMに渡さずに済む
- __LLMに直接やらせる__（チャットにデータを貼って頼む、など）
  - 毎回LLMが判断する。曖昧なものに強いが、結果は変わりうる
  - 処理するデータをLLMに渡すことになる
- → 今日の講座は前者（プログラムを書かせる）

:::html
<div class="wf-wrap">
  <div class="wf"><div class="wf-label">書かせて実行</div>
    <div class="n data">依頼文</div><div class="a">→</div>
    <div class="n llm">LLM<small>最初に1回だけ</small></div><div class="a">→</div>
    <div class="n data">コード</div><div class="a">＋</div>
    <div class="n data">データ</div><div class="a">→</div>
    <div class="n">GASのプログラム<small>何度でも同じ動き</small></div><div class="a">→</div>
    <div class="n data">結果</div></div>
  <div class="wf"><div class="wf-label">直接やらせる</div>
    <div class="n data">データ</div><div class="a">→</div>
    <div class="n llm">LLM<small>毎回判断する</small></div><div class="a">→</div>
    <div class="n data">結果</div>
    <div class="wf-legend" style="margin-left:auto"><span><i></i>ルールベース（GASのプログラム）</span><span><i class="llm"></i>LLM</span></div></div>
</div>
:::
---
## 処理の途中でLLMを使う

- GASの処理の一部だけをLLMに任せられる
  - 例：フォームの自由記述を、Gemini APIで分類・要約してシートに書く
- GASからGemini APIに文章を送り、結果を受け取る
  - APIキーが必要（スクリプトプロパティに保管する）
- !!個人情報を含む文章を送るときは、特に注意!!
  - 送った文章はGoogleに渡る。送る前に「個人情報をAIに渡すときの判定基準」で判断する

:::html
<div class="wf-wrap">
  <div class="wf" style="justify-content:center">
    <div class="n data">フォームの回答</div><div class="a">→</div>
    <div class="n">GAS<small>自由記述を取り出す</small></div><div class="a">→</div>
    <div class="n llm">Gemini API（LLM）<small>分類・要約する。ここでGoogleに渡る</small></div><div class="a">→</div>
    <div class="n">GAS<small>結果をシートに書く</small></div><div class="a">→</div>
    <div class="n data">シート</div></div>
  <div class="wf-legend"><span><i></i>ルールベース（GASのプログラム）</span><span><i class="llm"></i>LLM</span></div>
</div>
:::
---
// ▼ 実装例：CALL4でありそうな架空の例。実際に作ったものがあれば差し替える。画像は slides/images/ に置く
<!-- pill: 実装例 -->
## 問い合わせが来たらSlackに通知

:::cols text
- 問い合わせが届いたら、担当のSlackに知らせる
  - **入力**：Googleフォームの回答（件名・カテゴリ）
  - **出力**：Slackの「#問い合わせ」チャンネルへの投稿
  - **きっかけ**：フォームの送信
- 使った仕組み：**API**（外のプログラム向けの窓口）
  - 「○○ API」がある → ○○を外（GASなど）から操作できる
  - 例：Slack APIがある → GASからSlackに投稿できる
- 工夫
  - 本文や連絡先は流さず、件名とカテゴリだけ
+++
![Slackに届いた通知](images/example-slack.png)
:::

---
<!-- pill: 実装例 -->
## メンバー専用の入力画面

:::cols text
- 案件ページの更新依頼を受け付ける、メンバー専用の画面
  - **入力**：画面で入力した内容（案件名、更新したい箇所）
  - **出力**：スプレッドシートへの記録
  - **きっかけ**：画面の「送信」ボタン
- 使った仕組み
  - HTML／Webアプリ
- 工夫
  - 公開範囲を「組織内の全員」にし、外の人には見せない
+++
![入力画面](images/example-form.png)
:::

---
<!-- pill: 実装例 -->
## 案件の状況を一覧するダッシュボード

:::cols text
- 案件ごとの状況・次の期日・担当を、1つの画面で見渡す
  - **入力**：案件一覧のシート（状況、次の期日、担当）
  - **出力**：一覧画面（期日が近い順、状況ごとに色分け）
  - **きっかけ**：画面を開いたとき
- 使った仕組み
  - HTML／Webアプリ／シートの読み取り（read）だけ
- 工夫
  - 読むだけなので、データを壊す心配がない
+++
![ダッシュボードの画面](images/example-dashboard.png)
:::

---
<!-- pill: 実装例 -->
## 受け取った資料の整理

:::cols text
- 受信フォルダに入れた資料を、案件ごとのフォルダへ振り分ける
  - **入力**：Driveの「受信」フォルダのファイル
  - **出力**：案件フォルダへの移動と、ファイル名の統一（日付_案件名_資料名）
  - **きっかけ**：毎日決まった時刻
- 使った仕組み
  - Driveの操作／時間主導型のトリガー
- 工夫
  - 案件番号の付け方を先に決める。最初はコピーで試す
+++
![整理されたフォルダ](images/example-drive.png)
:::

---
<!-- pill: 実装例 -->
## お礼メールの下書きを一括で作る

:::cols text
- 支援者一覧から、宛名入りのお礼メールの下書きを作る
  - **入力**：支援者一覧のシート（名前、メールアドレス、支援内容）
  - **出力**：Gmailの下書き
  - **きっかけ**：手動で実行
- 使った仕組み
  - Gmail（今日の実演と同じ形）
- 工夫
  - 送信は自動にせず、下書きで止めて人が確かめる
+++
![Gmailに並んだ下書き](images/example-gmail.png)
:::

---
<!-- pill: 実装例 -->
## アンケートの自由記述を分類

:::cols text
- アンケートの自由記述を、LLMで「要望／感想／質問」に分ける
  - **入力**：アンケート結果のシートの、自由記述の列
  - **出力**：同じシートの「分類」の列
  - **きっかけ**：手動で実行
- 使った仕組み
  - Gemini API（処理の途中でLLMを使う）
- 工夫
  - !!個人情報が含まれるなら、先に判定基準のチェックをする!!
+++
![分類の列が埋まったシート](images/example-llm.png)
:::

---
## 発展：知っておくとよい言葉

:::terms
### AIの基本
- **LLM（大規模言語モデル）** 大量の文章から学び、文章を作るAI。ChatGPTなどの中身
### 書き方の形式
- **マークダウン記法** 見出しや箇条書きを記号で表す書き方
- **WYSIWYG** 見たままの画面で編集する方式（Googleドキュメントなど）
### 外部サービスとつなぐ
- **API** サービスが外部のプログラム向けに用意した窓口
- **Webhook** 何か起きたら、指定URLへ自動で通知する仕組み
- **HTTPリクエスト** インターネット越しに依頼を送る通信の仕方
- **JSON** データをやりとりするときの書き方の形式
### 鍵と権限 {.newcol}
- **トークン／APIキー** 外部サービスを使うための合言葉
- **スクリプトプロパティ** 合言葉をコードの外に保管する場所
- **OAuth・スコープ** 「何を許可するか」の仕組みと範囲
### 動かし方・運用
- **トリガー（時間主導型・イベント型）** 時刻で動くか、出来事で動くか
- **実行ログ** プログラムが何をしたかの記録
- **開発環境／本番環境** 試すための場所と、実際の業務で使っている場所
- **コンテナバインド／スタンドアロン** ファイルに紐づくか、単独か
### 作れるものを広げる
- **Webアプリ（デプロイ）** GASの仕組みをURLで公開する
- **ライブラリ** 他の人が作ったGASの部品を再利用する
- **HTML** Webページの見た目や構造を書く言語（マークアップ言語）
:::

