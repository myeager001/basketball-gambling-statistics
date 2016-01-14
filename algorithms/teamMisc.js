var request = require('request');
require('dotenv').load();

/*
The NBA misc team stats resource includes all of the misc
boxscore statistics, such as second chance points,
points in the paint, fast break points, and points off turnovers.
*/

module.exports = function(firstTeam, secondTeam){
  return new Promise(function(resolve, reject) {

    var apiKey = "?api_key=" + process.env.API_KEY;
    var url_misc = "http://api.probasketballapi.com/misc/team" + apiKey;
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
              url: url_misc + "&team_id=" + body[0].id,
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
                url: url_misc + "&team_id=" + body[0].id,
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
