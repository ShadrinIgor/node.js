var gulp = require('gulp');
var util = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task( 'clear js', function(){
    return gulp.src( 'public/js', {read:false} )
        .pipe( clean() );
});

gulp.task( 'clear css', function(){
    return gulp.src( 'public/css', {read:false} )
        .pipe( clean() );
});

gulp.task( 'concat js', function(){
    return gulp.src( 'public_source/js/*.js' )
        .pipe( concat('main.js') )
        .pipe( uglify() )
        .pipe( gulp.dest('public/js') )
});

gulp.task( 'concat css', function(){
    return gulp.src( 'public_source/css/*.css' )
        .pipe( concat('style.css') )
//        .pipe( uglify() )
        .pipe( gulp.dest('public/css') )
});