'use strict';

angular
  .module('app.auth')
  .controller('SignInCtrl', function ($scope, $location, $window, $auth, Auth, Error) {

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
        .then(function () {
          var next = $location.search().next;
          if (next) {
            $location.path(decodeURIComponent(next)).search('next', null);
          } else {
            $location.path('/home');
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
      }, function (req) {
        $scope.signIn.errors = Error.signInFb(req.data);
      });
    };

    $scope.signup = function () {
      $location.path('/auth/signup/');
    };

    $scope.forgot = function () {
      $location.path('/auth/forgot/');
    };

  });
