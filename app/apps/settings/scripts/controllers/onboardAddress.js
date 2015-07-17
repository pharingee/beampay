'use strict';

angular
  .module('app.settings')
  .controller('OnboardAddressCtrl', function ($scope, $state, Onboard, Persist) {

    $scope.settings = {
      date: {},
      preferredContactMethod: 'WAP',
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
        console.log(response.profile);

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
      $scope.settings.errors = [];

      $scope.settings.dateOfBirth = $scope.settings.date.year + '-' + $scope.settings.date.month + '-' + $scope.settings.date.day;

      // Details Checks
      if (!$scope.settings.dateOfBirth) {
        $scope.settings.errors.push('Please provide a valid date of birth');
        return;
      }

      if (!$scope.settings.country) {
        $scope.settings.errors.push('Please select a country');
        return;
      }

      if (!$scope.settings.phoneNumber) {
        $scope.settings.errors.push('Please provide a valid phone number');
        return;
      }

      if (!$scope.settings.street) {
        $scope.settings.errors.push('Please provide your street name.');
        return;
      }

      if (!$scope.settings.city) {
        $scope.settings.errors.push('Please provide your city.');
        return;
      }

      if (!$scope.settings.postCode) {
        $scope.settings.errors.push('Please provide your Postcode');
        return;
      }

      if (!$scope.settings.preferredContactDetails) {
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
        return;
      }

      Onboard.saveAddress($scope.settings).then(function(){
        $state.transitionTo('app');
      }, function(){
        $scope.settings.errors.push('This page has errors');
      });

    };

    $scope.$watch('settings.preferredContactMethod', function (newValue) {
      if (newValue === 'SMS') {
        $('#contactDetails').attr('placeholder', 'Please enter your SMS no. e.g.: +233265086508');
        $('#contactDetails').attr('type', 'text');
      } else if (newValue === 'WAP') {
        $('#contactDetails').attr('placeholder', 'Please enter your WhatsApp no. e.g.: +233265086508');
        $('#contactDetails').attr('type', 'text');
      } else if (newValue === 'PHON') {
        $('#contactDetails').attr('placeholder', 'Please enter your phone no. e.g.: +233265086508');
        $('#contactDetails').attr('type', 'text');
      } if (newValue === 'MAIL') {
        $('#contactDetails').attr('placeholder', 'Please enter your email e.g.: email@domain.com');
        $('#contactDetails').attr('type', 'email');
      }
    });

  });
