var express = require('express');
var router = express.Router();
var request = require('request');
var knex = require('../db/knex');

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
  knex('user_stats_preferences').select().where('user', req.user.id).innerJoin('stats', 'stats.id', 'user_stats_preferences.stat')
  .then(function(preferences){

    for(var i =0; i<preferences.length; i++){
      console.log(preferences[i].name);
      switch(preferences[i].name){
        case 'missHit':
            promiseArray.push(missHit(team1, team2));
            break;
        case 'boxScore':
            promiseArray.push(boxScore(team1, team2));
            break;
        case 'offEffOverTime':
            promiseArray.push(offEffOverTime(team1, team2));
            break;
        case 'defEffOverTime':
            promiseArray.push(defEffOverTime(team1, team2));
            break;
        case 'teamMisc':
            promiseArray.push(teamMisc(team1, team2));
            break;
        case 'efficiency':
            promiseArray.push(efficiency(team1, team2));
            break;
        case 'shotCharts':
            promiseArray.push(shotCharts(team1, team2));
            break;
        case 'sportsVu':
            promiseArray.push(boxScore(team1, team2));
            break;
        case 'team4factor':
            promiseArray.push(team4factor(team1, team2));
            break;
      }
    }

    console.log(promiseArray);
    Promise.all(promiseArray).then(function(results){
      toBeSent =JSON.stringify(results);
      res.json(toBeSent);
    });


  }).catch(function(err){
    console.log(err);
  })




});

module.exports = router;
