'use strict';

angular
  .module('app.auth')
  .service('Error', function () {

    var signup = function (data) {
      var errors = [];
      if (!data) {
        errors.push('Unknown Error. We will check our logs and get to it ASAP');
      }else if (data.password1 && data.password1[0] === '1') {
        // Password must be at least 8 characters long, contain at least one numeric digit.
        errors.push('Password must be at least 8 characters long, contain at least one numeric digit.');
      } else if (data.email && data.email[0] === '4') {
        // This email is already in use.
        errors.push('An account with this email has already been created. Please login if you are the owner of this email. Else enter another email.');
      } else if (data.email && data.email[0] === '5') {
        // This email not activated
        errors.push('An activation link has been sent to your email. Please check and activate your account');
      } else if (data.nonFieldErrors && data.nonFieldErrors[0] === '2') {
        // Password dont match
        errors.push('The two passwords do not match');
      } else if (data.acceptedPrivacyPolicy && data.acceptedPrivacyPolicy[0] === '3') {
        // Privacy not accepted
        errors.push('Plese accept the Privacy Policy to continue');
      } else {
        errors.push('Unknown Error. We will check our logs and get to it ASAP');
      }

      return errors;
    };

    var signIn = function (data) {
      var errors = [];

      if (data.nonFieldErrors) {
        if (data.nonFieldErrors[0] === '11') {
          // User account is disabled.
          errors.push('Sorry, your account has been disabled');
        } else if (data.nonFieldErrors[0] === '13') {
          // Unable to login with provided credentials.
          errors.push('Your email or password is incorrect. Please check and try again');
        } else if (data.nonFieldErrors[0] === '0') {
          // Must include "email" and "password".
          errors.push('Please enter both email and password');
        } else if (data.nonFieldErrors[0] === '14') {
          // Login with admin account attempted
          errors.push('Admin accounts not allowed');
        } else if (data.nonFieldErrors[0] === '12') {
          // User account not activated yet.
          errors.push('An activation link has been sent to your email. Please check and activate your account');
        }
      }

      return errors;
    };

    var signInFb = function () {
      var errors = [];
      errors.push('Facebook Authentication failed. We will check our logs and get to it ASAP');
      return errors;
    };

    var activate = function (data) {
      var errors = [];

      if (!data) {
        errors.push('Unknown Error. We will check our logs and get to it ASAP');
      } else if (data.detail === '6') {
        // Invalid activation key.
        errors.push('The actiivation link you used was invalid. Please check and try again');
      } else if (data.detail === '7') {
        // Activation key is expired
        errors.push('The activation link you used has expired. Please try signing up again');
      }

      return errors;
    };

    var activateResend = function (data) {
      var errors = [];

      if (!data) {
        errors.push('Unknown Error. We will check our logs and get to it ASAP');
      } else if (data.detail === '9') {
        // Email unknown
        errors.push('Sorry, this email is not recognized. Are you trying to signup? Please click on the signup link on the header.');
      } else if (data.detail === '10') {
        // Account already activated
        errors.push('You account has already been activated. Please try loggin in instead');
      } else if (data.detail === '11') {
        // User Account disabled
        errors.push('Sorry, your account has been disabled');
      }

      return errors;
    };

    var changeEmail = function (data) {
      var errors = [];

      if (!data) {
        errors.push('Unknown Error. We will check our logs and get to it ASAP');
      } else if (data.detail === '0') {
        // Invalid Parameters
        errors.push('Please enter a valid email');
      } else if (data.detail === '4') {
        // This email is already in use
        errors.push('An account with this email has already been created. Please login if you are the owner of this email. Else enter another email.');
      } else if (data.detail === '15') {
        // Email has not been changed
        errors.push('Your email has not been changed');
      }

      return errors;
    };

    var confirmEmail = function (data) {
      var errors = [];

      if (!data) {
        errors.push('Unknown Error. We will check our logs and get to it ASAP');
      } else if (data.detail === '0') {
        // Invalid Parameters
        errors.push('Please enter a valid email');
      }

      return errors;
    };

    var isPassword = function () {
      var errors = [];

      errors.push('Unknown Error. We will check our logs and get to it ASAP');

      return errors;
    };

    var changePassword = function (data) {
      var errors = [];

      if (!data) {
        errors.push('Unknown Error. We will check our logs and get to it ASAP');
      } else if (data.oldPassword && data.oldPassword[0] === '16') {
        // Old Password is incorrect
        errors.push('Sorry, your old Password is incorrect');
      } else if (data.password1 && data.password1[0] === '1') {
        // Weak pass
        errors.push('Password must be at least 8 characters long, contain at least one numeric digit.');
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
        errors.push('The two passwords do not match');
      } else if (data.detail === '21') {
        // Passwords don't match
        errors.push('A password has already been set. If you cannot remember please logout and send a reset password to your email.');
      }

      return errors;
    };

    var forgot = function (data) {
      var errors = [];

      if (!data) {
        errors.push('Unknown Error. We will check our logs and get to it ASAP');
      } else if (data.detail === '9') {
        // Email unknown
        errors.push('Sorry, this email is not recognized. Are you trying to signup? Please click on the signup link on the header.');
      } else if (data.detail === '11') {
        // User Account disabled
        errors.push('Sorry your account is disabled');
      } else if (data.detail === '12') {
        // User Account not activated yet
        errors.push('An activation link has been sent to your email. Please check and activate your account');
      }

      return errors;
    };

    var transaction = function (data, status) {
      var errors = [];

      if (status == 451) {
        errors.push('Your country is not supported. We\'ll let you know when we support it');
      } else if (data.detail == 0) {
        errors.push('Some of the information you provided is incorrect. Please check and try again.');
      } else if (data.detail == 1) {
        errors.push('The international exchange rate has changed. Please choose your service again.');
      } else if (data.detail == 2) {
        errors.push('Your profile is incomplete please update your details in your settings');
      } else {
        errors.push('Unknown error. We will check our logs and get to it ASAP');
      }

      return errors;
    };

    var setReferral = function (data) {
      var errors = [];

      if (data.detail == 0) {
        errors.push('Some of the information you provided is incorrect. Please check and try again.');
      }else if (data.detail == 2) {
        errors.push('You have entered an invalid referral code. Please try again');
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
      signInFb: function (data) {
        return signInFb(data);
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
      },
      transaction: function (data, status) {
        return transaction(data);
      },
      setReferral: function (data) {
        return setReferral(data);
      }
    };
  });
