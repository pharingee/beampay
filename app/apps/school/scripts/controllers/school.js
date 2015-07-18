'use strict';

angular
  .module('app.school')
  .controller('SchoolCtrl', function ($scope, $state, Transaction, TransactionUtil, Error, SettingsUtil) {
    if ($state.current.name !== 'app.school.details') {
      $state.transitionTo('app.school.details');
    }

    var validateDetails = function () {
      $scope.errors = [];

      if (!$scope.details.wardName.firstName || !$scope.details.wardName.lastName) {
        $scope.errors.push('Please provide both the first and last name of your ward');
        return false;
      }

      if (!$scope.details.school) {
        $scope.errors.push('Please enter the name of your ward\'s Intsitution');
        return false;
      }

      return true;
    };

    var validateMethod = function () {
      $scope.errors = [];

      if (!$scope.details.preferredContactDetails) {
        switch ($scope.details.preferredContactMethod) {
          case $scope.whatsAppMethod:
            $scope.errors.push('Please enter your WhatsApp number in the contact details field.');
            break;
          case $scope.phoneMethod:
            $scope.errors.push('Please enter your phone number in the contact details field.');
            break;
          case $scope.smsMethod:
            $scope.errors.push('Please enter your SMS number in the contact details field.');
            break;
          case $scope.emailMethod:
            $scope.errors.push('Please enter your email in the contact details field.');
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

    // Transaction.getPricing().then(function (response){
    //   $scope.pricing = response;
    // }, function(error){
    //   $scope.errors = Error.pricing(error.data, error.status);
    // });

    // $scope.calculatePricing = function () {
    //   var results = TransactionUtil.calculatePricing($scope.details.amountGhs, $scope.pricing);
    //   $scope.details.amountUsd = results.amountUsd;
    //   $scope.details.serviceFee = results.serviceFee;
    //   $scope.details.chargeUsd = results.chargeUsd;
    // };

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

    $scope.makeTransaction = function () {
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

      $scope.errors = [];
      var error = TransactionUtil.validateRecipient($scope.details);
      if (!error){
        Transaction.addSchool($scope.details).then(function (response) {
          $scope.details.transactionId = response.transactionId;
          $scope.details.referenceNumber = response.referenceNumber;
          TransactionUtil.successModal($scope.details.referenceNumber, $scope.details.transactionId, $scope.transactionType);
        }, function (error) {
          $scope.errors = Error.transaction(error.data, error.status);
        });
      } else {
        $scope.errors.push(error);
      }
    };

    $scope.$watch('details.preferredContactMethod', function (newValue) {
      SettingsUtil.changePrefContactDetails(newValue);
    });

  });
