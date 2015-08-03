'use strict';

angular
  .module('app.constants', [])

  .constant('ErrorConstants', {
    unknownError: 'Oops! Something seems to have gone wrong.',
    unsupportedCountry: 'Your country is not supported. We\'ll let you know when we support it',
    weakPassword: 'The password must be at least 8 characters long and contain at least one numeric digit.',
    emailInUse: 'An account with this email has already been created. Please login if you are the owner of this email. Else enter another email.',
    unactivatedEmail: 'An activation link has been sent to your email. Please check your email for the next steps.',
    unmatchingPasswords: 'The two passwords do not match',
    privacyUnaccepted: 'Plese accept the Privacy Policy to continue',
    disabledAccount: 'Sorry, your account has been disabled',
    invalidLoginCredentials: 'Your email or password is incorrect. Please check and try again',
    emailOrPassEmpty: 'Please enter both email and password',
    adimnLogin: 'Admin accounts not allowed',
    fbUnknownError: 'Oops! Something seems to have gone wrong with your signup. No worries, you can still signup using your Email',
    unverifiedFbAccount: 'Oops! Your facebook account is not confirmed. Please confirm your facebook account and try again. Or sign up using your email.',
    fbPermissionRejected: 'We could not retrieve your email address. Please use sign up with email or allow us to acces your email via Facebook.',
    invalidActivationKey: 'The activation link you used was invalid. Please check and try again',
    expiredActivationKey: 'The activation link you used has expired. Please try signing up again',
    unrecognizedEmail: 'Sorry, this email is not recognized. Are you trying to signup? Please click on the signup link on the header.',
    activatedEmail: 'You account has already been activated. Please try loggin in instead',
    invalidEmail: 'Please enter a valid email',
    emailExists: 'An account with this email has already been created. Please login if you are the owner of this email. Else enter another email.',
    unchangedEmail: 'Your email has not been changed',
    incorrectPassword: 'Sorry, your old Password is incorrect',
    unsetPassword: 'Passwords not set',
    invalidParameters: 'Some of the information you provided is incorrect. Please check and try again.',
    exchangeRateChanged: 'The international exchange rate has changed. Please choose your service again.',
    incompleteProfile: 'Your profile is incomplete please update your details in your settings',
    invalidReferral: 'You have entered an invalid referral code. Please try again',
    setPassword: 'A password has already been set. If you cannot remember please logout and send a reset password to your email.'
  });
