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
var error


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
  console.log(username);
  console.log(password);
  if(username && password){
    knex('users').select().where('username', username).first()
    .then(function(user){
      if(user){
        if(user.is_local){
            if(user && bcrypt.compareSync(password, user.hash)){
              return done(null, user);
            }else {
              return done("Invalid username or password", false)
            }
          }else{
            console.log
            return done("please log in with Facebook of Google", false)
          }
        }
        else{
          return done("Invalid username or password", false)
        }
      }).catch(function(error){
        console.log(error);
        return done(error);
      });
  }else{
    return done("please fill in both username and password", false)
  }
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
router.post('/auth/login', function(req, res, next){
 passport.authenticate('local', function(err, user, info){
   console.log(err);
   console.log(user)
   if(user){
      req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/search');
     })
   }else{

     return res.render('landing', {error: err});
   }
 })(req, res, next);
});

router.post('/auth/signup', function(req, res){
  if(req.body.username && req.body.password){
    knex('users').select().where('username', req.body.username).first().then(function(user){
      if(!user){
        knex('users').insert({username: req.body.username, hash: bcrypt.hashSync(req.body.password, 10), is_local: true})
        .then(function(){
          res.redirect('/');
        }).catch(function(){
          error = "Can't add user to database";
          res.render('landing', {error: error});
        });
      }else{
        error = 'Username already exits. Try loging in with Facebook of Google';
        res.render('landing', {error: error});
      }
      }).catch(function(){
        error = "Can't add user to database";
        res.render('landing', {error: error});
      });
  }else{
    error = "please fill in both username and password"
    res.render('landing', {error: error})
  }
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
