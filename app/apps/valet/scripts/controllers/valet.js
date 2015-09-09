'use strict';

angular
  .module('app.valet')
  .controller('ValetCtrl', function ($scope, $state, Transaction, TransactionUtil, Error, SettingsUtil) {
    if ($state.current.name !== 'app.valet.details') {
      $state.transitionTo('app.valet.details');
    }

    var validateDetails = function () {
      $scope.errors = {};

      if (!$scope.details.description) {
        $scope.errors.description = 'Please enter a description';
        return false;
      }

      if (!$scope.details.preferredContactDetails) {
        switch ($scope.details.preferredContactMethod) {
          case $scope.whatsAppMethod:
            $scope.errors.preferredContactMethod = 'Please enter your WhatsApp number in the contact details field.';
            break;
          case $scope.phoneMethod:
            $scope.errors.preferredContactMethod = 'Please enter your phone number in the contact details field.';
            break;
          case $scope.smsMethod:
            $scope.errors.preferredContactMethod = 'Please enter your SMS number in the contact details field.';
            break;
          case $scope.emailMethod:
            $scope.errors.preferredContactMethod = 'Please enter your email in the contact details field.';
            break;
        }
        return false;
      }

      return true;
    };

    $scope.whatsAppMethod = 'WAP';
    $scope.smsMethod = 'SMS';
    $scope.phoneMethod = 'PHON';
    $scope.emailMethod = 'MAIL';

    $scope.details = {
      recipient: {},
      preferredContactMethod: $scope.whatsAppMethod,
      preferredContactDetails: ''
    };

    $scope.details.serviceFee = 0;
    $scope.detailsState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;
    $scope.transactionType = 'VALET';

    Transaction.getProfile().then(function (response) {
      $scope.details.preferredContactMethod = response.profile.preferredContactMethod;
      $scope.details.preferredContactDetails = response.profile.preferredContactDetails;

      if (!response.profile.informationComplete) {
        Error.incompleteModal();
      }
    }, function () {});

    $scope.setDetails = function () {
      if (validateDetails()) {
        $scope.recipientState = true;
        $state.transitionTo('app.valet.recipient');
      }
    };

    $scope.addRecipient = function () {
      $scope.errors = TransactionUtil.validateRecipient($scope.details);
      if ($.isEmptyObject($scope.errors)){
        $scope.laddaAddTxn = true;
        Transaction.addValet($scope.details).then(function (response) {
          $scope.laddaAddTxn = false;
          $scope.details.transactionId = response.transactionId;
          $scope.details.referenceNumber = response.referenceNumber;
          TransactionUtil.successModal($scope.details.referenceNumber, $scope.details.transactionId, $scope.transactionType, 'apps/valet/views/successModal.html');
        }, function (error) {
          $scope.laddaAddTxn = false;
          $scope.errors = Error.transaction(error.data, error.status);
        });
      }
    };

    $scope.$watch('details.preferredContactMethod', function (newValue) {
      SettingsUtil.changePrefContactDetails(newValue);
    });
  });
