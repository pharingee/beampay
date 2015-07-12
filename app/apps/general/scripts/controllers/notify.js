'use strict';

angular.module('app.general')
  .controller('NotifyCtrl', function ($scope, $modal, ROOT_URL, FACEBOOK_CLIENT_ID) {

    $scope.baseUrl = ROOT_URL;
    $scope.appId = FACEBOOK_CLIENT_ID;

    $scope.open = function () {
      $modal.open({
        templateUrl: 'apps/general/views/landing/modals/_email.html',
        controller: 'ModalCtrl'
      });
    };

  });
