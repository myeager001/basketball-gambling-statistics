$(document).ready(function(){
  $('.action').on('click', function(e){
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMuanMiLCJzZWFyY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgJCgnLmFjdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGNvbnNvbGUubG9nKCdoZXJlMScpXG4gICAgdmFyIHRhZyA9ICcuJyskKHRoaXMpLnRleHQoKTtcbiAgICAkKCcuYWN0aXZlJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQodGFnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gIH0pO1xuXG5cblxuXG59KVxuIiwiXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG5cblxuICAkKCcjc2VhcmNoQnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB0ZWFtMSA9ICQoJy5zZWFyY2hUZWFtMScpLnZhbCgpO1xuICAgIHZhciB0ZWFtMiA9ICQoJy5zZWFyY2hUZWFtMicpLnZhbCgpO1xuICAgICQoJyN0ZWFtMWltYWdlJykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgvYXNzZXRzL3RlYW1faWNvbnMvJyt0ZWFtMSArICcucG5nKScpO1xuICAgICQoJyN0ZWFtMmltYWdlJykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgvYXNzZXRzL3RlYW1faWNvbnMvJyt0ZWFtMiArICcucG5nKScpO1xuICAgICQoJy5sb2FkaW5nSW1nJykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXlJbWdMb2FkJyk7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogZ2V0QVBJSG9zdCgpICsnL3NlYXJjaCcsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGRhdGE6IHtmaXJzdFRlYW06IHRlYW0xLCBzZWNvbmRUZWFtOiB0ZWFtMn0sXG4gICAgfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcbiAgICAgICQoJy5sb2FkaW5nSW1nJykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXlJbWdMb2FkJyk7XG4gICAgICBjaGFydHMgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgY29uc29sZS5sb2coY2hhcnRzKTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGFydHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIG9wdGlvbnMgPSBjaGFydHNbaV0ub3B0aW9uc1xuICAgICAgICAgIGdyYXBoVHlwZSA9IGNoYXJ0c1tpXS50eXBlO1xuXG4gICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICBsYWJlbHM6IGNoYXJ0c1tpXS5jb2x1bW5OYW1lcyxcbiAgICAgICAgICBkYXRhc2V0czogW10sXG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjaGFydHNbaV0udGVhbTFTdGF0cyl7XG4gICAgICAgICAgICBkYXRhLmRhdGFzZXRzLnB1c2goXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwicmdiYSgyMjAsMCwwLDAuMilcIixcbiAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCJyZ2JhKDIyMCwyMjAsMjIwLDAuOClcIixcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRGaWxsOiBcInJnYmEoMjIwLDIyMCwyMjAsMC43NSlcIixcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRTdHJva2U6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBjaGFydHNbaV0udGVhbTEsXG4gICAgICAgICAgICAgICAgZGF0YTogY2hhcnRzW2ldLnRlYW0xU3RhdHNba2V5XVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIGZvcih2YXIga2V5IGluIGNoYXJ0c1tpXS50ZWFtMlN0YXRzKXtcbiAgICAgICAgICAgIGRhdGEuZGF0YXNldHMucHVzaChcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJyZ2JhKDAsMCwyMjAsMC4yKVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcInJnYmEoMjIwLDIyMCwyMjAsMC44KVwiLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodEZpbGw6IFwicmdiYSgyMjAsMjIwLDIyMCwwLjc1KVwiLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodFN0cm9rZTogXCJyZ2JhKDIyMCwyMjAsMjIwLDEpXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRDb2xvcjogXCJyZ2JhKDIyMCwyMjAsMjIwLDEpXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodFN0cm9rZTogXCJyZ2JhKDIyMCwyMjAsMjIwLC4yKVwiLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBjaGFydHNbaV0udGVhbTIsXG4gICAgICAgICAgICAgICAgZGF0YTogY2hhcnRzW2ldLnRlYW0yU3RhdHNba2V5XVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBjYW52YXMud2lkdGg9NDAwO1xuICAgICAgICBjYW52YXMuaGVpZ2h0PTQwMDtcbiAgICAgICAgY2FudmFzLmlkPSdjYW52YXMnK2lcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNhbnZhcyk7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c0RpdicpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgICAgdmFyIHRvYm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiK2kpO1xuICAgICAgICBjb25zb2xlLmxvZyh0b2JvKTtcbiAgICAgICAgdmFyIGN0eCA9IHRvYm8uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgaWYoZ3JhcGhUeXBlID09PSBcIkJhclwiKXtcbiAgICAgICAgICB2YXIgbXlOZXdDaGFydCA9IG5ldyBDaGFydChjdHgpLkJhcihkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgfWlmKGdyYXBoVHlwZSA9PT0gXCJMaW5lXCIpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdoZXJlJylcbiAgICAgICAgICB2YXIgbXlOZXdDaGFydCA9IG5ldyBDaGFydChjdHgpLkxpbmUoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiUmFkYXJcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5SYWRhcihkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgfWlmKGdyYXBoVHlwZSA9PT0gXCJQb2xhclwiKXtcbiAgICAgICAgICB2YXIgbXlOZXdDaGFydCA9IG5ldyBDaGFydChjdHgpLlBvbGFyQXJlYShkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgfWlmKGdyYXBoVHlwZSA9PT0gXCJQaWVcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5QaWUoZGF0YSwgb3B0aW9ucyk7XG5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH0pXG5cbiAgZnVuY3Rpb24gZ2V0QVBJSG9zdCgpIHtcbiAgICBpZih3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT0gJ2xvY2FsaG9zdCcpIHtcbiAgICAgIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJodHRwczovL2Jhc2tldC1zdGF0cy5oZXJva3VhcHAuY29tXCJcbiAgICB9XG4gIH1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
