'use strict';

angular
  .module('app.settings')
  .controller('OnboardAddressCtrl', function ($scope, $state, Onboard, Persist) {

    $scope.settings = {};
    $scope.settings.country = 'US';
    $scope.settings.firstName = Persist.getUser().firstName;

    $scope.settings.submit = function () {
      $scope.settings.errors = [];

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
