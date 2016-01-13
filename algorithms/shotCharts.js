var request = require('request');
require('dotenv').load();

module.exports = function(firstTeam, secondTeam){

  var apiKey = "?api_key=" + process.env.API_KEY;
  var url_shot = "http://api.probasketballapi.com/shots" + apiKey;
  var url_team = 'http://api.probasketballapi.com/team' + apiKey;

  var team1id = "";
  var team2id = "";

  var options1 = {
    url: url_team + "&team_abbrv=" + firstTeam,
    json: true
  }

  var options2 = {
    url: url_team + "&team_abbrv=" + secondTeam,
    json: true
  }

  request.post(options1, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      console.log(body);
      var options1adv = {
        url: url_shot + "&team_id=" + body[0].id,
        json: true
      }
      request.post(options1adv, function(err, response, body2) {
        if (!err && response.statusCode == 200) {

          // var count = 0;
          //
          // for (i=0;i<body2.length;i++) {
          //   if (body2[i].season === '2015') {
          //     count++;
          //     fourFactor1.fta_holder += JSON.parse(body2[i].fta_rate);
          //     fourFactor1.efg_holder += JSON.parse(body2[i].efg_pct);
          //     fourFactor1.oreb_holder += JSON.parse(body2[i].oreb_pct);
          //     fourFactor1.tr_holder += JSON.parse(body2[i].tm_tov_pct);
          //
          //   }
          // }
          // fourFactor1.fta_holder = fourFactor1.fta_holder / count;
          // fourFactor1.efg_holder = fourFactor1.efg_holder / count;
          // fourFactor1.oreb_holder = fourFactor1.oreb_holder / count;
          // fourFactor1.tr_holder = fourFactor1.tr_holder / count;
          // console.log(fourFactor1);
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
        url: url_shot + "&team_id=" + body[0].id,
        json: true
      }
      request.post(options2adv, function(err, response, body2) {
        if (!err && response.statusCode == 200) {
          console.log(body2);
          // var count = 0;
          //
          // for (i=0;i<body2.length;i++) {
          //   if (body2[i].season === '2015') {
          //     count++;
          //     fourFactor2.fta_holder += JSON.parse(body2[i].fta_rate);
          //     fourFactor2.efg_holder += JSON.parse(body2[i].efg_pct);
          //     fourFactor2.oreb_holder += JSON.parse(body2[i].oreb_pct);
          //     fourFactor2.tr_holder += JSON.parse(body2[i].tm_tov_pct);
          //
          //   }
          // }
          // fourFactor2.fta_holder = fourFactor2.fta_holder / count;
          // fourFactor2.efg_holder = fourFactor2.efg_holder / count;
          // fourFactor2.oreb_holder = fourFactor2.oreb_holder / count;
          // fourFactor2.tr_holder = fourFactor2.tr_holder / count;
          // console.log(fourFactor2);
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
};
