'use strict';

angular
  .module('app.settings')
  .controller('OnboardAddressCtrl', function ($scope, $state, Onboard, Persist) {

    $scope.settings = {};
    $scope.settings.country = 'US';
    $scope.settings.firstName = Persist.getUser().firstName;

    $scope.settings.submit = function () {
      $scope.settings.errors = [];

      var dateOfBirth = year+'-'+month+'-'+day;
      $scope.settings.dateOfBirth = dateOfBirth;

      var country = $scope.settings.country;
      var phoneNumber = $scope.settings.phoneNumber;
      var street = $scope.settings.street;
      var city = $scope.settings.city;
      var postCode = $scope.settings.postCode;
      var preferredContactMethod = $scope.settings.preferredContactMethod;
      console.log(dateOfBirth, country, phoneNumber);
      $scope.settings.dateOfBirth = $scope.settings.date.year + '-' + $scope.settings.date.month + '-' + $scope.settings.date.day;

      // Details Checks
      if (!$scope.settings.dateOfBirth || !$scope.settings.country || !$scope.settings.phoneNumber) {
        $scope.settings.errors.push('We need you to fill all the fields.');
        return;
      }

      Onboard.saveAddress($scope.settings).then(function(){
        $state.transitionTo('app');
      }, function(){
        $scope.settings.errors.push('This page has errors');
      });

    };

  });
