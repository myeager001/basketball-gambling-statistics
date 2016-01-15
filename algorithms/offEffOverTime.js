var request = require('request');
require('dotenv').load();

/*
The NBA advanced team stats resource includes all of the typical
advanced box score statistics, such as Pace, Offensive and
Defensive ratings, and true shooting percentage.
*/

module.exports = function(home_team, away_team){
  return new Promise(function(resolve, reject){

    var apiKey = "?api_key=" + process.env.API_KEY;
    var url_team = 'http://api.probasketballapi.com/team' + apiKey;
    var url_teamAdv = 'http://api.probasketballapi.com/advanced/team' + apiKey;
    var results = {};
    results.type = "Line"
    results.options = {
      scaleBeginAtZero: false,
      pointDot : false,
    }
    var team1 = home_team;
    var team2 = away_team;

    results.title = "Yr long Off Eff";
    results.team1 = team1;
    results.team2 = team2;
    results.columnNames= [];
    results.team1Stats={}
    results.team2Stats={}
    var options1 = {
      url: url_team + "&team_abbrv=" + team1,
      json: true
    };

    var options2 = {
      url: url_team + "&team_abbrv=" + team2,
      json: true
    };

    function firstCall(){
      return new Promise(function(resolve, reject){

        request.post(options1, function(err, response, body) {
          if (!err && response.statusCode == 200) {

            var options1adv = {
              url: url_teamAdv + "&team_id=" + body[0].id,
              json: true
            };
            request.post(options1adv, function(err, response, body) {
              var sum_off = [];
              var sum_def = [];
              if (!err && response.statusCode == 200) {
                for(var i = 0; i < body.length; i++){
                  if(body[i].season==='2015'){
                    sum_off.push(parseInt(body[i].off_rating));
                    sum_def.push(parseInt(body[i].def_rating));
                    results.columnNames.push('')
                  }
                }

                results.team1Stats.off_rating= sum_off;
                // results.team1Stats.der_rating= sum_def;
                resolve();


              } else {
                reject(err);
              }
            })
          } else {
            reject(err);
          }
        })
      })
    }

    function secondCall(){
      if (team2) {
        return new Promise(function(resolve, reject){
          request.post(options2, function(err, response, body) {
            if (!err && response.statusCode == 200) {
              var sum_off = 0;
              var sum_def = 0;
              var count = 0;
              var options2adv = {
                url: url_teamAdv + "&team_id=" + body[0].id,
                json: true
              }
              request.post(options2adv, function(err, response, body) {
                var sum_off = [];
                var sum_def = [];
                if (!err && response.statusCode == 200) {
                  for(var i = 0; i < body.length; i++){
                    if(body[i].season==='2015'){
                      sum_off.push(parseInt(body[i].off_rating));
                      sum_def.push(parseInt(body[i].def_rating));
                    }
                  }

                  results.team2Stats.off_rating= sum_off;
                  // results.team2Stats.der_rating= sum_def;
                  resolve();

                } else {
                  reject(err);
                }
              });
            } else {
              reject(err);
            }
          });
        });
      }
    }

   Promise.all([firstCall(), secondCall()]).then(function(){
      resolve(results);
    }).catch(function(err){
      reject(err);
    });
  });

}
