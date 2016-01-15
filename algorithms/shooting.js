var request = require('request');
require('dotenv').load();

/*
The NBA box score player stats resource includes
all of the typical box score statistics that you are used
to seeing everywhere, such as points, field goal attempts,
field goals made, free throws attempted, free throws made,
rebounds, steals, and blocks.
*/

module.exports = function(firstTeam, secondTeam){
  return new Promise(function(resolve, reject) {

    var apiKey = "?api_key=" + process.env.API_KEY;
    var url_team = 'http://api.probasketballapi.com/team' + apiKey;
    var url_shot = "http://api.probasketballapi.com/shots" + apiKey;


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
    results.title = "Shot Zone Breakdown";
    results.type = "Line";
    results.options = {
    }
    results.team1 = firstTeam;
    results.team2 = secondTeam;
    results.columnNames = [
      'In The Paint (Non-RA)',
      'Restricted Area',
      'Mid-Range',
      'Above the Break 3'
    ];

    function firstCall(){
      return new Promise(function(resolve, reject) {
        request.post(options1, function(err, response, body) {
          if (!err && response.statusCode == 200) {
            var count = 0;

            var options1adv = {
              url: url_shot + "&team_id=" + body[0].id,
              json: true
            }
            request.post(options1adv, function(err, response, body2) {
              if (!err && response.statusCode == 200) {
                var inThePaint = 0;
                var resArea = 0;
                var midRange = 0;
                var above = 0;

                for (i=0;i<body2.length;i++) {
                  if (body2[i].shot_zone_basic == "In The Paint (Non-RA)") {
                    inThePaint++;
                  }
                  if (body2[i].shot_zone_basic == "Restricted Area") {
                    resArea++;
                  }
                  if (body2[i].shot_zone_basic == "Mid-Range") {
                    midRange++;
                  }
                  if (body2[i].shot_zone_basic == "Above the Break 3") {
                    above++;
                  }

                  count++;
                }

                results.team1Stats = {data: [inThePaint, resArea, midRange, above]};
                //
                resolve();
              } else {
                reject(err);
              }
            })
          } else {
            reject(err);
          }
        }) //ends post
      }) //ends return promise
    } // ends first call

    function secondCall(){
      return new Promise(function(resolve, reject) {
          request.post(options2, function(err, response, body) {
            if (!err && response.statusCode == 200) {
              var count = 0;

              var options2adv = {
                url: url_shot + "&team_id=" + body[0].id,
                json: true
              }
              request.post(options2adv, function(err, response, body2) {
                if (!err && response.statusCode == 200) {
                  var inThePaint = 0;
                  var resArea = 0;
                  var midRange = 0;
                  var above = 0;

                  for (i=0;i<body2.length;i++) {
                    if (body2[i].shot_zone_basic == "In The Paint (Non-RA)") {
                      inThePaint++;
                    }
                    if (body2[i].shot_zone_basic == "Restricted Area") {
                      resArea++;
                    }
                    if (body2[i].shot_zone_basic == "Mid-Range") {
                      midRange++;
                    }
                    if (body2[i].shot_zone_basic == "Above the Break 3") {
                      above++;
                    }

                    count++;
                  }

                  results.team2Stats = {data: [inThePaint, resArea, midRange, above]};
                  //
                  resolve();
                } else {
                  reject(err);
                }
              })
            } else {
              reject(err);
            }
          }) //ends post
      }) // ends return promise
    } // ends second call

    Promise.all([firstCall(),secondCall()]).then(function(){
      console.log(results);
      resolve(results);
    }).catch(function(err){
      reject(err);
    });
  });
};
