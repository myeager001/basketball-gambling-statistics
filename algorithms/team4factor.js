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

    var results = {};
    results.title = "Team Four Factor";
    results.type = "Bar";
    results.options = {
      scaleBeginAtZero: false,
    }
    results.team1 = firstTeam;
    results.team2 = secondTeam;
    results.columnNames = [
      'Free Throw Attempt Rate',
      'Effective Shooting Percentage',
      'Turnover Ratio',
      'Offensive Rebound Percentage'
    ];


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
                  for (i=0;i<body2.length;i++) {
                    var fta_holder = 0; //free throw attempt rate
                    var efg_holder = 0; // effective shooting percentage
                    var tr_holder =  0; // turnover ratio
                    var oreb_holder = 0; // offensive rebound percentage
                    var count = 0;

                    if (body2[i].season === '2015') {
                      fta_holder += JSON.parse(body2[i].fta_rate);
                      efg_holder += JSON.parse(body2[i].efg_pct);
                      oreb_holder += JSON.parse(body2[i].oreb_pct);
                      tr_holder += JSON.parse(body2[i].tm_tov_pct);

                      count++;

                    }
                  }
                  fta_holder = fta_holder / count;
                  efg_holder = efg_holder / count;
                  oreb_holder = oreb_holder / count;
                  tr_holder = tr_holder / count;

                  results.team1Stats = {data: [fta_holder, efg_holder, tr_holder, oreb_holder]};
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
            request.post(options2, function(err, response, body) {
              if (!err && response.statusCode == 200) {
                var options2adv = {
                  url: url_team4factor + "&team_id=" + body[0].id,
                  json: true
                }
                request.post(options2adv, function(err, response, body2) {
                  if (!err && response.statusCode == 200) {
                    for (i=0;i<body2.length;i++) {
                      var fta_holder = 0; //free throw attempt rate
                      var efg_holder = 0; // effective shooting percentage
                      var tr_holder =  0; // turnover ratio
                      var oreb_holder = 0; // offensive rebound percentage
                      var count = 0;

                      if (body2[i].season === '2015') {
                        fta_holder += JSON.parse(body2[i].fta_rate);
                        efg_holder += JSON.parse(body2[i].efg_pct);
                        oreb_holder += JSON.parse(body2[i].oreb_pct);
                        tr_holder += JSON.parse(body2[i].tm_tov_pct);

                        count++;

                      }
                    }
                    fta_holder = fta_holder / count;
                    efg_holder = efg_holder / count;
                    oreb_holder = oreb_holder / count;
                    tr_holder = tr_holder / count;

                    results.team2Stats = {data: [fta_holder, efg_holder, tr_holder, oreb_holder]};
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
