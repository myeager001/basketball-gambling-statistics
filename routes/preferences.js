var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('preferences');
});

router.post('/', function(req, res){
  res.render('search');
})


module.exports = router;
