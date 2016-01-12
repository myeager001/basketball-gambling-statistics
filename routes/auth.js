var express = require('express');
var router = express.Router();
var session = require('express-session');
var passport = require('passport');
var bcrypt = require('bcrypt');
var knex = require('../db/knex');
LocalStrategy = require('passport-local');
GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
FacebookStrategy = require('passport-facebook').Strategy;
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

//local strategy
passport.use(new LocalStrategy(function(username, password, done){
  knex('users').select().where('username', username).first()
  .then(function(user){
    if(user.is_local){
        if(user && bcrypt.compareSync(password, user.hash)){
          return done(null, user);
        }else{
          return done(null, false, {message: 'invalid username or password'});
        }
      }return done(null, false, {message: 'please log in using facebook or google'})
    })
    .catch(function(error){
    console.log(error);
    return done(error);
  });
}));

//google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: process.env.HOST + "/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    for(var i =0; i<profile.emails.length; i++){
      if(profile.emails[i].type==='account'){
        var username = profile.emails[i].value;
        knex('users').select().where('username', username).first().then(function(user){
          if(user){
            return done(null, user);
          }else{
            knex('users').insert({username: username, is_local: false}, 'id')
            .then(function(id){
              knex('users').select().where('id', id[0]).first().then(function(user){
                return done(null, user);
              });
            });
          }
        });
      }
    };
  })
);

//facebook strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.HOST + "/auth/facebook/callback",
    enableProof: false,
    profileFields: ['email']
  },
  function(accessToken, refreshToken, profile, done) {
      var username = profile.emails[0].value;
      knex('users').select().where('username', username).first().then(function(user){
        if(user){
          return done(null, user);
        }else{
          knex('users').insert({username: username, is_local: false}, 'id')
          .then(function(id){
            knex('users').select().where('id', id[0]).first().then(function(user){
              return done(null, user);
            });
          });
        }
      });
  })
);

//localstratgey routes
router.post('/auth/login',
 passport.authenticate('local', {failureRedirect: '/login'}),
 function(req, res){
   res.redirect('/search');
});

router.post('/auth/signup', function(req, res){
  knex('users').select().where('username', req.body.username).first().then(function(user){
    if(!user){
      knex('users').insert({username: req.body.username, hash: bcrypt.hashSync(req.body.password, 10), is_local: true})
      .then(function(){
        res.redirect('/');
      }).catch(function(){
        var error = "Can't add user to database";
        res.render('landing', {error: error});
      });
    }else{
      var error = 'Username already exits. Try loging in with Facebook of Google';
      res.render('landing', {error: error});
    }
    }).catch(function(){
      var error = "Can't add user to database";
      res.render('landing', {error: error});
    });
});


//routes for google with callback
router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.profile.emails.read'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/search');
  });


//routes for facebook with callback
router.get('/auth/facebook',
  passport.authenticate('facebook', {scope: ['email', 'user_friends']}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/search');
  });


//all strategies logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

module.exports={
   router: router,
   passport: passport,
   session: session,
 };
