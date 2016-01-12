var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('search', {user: req.user});
});

router.post('/', function(req,res){
  console.log(req.body);
  res.redirect('/results');
});

module.exports = router;
