var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var mozjpeg  = require("imagemin-mozjpeg");


// 画像最適化
gulp.task('imagemin', function(){
    gulp.src("./src/images/*.jpg")
        .pipe(imagemin(
            // [imagemin.jpegtran({quality:85, progressive: true})] // mozjpegはmacでエラーが発生するためjpegtranを利用する（少し圧縮率が低い）
            [mozjpeg({quality:85, progressive: true})]
        ))
        .pipe(gulp.dest("./public/images"));
    gulp.src("./src/images/*.png")
        .pipe(imagemin(
            [pngquant({quality: '40-80', speed: 1})] //40-70
        ))
        .pipe(imagemin()) // pngquantで圧縮した画像が暗くなる現象対策（余計なガンマ情報を削除）
        .pipe(gulp.dest("./public/images"));
});
