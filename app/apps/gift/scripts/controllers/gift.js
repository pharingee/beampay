'use strict';

angular
  .module('app.gift')
  .controller('GiftCtrl', function ($scope, $state, Transaction, TransactionUtil, Error, SettingsUtil) {
    if ($state.current.name !== 'app.gift.details') {
      $state.transitionTo('app.gift.details');
    }

    var validateDetails = function () {
      $scope.errors = {};

      if (!$scope.details.giftType) {
        $scope.errors.giftType = 'Please select your gift type.';
        return false;
      }

      if ($scope.details.giftType === 'MISC') {
        if (!$scope.details.additionalInfo) {
          $scope.errors.additionalInfo = 'Please enter the type of gift you would want us to send.';
          return false;
        }
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
    $scope.transactionType = 'GIFT';

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
        $state.transitionTo('app.gift.recipient');
      }
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

      $scope.errors = TransactionUtil.validateRecipient($scope.details);
      console.log($scope.errors.length);
      if ($.isEmptyObject($scope.errors)){
        $scope.laddaAddTxn = true;
        Transaction.addGift($scope.details).then(function (response) {
          $scope.laddaAddTxn = false;
          $scope.details.transactionId = response.transactionId;
          $scope.details.referenceNumber = response.referenceNumber;
          TransactionUtil.successModal($scope.details.referenceNumber, $scope.details.transactionId, $scope.transactionType);
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
