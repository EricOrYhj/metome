var gulp = require("gulp"),
    gutil = require("gulp-util"),
    rename = require('gulp-rename'),
    uglify = require("gulp-uglify"),
    plugins = require("gulp-load-plugins")(),
    cssmin = require('gulp-minify-css'),
    clean = require("gulp-clean"),
    htmlmin = require('gulp-minify-html');

var runSequence = require('gulp-run-sequence');

gulp.task('html', function () {
    var opts = { comments: false, spare: false, quotes: true };
    return gulp.src('modules/**/*.html')
      .pipe(htmlmin(opts))
      .pipe(gulp.dest('dist/modules'));
});

gulp.task('js', function () {
    return gulp.src('modules/**/*.js')
        .pipe(uglify({
            mangle: {
                except: ['require', 'exports', 'module']
            }
        }))
        .pipe(gulp.dest('dist/modules'));
});

gulp.task('css', function () {
    return gulp.src('modules/**/*.css')
        .pipe(cssmin())
         .pipe(gulp.dest('dist/modules'));
});

gulp.task("clean", function () {
    return gulp.src(['dist', 'src'])
        .pipe(clean());
});

var less = require('gulp-less');

gulp.task('less', function () {
    return gulp.src('resource/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('resource/less'));
});

gulp.task('maincss', function () {
    return gulp.src('resource/less/*.css')
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssmin())
         .pipe(gulp.dest('resource/less'));
});

gulp.task('watch', function () {
    return gulp.watch('resource/**/*.less', ['less']);
});

var connect = require('gulp-connect');

gulp.task('webserver', function () {
    return connect.server({
        port: 5000,
        livereload: true
    });
});

gulp.task('prod', function (cb) {
    return runSequence('clean', 'html', 'js', 'css', 'less', 'maincss', 'webserver', 'watch');
});

// gulp.task('default',['clean'],function(){
//     gulp.start('js', 'css');
//     return gutil.log('Gulp is running');
// });

gulp.task('default', ['prod'], function () {
});
