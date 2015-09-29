'use strict';

angular
  .module('app.utility', [])
  .config(function ($stateProvider, $urlMatcherFactoryProvider) {
    var tempPrefix = 'apps/utility/views/';
    var transactionPrefix = 'apps/transaction/views/';
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('app.utility', {
        url: '^/utility',
        templateUrl: tempPrefix + 'layouts/utility.html'
      })
      .state('app.utility.choose', {
        url: '/choose',
        templateUrl: tempPrefix + 'choose.html',
        data: {
          pageTitle: 'Choose Service'
        }
      })
      .state('app.utility.recipient', {
        url: '/recipient',
        templateUrl: transactionPrefix + 'recipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('app.utility.payment', {
        url: '/payment',
        templateUrl: transactionPrefix + 'payment.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      })
      ;
  });
