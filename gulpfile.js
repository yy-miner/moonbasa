const gulp = require('gulp');

const minihtml = require('gulp-minify-html');
const minicss = require('gulp-minify-css');
const uglify = require('gulp-uglify');

const babel = require('gulp-babel');
const es2015 = require('babel-preset-es2015');


gulp.task('uglifyhtml', function () {
    return gulp.src('src/*.html')
        .pipe(minihtml())
        .pipe(gulp.dest('dist/'))
});
gulp.task('uglifycss', function () {
    return gulp.src('src/css/*.css')
        .pipe(minicss())
        .pipe(gulp.dest('dist/css/'))
});
gulp.task('uglifyjs', function () {
    return gulp.src('src/script/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/script/js/'))
});
gulp.task('babeljs', () => {
    return gulp.src('src/script/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/script/js'));
});

