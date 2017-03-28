var gulp = require ('gulp');
var nodemon = require ('gulp-nodemon');
var livereload = require ('gulp-livereload');

gulp.task ('server', () => {
	livereload.listen();

	nodemon ({
		script: './app.js',
		ext: 'js'
	}).on ('restart', () => {
		gulp.src ('./app.js')
			.pipe (livereload());
	});
	
});