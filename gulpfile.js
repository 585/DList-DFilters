'use strict';

var gulp = require('gulp'),
concat = require('gulp-concat'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
ngAnnotate = require('gulp-ng-annotate'),
templateCache = require('gulp-angular-templatecache'),
gulpsync = require('gulp-sync')(gulp),
watch = require('gulp-watch');

gulp.task('js-fef', function(){
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

gulp.task('min', function() {
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

gulp.task('templatesF', function() {
    return gulp.src([
        'actions/partials/*.html',
        'actions/partials/foundation/*.html',
        'filters/partials/*.html',
        'filters/partials/foundation/*.html',
        'list/partials/*.html',
        'list/partials/foundation/*.html'
        ])
    .pipe(templateCache('templates.js', {
        module: 'd'
    }))
    .pipe(gulp.dest(''));
});

gulp.task('templatesB', function() {
    return gulp.src(['actions/partials/*.html', 'actions/partials/bootstrap/*.html',
        'filters/partials/*.html', 'filters/partials/bootstrap/*.html',
        'list/partials/*.html', 'list/partials/bootstrap/*.html'])
    .pipe(templateCache('templates.js', {
        module: 'd'
    }))
    .pipe(gulp.dest(''));
});

gulp.task('watch', function () {
    gulp.watch(['actions/*.js', 'filters/*.js', 'list/*.js'], ['minb']);
});

gulp.task('default', ['watch']);
gulp.task('minf', gulpsync.sync(['templatesF', 'js-fef', 'min']));
gulp.task('minb', gulpsync.sync(['templatesB', 'js-fef', 'min']));
