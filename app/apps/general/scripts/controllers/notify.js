'use strict';

angular.module('app.general')
  .controller('NotifyCtrl', function ($scope, $modal, ROOT_URL) {

    $scope.baseUrl = ROOT_URL;

    $scope.open = function () {
      $modal.open({
        templateUrl: 'apps/general/views/landing/modals/_email.html',
        controller: 'ModalCtrl'
      });
    };

  });
