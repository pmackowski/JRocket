var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

var DIST = 'dist/';
var APP_SOURCE = 'src';

gulp.task('typescript', function () {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest(DIST));
});

gulp.task('html', function () {
    return gulp
        .src(APP_SOURCE + '/**/*.html')
        .pipe(gulp.dest(DIST));
});

gulp.task('css', function () {
    return gulp
        .src(APP_SOURCE + '/**/*.css')
        .pipe(gulp.dest(DIST));
});

gulp.task('lib', function () {
    return gulp.src([
        'node_modules/systemjs/dist/system.js',
        'node_modules/angular2/bundles/angular2.dev.js'])
        .pipe(gulp.dest(DIST + 'lib'));

});

gulp.task('clean', function(done) {
    del(['dist'], done);
});
gulp.task('tsc', ['css', 'html', 'lib', 'typescript']);
