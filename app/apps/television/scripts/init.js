'use strict';

angular
  .module('app.television', [])
  .config(function ($stateProvider) {
    var tempPrefix = 'apps/television/views/';

    $stateProvider
      .state('television', {
        url: '/television',
        abstract: 'true',
        template: '<ui-view/>'
      })
      .state('television.service', {
        url: '/service',
        templateUrl: tempPrefix + 'televisionDetails.html',
        data: {
          pageTitle: 'Choose Service'
        }
      })
      .state('television.recipient', {
        url: '/recipient',
        templateUrl: tempPrefix + 'televisionRecipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      .state('television.confirm', {
        url: '/confirm',
        templateUrl: tempPrefix + 'televisionConfirm.html',
        data: {
          pageTitle: 'Confirm Payment'
        }
      })
      ;
  });
