$(document).ready(function(){

  $('#searchButton').on('click', function(e){
    e.preventDefault();
    var team1 = $('.searchTeam1').val();
    var team2 = $('.searchTeam2').val();
    $('#team1image').css('background-image', 'url(/assets/team_icons/'+team1 + '.png)');
    $('#team2image').css('background-image', 'url(/assets/team_icons/'+team2 + '.png)');
    $.ajax({
      url: 'http://localhost:3000/search',
      method: 'post',
      data: {firstTeam: team1, secondTeam: team2},
    }).done(function(data){
      charts = JSON.parse(data);
      var graphType = charts.type;
      console.log(graphType)
      for(var i = 0; i < charts.length; i++){
          options = charts[i].options
          graphType = charts[i].type;
          data = {
          labels: charts[i].columnNames,
          datasets: [
            {
              fillColor: "rgba(220,220,220,0.5)",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              label: charts[i].team1,
              data: charts[i].team1Stats,
            },
            {
              fillColor: "rgba(151,187,205,0.5)",
              strokeColor: "rgba(151,187,205,0.8)",
              highlightFill: "rgba(151,187,205,0.75)",
              highlightStroke: "rgba(151,187,205,1)",
              label: charts[i].team2,
              data: charts[i].team2Stats,
            }
          ]
        }
        console.log('here')
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

$(document).ready(function(){
  $('.action').on('click', function(e){
    console.log('here1')
    var tag = '.'+$(this).text();
    $('.active').toggleClass('active');
    $(tag).toggleClass('active');
  });



})

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyIsInRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgJCgnI3NlYXJjaEJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdGVhbTEgPSAkKCcuc2VhcmNoVGVhbTEnKS52YWwoKTtcbiAgICB2YXIgdGVhbTIgPSAkKCcuc2VhcmNoVGVhbTInKS52YWwoKTtcbiAgICAkKCcjdGVhbTFpbWFnZScpLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICd1cmwoL2Fzc2V0cy90ZWFtX2ljb25zLycrdGVhbTEgKyAnLnBuZyknKTtcbiAgICAkKCcjdGVhbTJpbWFnZScpLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICd1cmwoL2Fzc2V0cy90ZWFtX2ljb25zLycrdGVhbTIgKyAnLnBuZyknKTtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3NlYXJjaCcsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGRhdGE6IHtmaXJzdFRlYW06IHRlYW0xLCBzZWNvbmRUZWFtOiB0ZWFtMn0sXG4gICAgfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcbiAgICAgIGNoYXJ0cyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB2YXIgZ3JhcGhUeXBlID0gY2hhcnRzLnR5cGU7XG4gICAgICBjb25zb2xlLmxvZyhncmFwaFR5cGUpXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2hhcnRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICBvcHRpb25zID0gY2hhcnRzW2ldLm9wdGlvbnNcbiAgICAgICAgICBncmFwaFR5cGUgPSBjaGFydHNbaV0udHlwZTtcbiAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgIGxhYmVsczogY2hhcnRzW2ldLmNvbHVtbk5hbWVzLFxuICAgICAgICAgIGRhdGFzZXRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJyZ2JhKDIyMCwyMjAsMjIwLDAuNSlcIixcbiAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwicmdiYSgyMjAsMjIwLDIyMCwwLjgpXCIsXG4gICAgICAgICAgICAgIGhpZ2hsaWdodEZpbGw6IFwicmdiYSgyMjAsMjIwLDIyMCwwLjc1KVwiLFxuICAgICAgICAgICAgICBoaWdobGlnaHRTdHJva2U6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICBsYWJlbDogY2hhcnRzW2ldLnRlYW0xLFxuICAgICAgICAgICAgICBkYXRhOiBjaGFydHNbaV0udGVhbTFTdGF0cyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJyZ2JhKDE1MSwxODcsMjA1LDAuNSlcIixcbiAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwicmdiYSgxNTEsMTg3LDIwNSwwLjgpXCIsXG4gICAgICAgICAgICAgIGhpZ2hsaWdodEZpbGw6IFwicmdiYSgxNTEsMTg3LDIwNSwwLjc1KVwiLFxuICAgICAgICAgICAgICBoaWdobGlnaHRTdHJva2U6IFwicmdiYSgxNTEsMTg3LDIwNSwxKVwiLFxuICAgICAgICAgICAgICBsYWJlbDogY2hhcnRzW2ldLnRlYW0yLFxuICAgICAgICAgICAgICBkYXRhOiBjaGFydHNbaV0udGVhbTJTdGF0cyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ2hlcmUnKVxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzLndpZHRoPTQwMDtcbiAgICAgICAgY2FudmFzLmhlaWdodD00MDA7XG4gICAgICAgIGNhbnZhcy5pZD0nY2FudmFzJytpXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgIGNvbnNvbGUubG9nKGNhbnZhcyk7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c0RpdicpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgICAgdmFyIHRvYm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiK2kpO1xuICAgICAgICBjb25zb2xlLmxvZyh0b2JvKTtcbiAgICAgICAgdmFyIGN0eCA9IHRvYm8uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgaWYoZ3JhcGhUeXBlID09PSBcIkJhclwiKXtcbiAgICAgICAgICB2YXIgbXlOZXdDaGFydCA9IG5ldyBDaGFydChjdHgpLkJhcihkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgfWlmKGdyYXBoVHlwZSA9PT0gXCJsaW5lXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuTGluZShkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgfWlmKGdyYXBoVHlwZSA9PT0gXCJSYWRhclwiKXtcbiAgICAgICAgICB2YXIgbXlOZXdDaGFydCA9IG5ldyBDaGFydChjdHgpLlJhZGFyKGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICB9aWYoZ3JhcGhUeXBlID09PSBcIlBvbGFyXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUG9sYXJBcmVhKGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICB9aWYoZ3JhcGhUeXBlID09PSBcIlBpZVwiKXtcbiAgICAgICAgICB2YXIgbXlOZXdDaGFydCA9IG5ldyBDaGFydChjdHgpLlBpZShkYXRhLCBvcHRpb25zKTtcblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgfSlcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICQoJy5hY3Rpb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBjb25zb2xlLmxvZygnaGVyZTEnKVxuICAgIHZhciB0YWcgPSAnLicrJCh0aGlzKS50ZXh0KCk7XG4gICAgJCgnLmFjdGl2ZScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKHRhZykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICB9KTtcblxuXG5cbn0pXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
