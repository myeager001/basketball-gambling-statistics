var request = require('request');
require('dotenv').load();

/*
The NBA Shot Charts resource returns information about every shot taken in the NBA.
 It returns the location in x,y format, the shot type (hook, jump, layup, dunk),
  and whether or not the shot was made, as well as when the shot was taken in the game.
*/

module.exports = function(firstTeam, secondTeam){
  return new Promise(function(resolve, reject) {

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

    var results = {};
    results.title = "Shot Chart";
    results.type = "Radar";
    results.options = {
    }
    results.team1 = firstTeam;
    results.team2 = secondTeam;
    results.columnNames = [
      'Jump Hook Shot',
      'Driving Jump Shot',
      'Driving Layup Shot',
      'Reverse Layup Shot',
      'Floating Jump Shot'
    ];

    function firstCall(){
      return new Promise(function(resolve, reject) {
        request.post(options1, function(err, response, body) {
          if (!err && response.statusCode == 200) {

            var options1adv = {
              url: url_shot + "&team_id=" + body[0].id,
              json: true
            }
            request.post(options1adv, function(err, response, body2) {
              if (!err && response.statusCode == 200) {
                var jhs = 0;
                var djs = 0;
                var dls = 0;
                var rls = 0;
                var fjs = 0;
                var count = 0;

                for (i=0;i<50;i++) {
                  console.log(body2[i]);
                }

                for(i=0;i<body2.length;i++) {
                  if (body2[i].action_type == 'Jump Hook Shot') {
                    jhs++;
                  }
                  if (body2[i].action_type == 'Driving Jump Shot') {
                    djs++;
                  }
                  if (body2[i].action_type == 'Driving Layup Shot') {
                    dls++;
                  }
                  if (body2[i].action_type == 'Reverse Layup Shot') {
                    rls++;
                  }
                  if (body2[i].action_type == 'Floating Jump Shot') {
                    fjs++;
                  }
                  count++;
                }

                results.team1Stats = { data: [jhs, djs, dls, rls, fjs]};

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
                url: url_shot + "&team_id=" + body[0].id,
                json: true
              }
              request.post(options2adv, function(err, response, body2) {
                if (!err && response.statusCode == 200) {
                  var jhs = 0;
                  var djs = 0;
                  var dls = 0;
                  var rls = 0;
                  var fjs = 0;
                  var count = 0;

                  for (i=0;i<50;i++) {
                    console.log(body2[i]);
                  }

                  for(i=0;i<body2.length;i++) {
                    if (body2[i].action_type == 'Jump Hook Shot') {
                      jhs++;
                    }
                    if (body2[i].action_type == 'Driving Jump Shot') {
                      djs++;
                    }
                    if (body2[i].action_type == 'Driving Layup Shot') {
                      dls++;
                    }
                    if (body2[i].action_type == 'Reverse Layup Shot') {
                      rls++;
                    }
                    if (body2[i].action_type == 'Floating Jump Shot') {
                      fjs++;
                    }
                    count++;
                  }

                  results.team2Stats = { data: [jhs, djs, dls, rls, fjs]};

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
