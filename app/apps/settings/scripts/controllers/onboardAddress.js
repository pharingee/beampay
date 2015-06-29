'use strict';

angular
  .module('app.settings')
  .controller('OnboardAddressCtrl', function ($scope, $state, Onboard, Persist) {

    $scope.settings = {};
    $scope.settings.country = 'US';
    $scope.settings.firstName = Persist.getUser().firstName;

    $scope.settings.submit = function () {
      $scope.settings.errors = [];
      var day = $scope.settings.date.day;
      var month = $scope.settings.date.month;
      var year = $scope.settings.date.year;

      var dateOfBirth = year+'-'+month+'-'+day;

      var country = $scope.settings.country;
      var phoneNumber = $scope.settings.phoneNumber;
      var street = $scope.settings.street;
      var city = $scope.settings.city;
      var postCode = $scope.settings.postCode;
      var preferredContactMethod = $scope.settings.preferredContactMethod;
      console.log(dateOfBirth, country, phoneNumber);

      // Details Checks
      if (!dateOfBirth || !country || !phoneNumber) {
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
