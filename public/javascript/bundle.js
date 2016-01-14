
$(document).ready(function(){



  $('#searchButton').on('click', function(e){
    e.preventDefault();
    var team1 = $('.searchTeam1').val();
    var team2 = $('.searchTeam2').val();
    $('#team1image').css('background-image', 'url(/assets/team_icons/'+team1 + '.png)');
    $('#team2image').css('background-image', 'url(/assets/team_icons/'+team2 + '.png)');
    $.ajax({
      url: getAPIHost() +'/search',
      method: 'post',
      data: {firstTeam: team1, secondTeam: team2},
    }).done(function(data){
      charts = JSON.parse(data);
      console.log(charts);
      for(var i = 0; i < charts.length; i++){
          options = charts[i].options
          graphType = charts[i].type;
          data = {
          labels: charts[i].columnNames,
          datasets: [
            {
              fillColor: "7f0000",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              label: charts[i].team1,
              data: charts[i].team1Stats,
            },
            {
              fillColor: "00007f",
              strokeColor: "rgba(151,187,205,0.8)",
              highlightFill: "rgba(151,187,205,0.75)",
              highlightStroke: "rgba(151,187,205,1)",
              label: charts[i].team2,
              data: charts[i].team2Stats,
            }
          ]
        }
        var canvas = document.createElement("canvas");
        canvas.width=400;
        canvas.height=400;
        canvas.id='canvas'+i
        console.log(data)
        console.log(canvas);
        var div = document.getElementById('resultsDiv');
        div.appendChild(canvas);
        var tobo = document.getElementById("canvas"+i);
        console.log(tobo);
        var ctx = tobo.getContext('2d');
        if(graphType === "Bar"){
          var myNewChart = new Chart(ctx).Bar(data, options);
        }if(graphType === "line"){
          var myNewChart = new Chart(ctx).Line(data, options);
        }if(graphType === "Radar"){
          var myNewChart = new Chart(ctx).Radar(data, options);
        }if(graphType === "Polar"){
          var myNewChart = new Chart(ctx).PolarArea(data, options);
        }if(graphType === "Pie"){
          var myNewChart = new Chart(ctx).Pie(data, options);

        }
      }
      })
    })

  })

  function getAPIHost() {
    if(window.location.hostname == 'localhost') {
      return "http://localhost:3000";
    } else {
      return "https://basket-stats.herokuapp.com"
    }
  }

$(document).ready(function(){
  $('.action').on('click', function(e){
    console.log('here1')
    var tag = '.'+$(this).text();
    $('.active').toggleClass('active');
    $(tag).toggleClass('active');
  });



})

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyIsInRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuXG5cbiAgJCgnI3NlYXJjaEJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdGVhbTEgPSAkKCcuc2VhcmNoVGVhbTEnKS52YWwoKTtcbiAgICB2YXIgdGVhbTIgPSAkKCcuc2VhcmNoVGVhbTInKS52YWwoKTtcbiAgICAkKCcjdGVhbTFpbWFnZScpLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICd1cmwoL2Fzc2V0cy90ZWFtX2ljb25zLycrdGVhbTEgKyAnLnBuZyknKTtcbiAgICAkKCcjdGVhbTJpbWFnZScpLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICd1cmwoL2Fzc2V0cy90ZWFtX2ljb25zLycrdGVhbTIgKyAnLnBuZyknKTtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBnZXRBUElIb3N0KCkgKycvc2VhcmNoJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgZGF0YToge2ZpcnN0VGVhbTogdGVhbTEsIHNlY29uZFRlYW06IHRlYW0yfSxcbiAgICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgY2hhcnRzID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKGNoYXJ0cyk7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2hhcnRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICBvcHRpb25zID0gY2hhcnRzW2ldLm9wdGlvbnNcbiAgICAgICAgICBncmFwaFR5cGUgPSBjaGFydHNbaV0udHlwZTtcbiAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgIGxhYmVsczogY2hhcnRzW2ldLmNvbHVtbk5hbWVzLFxuICAgICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogXCI3ZjAwMDBcIixcbiAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwicmdiYSgyMjAsMjIwLDIyMCwwLjgpXCIsXG4gICAgICAgICAgICAgIGhpZ2hsaWdodEZpbGw6IFwicmdiYSgyMjAsMjIwLDIyMCwwLjc1KVwiLFxuICAgICAgICAgICAgICBoaWdobGlnaHRTdHJva2U6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICBsYWJlbDogY2hhcnRzW2ldLnRlYW0xLFxuICAgICAgICAgICAgICBkYXRhOiBjaGFydHNbaV0udGVhbTFTdGF0cyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogXCIwMDAwN2ZcIixcbiAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwicmdiYSgxNTEsMTg3LDIwNSwwLjgpXCIsXG4gICAgICAgICAgICAgIGhpZ2hsaWdodEZpbGw6IFwicmdiYSgxNTEsMTg3LDIwNSwwLjc1KVwiLFxuICAgICAgICAgICAgICBoaWdobGlnaHRTdHJva2U6IFwicmdiYSgxNTEsMTg3LDIwNSwxKVwiLFxuICAgICAgICAgICAgICBsYWJlbDogY2hhcnRzW2ldLnRlYW0yLFxuICAgICAgICAgICAgICBkYXRhOiBjaGFydHNbaV0udGVhbTJTdGF0cyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aD00MDA7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQ9NDAwO1xuICAgICAgICBjYW52YXMuaWQ9J2NhbnZhcycraVxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICBjb25zb2xlLmxvZyhjYW52YXMpO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNEaXYnKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICAgIHZhciB0b2JvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIitpKTtcbiAgICAgICAgY29uc29sZS5sb2codG9ibyk7XG4gICAgICAgIHZhciBjdHggPSB0b2JvLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmKGdyYXBoVHlwZSA9PT0gXCJCYXJcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5CYXIoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwibGluZVwiKXtcbiAgICAgICAgICB2YXIgbXlOZXdDaGFydCA9IG5ldyBDaGFydChjdHgpLkxpbmUoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiUmFkYXJcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5SYWRhcihkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgfWlmKGdyYXBoVHlwZSA9PT0gXCJQb2xhclwiKXtcbiAgICAgICAgICB2YXIgbXlOZXdDaGFydCA9IG5ldyBDaGFydChjdHgpLlBvbGFyQXJlYShkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgfWlmKGdyYXBoVHlwZSA9PT0gXCJQaWVcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5QaWUoZGF0YSwgb3B0aW9ucyk7XG5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH0pXG5cbiAgZnVuY3Rpb24gZ2V0QVBJSG9zdCgpIHtcbiAgICBpZih3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT0gJ2xvY2FsaG9zdCcpIHtcbiAgICAgIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJodHRwczovL2Jhc2tldC1zdGF0cy5oZXJva3VhcHAuY29tXCJcbiAgICB9XG4gIH1cbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICQoJy5hY3Rpb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBjb25zb2xlLmxvZygnaGVyZTEnKVxuICAgIHZhciB0YWcgPSAnLicrJCh0aGlzKS50ZXh0KCk7XG4gICAgJCgnLmFjdGl2ZScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKHRhZykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICB9KTtcblxuXG5cbn0pXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
