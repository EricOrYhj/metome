/**
 * Created by zxw on 2016/8/11.
 */
var gulp =require("gulp"),
    gutil=require("gulp-util"),
    rename = require('gulp-rename'),
    uglify = require("gulp-uglify"),
    plugins = require("gulp-load-plugins")(),
    cssmin = require('gulp-minify-css'),
    clean=require("gulp-clean");

gulp.task('js', function () {
    gulp.src('modules/**/*.js')
        .pipe(uglify())  //压缩
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    gulp.src('modules/**/*.css')
        .pipe(cssmin())  //压缩
        .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest('dist'));

});

gulp.task("clean", function(){
    gulp.src('dist')
        .pipe(clean());
});

var  connect = require('gulp-connect');

gulp.task('webserver', function() {
    connect.server({
        port: 5000,
        livereload: true
    });
});

// gulp.task('default',['clean'],function(){
//     gulp.start('js', 'css');
//     return gutil.log('Gulp is running');
// });

gulp.task('default',['webserver'],function(){
});
