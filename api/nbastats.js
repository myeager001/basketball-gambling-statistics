
// API
// https://probasketballapi.com/docs/v2
require('dotenv').load();


var $url_playerStats = 'https://probasketballapi.com/stats/players';
var $url_players = 'https://probasketballapi.com/players';
var $url_team = 'http://api.probasketballapi.com/team';
var $url_game = 'http://api.probasketballapi.com/game';
var $url_shotCharts = 'http://api.probasketballapi.com/shots';
var $url_playerBox = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/boxscore/player';

var $api_key = process.env.API_KEY;


function getPlayer() {
  $.ajax({
    type: "POST",
    url: $url_players + '?api_key=' + $api_key,
    dataType: "json",
    success: function (data) {
      console.log(data);
    }
  })
}


// function getPlayer2(first, last, playerNumber) {
//   $.post($url_players + "?api_key=" + $api_key + '&first_name=' + first _ '&last_name' + last, function(player) {
//     getStats(player, playerNumber)
//   })
// }
getPlayer();
