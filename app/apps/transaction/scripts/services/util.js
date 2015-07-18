'use strict';

angular.module('app.transaction')
  .service('TransactionUtil', function ($q, STRIPE_KEY, $modal){
    var getFullName = function (shortName) {
      var fullName = '';
      switch (shortName) {
        case 'DST':
          fullName = 'DSTv';
          break;
        case 'GOT':
          fullName = 'GOTv';
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
      if (!details.recipient.firstName || !details.recipient.lastName) {
        return 'Please enter first and last name of the recipient';
      }

      if (!details.recipient.phoneNumber || details.recipient.phoneNumber.length < 10) {
        return 'Please enter a valid phone number';
      }

      return false;
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

    var successModal = function (referenceNumber, transactionId, transactionType) {
      $modal.open({
        templateUrl: 'apps/transaction/views/successModal.html',
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

    var calculatePricing = function (amountGhs, pricing) {
      var amountUsd = toCurr(amountGhs / pricing.usdGhs);
      var serviceFee = toCurr((pricing.percentualFee * amountUsd) + pricing.fixedFee);
      var chargeUsd = toCurr(amountUsd + serviceFee);

      return {
        amountUsd: amountUsd,
        serviceFee: serviceFee,
        chargeUsd: chargeUsd
      };
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
      successModal: function (referenceNumber, transactionId, transactionType) {
        return successModal(referenceNumber, transactionId, transactionType);
      },

      calculatePricing: function (amountGhs, pricing) {
        return calculatePricing(amountGhs, pricing);
      }
    };
  });
