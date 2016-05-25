import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import nodemon from 'gulp-nodemon';
import uglify from 'gulp-uglify';

gulp.task('server', () => {
  gulp.src(['server/**/*'])
		.pipe(plumber())
		.pipe(babel())
    .pipe(uglify())
		.pipe(gulp.dest('dist/server'));
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'dist/server/server.js',
    ignore: ['/test/**/*'],
    ext: 'js',
  });
});

gulp.task('watch', () => {
  gulp.watch(['./server/**/*'], ['server']);
});

gulp.task('default', ['server', 'watch', 'nodemon']);
gulp.task('build', ['server']);
