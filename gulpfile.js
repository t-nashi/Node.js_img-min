// gulpファイルの読み込み
var gulp = require("gulp");

// プラグインの読み込み
var changed  = require('gulp-changed');             // 変更されたファイルだけを処理
var imagemin = require("gulp-imagemin");            // gulpでimage圧縮するためのプラグイン
var pngquant = require("imagemin-pngquant");        // png圧縮
var mozjpeg  = require("imagemin-mozjpeg");         // jpg圧縮
var jpegrec = require("imagemin-jpeg-recompress");  // jpg圧縮 ※macだと「imagemin-mozjpeg」がエラー起こすのでこっち使った方が良い
var imageminGif = require('imagemin-gifsicle');     // gif圧縮
var svgmin = require('gulp-svgmin');                // svg圧縮

// 圧縮前と圧縮後のディレクトリを定義
var paths = {
    srcDir : './src',               // 圧縮前
    dstDir : './public'             // 圧縮後
}

// 画像最適化
// $ gulp imagemin
gulp.task('imagemin', function(){
    var srcGlob = paths.srcDir + '/**/*.+(jpg|gif)';
    var dstGlob = paths.dstDir;

    // jpg
    gulp.src(srcGlob)
        .pipe(changed(dstGlob))
        .pipe(imagemin([
            // gif
            imageminGif({
                interlaced: false,              // 
                optimizationLevel: 3,           // 1 - 3
                colors: 100                     // 2 - 256
            }),

            // jpg
            // imagemin.jpegtran({quality:85, progressive: true}) // mozjpegはmacでエラーが発生するためjpegtranを利用する（少し圧縮率が低い）
            // jpegrec({quality:'low', min:40, max:85})         // [macではこちらを有効にする] quality: low, midium, high, veryhigh
            mozjpeg({quality:85, progressive: true})       // [winではこちらを有効にする]
        ]))
        .pipe(gulp.dest(dstGlob));

    // png （画像が暗くなる現象対策のためpngだけ切り出し）
    srcGlob = paths.srcDir + "/**/*.+(png)";
    gulp.src(srcGlob)
        .pipe(changed(dstGlob))
        .pipe(imagemin(
            [pngquant({quality: '40-80', speed: 1})] //40-70
        ))
        .pipe(imagemin()) // pngquantで圧縮した画像が暗くなる現象対策（余計なガンマ情報を削除）
        .pipe(gulp.dest(dstGlob));
});

// svg画像の圧縮タスク
// $ gulp svgmin
gulp.task('svgmin', function(){
    var srcGlob = paths.srcDir + '/**/*.+(svg)';
    var dstGlob = paths.dstDir;
    gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(svgmin())
    .pipe(gulp.dest( dstGlob ));
});

// defaultで画像圧縮タスクをwatch状態に
// $ gulp
gulp.task('default', function(){
    gulp.watch(paths.srcDir + '/**/*', ['imagemin','svgmin']);
    // gulp.watch(paths.srcDir + '/**/*', ['imagemin']);
});
