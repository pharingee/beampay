'use strict';

angular
  .module('app.settings')
  .controller('OnboardAddressCtrl', function ($scope, $state, Onboard, Persist, SettingsUtil, Error) {

    $scope.whatsAppMethod = 'WAP';
    $scope.smsMethod = 'SMS';
    $scope.phoneMethod = 'PHON';
    $scope.emailMethod = 'MAIL';

    $scope.details = {
      date: {},
      preferredContactMethod: $scope.whatsAppMethod,
      preferredContactDetails: ''
    };
    $scope.details.country = 'US';
    $scope.details.firstName = Persist.getUser().firstName;

    Onboard.getProfile().then(
      function (response) {
        $scope.details = response.profile;
        $scope.details.submit = submit;
        $scope.details.firstName = response.firstName;
        $scope.details.lastName = response.lastName;
        $scope.details.country = 'US';

        var date = new Date($scope.details.dateOfBirth);
        $scope.details.date = {
          year: date.getFullYear().toString(),
          month: (date.getMonth() + 1).toString(),
          day: (date.getDate()).toString()
        };

        if (!response.profile.dateOfBirth) {
          $scope.details.date = {
            year: '',
            month: '',
            day: ''
          };
        }

      }, function () {});

    var submit = function () {
      $scope.errors = {};

      $scope.details.dateOfBirth = $scope.details.date.year + '-' + $scope.details.date.month + '-' + $scope.details.date.day;

      // Details Checks

      if (!$scope.details.date.day) {
        $scope.errors.dateOfBirth = 'Please provide a day for date of birth';
        return;
      }

      if (!$scope.details.date.month) {
        $scope.errors.dateOfBirth = 'Please provide a month for date of birth';
        return;
      }

      if (!$scope.details.date.year) {
        $scope.errors.dateOfBirth = 'Please provide a year for date of birth';
        return;
      }


      // if (!$scope.details.dateOfBirth) {
      //   $scope.errors.dateOfBirth = 'Please provide a valid date of birth';
      //   return;
      // }

      if (!$scope.details.country) {
        $scope.errors.country = 'Please select a country';
        return;
      }

      if (!$scope.details.phoneNumber) {
        $scope.errors.phoneNumber = 'Please provide a valid phone number';
        return;
      }

      if (!$scope.details.street) {
        $scope.errors.street = 'Please provide your street name.';
        return;
      }

      if (!$scope.details.city) {
        $scope.errors.city = 'Please provide your city.';
        return;
      }

      if (!$scope.details.postCode) {
        $scope.errors.postCode = 'Please provide your Postcode';
        return;
      }

      if (!$scope.details.preferredContactDetails) {
        switch ($scope.details.preferredContactMethod) {
          case 'WAP':
            $scope.errors.preferredContactMethod = 'Please enter your WhatsApp number in the contact details field.';
            break;
          case 'PHON':
            $scope.errors.preferredContactMethod = 'Please enter your phone number in the contact details field.';
            break;
          case 'SMS':
            $scope.errors.preferredContactMethod = 'Please enter your SMS number in the contact details field.';
            break;
          case 'MAIL':
            $scope.errors.preferredContactMethod = 'Please enter your email in the contact details field.';
            break;
        }
        return;
      }

      $scope.laddaOnboard = true;
      Onboard.saveAddress($scope.details).then(function(){
        $scope.laddaOnboard = false;
        $state.transitionTo('app');
      }, function(errors){
        $scope.laddaOnboard = false;
        $scope.errors = Error.saveAddress(errors);
      });

    };

    $scope.$watch('details.preferredContactMethod', function (newValue) {
      SettingsUtil.changePrefContactDetails(newValue);
    });

  });
