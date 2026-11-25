# 初心者向けGAS講座 -AIにプログラミングさせる-

CALL4 のメンバー向けに作った、Google Apps Script（GAS）の入門講座のスライドです。文法は扱わず、生成AIにコードを書かせて業務を自動化する流れを学びます。

- スライド：[slides/index.html](https://shio-koji.github.io/GAS_driving-shcool/slides/)（キーボードの ← → で移動、F で全画面）
- 講座のアウトライン：[outline.md](outline.md)

## スライドの直し方

スライドは原稿の `slides/slides.md` から生成しています。`index.html` は直接編集しません。

1. `slides/slides.md` を編集する（書き方は冒頭の早見表を参照）
2. `node slides/build.mjs` を実行する（VS Code なら Cmd+Shift+B）
3. `slides/index.html` をブラウザで開いて確認する

`node slides/build.mjs --watch` で起動しておくと、保存するたびに自動で生成し直します。必要なのは Node.js だけです。

スクリーンショットは `slides/images/` に置きます。まだ無い画像は、スライド上に点線の枠で表示されます。
