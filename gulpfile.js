const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const uglify = require('gulp-uglify');
const pump = require('pump');
// const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

gulp.task('html', function(){
  return gulp.src('src/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/html'))
});

gulp.task('sass', function(){
  return gulp.src('src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    // .pipe(minifyCSS())
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

gulp.task('imagemin', function (cb) {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('default', [ 'html', 'sass', 'compress', 'imagemin' ]);

gulp.task('watch', function() {
    gulp.run(['html', 'sass', 'compress', 'imagemin']);
    // Watch .scss files
    gulp.watch('src/sass/*.scss', ['sass']);
    // Watch .js files
    gulp.watch('src/js/*.js', ['compress']);
    // Watch image files
    gulp.watch('src/img/*', ['imagemin']);

    gulp.watch('src/templates/*.pug', ['html']);
    // livereload.listen();
    // gulp.watch(['dist/**/*']).on('change', livereload.changed);
});
