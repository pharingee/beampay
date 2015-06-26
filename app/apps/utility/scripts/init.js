'use strict';

angular
  .module('app.utility', [])
  .config(function ($stateProvider) {
    var tempPrefix = 'apps/utility/views/';

    $stateProvider
      .state('app.utility', {
        url: '^/utility',
        abstract:'true',
        template: '<ui-view/>',
      })
      .state('app.utility.choose', {
        url: '/choose',
        templateUrl: tempPrefix + 'choose.html',
        data: {
          pageTitle: 'Pay for a Utility'
        }
      })
      .state('app.utility.rec', {
        url: '/rec',
        templateUrl: tempPrefix + 'rec.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('app.utility.pay', {
        url: '/pay',
        templateUrl: tempPrefix + 'pay.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      });
  });

