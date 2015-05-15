var gulp = require('gulp');

gulp.task('watch', ['build'], function() {

  // Watch for changes in frontend js and run the 'javascript' task
  gulp.watch([
  	'app/**/*.js',
  	'app/**/*.jsx'
  ], ['build']);

});