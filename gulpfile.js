// Modules
const gulp     = require('gulp'),

	  // HTML
	  includes = require('gulp-file-include'),
	  htmlmin  = require('gulp-html-minifier'),

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

	  // Code Quality
	  jshint   = require('gulp-jshint'),    // http://bit.ly/2Dvq9P0
	  htmllint = require('gulp-htmllint'),  // http://bit.ly/2ph586q
	  scsslint = require('gulp-scss-lint'), // http://bit.ly/1JPTmAG

	  // Documentation
      sassdoc  = require('sassdoc'),

      // Utils
      watch    = require('gulp-watch'),
      notify   = require('gulp-notify'),
      plumber  = require('gulp-plumber'),
      sync     = require('browser-sync');

const env = {
    source:    './source/',
    build:     './build/'
};
const src = {
    css:    'assets/css/',
    js:     'assets/js/',
    svg:    'assets/svg/',
    images: 'assets/images/',
    fonts:  'assets/fonts/',
    videos: 'assets/videos/'
};
const errors = {
	title:   'Ooops...',
	message: '<%= error.message %>'
};

// Tasks
gulp.task('sync', () =>
    sync({
        server: {
            baseDir: env.build
        }
    })
);

gulp.task('reload', () =>
    sync.reload()
);

gulp.task('js', () =>
    gulp.src([
			env.source + src.js + 'libraries/jquery-3.2.0.js',
			env.source + src.js + 'plugins/*.js',
			env.source + src.js + 'source/app-*.js'
		])
        .pipe(plumber({
            errorHandler: notify.onError(errors)
        }))
        .pipe(concat('application.js'))
        .pipe(maps.init())
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(gulp.dest(env.build + src.js))
        .pipe(sync.stream())
);

gulp.task('css', () =>
    gulp.src(env.source + src.css + '**/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError(errors)
        }))
        .pipe(sass({
            outputStyle:    'expanded', //nested, compact, expanded, compressed
            sourceComments: 'map',
            sourcemaps:     true,
            includePaths:   [bourbon]
        }).on('error', sass.logError))
        .pipe(gulp.dest(env.build + src.css))
        .pipe(sync.stream())
);

gulp.task('html', () =>
	gulp.src([env.source + '*.html'])
	.pipe(plumber({
		errorHandler: notify.onError(errors)
	}))
	.pipe(includes())
	.pipe(htmlmin({
		collapseWhitespace: true
	}))
	.pipe(gulp.dest(env.build))
	.on('end', function() {
		sync.reload()
	})
);

gulp.task('svg', () =>
    gulp.src(env.source + src.svg + '*.svg')
        .pipe(svg())
        .pipe(gulp.dest(env.source + src.images))
);

gulp.task('sprites', function () {
    let spriteData = gulp.src(env.source + src.images + 'sprites/*.png').pipe(sprite({
        imgName:   '../images/sprites.png',
        cssFormat: 'css',
        cssName:   '_sprites.scss'
    }));

    let imgStream = spriteData.img.pipe(gulp.dest(env.source + src.images));
    let cssStream = spriteData.css.pipe(gulp.dest(env.source + src.css + 'components/'));
});

gulp.task('images', ['sprites', 'svg'], () =>
    gulp.src([env.source + src.images + '*.{jpg,png,gif,svg}', '!./assets/images/sprites/'])
        .pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		], {
			verbose: true
		}))
        .pipe(gulp.dest(env.build + src.images))
);

gulp.task('fonts', () =>
    gulp.src([env.source + src.fonts + '*.{eot,svg,ttf,woff,woff2}'], {base: ''})
		.pipe(plumber({
			errorHandler: notify.onError(errors)
		}))
        .pipe(gulp.dest(env.build + src.fonts))
);

gulp.task('sass-docs', () =>
    gulp.src(env.source + src.css + '**/*.scss')
    .pipe(sassdoc())
);

gulp.task('js-lint', () =>
    gulp.src([env.source + src.js + 'source/app-*.js'])
        .pipe(plumber({
            errorHandler: notify.onError(errors)
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
);

gulp.task('html-lint', () =>
    gulp.src([env.source + './*.html'])
        .pipe(plumber({
            errorHandler: notify.onError(errors)
        }))
        .pipe(htmllint())
);

gulp.task('css-lint', () =>
	gulp.src([env.source + src.css + 'components/*.scss', env.source + src.css + 'objects/*.scss'])
        .pipe(plumber({
            errorHandler: notify.onError(errors)
        }))
        .pipe(scsslint({
			config: '.scsslintrc'
		}))
		.pipe(scsslint.failReporter())
);

gulp.task('validate', ['js-hint', 'html-lint', 'css-lint']);

gulp.task('assets',   ['sprites', 'svg', 'fonts', 'images']);

gulp.task('docs',     ['sass-docs']);

gulp.task('watch', ['html', 'js', 'css', 'assets', 'sync'], function(){
    gulp.watch(env.source + src.css + '**/*.scss', ['css'])
    gulp.watch([env.source + src.js + '**/*.js', '!./assets/js/application.js'], ['js'])
    gulp.watch(env.source + '**/*.html', ['html'])
});

gulp.task('default',  ['watch']);