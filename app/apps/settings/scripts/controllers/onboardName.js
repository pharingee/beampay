'use strict';

angular
  .module('app.settings')
  .controller('OnboardNameCtrl', function ($scope, $state, Onboard, Error) {

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

      var saveName = function () {
        Onboard.saveName(firstName, lastName).then(function(){
            $state.transitionTo('onboard.address');
          }, function (){
            $scope.settings.errors.push('Some of the information you provided is invalid. Please check and try again.');
          });
      };

      if ($scope.settings.referralCode) {
        Onboard.setReferral($scope.settings.referralCode).then(function (){
          saveName();
        }, function (data) {
          if (data.details && data.details == 1) {
            saveName();
          }else{
            $scope.settings.errors = Error.setReferral(data);
          }
        });
      }else {
        saveName();
      }

    };

  });
