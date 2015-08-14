'use strict';

angular
  .module('app.auth')
  .controller('SignupCtrl', function ($scope, $state, $stateParams, $auth, $location, Auth, Referral, Error) {

    if (Auth.isLoggedIn()) {
      $state.transitionTo('app');
    }

    $scope.stateParams = $stateParams;
    $scope.signup = {
      privacy: true
    };
    $scope.signup.referralCode = $stateParams.referralCode;

    // $scope.errors = {
    //   email : "Email is required"
    //   pass : "Password is required"
    //   passMatch : "Passwords don't match"
    //   privacy : "Please accept the Terms and Conditions"
    // }

    $scope.signup.submit = function () {
      // Reset
      // $scope.signup.errorss = [];
      $scope.signup.errors = {};
      var email = $scope.signup.email;
      var pass1 = $scope.signup.pass1;
      var pass2 = $scope.signup.pass2;
      var privacy = $scope.signup.privacy;

      // Client checks
      if (!email) {
        $scope.signup.errors.email = 'Email is required';
        return;
      }

      if (!pass1) {
        $scope.signup.errors.pass = 'Password is required';
        return;
      }

      if (!privacy) {
        $scope.signup.errors.privacy = 'Please accept the Terms and Conditions';
        return;
      }

      if (pass1 !== pass2) {
        $scope.signup.errors.passMatch = 'Passwords don\'t match';
        return;
      }

      // Server Request
      $scope.laddaSignup = true;
      Auth.signup($scope.signup)
        .then(function () {
          $scope.laddaSignup = false;
          $state.transitionTo('signupComplete');
        }, function (response) {
          $scope.laddaSignup = false;
          $scope.signup.errors = Error.signup(response.data);
        });
    };


    $scope.signup.fb = function() {
      $scope.laddaFbSignup = true;
      $auth.authenticate('facebook', {
        'acceptedPrivacyPolicy': true
      }).then(function (req) {
        $scope.laddaFbSignup = false;
        Auth.persist(req.data.id, req.data.token, req.data.complete);
        Auth.saveName(req.data.firstName, req.data.lastName);

        if ($stateParams.referralCode) {
          Referral.setReferral($stateParams.referralCode);
        }

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
        $scope.laddaFbSignup = false;
        $scope.signup.errors = Error.signInFb(req.data);
      });
    };

    $('.show-email').click(function () {
      $('#sign-form').slideToggle();
    });

  });
