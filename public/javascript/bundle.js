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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMuanMiLCJzZWFyY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAkKCcuYWN0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgY29uc29sZS5sb2coJ2hlcmUxJylcbiAgICB2YXIgdGFnID0gJy4nKyQodGhpcykudGV4dCgpO1xuICAgICQoJy5hY3RpdmUnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0YWcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgfSk7XG5cblxuXG5cbn0pXG4iLCJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cblxuXG4gICQoJyNzZWFyY2hCdXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHRlYW0xID0gJCgnLnNlYXJjaFRlYW0xJykudmFsKCk7XG4gICAgdmFyIHRlYW0yID0gJCgnLnNlYXJjaFRlYW0yJykudmFsKCk7XG4gICAgJCgnI3RlYW0xaW1hZ2UnKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKC9hc3NldHMvdGVhbV9pY29ucy8nK3RlYW0xICsgJy5wbmcpJyk7XG4gICAgJCgnI3RlYW0yaW1hZ2UnKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKC9hc3NldHMvdGVhbV9pY29ucy8nK3RlYW0yICsgJy5wbmcpJyk7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogZ2V0QVBJSG9zdCgpICsnL3NlYXJjaCcsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGRhdGE6IHtmaXJzdFRlYW06IHRlYW0xLCBzZWNvbmRUZWFtOiB0ZWFtMn0sXG4gICAgfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcbiAgICAgIGNoYXJ0cyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyhjaGFydHMpO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNoYXJ0cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgb3B0aW9ucyA9IGNoYXJ0c1tpXS5vcHRpb25zXG4gICAgICAgICAgZ3JhcGhUeXBlID0gY2hhcnRzW2ldLnR5cGU7XG4gICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICBsYWJlbHM6IGNoYXJ0c1tpXS5jb2x1bW5OYW1lcyxcbiAgICAgICAgICBkYXRhc2V0czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwiN2YwMDAwXCIsXG4gICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcInJnYmEoMjIwLDIyMCwyMjAsMC44KVwiLFxuICAgICAgICAgICAgICBoaWdobGlnaHRGaWxsOiBcInJnYmEoMjIwLDIyMCwyMjAsMC43NSlcIixcbiAgICAgICAgICAgICAgaGlnaGxpZ2h0U3Ryb2tlOiBcInJnYmEoMjIwLDIyMCwyMjAsMSlcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGNoYXJ0c1tpXS50ZWFtMSxcbiAgICAgICAgICAgICAgZGF0YTogY2hhcnRzW2ldLnRlYW0xU3RhdHMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwiMDAwMDdmXCIsXG4gICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcInJnYmEoMTUxLDE4NywyMDUsMC44KVwiLFxuICAgICAgICAgICAgICBoaWdobGlnaHRGaWxsOiBcInJnYmEoMTUxLDE4NywyMDUsMC43NSlcIixcbiAgICAgICAgICAgICAgaGlnaGxpZ2h0U3Ryb2tlOiBcInJnYmEoMTUxLDE4NywyMDUsMSlcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGNoYXJ0c1tpXS50ZWFtMixcbiAgICAgICAgICAgICAgZGF0YTogY2hhcnRzW2ldLnRlYW0yU3RhdHMsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBjYW52YXMud2lkdGg9NDAwO1xuICAgICAgICBjYW52YXMuaGVpZ2h0PTQwMDtcbiAgICAgICAgY2FudmFzLmlkPSdjYW52YXMnK2lcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgY29uc29sZS5sb2coY2FudmFzKTtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzRGl2Jyk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgICAgICB2YXIgdG9ibyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIraSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRvYm8pO1xuICAgICAgICB2YXIgY3R4ID0gdG9iby5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZihncmFwaFR5cGUgPT09IFwiQmFyXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuQmFyKGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICB9aWYoZ3JhcGhUeXBlID09PSBcImxpbmVcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5MaW5lKGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICB9aWYoZ3JhcGhUeXBlID09PSBcIlJhZGFyXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUmFkYXIoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiUG9sYXJcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5Qb2xhckFyZWEoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiUGllXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUGllKGRhdGEsIG9wdGlvbnMpO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldEFQSUhvc3QoKSB7XG4gICAgaWYod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09ICdsb2NhbGhvc3QnKSB7XG4gICAgICByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiaHR0cHM6Ly9iYXNrZXQtc3RhdHMuaGVyb2t1YXBwLmNvbVwiXG4gICAgfVxuICB9XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
