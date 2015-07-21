'use strict';

angular
  .module('app.auth')
  .controller('SignupCtrl', function ($scope, $state, $stateParams, $auth, $location, Auth, Error) {

    if (Auth.isLoggedIn()) {
      $state.transitionTo('app');
    }

    $scope.stateParams = $stateParams;
    $scope.signup = {
      privacy: true
    };

    $scope.signup.submit = function () {
      // Reset
      $scope.signup.errors = [];
      var email = $scope.signup.email;
      var pass1 = $scope.signup.pass1;
      var pass2 = $scope.signup.pass2;
      var privacy = $scope.signup.privacy;

      // Client checks
      if (!email) {
        $scope.signup.errors.push('Email is required');
        return;
      }

      if (!pass1) {
        $scope.signup.errors.push('Password is required');
        return;
      }


      if (!privacy) {
        $scope.signup.errors.push('Please accept the Terms and Conditions');
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
        }, function (response) {
          $scope.signup.errors = Error.signup(response.data);
        });
    };


    $scope.signup.fb = function() {
      $auth.authenticate('facebook', {
        'acceptedPrivacyPolicy': true
      }).then(function (req) {
        Auth.persist(req.data.id, req.data.token, req.data.complete);
        Auth.saveName(req.data.firstName, req.data.lastName);

        if (!req.data.complete) {
          $location.path($state.href('onboard.name').slice(2));
        } else {
          if ($stateParams.next) {
            $location.path($state.href($stateParams.next).slice(2));
          } else {
            $location.path($state.href('app').slice(2));
          }
        }

      }, function (req) {
        $scope.signup.errors = Error.signInFb(req.data);
      });
    };

    $('.show-email').click(function () {
      $('#sign-form').slideToggle();
    });

  });
