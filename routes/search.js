var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('search', {user: req.user});
});

router.post('/', function(req,res){
  var team1 = req.body.
  console.log(req.body);
  console.log('hello')
  res.redirect('/results');
});

module.exports = router;
