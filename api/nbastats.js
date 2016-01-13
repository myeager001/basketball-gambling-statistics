var express = require('express');
var router = express.Router();
var request = require('request');
// API
// https://probasketballapi.com/docs/v2

var request = require('request');
require('dotenv').load();


var first = document.getElementById('searchName').value;
var request=require('request');
request(, callback);



var options = {
  method: 'POST',
  uri: "https://probasketballapi.com/stats/players&first_name=Mike",
  form: {
    field1: 'data'
  }
}



  function callback(err, res, body) {
  if (!err && res.statusCode == 200) {
    console.log(body);
  } else {
    console.log(res.statusCode);
    console.log(err);
  }
}



var $url_playerStats = 'http://api.probasketballapi.com/player';
var $url_team = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/team';
var $url_game = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/game';
var $url_shotCharts = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/shots';
var $url_playerBox = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/boxscore/player';

var $api_key = process.env.API_KEY;



function callback(err, res, body) {
  if (!err && res.statusCode == 200) {
    console.log(body);
  } else {
    console.log(res.statusCode);
    console.log(err);
  }
}


router.post('/', function(req, res) {
  var first = req.body.searchFirst;
  var last = req.body.searchLast;
  var options = {
    url: urlDone + "&first_name=" + first + "&last_name=" + last,
    json: true
  }
  request.post(options, callback)
})
//
// //player search by first name (example test)
// function searchPlayer(){
//   var first = document.getElementById('searchName').value;
//   $.post($url_players + "?api_key=" + $api_key + '&first_name=' + first, function(player) {
//     console.log(player);
//   })
// }
//
// var playerSearch = document.getElementById('playerSearchButton');
// playerSearch.addEventListener('click', searchPlayer);
//
//
// //team search by team name
//  function searchTeam(){
//    var team = document.getElementById('recipeSearch2').value;
//    $.post($url_team + "?api_key=" + $api_key + '&team_name=' + team, function(team) {
//      console.log(team);
//    })
//  }
//
//  //game search
//   function searchGame(){
//     var date = document.getElementById('recipeSearch3').value;
//     $.post($url_game + "?api_key=" + $api_key + '&date=' + date, function(match) {
//       console.log(match);
//     })
//   }
