'use strict';

angular.module('app.transaction')
  .service('TransactionUtil', function ($q, STRIPE_KEY, $modal, Error){
    var getFullName = function (shortName) {
      var fullName = '';
      switch (shortName) {
        case 'DST':
          fullName = 'DStv';
          break;
        case 'GOT':
          fullName = 'GOtv';
          break;
        case 'ECG':
          fullName = 'Electricity';
          break;
        case 'GWC':
          fullName = 'Water';
          break;
        case 'SRF':
          fullName = 'Surfline';
          break;
        case 'VOB':
        case 'VOD':
          fullName = 'Vodafone';
          break;
        case 'AIR':
          fullName = 'Airtel';
          break;
        case 'MTN':
          fullName = 'MTN';
          break;
        case 'TIG':
          fullName = 'Tigo';
          break;
        case 'CAKE':
          fullName = 'Cake';
          break;
        case 'FLOW':
          fullName = 'Flowers';
          break;
        case 'BASK':
          fullName = 'Gift basket';
          break;
        case 'MISC':
          fullName = 'Something Else';
          break;
      }

      return fullName;
    };

    var getDescription = function (transaction) {
      if (transaction.transactionType === 'billpayment' || transaction.transactionType === 'BILL') {
        return 'GHS ' + transaction.data.amountGhs + ' billing on ' + getFullName(transaction.data.billType) + ' for ' + transaction.data.recipient.firstName + ' ' + transaction.data.recipient.lastName;
      } else if(transaction.transactionType === 'airtimetopup' || transaction.transactionType === 'AIRTIME') {
        return 'GHS ' + transaction.data.amountGhs + ' ' + getFullName(transaction.data.network) + ' airtime for ' + transaction.data.recipient.firstName + ' ' + transaction.data.recipient.lastName;
      } else if(transaction.transactionType === 'schoolfeepayment' || transaction.transactionType === 'SCHOOL') {
        return transaction.data.wardName + ' fees to ' + transaction.data.school;
      } else if(transaction.transactionType === 'valettransaction' || transaction.transactionType === 'VALET') {
        return transaction.data.description;
      } else if(transaction.transactionType === 'gift' || transaction.transactionType === 'GIFT') {
        return 'Send ' + getFullName(transaction.data.giftType) + ' to ' + transaction.data.recipient.firstName + ' ' + transaction.data.recipient.lastName;
      }
    };

    var validateRecipient = function (details) {
      var errors = {};
      var phoneReg = /^(\+[\d]{1,3})*[\d-\(\) ]{9,15}$/;
      if (!details.recipient.firstName || !details.recipient.lastName) {
        errors.name = 'Please enter first and last name of the recipient';
      }

      if (!details.recipient.phoneNumber || !details.recipient.phoneNumber.match(phoneReg)) {
        errors.phoneNumber = 'Please enter a valid phone number';
        return errors;
      }

      var phoneDigits = details.recipient.phoneNumber.replace(/ /g, '').replace(/\([\d]*\)/g, '').replace(/-/g, '');

      if (phoneDigits.length < 10 || phoneDigits.length > 15){
        errors.phoneNumber = 'Please ensure phone number digits are at least 10 and at most 15';
      }

      if ($.isEmptyObject(errors)){
        details.recipient.phoneNumber = phoneDigits;
      }

      return errors;
    };

    var getType = function (transaction) {
      if (transaction.transactionType === 'billpayment') {
        return 'BILL';
      } else if(transaction.transactionType === 'airtimetopup') {
        return 'AIRTIME';
      } else if(transaction.transactionType === 'schoolfeepayment') {
        return 'SCHOOL';
      } else if(transaction.transactionType === 'valettransaction') {
        return 'VALET';
      } else if(transaction.transactionType === 'gift') {
        return 'GIFT';
      }
    };

    var makePayment = function (description, amount) {
      var deferred = $q.defer();

      var handler = StripeCheckout.configure({
        key: STRIPE_KEY,
        image: '/icon-128.png',
        token: function(token) {
          deferred.resolve(token);
        }
      });

      handler.open({
        name: 'BeamPay',
        description: description,
        amount: amount,
        closed: function () {
          deferred.reject();
        }
      });

      return deferred.promise;
    };

    var successModal = function (referenceNumber, transactionId, transactionType, templateUrl) {
      if (!templateUrl) {
        templateUrl = 'apps/transaction/views/successModal.html';
      }

      $modal.open({
        templateUrl: templateUrl,
        controller: 'SuccessModalCtrl',
        resolve: {
          referenceNumber: function () {
            return referenceNumber;
          },
          stateParams: function () {
            return {
              transactionId: transactionId,
              transactionType: transactionType
            };
          }
        }
      });
    };

    var toCurr = function (amount) {
      return Math.ceil(amount * 100) / 100;
    };

    var calculateAirtimePricing = function (amountGhs, pricing) {
      var amountUsd = toCurr(amountGhs / pricing.usdGhs);
      var serviceFee = toCurr((pricing.airtime.percentualFee * amountUsd) + pricing.airtime.fixedFee);
      if (pricing.freeTransactionNo > 0) {
        serviceFee = 0;
      }
      var chargeUsd = toCurr(amountUsd + serviceFee);

      return {
        amountUsd: amountUsd,
        serviceFee: serviceFee,
        chargeUsd: chargeUsd
      };
    };

    var calculateBillPricing = function (amountGhs, pricing) {
      var amountUsd = toCurr(amountGhs / pricing.usdGhs);
      var serviceFee = toCurr((pricing.bill.percentualFee * amountUsd) + pricing.bill.fixedFee);
      if (pricing.freeTransactionNo > 0) {
        serviceFee = 0;
      }
      var chargeUsd = toCurr(amountUsd + serviceFee);

      return {
        amountUsd: amountUsd,
        serviceFee: serviceFee,
        chargeUsd: chargeUsd
      };
    };

    var setupInstaPayTransaction = function (response) {
      var scope = {};

      if (!response.user.profile.informationComplete) {
        Error.incompleteModal();
      } else {
        scope.email = response.user.email;
      }

      if (!response.pricing) {
        scope.errors = Error.pricing({}, 404);
      }

      scope.pricing = response.pricing;
      scope.pricing.freeTransactionNo = response.referral.freeTransactionNo;
      scope.referral = response.referral;
      return scope;
    };

    return {
      getDescription: function (transaction) {
        return getDescription(transaction);
      },
      getFullName: function (shortName) {
        return getFullName(shortName);
      },
      getType: function (transaction) {
        return getType(transaction);
      },

      validateRecipient: function (errors) {
        return validateRecipient(errors);
      },

      makePayment: function () {
        return makePayment();
      },
      successModal: function (referenceNumber, transactionId, transactionType, templateUrl) {
        return successModal(referenceNumber, transactionId, transactionType, templateUrl);
      },

      toCurr: function (amount) {
        return toCurr(amount);
      },
      calculateAirtimePricing: function (amountGhs, pricing) {
        return calculateAirtimePricing(amountGhs, pricing);
      },
      calculateBillPricing: function (amountGhs, pricing) {
        return calculateBillPricing(amountGhs, pricing);
      },
      setupInstaPayTransaction: function (response) {
        return setupInstaPayTransaction(response);
      }
    };
  });
