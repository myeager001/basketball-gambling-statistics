var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('search', {user: req.user});
});

var apiKey = process.env.API_KEY;
var url_team = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/team?api_key='+apiKey;

router.post('/', function(req,res){
  var team1 = req.body.searchTeam1;
  var team2 = req.body.searchTeam2;
  var options1 = {
    url: url_team + "&team_name=" + team1,
    json: true
  }
  console.log(options1);
  var options2 = {
    url: url_team + "&team_name=" + team2,
    json: true
  }
  request.post(options1, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      console.log(body);
      res.render('index')
    } else {
      console.log(response.statusCode);
      console.log(err);
    }
  })
  request.post(options2, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      console.log(body);
      res.render('index')
    } else {
      console.log(response.statusCode);
      console.log(err);
    }
  })
  res.redirect('/results');
});

module.exports = router;
