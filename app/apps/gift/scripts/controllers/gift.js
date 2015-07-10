'use strict';

angular
  .module('app.gift')
  .controller('GiftCtrl', function ($scope, $state, $modal, Transaction) {
    if ($state.current.name !== 'app.gift.details') {
      $state.transitionTo('app.gift.details');
    }

    $scope.details = {
      recipient: {},
      preferredContactMethod: 'WAP'
    };

    $scope.details.serviceFee = 0;
    $scope.detailsState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;

    Transaction.getProfile().then(function (response) {
      $scope.details.preferredContactMethod = response.profile.preferredContactMethod;
      $scope.details.preferredContactDetails = response.profile.preferredContactDetails;

      if (!response.profile.informationComplete) {
        $modal.open({
          templateUrl: 'apps/transaction/views/incompleteProfileModal.html',
          controller: 'IncompleteModalCtrl'
        });
      }
    }, function () {});

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
      if (!$scope.details.deliveryAddress) {
        delete $scope.details.deliveryAddress;
      }

      if (!$scope.details.deliveryTime) {
        delete $scope.details.deliveryTime;
      }

      if (!$scope.details.recipient.email) {
        delete $scope.details.recipient.email;
      }

      Transaction.addGift($scope.details).then(function (response) {
        $scope.details.transactionId = response.transactionId;
        $modal.open({
          templateUrl: 'apps/gift/views/successModal.html',
          controller: 'ModalCtrl'
        });
      }, function (error) {
        if (error.detail && error.detail === '2') {
          $modal.open({
            templateUrl: 'apps/transaction/views/incompleteProfileModal.html',
            controller: 'IncompleteModalCtrl'
          });
        }
      });
    };

  });
