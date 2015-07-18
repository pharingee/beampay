'use strict';

angular.module('app.settings')
  .service('SettingsUtil', function (){
    var changePrefContactDetails = function (newValue) {
      if (newValue === 'SMS') {
        $('#contact').attr('placeholder', 'Please enter your SMS no. e.g.: +233265086508');
        $('#contact').attr('type', 'text');
      } else if (newValue === 'WAP') {
        $('#contact').attr('placeholder', 'Please enter your WhatsApp no. e.g.: +233265086508');
        $('#contact').attr('type', 'text');
      } else if (newValue === 'PHON') {
        $('#contact').attr('placeholder', 'Please enter your phone no. e.g.: +233265086508');
        $('#contact').attr('type', 'text');
      } if (newValue === 'MAIL') {
        $('#contact').attr('placeholder', 'Please enter your email e.g.: email@domain.com');
        $('#contact').attr('type', 'email');
      }
    };

    return {
      changePrefContactDetails: function (newValue) {
        return changePrefContactDetails(newValue);
      }
    };
  });
