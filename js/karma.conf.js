module.exports = function(config) {
	config.set({

		// frameworks to use
		frameworks: ['jasmine'],

		// list of files/patterns to load in the browser
		files: [
			/* external libs */
            'external/angular/angular.js',
            'external/angular/angular-flippy.js',
            'external/angular/angular-enter.js',
            'external/angular/angular-mocks.js',
            'external/angular/angular-route.js',
            'external/angular/angular-ui-bootstrap.js',
			'external/jquery/jquery-2.1.1.min.js',
            'external/lodash/lodash.js',
			/* test bootstrap file */
			'tests/test-harness.js',
			/* app files */
			'app/library/libraryController.js',
			'app/search/searchController.js',
            'app/wishlist/wishlistController.js',
			'app/shared/bookService.js',
			/* test files */
			'tests/**/*.test.js',
		],

		// list of files to exclude
		exclude: [],

		// test results reporter to use
		reporters: ['progress'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		logLevel: config.DEBUG,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// run tests in these browsers, (this is overridden in gruntfile!)
		browsers: ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};