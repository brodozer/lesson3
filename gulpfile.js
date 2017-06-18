var gulp = require('gulp'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	rigger = require('gulp-rigger'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	cleanCSS = require('gulp-clean-css'),
	watch = require('gulp-watch'),
	server = require('browser-sync'),
	reload = server.reload;

gulp.task('server', function() {
    server.init({
        server: {
            baseDir: "./build"
        },
		startPath: "/html/index.html",
		tunnel: true,
		port: 9000,
		logPrefix: "front_end"
    });
});

gulp.task('css', function () {
    gulp.src('src/style/*.less')
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
	gulp.watch('src/style/*.less', ['css']);
	gulp.watch('src/html/*.html', ['html']);
});

gulp.task('build', ['html', 'css']);	

gulp.task('default', ['build', 'server', 'watch']);	