var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var knex = require('./db/knex');

require('dotenv').load();

var auth = require('./routes/auth');
var landing = require('./routes/landing');
var profile = require('./routes/profile');
var search = require('./routes/search');
var preferences = require('./routes/preferences');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', auth.router);
app.use('/', landing);
app.use('/preferences', ensureAuthenticated, preferences)
app.use('/search', ensureAuthenticated, hasPreferences, search);
app.use('/profile', ensureAuthenticated, profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

function hasPreferences(req, res, next){
  knex('users').select('preferences').where('username', req.user.username).first().then(function(result){
    if(result.preferences){
      return next();
    }
    res.render('preferences');
  });
}

module.exports = app;
