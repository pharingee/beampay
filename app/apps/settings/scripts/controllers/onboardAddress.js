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
      var address = $scope.settings.address;
      console.log(dateOfBirth, country, phoneNumber);

      // Details Checks 
      if (!dateOfBirth || !country || !phoneNumber || !address) {
        $scope.settings.errors.push('We need you to fill all the fields.');
        return;
      }

      Onboard.saveAddress(dateOfBirth, country, phoneNumber, address).then(function(){
        $state.transitionTo('home');
      }, function(){
        $scope.settings.errors.push('This page has errors');
      });

    };

  });
