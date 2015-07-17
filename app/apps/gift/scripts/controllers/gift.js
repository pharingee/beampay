'use strict';

angular
  .module('app.gift')
  .controller('GiftCtrl', function ($scope, $state, $modal, Transaction) {
    if ($state.current.name !== 'app.gift.details') {
      $state.transitionTo('app.gift.details');
    }

    $scope.details = {
      recipient: {},
      preferredContactMethod: 'WAP',
      preferredContactDetails: ''
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

    var validateDetails = function () {
      $scope.errors = [];

      if (!$scope.details.giftType) {
        $scope.errors.push('Please select your gift type.');
        return false;
      }

      if ($scope.details.giftType === 'MISC') {
        if (!$scope.details.additionalInfo) {
          $scope.errors.push('Please enter the type of gift you would want us to send.');
          return false;
        }
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

      if (validateRecipient()) {
        Transaction.addGift($scope.details).then(function (response) {
          $scope.details.transactionId = response.transactionId;
          $scope.details.referenceNumber = response.referenceNumber;
          $modal.open({
            templateUrl: 'apps/gift/views/successModal.html',
            controller: 'SuccessModalCtrl',
            resolve: {
              referenceNumber: function () {
                return $scope.details.referenceNumber;
              },
              stateParams: function () {
                return {
                  transactionId: $scope.details.transactionId,
                  transactionType: 'GIFT'
                };
              }
            }
          });
        }, function (error) {
          if (error.data.detail && error.data.detail === '2') {
            $modal.open({
              templateUrl: 'apps/transaction/views/incompleteProfileModal.html',
              controller: 'IncompleteModalCtrl'
            });
          }
        });
      }
    };

    $scope.$watch('details.preferredContactMethod', function (newValue) {
      if (newValue === 'SMS') {
        $('#contact').attr('placeholder', 'Please enter your SMS no. e.g.: +233265086508');
        $('#contact').attr('type', 'text');
      } else if (newValue === 'WAP') {
        $('#contact').attr('placeholder', 'Please enter your WhatsApp no. e.g.: +233265086508');
        $('#contact').attr('type', 'text');
      } else if (newValue === 'PHON') {
        $('#contact').attr('placeholder', 'Please enter your phone no. e.g.: +233265086508');
        $('#contact').attr('type', 'text');
      } if (newValue === 'MAIL') {
        $('#contact').attr('placeholder', 'Please enter your email e.g.: email@domain.com');
        $('#contact').attr('type', 'email');
      }
    });

  });
