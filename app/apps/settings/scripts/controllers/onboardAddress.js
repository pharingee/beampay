'use strict';

angular
  .module('app.settings')
  .controller('OnboardAddressCtrl', function ($scope, $state, Onboard, Persist, SettingsUtil, Error) {

    $scope.whatsAppMethod = 'WAP';
    $scope.smsMethod = 'SMS';
    $scope.phoneMethod = 'PHON';
    $scope.emailMethod = 'MAIL';

    $scope.settings = {
      date: {},
      preferredContactMethod: $scope.whatsAppMethod,
      preferredContactDetails: ''
    };
    $scope.settings.country = 'US';
    $scope.settings.firstName = Persist.getUser().firstName;

    Onboard.getProfile().then(
      function (response) {
        $scope.settings = response.profile;
        $scope.settings.submit = submit;
        $scope.settings.firstName = response.firstName;
        $scope.settings.lastName = response.lastName;
        $scope.settings.country = 'US';

        var date = new Date($scope.settings.dateOfBirth);
        $scope.settings.date = {
          year: date.getFullYear().toString(),
          month: (date.getMonth() + 1).toString(),
          day: (date.getDate()).toString()
        };

        if (!response.profile.dateOfBirth) {
          $scope.settings.date = {
            year: '',
            month: '',
            day: ''
          };
        }

      }, function () {});

    var submit = function () {
      $scope.settings.errors = {};

      $scope.settings.dateOfBirth = $scope.settings.date.year + '-' + $scope.settings.date.month + '-' + $scope.settings.date.day;

      // Details Checks

      if (!$scope.settings.date.day) {
        $scope.settings.errors.dateOfBirth = 'Please provide a day for date of birth';
        return;
      }

      if (!$scope.settings.date.month) {
        $scope.settings.errors.dateOfBirth = 'Please provide a month for date of birth';
        return;
      }

      if (!$scope.settings.date.year) {
        $scope.settings.errors.dateOfBirth = 'Please provide a year for date of birth';
        return;
      }


      // if (!$scope.settings.dateOfBirth) {
      //   $scope.settings.errors.dateOfBirth = 'Please provide a valid date of birth';
      //   return;
      // }

      if (!$scope.settings.country) {
        $scope.settings.errors.country = 'Please select a country';
        return;
      }

      if (!$scope.settings.phoneNumber) {
        $scope.settings.errors.phoneNumber = 'Please provide a valid phone number';
        return;
      }

      if (!$scope.settings.street) {
        $scope.settings.errors.street = 'Please provide your street name.';
        return;
      }

      if (!$scope.settings.city) {
        $scope.settings.errors.city = 'Please provide your city.';
        return;
      }

      if (!$scope.settings.postCode) {
        $scope.settings.errors.postCode = 'Please provide your Postcode';
        return;
      }

      if (!$scope.settings.preferredContactDetails) {
        switch ($scope.settings.preferredContactMethod) {
          case 'WAP':
            $scope.settings.errors.preferredContactMethod = 'Please enter your WhatsApp number in the contact details field.';
            break;
          case 'PHON':
            $scope.settings.errors.preferredContactMethod = 'Please enter your phone number in the contact details field.';
            break;
          case 'SMS':
            $scope.settings.errors.preferredContactMethod = 'Please enter your SMS number in the contact details field.';
            break;
          case 'MAIL':
            $scope.settings.errors.preferredContactMethod = 'Please enter your email in the contact details field.';
            break;
        }
        return;
      }

      $scope.laddaOnboard = true;
      Onboard.saveAddress($scope.settings).then(function(){
        $scope.laddaOnboard = false;
        $state.transitionTo('app');
      }, function(errors){
        $scope.laddaOnboard = false;
        $scope.settings.errors = Error.saveAddress(errors);
      });

    };

    $scope.$watch('settings.preferredContactMethod', function (newValue) {
      SettingsUtil.changePrefContactDetails(newValue);
    });

  });
