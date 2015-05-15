var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');
gulp.task('server', function () {

    gulp.src('app/*.js')
        .pipe(react())
        .pipe(gulp.dest('build'));
});
