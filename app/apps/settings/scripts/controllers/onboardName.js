'use strict';

angular
  .module('app.settings')
  .controller('OnboardNameCtrl', function ($scope, $location) {

    $scope.settings = {};

    $scope.settings.submit = function () {
      $scope.settings.errors = [];
      var firstName = $scope.settings.firstName;
      var lastName = $scope.settings.lastName;

      // Client checks
      if (!firstName || !lastName) {
        $scope.settings.errors.push('We need you to provide your full name.');
        return;
      }

      $location.path('/settings/onboard/address');
    };

  });