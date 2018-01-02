// Karma configuration

const webpackConfig = require('../../build/webpack.test.conf');

module.exports = config => {
  config.set({
    // browsers: ['PhantomJS'],
    browsers: ['Chrome','PhantomJS'],
    // 'mocha', 'sinon-chai',
    // frameworks: ['jasmine'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage', 'progress'],
    files: ['./file.js'],
    // 预处理器 karma-webpack
    preprocessors: {
      './file.js': ['webpack', 'sourcemap', 'coverage']
    },

    webpack: webpackConfig,

    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-chai',
      'karma-sinon-chai',
      // 'karma-jasmine',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-coverage'
    ],
    // 测试覆盖率报告
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },

    port: 9876,

    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    concurrency: Infinity
  })
}
