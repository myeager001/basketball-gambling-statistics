var express = require('express');
var router = express.Router();
var request = require('request');
var efficiency = require('../algorithms/compareEff');
var team4factor = require('../algorithms/team4factor');
var shotCharts = require('../algorithms/shotCharts');
var gameScores = require('../algorithms/gameScores');
var sportsVu = require('../algorithms/sportsVu');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('search', {user: req.user});
});

router.post('/', function(req,res){
  console.log(req.body);
  var team1 = req.body.firstTeam;
  var team2 = req.body.secondTeam;

  Promise.resolve(efficiency(team1, team2)).then(function(results){

    var array = [];
    array.push(results);
    toBeSent =JSON.stringify(array);
    console.log(toBeSent);
    res.json(toBeSent);
  });
  team4factor(team1, team2);



    // carray(results);
  });
  Promise.resolve(team4factor(team1, team2)).then(function(results){
    // nothing
  });
  Promise.resolve(shotCharts(team1, team2)).then(function(results){
    // nothing
  });
  Promise.resolve(gameScores(team1, team2)).then(function(results){
    // nothing
  });
  Promise.resolve(sportsVu(team1, team2)).then(function(results){
    // nothing
  });

  res.redirect('/results');

});

module.exports = router;
