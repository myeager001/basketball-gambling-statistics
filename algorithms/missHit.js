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
    results.title = "Made vs Missed Shots";
    results.type = "Bar";
    results.options = {
    }
    results.team1 = firstTeam;
    results.team2 = secondTeam;
    results.columnNames = [
      'Missed Shots',
      'Made Shot'
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
                var missed = 0;
                var made = 0;
                var count = 0;

                for(i=0;i<body2.length;i++) {
                  if (body2[i].event_type == 'Missed Shot') {
                    missed++;
                  }
                  if (body2[i].event_type == 'Made Shot') {
                    made++;
                  }
                  count++;
                }

                results.team1Stats = { data: [missed, made]};

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
          request.post(options2, function(err, response, body) {
            if (!err && response.statusCode == 200) {

              var options2adv = {
                url: url_shot + "&team_id=" + body[0].id,
                json: true
              }
              request.post(options2adv, function(err, response, body2) {
                if (!err && response.statusCode == 200) {
                  var missed = 0;
                  var made = 0;
                  var count = 0;

                  for(i=0;i<body2.length;i++) {
                    if (body2[i].event_type == 'Missed Shot') {
                      missed++;
                    }
                    if (body2[i].event_type == 'Made Shot') {
                      made++;
                    }
                    count++;
                  }

                  results.team2Stats = { data: [missed, made]};

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

    Promise.all([firstCall(),secondCall()]).then(function(){
      resolve(results);
    }).catch(function(err){
      reject(err);
    });
  });
};
