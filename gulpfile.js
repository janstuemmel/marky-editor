var gulp = require('gulp');
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
