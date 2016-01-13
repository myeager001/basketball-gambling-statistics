var express = require('express');
var router = express.Router();
var request = require('request');
var efficiency = require('../algorithems/effincency');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('search', {user: req.user});
});

var apiKey = "?api_key=" + process.env.API_KEY;
var url_team = 'http://api.probasketballapi.com/team' + apiKey;
var url_teamAdv = 'http://api.probasketballapi.com/advanced/team' + apiKey;


router.post('/', function(req,res){
  var team1 = req.body.firstTeam;
  var team2 = req.body.secondTeam;
  efficiency(team1, team2);
  res.redirect('/results');
});

module.exports = router;
