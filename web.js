'use strict';

require('newrelic');
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
// app.use(function(req, res, next) {
//   var schema = req.headers['x-forwarded-proto'];
//   if (schema === 'https') { return next();}
//   res.redirect('https://' + req.headers.host + req.url);
// });


// Dont cache
app.use(function (req, res, next) {
  res.set({
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    'Expires': '-1',
    'Pragma': 'no-cache'
  });
  next();
});

//Signup from Social Media
app.get('/auth/signup', function (req, res) {
  res.redirect('/#!' + req.url);
});

// Static Files Route for Angular App
app.use(gzippo.staticGzip('' + __dirname + '/dist', {
  maxAge: 1000,
  clientMaxAge: 1000
}));

app.listen(process.env.PORT || 9000);
