$(document).ready(function(){
  $('.action').on('click', function(e){
    console.log('here1')
    var tag = '.'+$(this).text();
    $('.active').toggleClass('active');
    $(tag).toggleClass('active');
  });




})


$(document).ready(function(){



  $('#searchButton').on('click', function(e){
    e.preventDefault();
    var team1 = $('.searchTeam1').val();
    var team2 = $('.searchTeam2').val();
    $('#team1image').css('background-image', 'url(/assets/team_icons/'+team1 + '.png)');
    if (team2) {
      $('#team2image').css('background-image', 'url(/assets/team_icons/'+team2 + '.png)');
    }
    $('.loadingImg').toggleClass('displayImgLoad');
    $.ajax({
      url: getAPIHost() +'/search',
      method: 'post',
      data: {firstTeam: team1, secondTeam: team2},
    }).done(function(data){
      $('.loadingImg').toggleClass('displayImgLoad');
      charts = JSON.parse(data);
      console.log(charts);
      for(var i = 0; i < charts.length; i++){
          options = charts[i].options
          graphType = charts[i].type;

          data = {
          labels: charts[i].columnNames,
          datasets: [],
          }
          for (var key in charts[i].team1Stats){
            data.datasets.push(
              {
                fillColor: "rgba(220,0,0,0.2)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                label: charts[i].team1,
                data: charts[i].team1Stats[key]
              }
            )
          }
          for(var key in charts[i].team2Stats){
            data.datasets.push(
              {
                fillColor: "rgba(0,0,220,0.2)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,.2)",
                label: charts[i].team2,
                data: charts[i].team2Stats[key]
              }
            )
          }

        var canvas = document.createElement("canvas");
        canvas.width=400;
        canvas.height=400;
        canvas.id='canvas'+i
        console.log(data);
        console.log(canvas);
        var div = document.getElementById('resultsDiv');
        div.appendChild(canvas);
        var tobo = document.getElementById("canvas"+i);
        console.log(tobo);
        var ctx = tobo.getContext('2d');
        if(graphType === "Bar"){
          var myNewChart = new Chart(ctx).Bar(data, options);
        }if(graphType === "Line"){
          console.log('here')
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMuanMiLCJzZWFyY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICQoJy5hY3Rpb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBjb25zb2xlLmxvZygnaGVyZTEnKVxuICAgIHZhciB0YWcgPSAnLicrJCh0aGlzKS50ZXh0KCk7XG4gICAgJCgnLmFjdGl2ZScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKHRhZykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICB9KTtcblxuXG5cblxufSlcbiIsIlxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuXG5cbiAgJCgnI3NlYXJjaEJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdGVhbTEgPSAkKCcuc2VhcmNoVGVhbTEnKS52YWwoKTtcbiAgICB2YXIgdGVhbTIgPSAkKCcuc2VhcmNoVGVhbTInKS52YWwoKTtcbiAgICAkKCcjdGVhbTFpbWFnZScpLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICd1cmwoL2Fzc2V0cy90ZWFtX2ljb25zLycrdGVhbTEgKyAnLnBuZyknKTtcbiAgICBpZiAodGVhbTIpIHtcbiAgICAgICQoJyN0ZWFtMmltYWdlJykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgvYXNzZXRzL3RlYW1faWNvbnMvJyt0ZWFtMiArICcucG5nKScpO1xuICAgIH1cbiAgICAkKCcubG9hZGluZ0ltZycpLnRvZ2dsZUNsYXNzKCdkaXNwbGF5SW1nTG9hZCcpO1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IGdldEFQSUhvc3QoKSArJy9zZWFyY2gnLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBkYXRhOiB7Zmlyc3RUZWFtOiB0ZWFtMSwgc2Vjb25kVGVhbTogdGVhbTJ9LFxuICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XG4gICAgICAkKCcubG9hZGluZ0ltZycpLnRvZ2dsZUNsYXNzKCdkaXNwbGF5SW1nTG9hZCcpO1xuICAgICAgY2hhcnRzID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKGNoYXJ0cyk7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2hhcnRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICBvcHRpb25zID0gY2hhcnRzW2ldLm9wdGlvbnNcbiAgICAgICAgICBncmFwaFR5cGUgPSBjaGFydHNbaV0udHlwZTtcblxuICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgbGFiZWxzOiBjaGFydHNbaV0uY29sdW1uTmFtZXMsXG4gICAgICAgICAgZGF0YXNldHM6IFtdLFxuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY2hhcnRzW2ldLnRlYW0xU3RhdHMpe1xuICAgICAgICAgICAgZGF0YS5kYXRhc2V0cy5wdXNoKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInJnYmEoMjIwLDAsMCwwLjIpXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwicmdiYSgyMjAsMjIwLDIyMCwwLjgpXCIsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0RmlsbDogXCJyZ2JhKDIyMCwyMjAsMjIwLDAuNzUpXCIsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0U3Ryb2tlOiBcInJnYmEoMjIwLDIyMCwyMjAsMSlcIixcbiAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcInJnYmEoMjIwLDIyMCwyMjAsMSlcIixcbiAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcInJnYmEoMjIwLDIyMCwyMjAsMSlcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogY2hhcnRzW2ldLnRlYW0xLFxuICAgICAgICAgICAgICAgIGRhdGE6IGNoYXJ0c1tpXS50ZWFtMVN0YXRzW2tleV1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IodmFyIGtleSBpbiBjaGFydHNbaV0udGVhbTJTdGF0cyl7XG4gICAgICAgICAgICBkYXRhLmRhdGFzZXRzLnB1c2goXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwicmdiYSgwLDAsMjIwLDAuMilcIixcbiAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCJyZ2JhKDIyMCwyMjAsMjIwLDAuOClcIixcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRGaWxsOiBcInJnYmEoMjIwLDIyMCwyMjAsMC43NSlcIixcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRTdHJva2U6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwicmdiYSgyMjAsMjIwLDIyMCwuMilcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogY2hhcnRzW2ldLnRlYW0yLFxuICAgICAgICAgICAgICAgIGRhdGE6IGNoYXJ0c1tpXS50ZWFtMlN0YXRzW2tleV1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cblxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzLndpZHRoPTQwMDtcbiAgICAgICAgY2FudmFzLmhlaWdodD00MDA7XG4gICAgICAgIGNhbnZhcy5pZD0nY2FudmFzJytpXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhjYW52YXMpO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNEaXYnKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICAgIHZhciB0b2JvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIitpKTtcbiAgICAgICAgY29uc29sZS5sb2codG9ibyk7XG4gICAgICAgIHZhciBjdHggPSB0b2JvLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmKGdyYXBoVHlwZSA9PT0gXCJCYXJcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5CYXIoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiTGluZVwiKXtcbiAgICAgICAgICBjb25zb2xlLmxvZygnaGVyZScpXG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5MaW5lKGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICB9aWYoZ3JhcGhUeXBlID09PSBcIlJhZGFyXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUmFkYXIoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiUG9sYXJcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5Qb2xhckFyZWEoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiUGllXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUGllKGRhdGEsIG9wdGlvbnMpO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldEFQSUhvc3QoKSB7XG4gICAgaWYod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09ICdsb2NhbGhvc3QnKSB7XG4gICAgICByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiaHR0cHM6Ly9iYXNrZXQtc3RhdHMuaGVyb2t1YXBwLmNvbVwiXG4gICAgfVxuICB9XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
