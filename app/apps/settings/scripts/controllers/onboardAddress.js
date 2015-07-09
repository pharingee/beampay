'use strict';

angular
  .module('app.settings')
  .controller('OnboardAddressCtrl', function ($scope, $state, Onboard, Persist) {

    $scope.settings = {
      date: {}
    };
    $scope.settings.country = 'US';
    $scope.settings.firstName = Persist.getUser().firstName;

    Onboard.getProfile().then(
      function (response) {
        $scope.settings = response.profile;
        $scope.settings.submit = submit;
        $scope.settings.firstName = response.firstName;
        $scope.settings.lastName = response.lastName;

        var date = new Date($scope.settings.dateOfBirth);
        $scope.settings.date = {
          year: date.getFullYear().toString(),
          month: (date.getMonth() + 1).toString(),
          day: (date.getDate()).toString()
        };

      }, function () {});

    var submit = function () {
      $scope.settings.errors = [];

      $scope.settings.dateOfBirth = $scope.settings.date.year + '-' + $scope.settings.date.month + '-' + $scope.settings.date.day;

      // Details Checks
      if (!$scope.settings.dateOfBirth || !$scope.settings.country || !$scope.settings.phoneNumber || !$scope.settings.street || !$scope.settings.city || !$scope.settings.postCode) {
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
