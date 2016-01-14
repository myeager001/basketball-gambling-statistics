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

    var results = {}
    results.title = "Misc";
    results.type = "Bar";
    results.options = {
      scaleBeginAtZero: false,
    }
    results.team1 = firstTeam;
    results.team2 = secondTeam;
    results.columnNames = [
      'Points Off Turnovers',
      'Second Chance Points',
      'Points In The Paint',
      'Fast Break Points'
    ];

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
                var pts_off_tov = 0; // Points Off Turnovers
                var pts_2nd_chance = 0; // Second Chance Points
                var pts_paint = 0; // Points In The Paint
                var pts_fb = 0; // Fast Break Points
                var count = 0;

                for (i=0;i<body2.length;i++) {
                  if (body2[i].pts_off_tov != '') {
                    pts_off_tov += JSON.parse(body2[i].pts_off_tov);
                  }
                  if (body2[i].pts_2nd_chance != '') {
                    pts_2nd_chance += JSON.parse(body2[i].pts_2nd_chance);
                  }
                  if (body2[i].pts_paint != '') {
                    pts_paint += JSON.parse(body2[i].pts_paint);
                  }
                  if (body2[i].pts_fb != '') {
                    pts_fb += JSON.parse(body2[i].pts_fb);
                  }

                  count++;
                }

                results.team1Stats = [pts_off_tov, pts_2nd_chance, pts_paint, pts_fb]
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
          request.post(options2, function(err, response, body) {
            if (!err && response.statusCode == 200) {

              var options2adv = {
                url: url_misc + "&team_id=" + body[0].id,
                json: true
              }
              request.post(options2adv, function(err, response, body2) {
                if (!err && response.statusCode == 200) {
                  var pts_off_tov = 0; // Points Off Turnovers
                  var pts_2nd_chance = 0; // Second Chance Points
                  var pts_paint = 0; // Points In The Paint
                  var pts_fb = 0; // Fast Break Points
                  var count = 0;

                  for (i=0;i<body2.length;i++) {
                    if (body2[i].pts_off_tov != '') {
                      pts_off_tov += JSON.parse(body2[i].pts_off_tov);
                    }
                    if (body2[i].pts_2nd_chance != '') {
                      pts_2nd_chance += JSON.parse(body2[i].pts_2nd_chance);
                    }
                    if (body2[i].pts_paint != '') {
                      pts_paint += JSON.parse(body2[i].pts_paint);
                    }
                    if (body2[i].pts_fb != '') {
                      pts_fb += JSON.parse(body2[i].pts_fb);
                    }

                    count++;
                  }

                  results.team2Stats = [pts_off_tov, pts_2nd_chance, pts_paint, pts_fb]
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
