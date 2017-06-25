var     gulp = require('gulp');
var	less = require('gulp-less');
var	autoprefixer = require('gulp-autoprefixer');
var	rigger = require('gulp-rigger');
var	livereload = require('gulp-livereload');
var	connect = require('gulp-connect');
var	cleanCSS = require('gulp-clean-css');
var	watch = require('gulp-watch');
var	server = require('browser-sync');
var	reload = server.reload;

gulp.task('server', function() {
    server.init({
        server: {
            baseDir: "./build"
        },
	    tunnel: true,
	    port: 9000,
            logPrefix: "front_end"
    });
});

gulp.task('css', function () {
        gulp.src('src/styles/*.less')
    	.pipe(less())
    	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
    	.pipe(gulp.dest('build/css/'))
    	.pipe(reload({stream: true}))
});

gulp.task('html', function() {
	gulp.src('src/html/*.html')
        .pipe(gulp.dest('build/html/'))
        .pipe(reload({stream: true}));
});

gulp.task('watch', function() {
	gulp.watch('src/styles/*.less', ['css']);
	gulp.watch('src/html/*.html', ['html']);
});

gulp.task('build', ['html', 'css']);	

gulp.task('default', ['build', 'server', 'watch']);	
