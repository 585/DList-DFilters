'use strict';

var gulp = require('gulp'),
concat = require('gulp-concat'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
ngAnnotate = require('gulp-ng-annotate'),
templateCache = require('gulp-angular-templatecache');

gulp.task('js-fef', ['templates'], function(){
    return gulp.src(['app.js', 'templates.js', 'main.controller.js', 'utils/*.js', 'actions/*.js', 'filters/*.js', 'list/*.js'])
    .pipe(concat('dList.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('dList.min.js'))
    .pipe(ngAnnotate({
        add: true,
        single_quotes: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('templates', function () {
    return gulp.src(['actions/partials/*.html', 'filters/partials/*.html', 'list/partials/*.html'])
    .pipe(templateCache('templates.js', {
        module: 'd'
    }))
    .pipe(gulp.dest(''));
});

gulp.task('min', ['templates'], function() {
    return gulp.src(['app.js', 'templates.js', 'utils/*.js', 'actions/*.js', 'filters/*.js', 'list/*.js'])
    .pipe(concat('dList.js'))
    .pipe(rename('d-list.min.js'))
    .pipe(ngAnnotate({
        add: true,
        single_quotes: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js-fef', 'min'], function(){});
