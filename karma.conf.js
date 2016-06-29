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
      'sinon-chai'
    ],

    files: [
      'test/**/*Spec.js'
    ],

    preprocessors: {
      'test/**/*Spec.js': [ 'browserify' ]
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
