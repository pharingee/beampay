'use strict';

angular
  .module('app.airtime', [])
  .config(function ($stateProvider) {
    var tempPrefix = 'apps/airtime/views/';
    var transactionPrefix = 'apps/transaction/views/';

    $stateProvider
      .state('app.airtime', {
        url: '^/airtime',
        templateUrl: tempPrefix + 'layouts/airtime.html'
      })
      .state('app.airtime.choose', {
        url: '/choose',
        templateUrl: tempPrefix + 'choose.html',
        data: {
          pageTitle: 'Choose Service'
        }
      })
      .state('app.airtime.recipient', {
        url: '/recipient',
        templateUrl: transactionPrefix + 'recipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('app.airtime.payment', {
        url: '/payment',
        templateUrl: transactionPrefix + 'payment.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      })
      ;
  });
