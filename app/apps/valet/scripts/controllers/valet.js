'use strict';

angular
  .module('app.valet')
  .controller('ValetCtrl', function ($scope, $state, $modal, Transaction) {
    if ($state.current.name !== 'app.valet.details') {
      $state.transitionTo('app.valet.details');
    }

    $scope.details = {
      recipient: {},
      preferredContactMethod: 'WAP'
    };

    $scope.details.serviceFee = 0;
    $scope.detailsState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;

    $scope.setDetails = function () {
      $scope.recipientState = true;
      $state.transitionTo('app.valet.recipient');
    };

    $scope.makeTransaction = function () {
      Transaction.addValet($scope.details).then(function (response) {
        $scope.details.transactionId = response.transactionId;
        $modal.open({
          templateUrl: 'apps/valet/views/successModal.html',
          controller: 'ModalCtrl'
        });
      }, function (error) {
        if (error.detail && error.detail == '2') {
          $modal.open({
            templateUrl: 'apps/transaction/views/incompleteProfileModal.html',
            controller: 'ModalCtrl'
          });
        }
      });
    };

  });
