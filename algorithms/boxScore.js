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

    var results = [{
      team: firstTeam,
      scores: {
        fgm:0, //field goals made
        fga:0, // field goals attempted
        ftm:0, // free throws made
        fta:0, // free throws attempted
        blk:0, // blocks
        stl:0 // steals
      }
    }]

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

                for (i=0;i<body2.length;i++) {
                  if (body2[i].season == '2015') {
                    if (body2[i].fgm != '') {
                      results[0].scores.fgm += JSON.parse(body2[i].fgm);
                    }
                    if (body2[i].fga != '') {
                      results[0].scores.fga += JSON.parse(body2[i].fga);
                    }
                    if (body2[i].ftm != '') {
                      results[0].scores.ftm += JSON.parse(body2[i].ftm);
                    }
                    if (body2[i].fta != '') {
                      results[0].scores.fta += JSON.parse(body2[i].fta);
                    }
                    if (body2[i].blk != '') {
                      results[0].scores.blk += JSON.parse(body2[i].blk);
                    }
                    if (body2[i].stl != '') {
                      results[0].scores.stl += JSON.parse(body2[i].stl);
                    }

                    count++;
                  }
                }

                results[0].scores.fgm = results[0].scores.fgm / count;
                results[0].scores.fga = results[0].scores.fga / count;
                results[0].scores.ftm = results[0].scores.ftm / count;
                results[0].scores.fta = results[0].scores.fta / count;
                results[0].scores.blk = results[0].scores.blk / count;
                results[0].scores.stl = results[0].scores.stl / count;
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

          results.push({
            team: secondTeam,
            scores: {
              fgm:0,
              fga:0,
              ftm:0,
              fta:0,
              blk:0,
              stl:0
            }
          })
          request.post(options2, function(err, response, body) {
            if (!err && response.statusCode == 200) {
              var count = 0;

              var options2adv = {
                url: url_box + "&team_id=" + body[0].id,
                json: true
              }
              request.post(options2adv, function(err, response, body2) {
                if (!err && response.statusCode == 200) {
                  for (i=0;i<body2.length;i++) {
                    if (body2[i].season == '2015') {
                      if (body2[i].fgm != '') {
                        results[1].scores.fgm += JSON.parse(body2[i].fgm);
                      }
                      if (body2[i].fga != '') {
                        results[1].scores.fga += JSON.parse(body2[i].fga);
                      }
                      if (body2[i].ftm != '') {
                        results[1].scores.ftm += JSON.parse(body2[i].ftm);
                      }
                      if (body2[i].fta != '') {
                        results[1].scores.fta += JSON.parse(body2[i].fta);
                      }
                      if (body2[i].blk != '') {
                        results[1].scores.blk += JSON.parse(body2[i].blk);
                      }
                      if (body2[i].stl != '') {
                        results[1].scores.stl += JSON.parse(body2[i].stl);
                      }

                      count++;
                    }
                  }

                  results[1].scores.fgm = results[1].scores.fgm / count;
                  results[1].scores.fga = results[1].scores.fga / count;
                  results[1].scores.ftm = results[1].scores.ftm / count;
                  results[1].scores.fta = results[1].scores.fta / count;
                  results[1].scores.blk = results[1].scores.blk / count;
                  results[1].scores.stl = results[1].scores.stl / count;
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
