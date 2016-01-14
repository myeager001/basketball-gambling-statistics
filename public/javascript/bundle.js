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
          datasets: [],
          }
          for (var key in charts[i].team1Stats){
            data.datasets.push(
              {
                fillColor: "7f0000",
                strokeColor: "rgba(220,220,220,0.8)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                label: charts[i].team1,
                data: charts[i].team1Stats[key]
              }
            )
          }
          for(var list in charts[i].team2Stats){
            var dataArray = list
            console.log(dataArray);
            data.datasets.push(
              {
                fillColor: "7f0000",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                label: charts[i].team2,
                data: dataArray,
              }
            )
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMuanMiLCJzZWFyY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgJCgnLmFjdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGNvbnNvbGUubG9nKCdoZXJlMScpXG4gICAgdmFyIHRhZyA9ICcuJyskKHRoaXMpLnRleHQoKTtcbiAgICAkKCcuYWN0aXZlJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQodGFnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gIH0pO1xuXG5cblxuXG59KVxuIiwiXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG5cblxuICAkKCcjc2VhcmNoQnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB0ZWFtMSA9ICQoJy5zZWFyY2hUZWFtMScpLnZhbCgpO1xuICAgIHZhciB0ZWFtMiA9ICQoJy5zZWFyY2hUZWFtMicpLnZhbCgpO1xuICAgICQoJyN0ZWFtMWltYWdlJykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgvYXNzZXRzL3RlYW1faWNvbnMvJyt0ZWFtMSArICcucG5nKScpO1xuICAgICQoJyN0ZWFtMmltYWdlJykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgvYXNzZXRzL3RlYW1faWNvbnMvJyt0ZWFtMiArICcucG5nKScpO1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IGdldEFQSUhvc3QoKSArJy9zZWFyY2gnLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBkYXRhOiB7Zmlyc3RUZWFtOiB0ZWFtMSwgc2Vjb25kVGVhbTogdGVhbTJ9LFxuICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XG4gICAgICBjaGFydHMgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgY29uc29sZS5sb2coY2hhcnRzKTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGFydHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIG9wdGlvbnMgPSBjaGFydHNbaV0ub3B0aW9uc1xuICAgICAgICAgIGdyYXBoVHlwZSA9IGNoYXJ0c1tpXS50eXBlO1xuXG4gICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICBsYWJlbHM6IGNoYXJ0c1tpXS5jb2x1bW5OYW1lcyxcbiAgICAgICAgICBkYXRhc2V0czogW10sXG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjaGFydHNbaV0udGVhbTFTdGF0cyl7XG4gICAgICAgICAgICBkYXRhLmRhdGFzZXRzLnB1c2goXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwiN2YwMDAwXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwicmdiYSgyMjAsMjIwLDIyMCwwLjgpXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRDb2xvcjogXCJyZ2JhKDIyMCwyMjAsMjIwLDEpXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodFN0cm9rZTogXCJyZ2JhKDIyMCwyMjAsMjIwLDEpXCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGNoYXJ0c1tpXS50ZWFtMSxcbiAgICAgICAgICAgICAgICBkYXRhOiBjaGFydHNbaV0udGVhbTFTdGF0c1trZXldXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yKHZhciBsaXN0IGluIGNoYXJ0c1tpXS50ZWFtMlN0YXRzKXtcbiAgICAgICAgICAgIHZhciBkYXRhQXJyYXkgPSBsaXN0XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhQXJyYXkpO1xuICAgICAgICAgICAgZGF0YS5kYXRhc2V0cy5wdXNoKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcIjdmMDAwMFwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcInJnYmEoMjIwLDIyMCwyMjAsMC44KVwiLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodEZpbGw6IFwicmdiYSgyMjAsMjIwLDIyMCwwLjc1KVwiLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodFN0cm9rZTogXCJyZ2JhKDIyMCwyMjAsMjIwLDEpXCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGNoYXJ0c1tpXS50ZWFtMixcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhQXJyYXksXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aD00MDA7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQ9NDAwO1xuICAgICAgICBjYW52YXMuaWQ9J2NhbnZhcycraVxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICBjb25zb2xlLmxvZyhjYW52YXMpO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNEaXYnKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICAgIHZhciB0b2JvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIitpKTtcbiAgICAgICAgY29uc29sZS5sb2codG9ibyk7XG4gICAgICAgIHZhciBjdHggPSB0b2JvLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmKGdyYXBoVHlwZSA9PT0gXCJCYXJcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5CYXIoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiTGluZVwiKXtcbiAgICAgICAgICBjb25zb2xlLmxvZygnaGVyZScpXG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5MaW5lKGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICB9aWYoZ3JhcGhUeXBlID09PSBcIlJhZGFyXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUmFkYXIoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiUG9sYXJcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5Qb2xhckFyZWEoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiUGllXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUGllKGRhdGEsIG9wdGlvbnMpO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldEFQSUhvc3QoKSB7XG4gICAgaWYod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09ICdsb2NhbGhvc3QnKSB7XG4gICAgICByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiaHR0cHM6Ly9iYXNrZXQtc3RhdHMuaGVyb2t1YXBwLmNvbVwiXG4gICAgfVxuICB9XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
