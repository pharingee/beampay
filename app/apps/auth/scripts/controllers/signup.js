'use strict';

angular
  .module('app.auth')
  .controller('SignupCtrl', function ($scope, $location, Auth, Error) {

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
          $location.path('/auth/signup/complete');
        }, function (data) {
          $scope.signup.errors = Error.signup(data);
        });
    };

  });
