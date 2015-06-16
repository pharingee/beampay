'use strict';

angular
  .module('app.settings')
  .controller('OnboardAddressCtrl', function ($scope) {

    $scope.settings = {};
    $scope.settings.country = 'US';

    $scope.settings.submit = function () {


      var phoneNumber = $scope.settings.phoneNumber;
      console.log(phoneNumber);
    };

  });
