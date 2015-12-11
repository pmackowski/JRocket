module.exports = function (gulp, plugins) {
    return function () {
        var ts = plugins.typescript;
        var tsProject = ts.createProject('tsconfig.json', {
            typescript: require('typescript')
        });

        var tsResult = tsProject.src()
            .pipe(ts(tsProject));

        return tsResult.js.pipe(gulp.dest('dist/'));
    };
};