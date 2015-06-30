'use strict';

angular
  .module('app.utility', [])
  .config(function ($stateProvider) {
    var tempPrefix = 'apps/utility/views/';

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
        templateUrl: tempPrefix + 'recipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('app.utility.payment', {
        url: '/payment',
        templateUrl: tempPrefix + 'payment.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      })
      .state('app.utility.success', {
        url: '/success',
        templateUrl: tempPrefix + 'success.html',
        data: {
          pageTitle: 'Payment Successful'
        }
      })
      ;
  });
