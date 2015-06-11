'use strict';

angular
  .module('app')
  .controller('HeaderCtrl', function ($scope, $location) {

	$scope.signup= function () {
		$location.path('/auth/signup/');
	};

	$scope.signin = function () {
		$location.path('/auth/signin/');
	};
});