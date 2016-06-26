var path = require('path');

var basePath = './';
var absoluteBasePath = path.resolve(path.join(__dirname, basePath));

module.exports = function(karma) {
  karma.set({

    basePath: basePath,

    frameworks: [
      'browserify',
      'mocha',
      'chai',
    ],

    files: [
      'test/**/*Spec.js',
      // katex fonts to prevent warnings
      { pattern: 'node_modules/katex/dist/fonts/*', included: false, served: true, watched: false, nocache: true }
    ],

    preprocessors: {
      'test/**/*Spec.js': [ 'browserify' ]
    },

    proxies: {
      // expose node_modules
      '/node_modules/': '/base/node_modules/'
    },

    reporters: [ 'spec' ],

    browsers: [ 'PhantomJS' ],

    browserNoActivityTimeout: 30000,

    singleRun: false,

    autoWatch: true,

    browserify: {
     debug: true,
     paths: [ absoluteBasePath ],
     transform: [
       [ 'browserify-css' ],
       [ 'stringify', { global: true, extensions: [ '.md', '.markdown' ] }] ,
     ]
    }

  });
}
