'use strict';

angular
  .module('app.settings', [])
  .config(function ($stateProvider) {
    var tempPrefix ='apps/settings/views/';

    $stateProvider
      .state('onboard', {
        url: '/settings/onboard',
        abstract: 'true',
        template: '<ui-view/>'
      })
      .state('onboard.name', {
        url: '/name',
        templateUrl: tempPrefix + 'onboardName.html',
        data: {
          pageTitle: 'Onboarding - Name'
        }
      })
      .state('onboard.address', {
        url: '/address',
        templateUrl: tempPrefix + 'onboardAddress.html',
        data: {
          pageTitle: 'Onboarding - Address'
        }
      });
  });
