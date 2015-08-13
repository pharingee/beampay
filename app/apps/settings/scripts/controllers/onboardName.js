'use strict';

angular
  .module('app.settings')
  .controller('OnboardNameCtrl', function ($scope, $state, Onboard, Error, Referral) {

    $scope.settings = {};

    Onboard.getProfile().then(
      function (response) {
        $scope.settings = response;
        $scope.settings.submit = submit;
      }, function () {});

    var submit = function () {
      $scope.settings.errors = {};
      var firstName = $scope.settings.firstName;
      var lastName = $scope.settings.lastName;

      // Client checks
      // if (!firstName || !lastName) {
      //   $scope.settings.errors.push('We need you to provide your full name.');
      //   return;
      // }

      if (!firstName) {
        $scope.settings.errors.firstName = 'First Name required';
        return;
      }

      if (!lastName) {
        $scope.settings.errors.lastName = 'Last Name required';
        return;
      }


      var saveName = function () {
        Onboard.saveName(firstName, lastName).then(function(){
            $scope.laddaOnboard = false;
            $state.transitionTo('onboard.address');
          }, function (){
            $scope.laddaOnboard = false;
            $scope.settings.errors.push('Some of the information you provided is invalid. Please check and try again.');
          });
      };

      $scope.laddaOnboard = true;
      if ($scope.settings.referralCode) {
        Referral.setReferral($scope.settings.referralCode).then(function (){
          saveName();
        }, function (data) {
          $scope.laddaOnboard = false;
          if (data.detail && data.detail === '1') {
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
