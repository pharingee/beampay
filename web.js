'use strict';

var gzippo = require('gzippo');
var express = require('express');
var logger = require('morgan');

var nodeApp = express();

nodeApp.use(function(req, res, next) {
  var schema = req.headers['x-forwarded-proto'];
  if (schema === 'https') { return next();}
  res.redirect('https://' + req.headers.host + req.url);
});
nodeApp.use(logger('dev'));
nodeApp.use(gzippo.staticGzip('' + __dirname + '/dist'));

nodeApp.listen(process.env.PORT || 9000);
