'use strict';

angular.module('app.transaction')
  .service('TransactionUtil', function (){
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

    return {
      getDescription: function (transaction) {
        return getDescription(transaction);
      },
      getFullName: function (shortName) {
        return getFullName(shortName);
      },
      getType: function (transaction) {
        return getType(transaction);
      }
    };
  });
