'use strict';

angular
  .module('app.airtime', [])
  .config(function ($stateProvider) {
  	var tempPrefix = 'apps/airtime/views/';

  	$stateProvider
  	  .state('airtime', {
  	  	url: '/airtime',
  	  	templateUrl: tempPrefix + 'airtime.html',
  	  	data: {
  	  	  pageTitle: 'Welcome | Airtime Top ups'
  	  	}
  	  });
  });