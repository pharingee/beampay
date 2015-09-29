'use strict';

angular
  .module('app.television', [])
  .config(function ($stateProvider, $urlMatcherFactoryProvider) {
    var tempPrefix = 'apps/television/views/';
    var transactionPrefix = 'apps/transaction/views/';
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('app.television', {
        url: '^/television',
        templateUrl: tempPrefix + 'layouts/television.html'
      })
      .state('app.television.choose', {
        url: '/choose',
        templateUrl: tempPrefix + 'choose.html',
        data: {
          pageTitle: 'Choose Service'
        }
      })
      .state('app.television.recipient', {
        url: '/recipient',
        templateUrl: transactionPrefix + 'recipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('app.television.payment', {
        url: '/payment',
        templateUrl: transactionPrefix + 'payment.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      })
      ;
  });
