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

    var results = {};
    results.title = "Sports VU";
    results.type = "Bar";
    results.options = {
      scaleBeginAtZero: false,
    }
    results.team1 = firstTeam;
    results.team2 = secondTeam;
    results.columnNames = [
      'Touches',
      'Secondary Assists',
      'Passes Made',
    ];



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
                var tchs = 0; // touches
                var sast = 0; // secondary assists
                var pass = 0; // passes made
                var count = 0;

                for (i=0;i<body2.length;i++) {
                  if (body2[i].season == '2015') {
                    if (body2[i].fgm != '') {
                      tchs += JSON.parse(body2[i].tchs);
                    }
                    if (body2[i].fga != '') {
                      sast += JSON.parse(body2[i].sast);
                    }
                    if (body2[i].ftm != '') {
                      pass += JSON.parse(body2[i].pass);
                    }

                    count++;
                  }
                }

                tchs = tchs / count;
                sast = sast / count;
                pass = pass / count;

                results.team1Stats = [tchs, sast, pass]

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
          request.post(options2, function(err, response, body) {
            if (!err && response.statusCode == 200) {
              var count = 9;

              var options1adv = {
                url: url_sport + "&team_id=" + body[0].id,
                json: true
              }
              request.post(options1adv, function(err, response, body2) {
                if (!err && response.statusCode == 200) {
                  var tchs = 0; // touches
                  var sast = 0; // secondary assists
                  var pass = 0; // passes made
                  var count = 0;

                  for (i=0;i<body2.length;i++) {
                    if (body2[i].season == '2015') {
                      if (body2[i].fgm != '') {
                        tchs += JSON.parse(body2[i].tchs);
                      }
                      if (body2[i].fga != '') {
                        sast += JSON.parse(body2[i].sast);
                      }
                      if (body2[i].ftm != '') {
                        pass += JSON.parse(body2[i].pass);
                      }

                      count++;
                    }
                  }

                  tchs = tchs / count;
                  sast = sast / count;
                  pass = pass / count;

                  results.team2Stats = [tchs, sast, pass];

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
