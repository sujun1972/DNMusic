var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var uglify = require('gulp-uglify');
var pump = require('pump');
var livereload = require('gulp-livereload')

gulp.task('html', function(){
  return gulp.src('src/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/html'))
});

gulp.task('css', function(){
  return gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('compress', function (cb) {
    pump([
            gulp.src('src/js/*.js'),
            uglify(),
            gulp.dest('dist/js')
        ],
        cb
    );
});

gulp.task('default', [ 'html', 'css', 'compress' ]);

gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('src/sass/*.scss', ['css']);
    // Watch .js files
    gulp.watch('src/js/*.js', ['compress']);
    // Watch image files
    gulp.watch('src/templates/*.pug', ['html']);
    livereload.listen();
    gulp.watch(['dist/**/*']).on('change', livereload.changed);
});
