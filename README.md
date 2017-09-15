# Node.js_img-min
gulp-imageminのサンプル

## このサンプル制作時の環境
* Windows10 Pro、64bit、32GB

## 事前に用意するもの
* Node.js（本サンプル制作時はv8.4.0）
* gulp.js（-g/グローバルインストール）

## 開発手順（win:cmd、mac:tarminal）
1. npm install （package.jsonにあるライブラリがインストールされる）
2. gulp imagemin （gulpfile.jsのimageminコマンドが実行される）

## npm installでインストールされるライブラリ
* gulp
* gulp-imagemin
* imagemin-pngquant
* imagemin-mozjpeg

## gulpで実行されること
* src ＞ public へファイル出力
* jpgはimagemin-mozjpegで圧縮
* pngはimagemin-pngquantで圧縮

## 参考リンク
* [【追記あり】Gulpを利用して画像をロスレス圧縮する - takedajs ログ](http://takedajs.hatenablog.jp/entry/2016/08/01/231609)
* [gulp-imageminとpngquantを使って画像圧縮を効率化する | 技術コラム | つみきブログ](http://blog.tsumikiinc.com/article/20150226_gulp-imagemin.html)
* [Gulpでpngquantを使ってPNGの減色＆軽量化 - Qiita](http://qiita.com/sygnas/items/f6700c75df71b8888d80)
* [絶対つまずかないGulp入門。インストールからSassのコンパイルまで - ICS MEDIA](https://ics.media/entry/3290/3)
