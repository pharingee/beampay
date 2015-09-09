'use strict';

angular
  .module('app.school')
  .controller('SchoolCtrl', function ($scope, $state, Transaction, TransactionUtil, Error, SettingsUtil) {
    if ($state.current.name !== 'app.school.details') {
      $state.transitionTo('app.school.details');
    }

    var validateDetails = function () {
      $scope.errors = {};

      if (!$scope.details.wardName.firstName || !$scope.details.wardName.lastName) {
        $scope.errors.name = 'Please provide both the first and last name of your ward';
        return false;
      }

      if (!$scope.details.school) {
        $scope.errors.school = 'Please enter the name of your ward\'s Intsitution';
        return false;
      }

      return true;
    };

    var validateMethod = function () {
      $scope.errors = {};

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
      wardName: {},
      recipient: {},
      preferredContactMethod: $scope.whatsAppMethod,
      preferredContactDetails: ''
    };

    $scope.details.serviceFee = 0;
    $scope.detailsState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;
    $scope.transactionType = 'SCHOOL';

    Transaction.getProfile().then(function (response) {
      $scope.details.preferredContactMethod = response.profile.preferredContactMethod;
      $scope.details.preferredContactDetails = response.profile.preferredContactDetails;

      if (!response.profile.informationComplete) {
        Error.incompleteModal();
      }
    }, function () {});

    $scope.setDetails = function () {
      if (validateDetails()) {
        $scope.contactState = true;
        $state.transitionTo('app.school.contact');
      }
    };

    $scope.setMethod = function () {
      if (validateMethod()) {
        $scope.recipientState = true;
        $state.transitionTo('app.school.recipient');
      }
    };

    $scope.addRecipient = function () {
      if ($scope.details.wardName.middleName) {
        $scope.details.wardName = $scope.details.wardName.firstName + ' ' + $scope.details.wardName.middleName + ' ' + $scope.details.wardName.lastName;
      } else {
        $scope.details.wardName = $scope.details.wardName.firstName + ' ' + $scope.details.wardName.lastName;
      }

      if (!$scope.details.amountGhs) {
        delete $scope.details.amountGhs;
      }

      if (!$scope.details.recipient.email) {
        delete $scope.details.recipient.email;
      }

      $scope.errors = TransactionUtil.validateRecipient($scope.details);
      if ($.isEmptyObject($scope.errors)){
        $scope.laddaAddTxn = true;
        Transaction.addSchool($scope.details).then(function (response) {
          $scope.laddaAddTxn = false;
          $scope.details.transactionId = response.transactionId;
          $scope.details.referenceNumber = response.referenceNumber;
          TransactionUtil.successModal($scope.details.referenceNumber, $scope.details.transactionId, $scope.transactionType, 'apps/school/views/successModal.html');
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
