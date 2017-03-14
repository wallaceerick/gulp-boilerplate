// Modules
const gulp     = require('gulp'),   

      // CSS
      sass     = require('gulp-sass'),
      uncss    = require('gulp-uncss'),

      // Images
      imagemin = require('gulp-imagemin'),
      sprite   = require('gulp.spritesmith'),
      svg      = require('gulp-svgstore'),  

      // JS
      concat   = require('gulp-concat'),
      hint     = require('gulp-jshint'),
      uglify   = require('gulp-uglify'), 

      // Utils
      watch    = require('gulp-watch')
      //plumber  = require('gulp-plumber'), // Retorno dos módulos
      sync     = require('browser-sync');

// Directories
const assets = './assets';
const src = {
    css:    `${assets}/css/`,
    js:     `${assets}/js/`,
    svg:    `${assets}/svg/`,
    images: `${assets}/images/`
};

// Task's
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
    gulp.src([src.js + 'jquery-3.1.1.js', src.js + 'app-*.js'])
        .pipe(concat('application.js'))
        .pipe(uglify())
        .pipe(gulp.dest(src.js))
);

gulp.task('hint', () =>
    gulp.src([src.js + 'application.js'])
        .pipe(hint())
        .pipe(hint.reporter('default'))
);

gulp.task('css', () =>
    gulp.src(src.css + '**/*.scss')
        .pipe(sass({
            outputStyle:    'expanded', //nested, compact, expanded, compressed
            sourceComments: 'map',
        }).on('error', sass.logError))
        .pipe(uncss({
            html: ['*.html']
        }))
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

gulp.task('sprites', function () {

      let spriteData = gulp.src(src.images + 'sprites/*.png').pipe(sprite({
        imgName:   '../images/sprite.png',
        cssFormat: 'css',
        cssName:   '_sprite.scss'
      }));

      let imgStream = spriteData.img.pipe(gulp.dest(src.images));
      let cssStream = spriteData.css.pipe(gulp.dest(src.css + 'modules/'));
});

gulp.task('watch', ['sync'], function(){
    gulp.watch(src.css + '**/*.scss', ['css']);
    gulp.watch(src.js + '**/*.js',    ['js']);
    gulp.watch('*.html',              ['css', 'reload']);
});

gulp.task('default', ['css']);
gulp.task('server',  ['sync', 'watch']);
