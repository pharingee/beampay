'use strict';

angular
  .module('app.school')
  .controller('SchoolCtrl', function ($scope, $state, $modal, Transaction) {
    if ($state.current.name !== 'app.school.details') {
      $state.transitionTo('app.school.details');
    }

    $scope.details = {
      wardName: {},
      recipient: {},
      preferredContactMethod: 'WAP',
      preferredContactDetails: ''
    };

    $scope.details.serviceFee = 0;
    $scope.detailsState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;

    // var toCurr = function (amount) {
    //   return Math.ceil(amount * 100) / 100;
    // };

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

    // Transaction.getPricing().then(function (response){
    //   $scope.pricing = response;
    // }, function(){

    // });

    // $scope.calculatePricing = function () {
    //   $scope.details.amountUsd = toCurr($scope.details.amountGhs / $scope.pricing.usdGhs);
    //   $scope.details.serviceFee = toCurr(($scope.pricing.percentualFee * $scope.details.amountUsd) + $scope.pricing.fixedFee);
    //   $scope.details.chargeUsd = toCurr($scope.details.amountUsd + $scope.details.serviceFee);
    // };

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

      if (validateRecipient()) {
        Transaction.addSchool($scope.details).then(function (response) {
          $scope.details.transactionId = response.transactionId;
          $modal.open({
            templateUrl: 'apps/school/views/successModal.html',
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

  });
