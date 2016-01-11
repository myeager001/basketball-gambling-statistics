var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', authenticated: req.isAuthenticated()});
});

router.get('/login', function(req, res, next){
  res.render('index', {title: 'login'});
});

module.exports = router;