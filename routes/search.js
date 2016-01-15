var express = require('express');
var router = express.Router();
var request = require('request');

// algorithms
var efficiency = require('../algorithms/compareEff');
var team4factor = require('../algorithms/team4factor');
var shotCharts = require('../algorithms/shotCharts');
var sportsVu = require('../algorithms/SportsVu');
var boxScore = require('../algorithms/boxScore');
var teamMisc = require('../algorithms/teamMisc');
var offEffOverTime = require('../algorithms/offEffOverTime');
var defEffOverTime = require('../algorithms/deffEffOverTime');
var missHit = require('../algorithms/missHit');




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('search', {user: req.user});
});

router.post('/', function(req,res){
  var promiseArray=[]
  var team1 = req.body.firstTeam;
  var team2 = req.body.secondTeam;

  promiseArray.push(efficiency(team1, team2));
  promiseArray.push(boxScore(team1, team2));
  promiseArray.push(shotCharts(team1, team2));
  promiseArray.push(sportsVu(team1, team2));

  promiseArray.push(offEffOverTime(team1, team2));
  promiseArray.push(defEffOverTime(team1, team2));
  promiseArray.push(missHit(team1, team2));
  promiseArray.push(team4factor(team1, team2));
  promiseArray.push(teamMisc(team1, team2));

  Promise.all(promiseArray).then(function(results){
    toBeSent =JSON.stringify(results);
    res.json(toBeSent);
  });




});

module.exports = router;
