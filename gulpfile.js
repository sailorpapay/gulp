'use strict';
var gulp = require('gulp'),
    watch = require('gulp-watch'),   
   
    
    rimraf = require('rimraf'),    
   
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    
    pump = require('pump');
    
var path = {
    build: {
        js: 'build/js/',
        css: 'build/css/'

    },
    src: {
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.css'
    },
    watch: {
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.css'
    },
    clean: './build'
};

gulp.task('js:build', function(cb) {
    var options = {
        compress: {
            drop_console: true
        },
        warnings: true
    };
    pump([
            gulp.src(path.src.js),            
            uglify(options),
            gulp.dest(path.build.js),

        ],
        cb
    );

});


gulp.task('style:build', function() {
    gulp.src(path.src.style)          
        .pipe(csso())
        .pipe(gulp.dest(path.build.css))        
});



gulp.task('build', [    
    'js:build',
    'style:build'    
]);

gulp.task('watch', function() {
    
    watch([path.watch.style], function(event, cb) {
            gulp.start('style:build');

    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });  
});


gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});
gulp.task('default', ['build', 'watch']);