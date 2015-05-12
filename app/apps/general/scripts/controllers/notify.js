'use strict';

angular.module('app.general')
  .controller('NotifyCtrl', function ($scope, $modal) {

    $scope.open = function () {
      $modal.open({
        templateUrl: 'apps/general/views/landing/modals/_email.html',
        controller: 'ModalCtrl'
      });
    };

  });
