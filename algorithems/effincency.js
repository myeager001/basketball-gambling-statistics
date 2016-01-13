var request = require('request');
require('dotenv').load();

module.exports = function(home_team, away_team){

  var apiKey = "?api_key=" + process.env.API_KEY;
  var url_team = 'http://api.probasketballapi.com/team' + apiKey;
  var url_teamAdv = 'http://api.probasketballapi.com/advanced/team' + apiKey;
  var results = {}



  var team1 = home_team;
  var team2 = away_team;
  var team1id = "";
  var team2id = "";

  results.team1 = team1;
  results.team2 = team2;
  results.columnNames= ['off_eff', 'def_eff']

  var options1 = {
    url: url_team + "&team_abbrv=" + team1,
    json: true
  }

  var options2 = {
    url: url_team + "&team_abbrv=" + team2,
    json: true
  }
  function firstCall(){
    return new Promise(resolve, re)
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
        var sum_off = 0;
        var sum_def = 0;
        var count = 0
        if (!err && response.statusCode == 200) {
          for(var i = 0; i < body.length; i++){
            if(body[i].season==='2015'){
              count++;
              sum_off = sum_off + parseInt(body[i].off_rating)
              sum_def = sum_def + parseInt(body[i].def_rating)
            }
          }
          var avg_off = sum_off/count;
          var avg_def = sum_def/count;
          results.team1.data = [avg_off, avg_def]


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
      var sum_off = 0;
      var sum_def = 0;
      var count = 0;
      var options2adv = {
        url: url_teamAdv + "&team_id=" + body[0].id,
        json: true
      }
      request.post(options2adv, function(err, response, body) {
        if (!err && response.statusCode == 200) {
          for(var i = 0; i < body.length; i++){
            if(body[i].season==='2015'){
              count++;
              sum_off = sum_off + parseInt(body[i].off_rating)
              sum_def = sum_def + parseInt(body[i].def_rating)
            }
          }
          var avg_off = sum_off/count;
          var avg_def = sum_def/count;
          console.log('avg_off is' + avg_off);
          console.log('avg_def is' + avg_def);
          results.team2.data = [avg_off, avg_def]

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
  console.log('returning');
  console.log(results);
  return results

}
