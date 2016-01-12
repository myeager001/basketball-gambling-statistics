var express = require('express');
var router = express.Router();
var results = require('./results');
var request = require('request');

require('dotenv').load();

//
// var $url_playerStats = 'https://probasketballapi.com/stats/players';
// var $url_players = 'https://probasketballapi.com/players';
// var $url_team = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/team';
// var $url_game = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/game';
// var $url_shotCharts = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/shots';
// var $url_playerBox = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/boxscore/player';
//
// var $api_key = process.env.API_KEY;
//
// //player search by first name (example test)
// function searchPlayer(){
//   var first = document.getElementById('searchName').value;
//   $.post($url_players + "?api_key=" + $api_key + '&first_name=' + first, function(player) {
//     console.log(player);
//   })
// }

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('search', {user: req.user});
});





module.exports = router;
