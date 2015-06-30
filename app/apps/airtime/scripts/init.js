'use strict';

angular
  .module('app.airtime', [])
  .config(function ($stateProvider) {
    var tempPrefix = 'apps/airtime/views/';

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
        templateUrl: tempPrefix + 'recipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('app.airtime.payment', {
        url: '/payment',
        templateUrl: tempPrefix + 'payment.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      })
      .state('app.airtime.success', {
        url: '/success',
        templateUrl: tempPrefix + 'airtimeSuccess.html',
        data: {
          pageTitle: 'Payment Successful'
        }
      })
      ;
  });
