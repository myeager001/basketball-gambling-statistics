var express = require('express');
var router = express.Router();
var request = require('request');
var efficiency = require('../algorithems/compareEff');
var team4factor = require('../algorithems/team4factor');


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


});

module.exports = router;
