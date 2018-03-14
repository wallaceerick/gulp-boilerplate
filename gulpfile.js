// Modules
const gulp     = require('gulp'),

      // CSS
      sass     = require('gulp-sass'),
      maps     = require('gulp-sourcemaps'),
      sassdoc  = require('sassdoc'),
      bourbon  = require('bourbon').includePaths,

      // Images
      imagemin = require('gulp-imagemin'),
      sprite   = require('gulp.spritesmith'),
      svg      = require('gulp-svgstore'),

      // JS
      concat   = require('gulp-concat'),
      hint     = require('gulp-jshint'),
      uglify   = require('gulp-uglify'),

      // Utils
      watch    = require('gulp-watch'),
      notify   = require('gulp-notify'),
      plumber  = require('gulp-plumber'),
      sync     = require('browser-sync');

// Directories
const assets = './assets';
const src = {
    css:    `${assets}/css/`,
    js:     `${assets}/js/`,
    svg:    `${assets}/svg/`,
    images: `${assets}/images/`
};

// Tasks
gulp.task('sync', () =>
    sync({
        server: {
            baseDir: './'
        }
    })
);

gulp.task('reload', () =>
    sync.reload()
);

gulp.task('js', () =>
    gulp.src([src.js + 'libraries/jquery-3.2.0.js', src.js + 'plugins/*.js', src.js + 'source/app-*.js'])
        .pipe(plumber({
            errorHandler: notify.onError({
                title:   'Error on JS',
                message: '<%= error.message %>'
            })
        }))
        .pipe(concat('application.js'))
        .pipe(maps.init())
        .pipe(uglify())  
        .pipe(maps.write('./'))
        .pipe(gulp.dest(src.js))
        .pipe(sync.stream())
);

gulp.task('hint', () =>
    gulp.src([src.js + 'source/app-*.js'])
        .pipe(plumber({
            errorHandler: notify.onError({
                title:   'Ooops...',
                message: '<%= error.message %>'
            })
        }))
        .pipe(hint())
        .pipe(hint.reporter('jshint-stylish'))
);

gulp.task('css', () =>
    gulp.src(src.css + '**/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError({
                title:   'Error on CSS',
                message: '<%= error.message %>'
            })
        }))
        .pipe(sass({
            outputStyle:    'expanded', //nested, compact, expanded, compressed
            sourceComments: 'map',
            sourcemaps:     true,
            includePaths:   [bourbon, neat]
        }).on('error', sass.logError))
        .pipe(gulp.dest(src.css))
        .pipe(sync.stream())
);

gulp.task('images', () =>
    gulp.src(src.images + 'hd/*')
        .pipe(imagemin())
        .pipe(gulp.dest(src.images))
);

gulp.task('svg', () =>
    gulp.src(src.svg + '*.svg')
        .pipe(svg())
        .pipe(gulp.dest(src.images))
);

gulp.task('docs', () =>
    gulp.src(src.css + '**/*.scss')
    .pipe(sassdoc())
);

gulp.task('sprites', function () {
    let spriteData = gulp.src(src.images + 'sprites/*.png').pipe(sprite({
        imgName:   '../images/sprite.png',
        cssFormat: 'css',
        cssName:   '_sprites.scss'
    }));

    let imgStream = spriteData.img.pipe(gulp.dest(src.images));
    let cssStream = spriteData.css.pipe(gulp.dest(src.css + 'components/'));
});

gulp.task('watch', ['sync'], function(){
    gulp.watch(src.css + '**/*.scss', ['css']);
    gulp.watch([src.js + '**/*.js', '!./assets/js/application.js'], ['js']);
    gulp.watch('*.html',              ['css', 'reload']);
});

gulp.task('default', ['watch']);