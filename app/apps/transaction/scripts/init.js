'use strict';

angular
  .module('app.transaction', [])
  .config(function ($stateProvider) {
  	var tempPrefix = 'apps/transaction/views/';

  	$stateProvider
  	  .state('app.transaction', {
  	  	url: '^/transactions',
  	  	templateUrl: tempPrefix + 'layouts/transactions_header.html'
  	  })

  });
