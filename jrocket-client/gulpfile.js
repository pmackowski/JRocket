var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    del = require('del'),
    url = require('url'),
    proxy = require('proxy-middleware'),
    browserSync = require('browser-sync');

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

var DIST = 'dist/';
var APP_SOURCE = 'src';

gulp.task('lib', function () {
    return gulp.src([
        'node_modules/es6-shim/es6-shim.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/http.js'])
        .pipe(gulp.dest(DIST + 'lib'));

});

gulp.task('clean', function(done) {
    del(['dist'], done);
});

gulp.task('typescript', function () {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest(DIST));
});

gulp.task('typescript-watch', ['typescript'], browserSync.reload);

gulp.task('css', function () {
    return gulp
        .src(APP_SOURCE + '/**/*.css')
        .pipe(gulp.dest(DIST));
});

gulp.task('css-watch', ['css'], browserSync.reload);

gulp.task('html', function () {
    return gulp
        .src(APP_SOURCE + '/**/*.html')
        .pipe(gulp.dest(DIST));
});

gulp.task('html-watch', ['html'], browserSync.reload);

gulp.task('serve', ['lib', 'css', 'html', 'typescript'], function() {
    var proxyOptions = url.parse('http://localhost:4567/');
    proxyOptions.route = '/api';

    browserSync({
        open: true,
        port: 3000,
        server: {
            baseDir: DIST,
            middleware: [proxy(proxyOptions)]
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("src/**/*.ts", ['typescript-watch']);
    gulp.watch("src/**/*.css", ['css-watch']);
    gulp.watch("src/**/*.html", ['html-watch']);

});

// Default Task
gulp.task('default', ['serve']);