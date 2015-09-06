'use strict';

angular
  .module('app.referrals')
  .controller('ReferralCtrl', function ($scope, ROOT_URL, Referral, $modal) {

    $scope.baseUrl = ROOT_URL;
    $scope.referralModal = function () {
      $modal.open({
        templateUrl: 'apps/referrals/views/referralModal.html',
        controller: 'ReferralModalCtrl',
        resolve: {
          referralCode: function () {
            return $scope.referral;
          }
        }
      });
    };

    Referral.getReferral().then(
      function (response){
        $scope.referral = response;
      },
      function (){});
  });
