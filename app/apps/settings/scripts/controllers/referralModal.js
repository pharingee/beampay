'use strict';

angular
  .module('app.settings')
  .controller('ReferralModalCtrl', function ($scope, $modalInstance, $state, referralCode, Referral, ROOT_URL, FACEBOOK_CLIENT_ID) {

    $scope.baseUrl = ROOT_URL;
    $scope.appId = FACEBOOK_CLIENT_ID;

    Referral.getReferral().then(
      function (response){
        $scope.referral = response;
      },
      function (){});

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
