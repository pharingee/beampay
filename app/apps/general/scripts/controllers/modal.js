'use strict';

angular
  .module('app.general')
  .controller('ModalCtrl', function ($scope, $modalInstance, Modal, $state) {

    $scope.ok = function () {
      if ($scope.fromName && $scope.fromEmail && $scope.toName && $scope.toEmail) {
        $scope.loading = true;
        Modal.sendEmail($scope.fromName, $scope.fromEmail, $scope.toName, $scope.toEmail)
          .then(function () {
            $scope.loading = false;
            $modalInstance.close();
          }, function (data) {
            $scope.loading = false;
            $scope.err = data;
          });
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
      $state.transitionTo('app');
    };

  });
