'use strict';

angular
  .module('app.utils')
  .service('Error', function ($modal, ErrorConstants) {

    var appRedirectModal = function (message) {
      $modal.open({
        templateUrl: 'apps/common/views/modals/appRedirectModal.html',
        controller: 'AppRedirectModalCtrl',
        resolve: {
          message: function () {
            return message;
          }
        }
      });
    };

    // var dismissModal = function (message) {
    //   $modal.open({
    //     templateUrl: 'apps/common/views/modals/dismissModal.html',
    //     controller: 'DismissModalCtrl',
    //     resolve: {
    //       message: function () {
    //         return message;
    //       }
    //     }
    //   });
    // };

    var incompleteModal = function () {
      $modal.open({
        templateUrl: 'apps/transaction/views/incompleteProfileModal.html',
        controller: 'IncompleteModalCtrl'
      });
    };

    var signup = function (data) {
      var errors = {};
      if (!data) {
        errors.top = ErrorConstants.unknownError;
      }else if (data.password1 && data.password1[0] === '1') {
        // Password must be at least 8 characters long, contain at least one numeric digit.
        errors.pass = ErrorConstants.weakPassword;
      } else if (data.email && data.email[0] === '4') {
        // This email is already in use.
        errors.email = ErrorConstants.emailInUse;
      } else if (data.email && data.email[0] === '5') {
        // This email not activated
        errors.top = ErrorConstants.unactivatedEmail;
      } else if (data.nonFieldErrors && data.nonFieldErrors[0] === '2') {
        // Password dont match
        errors.passMatch = ErrorConstants.unmatchingPasswords;
      } else if (data.acceptedPrivacyPolicy && data.acceptedPrivacyPolicy[0] === '3') {
        // Privacy not accepted
        errors.privacy = ErrorConstants.privacyUnaccepted;
      } else {
        errors.top = ErrorConstants.unknownError;
      }

      return errors;
    };

    var signIn = function (data) {
      var errors = {};

      if (data && data.nonFieldErrors) {
        if (data.nonFieldErrors[0] === '11') {
          // User account is disabled.
          errors.top = ErrorConstants.disabledAccount;
        } else if (data.nonFieldErrors[0] === '13') {
          // Unable to login with provided credentials.
          errors.top = ErrorConstants.invalidLoginCredentials;
        } else if (data.nonFieldErrors[0] === '0') {
          // Must include "email" and "password".
          errors.top = ErrorConstants.emailOrPassEmpty;
        } else if (data.nonFieldErrors[0] === '14') {
          // Login with admin account attempted
          errors.top = ErrorConstants.adimnLogin;
        } else if (data.nonFieldErrors[0] === '12') {
          // User account not activated yet.
          errors.email = ErrorConstants.unactivatedEmail;
        } else if (data.nonFieldErrors[0] === '22') {
          // User account not activated yet.
          errors.email = ErrorConstants.fbAccountExists;
        }
      } else {
        errors.top = ErrorConstants.unknownError;
      }

      return errors;
    };

    var signInFb = function (data) {
      var errors = {};
      if (!data) {
        errors.fbTop = ErrorConstants.fbUnknownError;
      } else if (data.detail && data.detail === '11') {
        errors.fbTop = ErrorConstants.disabledAccount;
      } else if (data.detail && data.detail === '18') {
        errors.fbTop = ErrorConstants.unverifiedFbAccount;
      } else if (data.detail && data.detail === '19') {
        errors.fbTop = ErrorConstants.fbPermissionRejected;
      }

      return errors;
    };

    var activate = function (data) {
      var errors = {};

      if (!data) {
        errors.top = ErrorConstants.unknownError;
      } else if (data.detail === '6') {
        // Invalid activation key.
        errors.top = ErrorConstants.invalidActivationKey;
      } else if (data.detail === '7') {
        // Activation key is expired
        errors.top = ErrorConstants.expiredActivationKey;
      }

      return errors;
    };

    var activateResend = function (data) {
      var errors = {};

      if (!data) {
        errors.top = ErrorConstants.unknownError;
      } else if (data.detail === '9') {
        // Email unknown
        errors.top = ErrorConstants.unrecognizedEmail;
      } else if (data.detail === '10') {
        // Account already activated
        errors.top = ErrorConstants.activatedEmail;
      } else if (data.detail === '11') {
        // User Account disabled
        errors.top = ErrorConstants.disabledAccount;
      }

      return errors;
    };

    var changeEmail = function (data) {
      var errors = {};

      if (!data) {
        errors.top = ErrorConstants.unknownError;
      } else if (data.detail === '0') {
        // Invalid Parameters
        errors.email = ErrorConstants.invalidEmail;
      } else if (data.detail === '4') {
        // This email is already in use
        errors.email = ErrorConstants.emailInUse;
      } else if (data.detail === '15') {
        // Email has not been changed
        errors.top = ErrorConstants.unchangedEmail;
      }

      return errors;
    };

    var confirmEmail = function (data) {
      var errors = {};

      if (!data) {
        errors.top = ErrorConstants.unknownError;
      } else if (data.detail === '0') {
        // Invalid Parameters
        errors.top = ErrorConstants.invalidEmail;
      }

      return errors;
    };

    var isPassword = function () {
      var errors = {};

      errors.top = ErrorConstants.unknownError;

      return errors;
    };

    var changePassword = function (data) {
      var errors = {};

      if (!data) {
        errors.top = ErrorConstants.unknownError;
      } else if (data.oldPassword && data.oldPassword[0] === '16') {
        // Old Password is incorrect
        errors.oldPass = ErrorConstants.incorrectPassword;
      } else if (data.password1 && data.password1[0] === '1') {
        // Weak pass
        errors.newPass = ErrorConstants.weakPassword;
      } else if (data.nonFieldErrors && data.nonFieldErrors[0] === '2') {
        // Passwords don't match
        errors.passMatch = ErrorConstants.unmatchingPasswords;
      } else if (data.detail && data.detail === '20') {
        // Passwords don't match
        errors.top = ErrorConstants.unsetPassword;
      }

      return errors;
    };

    var setPassword = function (data) {
      var errors = {};

      if (!data) {
        errors.top = ErrorConstants.unknownError;
      } else if (data.detail && data.detail === '0') {
        // Invalid Parameters
        errors.top = ErrorConstants.invalidParameters;
      } else if (data.password1 && data.password1[0] === '1') {
        // Weak pass
        errors.pass = ErrorConstants.weakPassword;
      } else if (data.nonFieldErrors && data.nonFieldErrors[0] === '2') {
        // Passwords don't match
        errors.passMatch = ErrorConstants.unmatchingPasswords;
      } else if (data.detail && data.detail === '21') {
        // Passwords don't match
        errors.top = ErrorConstants.setPassword;
      }

      return errors;
    };

    var forgot = function (data) {
      var errors = {};

      if (!data) {
        errors.top = ErrorConstants.unknownError;
      } else if (data.detail && data.detail === '9') {
        // Email unknown
        errors.email = ErrorConstants.unrecognizedEmail;
      } else if (data.detail && data.detail === '11') {
        // User Account disabled
        errors.top = ErrorConstants.disabledAccount;
      } else if (data.detail && data.detail === '12') {
        // User Account not activated yet
        errors.top = ErrorConstants.unactivatedEmail;
      }

      return errors;
    };

    var transaction = function (data, status) {
      var errors = {};

      if (status === 451) {
        appRedirectModal(ErrorConstants.unsupportedCountry);
        errors.top = ErrorConstants.unsupportedCountry;
      } else if (!data) {
        errors.top = ErrorConstants.unknownError;
      } else if (data.detail && data.detail === '0') {
        errors.top = ErrorConstants.invalidParameters;
      } else if (data.detail && data.detail === '1') {
        appRedirectModal(ErrorConstants.exchangeRateChanged);
        errors.top = ErrorConstants.exchangeRateChanged;
      } else if (data.detail && data.detail === '2') {
        incompleteModal();
        errors.top = ErrorConstants.incompleteProfile;
      } else {
        appRedirectModal(ErrorConstants.unknownError);
        errors.top = ErrorConstants.unknownError;
      }

      return errors;
    };

    var pricing = function (data, status) {
      var errors = {};

      if (status === 404) {
        appRedirectModal(ErrorConstants.unknownError);
        errors.top = ErrorConstants.unknownError;
      } else {
        appRedirectModal(ErrorConstants.unknownError);
        errors.top = ErrorConstants.unknownError;
      }
    };

    var payment = function (data, status) {
      var errors = {};

      if (!data) {
        appRedirectModal(ErrorConstants.unknownError);
        errors.top = ErrorConstants.unknownError;
      } else if (data.detail === '0') {
        appRedirectModal(ErrorConstants.unknownError);
        errors.top = ErrorConstants.unknownError;
      } else if (data.detail === '2') {
        appRedirectModal('Sorry, we could not process payment for this transaction. The reason is: \n\n' + data.message + '.\n\n Please reach out to hello@beampay.co for assistance');
        errors.top = data.message;
      } else if (status > 299) {
        appRedirectModal(ErrorConstants.unknownError);
        errors.top = ErrorConstants.unknownError;
      }
    };

    var setReferral = function (data) {
      var errors = {};

      if (!data) {
        errors.top = ErrorConstants.unknownError;
      } ȩlse if (data.detail === '0') {
        errors.referralCode = ErrorConstants.invalidParameters;
      }else if (data.detail === '2') {
        errors.referralCode = ErrorConstants.invalidReferral;
      }

      return errors;
    };

    var saveAddress = function (data) {
      var errors = {};
      if (!$.isEmptyObject(data)) {
        errors.top = ErrorConstants.invalidParameters;
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
        return transaction(data, status);
      },
      payment: function (data, status) {
        return payment(data, status);
      },
      pricing: function (data, status) {
        return pricing(data, status);
      },
      setReferral: function (data) {
        return setReferral(data);
      },
      incompleteModal: function () {
        return incompleteModal();
      },
      saveAddress: function (data) {
        return saveAddress(data);
      }
    };
  });
