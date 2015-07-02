'use strict';

angular
  .module('app.television', [])
  .config(function ($stateProvider) {
    var tempPrefix = 'apps/television/views/';

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
        templateUrl: tempPrefix + 'recipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('app.television.payment', {
        url: '/payment',
        templateUrl: tempPrefix + 'payment.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      })
      .state('app.television.success', {
        url: '/success',
        templateUrl: tempPrefix + 'success.html',
        data: {
          pageTitle: 'Payment Successful'
        }
      })
      ;
  });
