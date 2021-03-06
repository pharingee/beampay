'use strict';

angular
  .module('app.internet', [])
  .config(function ($stateProvider, $urlMatcherFactoryProvider) {
    var tempPrefix = 'apps/internet/views/';
    var transactionPrefix = 'apps/transaction/views/';
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('app.internet', {
        url: '^/internet',
        templateUrl: tempPrefix + 'layouts/internet.html'
      })
      .state('app.internet.choose', {
        url: '/choose',
        templateUrl: tempPrefix + 'choose.html',
        data: {
          pageTitle: 'Choose Service'
        }
      })
      .state('app.internet.recipient', {
        url: '/recipient',
        templateUrl: transactionPrefix + 'recipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('app.internet.payment', {
        url: '/payment',
        templateUrl: transactionPrefix + 'payment.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      })
      ;
  });
