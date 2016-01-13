var express = require('express');
var router = express.Router();
var request = require('request');

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
  var team1id = "";
  var team2id = "";

  console.log(req.body);

  var options1 = {
    url: url_team + "&team_abbrv=" + team1,
    json: true
  }

  var options2 = {
    url: url_team + "&team_abbrv=" + team2,
    json: true
  }

  request.post(options1, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      console.log(body);
      var options1adv = {
        url: url_teamAdv + "&team_id=" + body[0].id,
        json: true
      }
      request.post(options1adv, function(err, response, body) {
        console.log(options1adv);
        if (!err && response.statusCode == 200) {
          console.log(body);
        } else {
          console.log(response.statusCode);
          console.log(err);
        }
      })
    } else {
      console.log(response.statusCode);
      console.log(err);
    }
  })


  request.post(options2, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      console.log(body);
      var options2adv = {
        url: url_teamAdv + "&team_id=" + body[0].id,
        json: true
      }
      request.post(options2adv, function(err, response, body) {
        if (!err && response.statusCode == 200) {
          console.log(body);
        } else {
          console.log(response.statusCode);
          console.log(err);
        }
      })
    } else {
      console.log(response.statusCode);
      console.log(err);
    }
  })

  res.redirect('/results');
});

module.exports = router;
