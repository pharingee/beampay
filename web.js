'use strict';

var gzippo = require('gzippo');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

// Middlewear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger('dev'));

// Force HTTPS
app.use(function(req, res, next) {
  var schema = req.headers['x-forwarded-proto'];
  if (schema === 'https') { return next();}
  res.redirect('https://' + req.headers.host + req.url);
});


// Dont cache
app.use(function (req, res, next) {
  res.set({
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    'Expires': '-1',
    'Pragma': 'no-cache'
  });
  next();
});

// Static Files Route for Angular App
app.use(gzippo.staticGzip('' + __dirname + '/dist', {
  maxAge: 1000,
  clientMaxAge: 1000
}));

// Share Email route
app.post('/email', function (req, res) {

  var emailBody = 'Hi '+ req.body.toname + ',\n\n' +
    'I thought you\'d like to know about Beam  - a way for Ghanaians abroad ' +
    'to care for loved ones back home by paying directly for school ' +
    'fees, hospital bills, phone airtime credit, and much more.\n\nFind out ' +
    'how: http://beampay.co';

  request.post('https://api.sendgrid.com/api/mail.send.json',{
      form: {
        'api_user': process.env.SENDGRID_USER,
        'api_key': process.env.SENDGRID_PASSWORD,
        subject: 'Take a look at Beam',
        text: emailBody,
        from: 'hello@beampay.co',

        to: req.body.to,
        toname: req.body.toname,
        fromname: req.body.fromname,
        replyto: req.body.replyto
      }
    },
    function (err, response, body) {
      if (err) {
        res.status(500).send(body);
      } else {
        res.status(response.statusCode).send(body);
      }
    }
  );
});

app.listen(process.env.PORT || 9000);
