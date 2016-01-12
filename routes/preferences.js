var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('preferences');
});

router.post('/', function(req, res, next){
  var preferences = JSON.stringify(req.body)
  console.log(preferences);
  knex('users').where('username', req.user.username).update({preferences: preferences}).then(function(){
    res.redirect('search');
  }).catch(function(error){
    next(error);
  });
});


module.exports = router;
