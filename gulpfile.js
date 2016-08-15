var gulp =require("gulp"),
    gutil=require("gulp-util"),
    rename = require('gulp-rename'),
    uglify = require("gulp-uglify"),
    plugins = require("gulp-load-plugins")(),
    cssmin = require('gulp-minify-css'),
    clean=require("gulp-clean");

var runSequence = require('gulp-run-sequence');  

gulp.task('js', function () {
    gulp.src('modules/**/*.js')
        .pipe(uglify())  //压缩
        .pipe(gulp.dest('dist/modules'));
});

gulp.task('css', function () {
    gulp.src('src/**/*.css')
        .pipe(cssmin())  //压缩
         .pipe(gulp.dest('dist/modules'));
});

gulp.task("clean", function(){
    gulp.src(['dist','src'])
        .pipe(clean());
});

var less = require('gulp-less');
 
gulp.task('less', function () {
    gulp.src('resource/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('resource/less'));
});

gulp.task('watch', function () {
    gulp.watch('resource/**/*.less', ['less']); 
});

var  connect = require('gulp-connect');

gulp.task('webserver', function() {
    connect.server({
        port: 5000,
        livereload: true
    });
});

gulp.task('prod', function(cb) {  
    runSequence('clean', 'js', 'less', 'webserver','watch');
});

// gulp.task('default',['clean'],function(){
//     gulp.start('js', 'css');
//     return gutil.log('Gulp is running');
// });

gulp.task('default',['prod'],function(){
});
