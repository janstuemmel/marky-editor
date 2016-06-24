var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename');
var ghPages = require('gulp-gh-pages');

var KarmaServer = require('karma').Server;

var TEST_BROWSERS = ((process.env.TEST_BROWSERS || '').replace(/^\s+|\s+$/, '') || 'PhantomJS').split(/\s*,\s*/g);

function Karma(singleRun) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: singleRun,
        browsers: TEST_BROWSERS
    }).start();
}

gulp.task('test', function() {
    Karma(true);
})

gulp.task('test-auto', function() {
    Karma(false);
});

// DIST

var build = 'build/';
var dest = build + 'marky/';

function bundle() {
  return browserify('index.js', {
      standalone: 'Marky'
    })
    .bundle()
    .pipe(source('marky.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest));
}

gulp.task('assets', function() {

  // optional theme css
  gulp.src('node_modules/codemirror/theme/*.css')
    .pipe(gulp.dest(dest + 'theme'));

  // required css
  gulp.src([
    'node_modules/codemirror/lib/codemirror.css',
    'node_modules/codemirror/addon/scroll/simplescrollbars.css',
    'assets/css/main.css'
  ])
  .pipe(concatCss('marky.css'))
  .pipe(gulp.dest(dest))

  // example index
  gulp.src('example.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest(build));

});

gulp.task('bundle', bundle);
gulp.task('build', [ 'assets', 'bundle' ]);

gulp.task('watch', function() {
  gulp.watch(['./assets/**/*', './example.html', './src/**/*.js'], [ 'build' ])
});

gulp.task('gh-pages', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('default', [ 'test' ]);