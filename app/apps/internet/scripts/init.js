'use strict';

angular
  .module('app.internet', [])
  .config(function ($stateProvider) {
    var tempPrefix = 'apps/internet/views/';

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
        templateUrl: tempPrefix + 'recipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('app.internet.payment', {
        url: '/payment',
        templateUrl: tempPrefix + 'payment.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      })
      ;
  });
