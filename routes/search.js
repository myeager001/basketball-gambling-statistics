var express = require('express');
var router = express.Router();
var request = require('request');
var efficiency = require('../algorithms/compareEff');
var team4factor = require('../algorithms/team4factor');
var shotCharts = require('../algorithms/shotCharts');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('search', {user: req.user});
});

router.post('/', function(req,res){
  var team1 = req.body.firstTeam;
  var team2 = req.body.secondTeam;


  Promise.resolve(efficiency(team1, team2)).then(function(results){
    carray(results);
  });
  team4factor(team1, team2);
  shotCharts(team1, team2);



  res.redirect('/results');
});

module.exports = router;
