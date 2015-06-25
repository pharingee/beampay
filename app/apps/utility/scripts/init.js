'use strict';

angular
  .module('app.utility', [])
  .config(function ($stateProvider) {
    var tempPrefix = 'apps/utility/views/';

    $stateProvider
      .state('utility', {
        url: '/utility',
        abstract:'true',
        template: '<ui-view/>',
      })
      .state('utility.choose', {
        url: '/choose',
        templateUrl: tempPrefix + 'choose.html',
        data: {
          pageTitle: 'Pay for a Utility'
        }
      })
      .state('utility.rec', {
        url: '/rec',
        templateUrl: tempPrefix + 'rec.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('utility.pay', {
        url: '/pay',
        templateUrl: tempPrefix + 'pay.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      });
  });

