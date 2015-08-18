'use strict';

angular
  .module('app')
  .controller('HeaderCtrl', function ($scope, $state, $modal, Auth, Persist) {

    if (Auth.isLoggedIn()) {
      $scope.loggedin = true;
    } else {
      $scope.loggedin = false;
    }

    $scope.logoutInProgress = false;

    $scope.logout = function () {
      $scope.logoutInProgress = true;

      Auth.signout().then(function () {
        $scope.logoutInProgress = false;
        $scope.loggedin = false;
        $state.transitionTo('landing');
      });
    };

    $scope.signup= function () {
      $state.transitionTo('signup');
    };

    $scope.signin = function () {
      $state.transitionTo('signin');
    };

    $scope.dashboard = function () {
      $state.transitionTo('app');
    };

    $scope.currentUser = Persist.getUser();

    $scope.referralModal = function () {
      $modal.open({
        templateUrl: 'apps/referrals/views/referralModal.html',
        controller: 'ReferralModalCtrl',
        resolve: {
          referralCode: function () {
            return $scope.referralCode;
          }
        }
      });
    };

  });
