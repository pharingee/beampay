'use strict';

angular
  .module('app.auth')
  .controller('SignupCtrl', function ($scope, $state, $auth, Auth, Error) {

    $scope.signup = {};

    $scope.signup.submit = function () {
      // Reset
      $scope.signup.errors = [];
      var email = $scope.signup.email;
      var pass1 = $scope.signup.pass1;
      var pass2 = $scope.signup.pass2;
      var privacy = $scope.signup.privacy;

      // Client checks
      if (!email || !pass1 || !pass2 || !privacy) {
        $scope.signup.errors.push('All fields required');
        return;
      }

      if (pass1 !== pass2) {
        $scope.signup.errors.push('Passwords don\'t match');
        return;
      }

      // Server Request
      Auth.signup(email, pass1, pass2, privacy)
        .then(function () {
          $state.transitionTo('signupComplete');
        }, function (data) {
          $scope.signup.errors = Error.signup(data);
        });
    };


    $scope.signup.fb = function() {
      $auth.authenticate('facebook', {
        'acceptedPrivacyPolicy': true
      }).then(function (req) {
        console.log(req);
        Auth.persist(req.data.id, req.data.token);
        $state.transitionTo('onboard.name');
        if (!req.data.newUser){
          $state.transitionTo('onboard.name');
        }else{
          $state.transitionTo('app');
        }
      }, function (req) {
        $scope.signup.errors = Error.signInFb(req.data);
      });
    };

  });
