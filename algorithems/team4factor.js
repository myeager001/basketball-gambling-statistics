var request = require('request');
require('dotenv').load();

module.exports = function(firstTeam, secondTeam){

  var apiKey = "?api_key=" + process.env.API_KEY;
  var url_team = 'http://api.probasketballapi.com/team' + apiKey;
  var url_teamAdv = 'http://api.probasketballapi.com/advanced/team' + apiKey;
  var url_team4factor = 'http://api.probasketballapi.com/four_factor/team' + apiKey;

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

  // request.post(options1, function(err, response, body) {
  //   if (!err && response.statusCode == 200) {
  //     console.log(body);
  //     var options1adv = {
  //       url: url_team4factor + "&team_id=" + body[0].id,
  //       json: true
  //     }
  //     request.post(options1adv, function(err, response, body2) {
  //       if (!err && response.statusCode == 200) {
  //         console.log("found");
  //       } else {
  //         console.log(response.statusCode);
  //         console.log(err);
  //       }
  //     })
  //   } else {
  //     console.log(response.statusCode);
  //     console.log(err);
  //   }
  // })

var fourFactor = {
  fta_holder: 0,
  efg_holder: 0,
  tr_holder: 0,
  oreb_holder: 0

}


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

          for (i=0;i<body2.length;i++) {
            if (body2[i].season === '2015') {
              count++;
              fourFactor.fta_holder += JSON.parse(body2[i].fta_rate);
              fourFactor.efg_holder += JSON.parse(body2[i].efg_pct);
              fourFactor.oreb_holder += JSON.parse(body2[i].oreb_pct);
              fourFactor.tr_holder += JSON.parse(body2[i].tm_tov_pct);

            }
          }
          fourFactor.fta_holder = fourFactor.fta_holder / count;
          fourFactor.efg_holder = fourFactor.efg_holder / count;
          fourFactor.oreb_holder = fourFactor.oreb_holder / count;
          fourFactor.tr_holder = fourFactor.tr_holder / count;
          console.log(fourFactor);
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
