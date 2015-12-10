import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

var rename = require("gulp-rename");
let del: any = require('del');

let tsProject : any = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

@Gulpclass()
export class Gulpfile {

    dist : string = 'dist/';

    @Task()
    clean(cb: Function) {
        return del([this.dist], cb);
    }

    @Task()
    lib() {
        return gulp.src([
            'node_modules/es6-shim/es6-shim.js',
            'node_modules/systemjs/dist/system.js',
            'node_modules/angular2/bundles/angular2.dev.js'])
            .pipe(gulp.dest(this.dist + 'lib'));
    }

    @Task()
    typescript() {
        var tsResult = tsProject.src()
            .pipe(ts(tsProject));

        return tsResult.js
            .pipe(gulp.dest(this.dist));
    }

    @Task()
    copyFiles() {
        return gulp
            .src(['**/*.css', '**/*.html'],{base: 'src'})
            .pipe(gulp.dest(this.dist));
    }

    @SequenceTask()
    build() {
        return ['copyFiles', 'lib', 'typescript'];
    }

}