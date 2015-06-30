'use strict';

angular
  .module('app.auth')
  .controller('SignInCtrl', function ($scope, $state, $stateParams, $window, $auth, Auth, Error) {

    $scope.signIn = {};
    $scope.signIn.submit = function () {
      // Reset
      $scope.signIn.errors = [];
      var email = $scope.signIn.email;
      var pass = $scope.signIn.pass;

      // Client checks
      if (!email || !pass) {
        $scope.signIn.errors.push('All fields required');
        return;
      }

      // Server Request
      Auth.signIn(email, pass)
        .then(function (isComplete) {
          if (isComplete){
            var next = $stateParams.next;

            if (next) {
              $state.transitionTo(next);
            } else {
              $state.transitionTo('app');
            }
          } else {
            $state.transitionTo('onboard.name');
          }
        }, function (data) {
          $scope.signIn.errors = Error.signIn(data);
        });
    };


    $scope.signIn.fb = function() {
      $auth.authenticate('facebook', {
        'acceptedPrivacyPolicy': true
      }).then(function (req) {
        Auth.persist(req.data.id, req.data.token);
        if (!req.data.newUser){
          $state.transitionTo('onboard.name');
        }else{
          $state.transitionTo('app');
        }
      }, function (req) {
        $scope.signIn.errors = Error.signInFb(req.data);
      });
    };

    $scope.forgot = function () {
      $state.transitionTo('forgot');
    };

  });
