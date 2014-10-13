var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_bower_files = require('main-bower-files'),
    gp_filter = require('gulp-filter'),
    gp_minify_css = require('gulp-minify-css'),
    gp_uglify = require('gulp-uglify');

gulp.task('cssbuild', function() {
    gulp.src(['*.png'])
      .pipe(gulp.dest('dist'));
    gulp.src(['vendor/ol.css', 'style.css'])
      .pipe(gp_filter('**/*.css'))
      .pipe(gp_concat('wps-gui.css'))
      .pipe(gulp.dest('dist'))
      .pipe(gp_rename('wps-gui.min.css'))
      .pipe(gp_minify_css())
      .pipe(gulp.dest('dist'));
});

gulp.task('jsbuild', function(){
    gulp.src(gp_bower_files().concat(['mappings/*.js', 'wpsclient.js', 'wpsui.js']))
        .pipe(gp_filter('**/*.js'))
        .pipe(gp_concat('wps-gui.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gp_rename('wps-gui.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['jsbuild', 'cssbuild'], function(){});