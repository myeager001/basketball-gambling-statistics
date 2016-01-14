var request = require('request');
require('dotenv').load();

/*
The NBA SportsVU team stats resource includes all SportsVU statistics,
such as speed, touches, passes made, secondary assists, rebound chances, uncontested
and contested field goal attempts.
*/

module.exports = function(firstTeam, secondTeam){
  return new Promise(function(resolve, reject) {

    var apiKey = "?api_key=" + process.env.API_KEY;
    var url_sport = "http://api.probasketballapi.com/sportsvu/team" + apiKey;
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
      team: firstTeam,
      stats: {
        tchs: 0,
        sast: 0,
        pass: 0,
      }
    }]

    function firstCall(){
      return new Promise(function(resolve, reject) {
        request.post(options1, function(err, response, body) {
          if (!err && response.statusCode == 200) {
            var count = 9;

            var options1adv = {
              url: url_sport + "&team_id=" + body[0].id,
              json: true
            }
            request.post(options1adv, function(err, response, body2) {
              if (!err && response.statusCode == 200) {
                for (i=0;i<body2.length;i++) {
                  if (body2[i].season == '2015') {
                    if (body2[i].fgm != '') {
                      results[0].stats.tchs += JSON.parse(body2[i].tchs);
                    }
                    if (body2[i].fga != '') {
                      results[0].stats.sast += JSON.parse(body2[i].sast);
                    }
                    if (body2[i].ftm != '') {
                      results[0].stats.pass += JSON.parse(body2[i].pass);
                    }

                    count++;
                  }
                }

                results[0].stats.tchs = results[0].stats.tchs / count;
                results[0].stats.sast = results[0].stats.sast / count;
                results[0].stats.pass = results[0].stats.pass / count;


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
          results.push({team: secondTeam,
          stats: {
            tchs: 0,
            sast: 0,
            pass: 0,
          }})
          request.post(options2, function(err, response, body) {
            if (!err && response.statusCode == 200) {
              var count = 0;

              var options2adv = {
                url: url_sport + "&team_id=" + body[0].id,
                json: true
              }
              request.post(options2adv, function(err, response, body2) {
                if (!err && response.statusCode == 200) {
                  for (i=0;i<body2.length;i++) {
                    if (body2[i].season == '2015') {
                      if (body2[i].fgm != '') {
                        results[1].stats.tchs += JSON.parse(body2[i].tchs);
                      }
                      if (body2[i].fga != '') {
                        results[1].stats.sast += JSON.parse(body2[i].sast);
                      }
                      if (body2[i].ftm != '') {
                        results[1].stats.pass += JSON.parse(body2[i].pass);
                      }

                      count++;
                    }
                  }

                  results[1].stats.tchs = results[1].stats.tchs / count;
                  results[1].stats.sast = results[1].stats.sast / count;
                  results[1].stats.pass = results[1].stats.pass / count;

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
      console.log(results)
      resolve(results);
    }).catch(function(err){
      reject(err);
    });
  });
};
