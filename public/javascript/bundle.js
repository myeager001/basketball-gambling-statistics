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
    $('#team1image').attr('src', '/assets/team_icons/'+team1 + '.png');
    if (team2) {
      $('#team2image').attr('src', '/assets/team_icons/'+team2 + '.png');
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
        var label=document.createElement("label")
        var text=document.createTextNode(charts[i].title)

        var canvas = document.createElement("canvas");
        var span = document.createElement('span');
        span.setAttribute('class', 'graphSpan');
        canvas.setAttribute('width','400px');
        canvas.setAttribute('height', '400px');
        canvas.setAttribute('class', 'drawCanvas')
        canvas.id='canvas'+i
        label.for = 'canvas'+i
        console.log(data);
        console.log(canvas);
        span.appendChild(label);
        label.appendChild(text);
        span.appendChild(canvas)
        var div = document.getElementById('resultsDiv');
        div.appendChild(span);
        var tobo = document.getElementById("canvas"+i);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMuanMiLCJzZWFyY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICQoJy5hY3Rpb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBjb25zb2xlLmxvZygnaGVyZTEnKVxuICAgIHZhciB0YWcgPSAnLicrJCh0aGlzKS50ZXh0KCk7XG4gICAgJCgnLmFjdGl2ZScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKHRhZykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICB9KTtcblxuXG5cblxufSlcbiIsIlxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuXG5cbiAgJCgnI3NlYXJjaEJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdGVhbTEgPSAkKCcuc2VhcmNoVGVhbTEnKS52YWwoKTtcbiAgICB2YXIgdGVhbTIgPSAkKCcuc2VhcmNoVGVhbTInKS52YWwoKTtcbiAgICAkKCcjdGVhbTFpbWFnZScpLmF0dHIoJ3NyYycsICcvYXNzZXRzL3RlYW1faWNvbnMvJyt0ZWFtMSArICcucG5nJyk7XG4gICAgaWYgKHRlYW0yKSB7XG4gICAgICAkKCcjdGVhbTJpbWFnZScpLmF0dHIoJ3NyYycsICcvYXNzZXRzL3RlYW1faWNvbnMvJyt0ZWFtMiArICcucG5nJyk7XG4gICAgfVxuICAgICQoJy5sb2FkaW5nSW1nJykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXlJbWdMb2FkJyk7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogZ2V0QVBJSG9zdCgpICsnL3NlYXJjaCcsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGRhdGE6IHtmaXJzdFRlYW06IHRlYW0xLCBzZWNvbmRUZWFtOiB0ZWFtMn0sXG4gICAgfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcbiAgICAgICQoJy5sb2FkaW5nSW1nJykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXlJbWdMb2FkJyk7XG4gICAgICBjaGFydHMgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgY29uc29sZS5sb2coY2hhcnRzKTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGFydHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIG9wdGlvbnMgPSBjaGFydHNbaV0ub3B0aW9uc1xuICAgICAgICAgIGdyYXBoVHlwZSA9IGNoYXJ0c1tpXS50eXBlO1xuXG4gICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICBsYWJlbHM6IGNoYXJ0c1tpXS5jb2x1bW5OYW1lcyxcbiAgICAgICAgICBkYXRhc2V0czogW10sXG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjaGFydHNbaV0udGVhbTFTdGF0cyl7XG4gICAgICAgICAgICBkYXRhLmRhdGFzZXRzLnB1c2goXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwicmdiYSgyMjAsMCwwLDAuMilcIixcbiAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCJyZ2JhKDIyMCwyMjAsMjIwLDAuOClcIixcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRGaWxsOiBcInJnYmEoMjIwLDIyMCwyMjAsMC43NSlcIixcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRTdHJva2U6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICAgIHBvaW50U3Ryb2tlQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBjaGFydHNbaV0udGVhbTEsXG4gICAgICAgICAgICAgICAgZGF0YTogY2hhcnRzW2ldLnRlYW0xU3RhdHNba2V5XVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIGZvcih2YXIga2V5IGluIGNoYXJ0c1tpXS50ZWFtMlN0YXRzKXtcbiAgICAgICAgICAgIGRhdGEuZGF0YXNldHMucHVzaChcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJyZ2JhKDAsMCwyMjAsMC4yKVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcInJnYmEoMjIwLDIyMCwyMjAsMC44KVwiLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodEZpbGw6IFwicmdiYSgyMjAsMjIwLDIyMCwwLjc1KVwiLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodFN0cm9rZTogXCJyZ2JhKDIyMCwyMjAsMjIwLDEpXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRDb2xvcjogXCJyZ2JhKDIyMCwyMjAsMjIwLDEpXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodFN0cm9rZTogXCJyZ2JhKDIyMCwyMjAsMjIwLC4yKVwiLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBjaGFydHNbaV0udGVhbTIsXG4gICAgICAgICAgICAgICAgZGF0YTogY2hhcnRzW2ldLnRlYW0yU3RhdHNba2V5XVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB2YXIgbGFiZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXG4gICAgICAgIHZhciB0ZXh0PWRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoYXJ0c1tpXS50aXRsZSlcblxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdjbGFzcycsICdncmFwaFNwYW4nKTtcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCc0MDBweCcpO1xuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnNDAwcHgnKTtcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZHJhd0NhbnZhcycpXG4gICAgICAgIGNhbnZhcy5pZD0nY2FudmFzJytpXG4gICAgICAgIGxhYmVsLmZvciA9ICdjYW52YXMnK2lcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNhbnZhcyk7XG4gICAgICAgIHNwYW4uYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgc3Bhbi5hcHBlbmRDaGlsZChjYW52YXMpXG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c0RpdicpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIHZhciB0b2JvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIitpKTtcbiAgICAgICAgdmFyIGN0eCA9IHRvYm8uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgaWYoZ3JhcGhUeXBlID09PSBcIkJhclwiKXtcbiAgICAgICAgICB2YXIgbXlOZXdDaGFydCA9IG5ldyBDaGFydChjdHgpLkJhcihkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgfWlmKGdyYXBoVHlwZSA9PT0gXCJMaW5lXCIpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdoZXJlJylcbiAgICAgICAgICB2YXIgbXlOZXdDaGFydCA9IG5ldyBDaGFydChjdHgpLkxpbmUoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiUmFkYXJcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5SYWRhcihkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgfWlmKGdyYXBoVHlwZSA9PT0gXCJQb2xhclwiKXtcbiAgICAgICAgICB2YXIgbXlOZXdDaGFydCA9IG5ldyBDaGFydChjdHgpLlBvbGFyQXJlYShkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgfWlmKGdyYXBoVHlwZSA9PT0gXCJQaWVcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5QaWUoZGF0YSwgb3B0aW9ucyk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgfSlcblxuICBmdW5jdGlvbiBnZXRBUElIb3N0KCkge1xuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PSAnbG9jYWxob3N0Jykge1xuICAgICAgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcImh0dHBzOi8vYmFza2V0LXN0YXRzLmhlcm9rdWFwcC5jb21cIlxuICAgIH1cbiAgfVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
