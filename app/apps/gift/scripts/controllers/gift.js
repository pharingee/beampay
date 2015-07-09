'use strict';

angular
  .module('app.gift')
  .controller('GiftCtrl', function ($scope, $state, $modal, Transaction) {
    if ($state.current.name !== 'app.gift.details') {
      $state.transitionTo('app.gift.details');
    }

    $scope.details = {
      recipient: {}
    };

    $scope.details.serviceFee = 0;
    $scope.detailsState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;

    $scope.setDetails = function () {
      $scope.recipientState = true;
      $state.transitionTo('app.gift.recipient');
    };

    $scope.beforeRender = function ($view, $dates) {
      var date = new Date();

      for (var i = 0; i < $dates.length; i++) {
        if ($dates[i].localDateValue() < date) {
          $dates[i].selectable = false;
        }
      }
    };

    $scope.makeTransaction = function () {
      Transaction.addGift($scope.details).then(function (response) {
        $scope.details.transactionId = response.transactionId;
        $modal.open({
          templateUrl: 'apps/transaction/views/successModal.html',
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
