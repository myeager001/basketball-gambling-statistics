var request = require('request');
require('dotenv').load();

/*
The NBA player usage stats resource includes all of the
players usage stats while the player is on the court,
such as percent of team rebounds, field goal attempts,
three point attempts, free throw attempts, steals, and blocks.
*/

module.exports = function(firstTeam, secondTeam){
  return new Promise(function(resolve, reject) {

    var apiKey = "?api_key=" + process.env.API_KEY;
    var url_use = "http://api.probasketballapi.com/usage/player" + apiKey;
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

    var results = [{
      team: firstTeam
    }]

    function firstCall(){
      return new Promise(function(resolve, reject) {
        request.post(options1, function(err, response, body) {
          if (!err && response.statusCode == 200) {

            var options1adv = {
              url: url_use + "&team_id=" + body[0].id,
              json: true
            }
            request.post(options1adv, function(err, response, body2) {
              if (!err && response.statusCode == 200) {
                //console.log(body2[0])
                //
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
      return new Promise(function(resolve, reject) {
        if (secondTeam) {
          results.push({team: secondTeam})
          request.post(options2, function(err, response, body) {
            if (!err && response.statusCode == 200) {

              var options2adv = {
                url: url_use + "&team_id=" + body[0].id,
                json: true
              }
              request.post(options2adv, function(err, response, body2) {
                if (!err && response.statusCode == 200) {
                  //console.log(body2[0])
                  //
                  resolve();
                } else {
                  reject(err);
                }
              })
            } else {
              reject(err);
            }
          })
        }
      })
    }

    Promise.all([firstCall(),secondCall()]).then(function(){
      resolve(results);
    }).catch(function(err){
      reject(err);
    });
  });
};
