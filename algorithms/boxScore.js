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
    var url_box = "http://api.probasketballapi.com/boxscore/team" + apiKey;
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
    results.title = "Box Score";
    results.type = "Bar";
    results.options = {
      scaleBeginAtZero: false,
    }
    results.team1 = firstTeam;
    results.team2 = secondTeam;
    results.columnNames = [
      'Field Goals Made',
      'Field Goals Attempted',
      'Free Throws Made',
      'Free Throws Attempted',
      'Blocks',
      'Steals'
    ];

    function firstCall(){
      return new Promise(function(resolve, reject) {
        request.post(options1, function(err, response, body) {
          if (!err && response.statusCode == 200) {
            var count = 0;

            var options1adv = {
              url: url_box + "&team_id=" + body[0].id,
              json: true
            }
            request.post(options1adv, function(err, response, body2) {
              if (!err && response.statusCode == 200) {
                var fgm = 0; //field goals made
                var fga = 0; // field goals attempted
                var ftm = 0; // free throws made
                var fta = 0; // free throws attempted
                var blk = 0; // blocks
                var stl = 0; // steals

                for (i=0;i<body2.length;i++) {
                  if (body2[i].season == '2015') {
                    if (body2[i].fgm != '') {
                      fgm += JSON.parse(body2[i].fgm);
                    }
                    if (body2[i].fga != '') {
                      fga += JSON.parse(body2[i].fga);
                    }
                    if (body2[i].ftm != '') {
                      ftm += JSON.parse(body2[i].ftm);
                    }
                    if (body2[i].fta != '') {
                      fta += JSON.parse(body2[i].fta);
                    }
                    if (body2[i].blk != '') {
                      blk += JSON.parse(body2[i].blk);
                    }
                    if (body2[i].stl != '') {
                      stl += JSON.parse(body2[i].stl);
                    }

                    count++;
                  }
                }

                fgm = fgm / count;
                fga = fga / count;
                ftm = ftm / count;
                fta = fta / count;
                blk = blk / count;
                stl = stl / count;

                results.team1Stats = {data: [fgm, fga, ftm, fta, blk, stl]};
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
        if (secondTeam) {
          request.post(options2, function(err, response, body) {
            if (!err && response.statusCode == 200) {
              var count = 0;

              var options2adv = {
                url: url_box + "&team_id=" + body[0].id,
                json: true
              }
              request.post(options2adv, function(err, response, body2) {
                if (!err && response.statusCode == 200) {
                  var fgm = 0; //field goals made
                  var fga = 0; // field goals attempted
                  var ftm = 0; // free throws made
                  var fta = 0; // free throws attempted
                  var blk = 0; // blocks
                  var stl = 0; // steals

                  for (i=0;i<body2.length;i++) {
                    if (body2[i].season == '2015') {
                      if (body2[i].fgm != '') {
                        fgm += JSON.parse(body2[i].fgm);
                      }
                      if (body2[i].fga != '') {
                        fga += JSON.parse(body2[i].fga);
                      }
                      if (body2[i].ftm != '') {
                        ftm += JSON.parse(body2[i].ftm);
                      }
                      if (body2[i].fta != '') {
                        fta += JSON.parse(body2[i].fta);
                      }
                      if (body2[i].blk != '') {
                        blk += JSON.parse(body2[i].blk);
                      }
                      if (body2[i].stl != '') {
                        stl += JSON.parse(body2[i].stl);
                      }

                      count++;
                    }
                  }

                  fgm = fgm / count;
                  fga = fga / count;
                  ftm = ftm / count;
                  fta = fta / count;
                  blk = blk / count;
                  stl = stl / count;

                  results.team2Stats = {data:[fgm, fga, ftm, fta, blk, stl]};
                  resolve();
                } else {
                  reject(err);
                }
              })
            } else {
              reject(err);
            }
          }) //ends post
        } //ends if secondTeam
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
