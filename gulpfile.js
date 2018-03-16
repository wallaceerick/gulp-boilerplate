// Modules
const gulp     = require('gulp'),

      // CSS
      sass     = require('gulp-sass'),
      maps     = require('gulp-sourcemaps'),
      bourbon  = require('bourbon').includePaths,

      // Images and SVG
      imagemin = require('gulp-imagemin'),
      sprite   = require('gulp.spritesmith'),
      svg      = require('gulp-svgstore'),

      // JS
      concat   = require('gulp-concat'),
	  uglify   = require('gulp-uglify'),

	  // Validator
	  jshint   = require('gulp-jshint'),   // http://bit.ly/2Dvq9P0
	  htmlhint = require('gulp-htmlhint'), // http://bit.ly/206FrQB
	  htmllint = require('gulp-htmllint'),

	  // Documentation
      sassdoc  = require('sassdoc'),

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
const errors = {
	title:   'Ooops...',
	message: '<%= error.message %>'
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
            errorHandler: notify.onError(errors)
        }))
        .pipe(concat('application.js'))
        .pipe(maps.init())
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(gulp.dest(src.js))
        .pipe(sync.stream())
);

gulp.task('js-hint', () =>
    gulp.src([src.js + 'source/app-*.js'])
        .pipe(plumber({
            errorHandler: notify.onError(errors)
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
);

gulp.task('html-hint', () =>
    gulp.src(['./*.html'])
        .pipe(plumber({
            errorHandler: notify.onError(errors)
        }))
        .pipe(htmlhint())
		.pipe(htmlhint.reporter(''))
		// .pipe(htmlhint.failReporter())
);

gulp.task('html-lint', () =>
    gulp.src(['./*.html'])
        .pipe(plumber({
            errorHandler: notify.onError(errors)
        }))
        .pipe(htmllint())
		.pipe(htmlhint.failOnError())
);

gulp.task('css', () =>
    gulp.src(src.css + '**/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError(errors)
        }))
        .pipe(sass({
            outputStyle:    'expanded', //nested, compact, expanded, compressed
            sourceComments: 'map',
            sourcemaps:     true,
            includePaths:   [bourbon]
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

gulp.task('sass-docs', () =>
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

gulp.task('validate', ['js-hint', 'html-hint']);

gulp.task('docs',    ['sass-docs']);

gulp.task('default', ['watch']);