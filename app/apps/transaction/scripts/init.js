'use strict';

angular
  .module('app.transaction', [])
  .config(function ($stateProvider) {
  	var tempPrefix = 'apps/transaction/views/';

  	$stateProvider
  	  .state('app.transaction', {
  	  	url: '^/transactions',
  	  	templateUrl: tempPrefix + 'layouts/transactions.html'
  	  })
      .state('app.transaction.list', {
        url: '/',
        templateUrl: tempPrefix + 'transactionsList.html'
      })
      .state('app.transaction.details', {
        url: '/:transactionId/:transactionType',
        templateUrl: tempPrefix + 'transactionDetails.html'
      });

  });
