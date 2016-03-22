var gulp = require('gulp');
var babel = require('gulp-babel');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var path = require('path');


gulp.task('js', function() {
	return gulp.src(['./src/js/**/*.js','./src/js/**/*.jsx'])
		.pipe(changed('dist/js'))
		.pipe(babel({
			presets: ['es2015','react','stage-2']
		}))
		.pipe(gulp.dest('dist/js'));
});
gulp.task('css', ['copy:css'], function() {
	return gulp.src(['./src/styles/**/*.scss'])
		.pipe(changed('dist/styles'))
		.pipe(sass())
		.pipe(gulp.dest('dist/styles'));
});
gulp.task('copy:css', function(){
	return gulp.src(['./src/styles/**', '!./src/styles/**/*.scss'])
		.pipe(changed('dist/styles'))
		.pipe(gulp.dest('dist/styles'));
});
gulp.task('jade', function() {
	return gulp.src(['./src/*.jade'])
		.pipe(changed('dist'))
		.pipe(jade())
		.pipe(gulp.dest('dist'));
});
gulp.task('watch:js', function() {
	return gulp.watch(['./src/js/**/*.js','./src/js/**/*.jsx'], ['js']);
});
gulp.task('watch:css', function() {
	return gulp.watch(['./src/styles/**/*.scss'], ['css']);
});
gulp.task('watch:jade', function() {
	return gulp.watch(['./src/*.jade'], ['jade']);
});
gulp.task('dist', ['js','css','jade']);
gulp.task('default', ['dist']);
