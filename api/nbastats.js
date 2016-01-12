
// API
// https://probasketballapi.com/docs/v2
require('dotenv').load();


var $url_playerStats = 'https://probasketballapi.com/stats/players';
var $url_players = 'https://probasketballapi.com/players';
var $url_team = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/team';
var $url_game = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/game';
var $url_shotCharts = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/shots';
var $url_playerBox = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/boxscore/player';

var $api_key = process.env.API_KEY;

//player search by first name (example test)
function searchPlayer(){
  var first = document.getElementById('recipeSearch').value;
  $.post($url_players + "?api_key=" + $api_key + '&first_name=' + first, function(player) {
    console.log(player);
  })
}


//team search by team name
 function searchTeam(){
   var team = document.getElementById('recipeSearch2').value;
   $.post($url_team + "?api_key=" + $api_key + '&team_name=' + team, function(team) {
     console.log(team);
   })
 }

 //game search
  function searchGame(){
    var date = document.getElementById('recipeSearch3').value;
    $.post($url_game + "?api_key=" + $api_key + '&date=' + date, function(match) {
      console.log(match);
    })
  }

getPlayer();
