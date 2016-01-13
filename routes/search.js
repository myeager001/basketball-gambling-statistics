var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('search', {user: req.user});
});

var apiKey = "?api_key=" + process.env.API_KEY;
var url_team = 'http://api.probasketballapi.com/team' + apiKey;
var url_teamAdv = 'http://api.probasketballapi.com/advanced/team' + apiKey;
var url_team4factor = 'http://api.probasketballapi.com/four_factor/team' + apiKey;

var destination = fs.createWriteStream('./public/assets/data.js')

destination.on('finish', function () {
  console.log('downloaded data')
})
destination.on('error', function (err) {
  console.log(err)
})

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
        url: url_team4factor + "&team_id=" + body[0].id,
        json: true
      }
      request.post(options1adv, function(err, response, body2) {
        if (!err && response.statusCode == 200) {
          console.log("found");
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

var holder = 0;

  request.post(options2, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      console.log(body);
      var options2adv = {
        url: url_team4factor + "&team_id=" + body[0].id,
        json: true
      }
      request.post(options2adv, function(err, response, body2) {
        if (!err && response.statusCode == 200) {
          var count = 0;
          console.log("found");
          for (i=0;i<body2.length;i++) {
            if (body2[i].season === '2015') {
              count++;
              console.log(i);
              holder += JSON.parse(body2[i].fta_rate);
            }
          }
          holder = holder / count;
          console.log(holder);
          console.log(body2[0]);
          console.log(body2[0].fta_rate)
        } else {
          console.log(response.statusCode);
          console.log(err);
        }
      })
        .pipe(destination)
    } else {
      console.log(response.statusCode);
      console.log(err);
    }
  })

  res.redirect('/results');
});

module.exports = router;
