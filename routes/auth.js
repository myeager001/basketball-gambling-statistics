var express = require('express');
var router = express.Router();
var session = require('express-session');
var passport = require('passport');
GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').load();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

router.use(session({ secret: process.env.SESSION_SECRET }));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: process.env.HOST +"/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    return done(null, profile);
  })
);

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/users');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

module.exports={
   router: router,
   passport: passport,
   session: session,
 };
