var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.redirect('/search')
  }
  res.render('landing', { title: 'Express', authenticated: req.isAuthenticated()});
});

router.get('/login', function(req, res, next){
  res.render('landing', {title: 'login'});
});

module.exports = router;
