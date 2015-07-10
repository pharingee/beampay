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
  })
  // .run(function ($state){
  //   $('#incomplete-modal').on('hidden.bs.modal', function (e) {
  //     $state.transactionTo('onboard.name');
  //   });

  //   $('#success-modal').on('hidden.bs.modal', function (e) {
  //     console.log('suceess');
  //     $state.transactionTo('app.transaction.list');
  //   });
  // })
;
