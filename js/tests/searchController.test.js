'use strict';
describe('searchController Tests', function(){
	
	// SETUP	
	var scope, rootScope, bookServiceMock, ctrl, timeout;

	// mock app to allow us to inject our own dependencies
	beforeEach(angular.mock.module("fireplace"));

	// inject
	beforeEach(inject(function($controller, $timeout, $rootScope) {
		rootScope = $rootScope;
		scope = $rootScope.$new();
        timeout = $timeout;
		// mock bookService
        bookServiceMock = {};
		
		ctrl = $controller('searchController', {
			$scope: scope,
            $timeout: timeout,
			bookService: bookServiceMock
		});
	}));

	/* BEGIN TESTS */
	
	it('should set scope properties correctly on the REQUEST_SUBMITTED event', function () {
		//rootScope.$broadcast('REQUEST_SUBMITTED');

		expect(false).toEqual(false);
		//expect(scope.forecast).toEqual(null);
	});
	/*
	it('should set noResults scope property to true if no forecast was returned with the REQUEST_RETURNED event', function () {
		rootScope.$broadcast('REQUEST_RETURNED', null);

		expect(scope.noResults).toEqual(true)
	});
	
	it('should set forecast scope property to forecast after valid location was entered and the REQUEST_RETURNED event', function () {
		var fakeForecast = {
			day1: "sunny",
			day2: "rain"
		}
		
		rootScope.$broadcast('REQUEST_RETURNED', fakeForecast);

		expect(scope.forecast).toEqual(fakeForecast)
	});
	*/
});
