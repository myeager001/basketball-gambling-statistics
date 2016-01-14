var request = require('request');
require('dotenv').load();

/*
The NBA four factor team stats resource includes all of the four factor statistics,
 effective shooting percentage, free throw attempt rate, turnover ratio, and offensive rebound percentage.
*/

module.exports = function(firstTeam, secondTeam){
  return new Promise(function(resolve, reject){

    var apiKey = "?api_key=" + process.env.API_KEY;
    var url_team = 'http://api.probasketballapi.com/team' + apiKey;
    var url_teamAdv = 'http://api.probasketballapi.com/advanced/team' + apiKey;
    var url_team4factor = 'http://api.probasketballapi.com/four_factor/team' + apiKey;

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
      fourfact: {
        fta_holder: 0,
        efg_holder: 0,
        tr_holder: 0,
        oreb_holder: 0}
      }]

      function firstCall(){
        return new Promise(function(resolve, reject) {
          request.post(options1, function(err, response, body) {
            if (!err && response.statusCode == 200) {

              var options1adv = {
                url: url_team4factor + "&team_id=" + body[0].id,
                json: true
              }
              request.post(options1adv, function(err, response, body2) {
                if (!err && response.statusCode == 200) {
                  var count = 0;

                  for (i=0;i<body2.length;i++) {
                    if (body2[i].season === '2015') {
                      count++;
                      results[0].fourfact.fta_holder += JSON.parse(body2[i].fta_rate);
                      results[0].fourfact.efg_holder += JSON.parse(body2[i].efg_pct);
                      results[0].fourfact.oreb_holder += JSON.parse(body2[i].oreb_pct);
                      results[0].fourfact.tr_holder += JSON.parse(body2[i].tm_tov_pct);

                    }
                  }
                  results[0].fourfact.fta_holder = results[0].fourfact.fta_holder / count;
                  results[0].fourfact.efg_holder = results[0].fourfact.efg_holder / count;
                  results[0].fourfact.oreb_holder = results[0].fourfact.oreb_holder / count;
                  results[0].fourfact.tr_holder = results[0].fourfact.tr_holder / count;
                  
                  resolve();
                } else {
                  reject(err);
                }
              })
            } else {
              reject(err);
            }
          }) //ends post
        }) //ends return
      } // ends firstCall


      function secondCall(){
        return new Promise(function(resolve, reject) {
          if (secondTeam) {
            results.push({name: secondTeam,
               fourfact: {
                  fta_holder: 0,
                  efg_holder: 0,
                  tr_holder: 0,
                  oreb_holder: 0}})
            request.post(options2, function(err, response, body) {
              if (!err && response.statusCode == 200) {

                var options2adv = {
                  url: url_team4factor + "&team_id=" + body[0].id,
                  json: true
                }
                request.post(options2adv, function(err, response, body2) {
                  if (!err && response.statusCode == 200) {
                    var count = 0;

                    for (i=0;i<body2.length;i++) {
                      if (body2[i].season === '2015') {
                        count++;
                        results[1].fourfact.fta_holder += JSON.parse(body2[i].fta_rate);
                        results[1].fourfact.efg_holder += JSON.parse(body2[i].efg_pct);
                        results[1].fourfact.oreb_holder += JSON.parse(body2[i].oreb_pct);
                        results[1].fourfact.tr_holder += JSON.parse(body2[i].tm_tov_pct);

                      }
                    }
                    results[1].fourfact.fta_holder = results[1].fourfact.fta_holder / count;
                    results[1].fourfact.efg_holder = results[1].fourfact.efg_holder / count;
                    results[1].fourfact.oreb_holder = results[1].fourfact.oreb_holder / count;
                    results[1].fourfact.tr_holder = results[1].fourfact.tr_holder / count;
                    //console.log(results);
                    resolve();
                  } else {
                    reject(err);
                  }
                })
              } else {
                reject(err);
              }
            }); //ends post
          } // ends if
        }); // ends return
      } //ends secondCall

      Promise.all([firstCall(), secondCall()]).then(function(){
        resolve(results);
      }).catch(function(err){
        reject(err);
      });
  }); //ends return promise
};
