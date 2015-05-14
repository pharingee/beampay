'use strict';

angular
  .module('app.auth')
  .service('Error', function () {

    var signup = function (data) {
      var errors = [];

      if (data.password1 && data.password1[0] === '1') {
        // Password must be at least 8 characters long, contain at least one numeric digit.
        errors.push('Weak Pass');
      } else if (data.email && data.email[0] === '4') {
        // This email is already in use.
        errors.push('Email in user');
      } else if (data.email && data.email[0] === '5') {
        // This email not activated
        errors.push('Email not activated');
      } else if (data.nonFieldErrors && data.nonFieldErrors[0] === '2') {
        // Password dont match
        errors.push('Pass match failed');
      } else if (data.acceptedPrivacyPolicy && data.acceptedPrivacyPolicy[0] === '3') {
        // Privacy not accepted
        errors.push('Privacy false');
      } else {
        errors.push('Unknown Error');
      }

      return errors;
    };

    var signIn = function (data) {
      var errors = [];

      if (data.nonFieldErrors) {
        if (data.nonFieldErrors[0] === '11') {
          // User account is disabled.
          errors.push('Account disabled');
        } else if (data.nonFieldErrors[0] === '13') {
          // Unable to login with provided credentials.
          errors.push('Invalid credentials');
        } else if (data.nonFieldErrors[0] === '0') {
          // Must include "email" and "password".
          errors.push('All fields required');
        } else if (data.nonFieldErrors[0] === '14') {
          // Login with admin account attempted
          errors.push('Admin accounts not allowed');
        } else if (data.nonFieldErrors[0] === '12') {
          // User account not activated yet.
          errors.push('Account not activated yet.');
        }
      }

      return errors;
    };

    var activate = function (data) {
      var errors = [];

      if (data.detail === '6') {
        // Invalid activation key.
        errors.push('Invalid Activation Key');
      } else if (data.detail === '7') {
        // Activation key is expired
        errors.push('Key Expired');
      }

      return errors;
    };

    var activateResend = function (data) {
      var errors = [];

      if (data.detail === '9') {
        // Email unknown
        errors.push('Email not registered');
      } else if (data.detail === '10') {
        // Account already activated
        errors.push('Account activated');
      } else if (data.detail === '11') {
        // User Account disabled
        errors.push('Account disabled');
      }

      return errors;
    };

    var changeEmail = function (data) {
      var errors = [];

      if (data.detail === '0') {
        // Invalid Parameters
        errors.push('Invalid Parameters');
      } else if (data.detail === '4') {
        // This email is already in use
        errors.push('This email is already in use');
      } else if (data.detail === '15') {
        // Email has not been changed
        errors.push('Email has not been changed');
      }

      return errors;
    };

    var confirmEmail = function (data) {
      var errors = [];

      if (data.detail === '0') {
        // Invalid Parameters
        errors.push('Invalid Parameters');
      }

      return errors;
    };

    var isPassword = function () {
      var errors = [];

      errors.push('Unknown Error');

      return errors;
    };

    var changePassword = function (data) {
      var errors = [];

      if (data.oldPassword && data.oldPassword[0] === '16') {
        // Old Password is incorrect
        errors.push('Old Password is incorrect');
      } else if (data.password1 && data.password1[0] === '1') {
        // Weak pass
        errors.push('Weak pass');
      } else if (data.nonFieldErrors && data.nonFieldErrors[0] === '2') {
        // Passwords don't match
        errors.push('Passwords don\'t match');
      } else if (data.detail === '20') {
        // Passwords don't match
        errors.push('Passwords not set');
      }

      return errors;
    };

    var setPassword = function (data) {
      var errors = [];

      if (data.detail === '0') {
        // Invalid Parameters
        errors.push('Invalid Parameters');
      } else if (data.password1 && data.password1[0] === '1') {
        // Weak pass
        errors.push('Weak pass');
      } else if (data.nonFieldErrors && data.nonFieldErrors[0] === '2') {
        // Passwords don't match
        errors.push('Passwords don\'t match');
      } else if (data.detail === '21') {
        // Passwords don't match
        errors.push('Passwords already set');
      }

      return errors;
    };

    var forgot = function (data) {
      var errors = [];

      if (data.detail === '9') {
        // Email unknown
        errors.push('Email unknown');
      } else if (data.detail === '11') {
        // User Account disabled
        errors.push('User Account disabled');
      } else if (data.detail === '12') {
        // User Account not activated yet
        errors.push('User Account not activated yet');
      }

      return errors;
    };

    return {
      signup: function (data) {
        return signup(data);
      },
      signIn: function (data) {
        return signIn(data);
      },
      activate: function (data) {
        return activate(data);
      },
      activateResend: function (data) {
        return activateResend(data);
      },
      changeEmail: function (data) {
        return changeEmail(data);
      },
      confirmEmail: function (data) {
        return confirmEmail(data);
      },
      isPassword: function (data) {
        return isPassword(data);
      },
      changePassword: function (data) {
        return changePassword(data);
      },
      setPassword: function (data) {
        return setPassword(data);
      },
      forgot: function (data) {
        return forgot(data);
      }
    };
  });
