'use strict';

angular
  .module('app.valet')
  .controller('ValetCtrl', function ($scope, $state, $modal, Transaction) {
    if ($state.current.name !== 'app.valet.details') {
      $state.transitionTo('app.valet.details');
    }

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

    $scope.details = {
      recipient: {},
      preferredContactMethod: 'WAP',
      preferredContactDetails: ''
    };

    $scope.details.serviceFee = 0;
    $scope.detailsState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;

    var validateDetails = function () {
      $scope.errors = [];

      if (!$scope.details.description) {
        $scope.errors.push('Please enter a description');
        return false;
      }

      if (!$scope.details.preferredContactDetails) {
        switch ($scope.details.preferredContactMethod) {
          case 'WAP':
            $scope.errors.push('Please enter your WhatsApp number in the contact details field.');
            break;
          case 'PHON':
            $scope.errors.push('Please enter your phone number in the contact details field.');
            break;
          case 'SMS':
            $scope.errors.push('Please enter your SMS number in the contact details field.');
            break;
          case 'MAIL':
            $scope.errors.push('Please enter your email in the contact details field.');
            break;
        }
        return false;
      }

      return true;
    };

    var validateRecipient = function () {
      $scope.errors = [];

      if (!$scope.details.recipient.firstName || !$scope.details.recipient.lastName) {
        $scope.errors.push('Please enter first and last name of the recipient');
        return false;
      }

      if (!$scope.details.recipient.phoneNumber || $scope.details.recipient.phoneNumber.length < 10) {
        $scope.errors.push('Please enter a valid phone number');
        return false;
      }

      return true;
    };

    $scope.setDetails = function () {
      if (validateDetails()) {
        $scope.recipientState = true;
        $state.transitionTo('app.valet.recipient');
      }
    };

    $scope.makeTransaction = function () {
      if (validateRecipient()) {
        Transaction.addValet($scope.details).then(function (response) {
          $scope.details.transactionId = response.transactionId;
          $modal.open({
            templateUrl: 'apps/valet/views/successModal.html',
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
      }
    };

    $scope.isPhoneContactMethod = function () {
      return $scope.details.preferredContactMethod in ['SMS', 'WAP', 'PHON'];
    };

  });
