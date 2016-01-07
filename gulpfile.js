'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon');

gulp.task('default', ['lint', 'nodemon']);

gulp.task('nodemon', function(cb) {
    var started = false;
    return nodemon({
        script: 'app.js',
        tasks: ['lint']
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('lint', function() {
    return gulp.src(['./controllers/*.js', './models/*.js', './routes/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
