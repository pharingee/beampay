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
      .state('app.television.service', {
        url: '/service',
        templateUrl: tempPrefix + 'televisionDetails.html',
        data: {
          pageTitle: 'Choose Service'
        }
      })
      .state('app.television.recipient', {
        url: '/recipient',
        templateUrl: tempPrefix + 'televisionRecipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('app.television.confirm', {
        url: '/confirm',
        templateUrl: tempPrefix + 'televisionConfirm.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      })
      ;
  });
