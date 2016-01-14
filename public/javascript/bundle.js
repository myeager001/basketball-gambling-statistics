$(document).ready(function(){

  $('#searchButton').on('click', function(e){
    e.preventDefault();
    var team1 = $('.searchTeam1').val();
    var team2 = $('.searchTeam2').val();
    $.ajax({
      url: 'http://localhost:3000/search',
      method: 'post',
      data: {firstTeam: team1, secondTeam: team2},
    }).done(function(data){
      charts = JSON.parse(data);
<<<<<<< HEAD
      //console.log(data);
=======
      var graphType = charts.type;
      console.log(graphType)
>>>>>>> 9d4ee09a6d1ed8317de4feb908612549f9d84f3e
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

<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyIsInRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG4gICQoJyNzZWFyY2hCdXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHRlYW0xID0gJCgnLnNlYXJjaFRlYW0xJykudmFsKCk7XG4gICAgdmFyIHRlYW0yID0gJCgnLnNlYXJjaFRlYW0yJykudmFsKCk7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9zZWFyY2gnLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBkYXRhOiB7Zmlyc3RUZWFtOiB0ZWFtMSwgc2Vjb25kVGVhbTogdGVhbTJ9LFxuICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XG4gICAgICBjaGFydHMgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGFydHMubGVuZ3RoOyBpKyspe1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBsYWJlbHM6IGNoYXJ0c1tpXS5jb2x1bW5OYW1lcyxcbiAgICAgICAgICBkYXRhc2V0czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwicmdiYSgyMjAsMjIwLDIyMCwwLjUpXCIsXG4gICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcInJnYmEoMjIwLDIyMCwyMjAsMC44KVwiLFxuICAgICAgICAgICAgICBoaWdobGlnaHRGaWxsOiBcInJnYmEoMjIwLDIyMCwyMjAsMC43NSlcIixcbiAgICAgICAgICAgICAgaGlnaGxpZ2h0U3Ryb2tlOiBcInJnYmEoMjIwLDIyMCwyMjAsMSlcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGNoYXJ0c1tpXS50ZWFtMSxcbiAgICAgICAgICAgICAgZGF0YTogY2hhcnRzW2ldLnRlYW0xU3RhdHMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwicmdiYSgxNTEsMTg3LDIwNSwwLjUpXCIsXG4gICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcInJnYmEoMTUxLDE4NywyMDUsMC44KVwiLFxuICAgICAgICAgICAgICBoaWdobGlnaHRGaWxsOiBcInJnYmEoMTUxLDE4NywyMDUsMC43NSlcIixcbiAgICAgICAgICAgICAgaGlnaGxpZ2h0U3Ryb2tlOiBcInJnYmEoMTUxLDE4NywyMDUsMSlcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGNoYXJ0c1tpXS50ZWFtMixcbiAgICAgICAgICAgICAgZGF0YTogY2hhcnRzW2ldLnRlYW0yU3RhdHMsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZXJlJylcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aD00MDA7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQ9NDAwO1xuICAgICAgICBjYW52YXMuaWQ9J2NhbnZhcycraVxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICBjb25zb2xlLmxvZyhjYW52YXMpO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNEaXYnKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICAgIHZhciB0b2JvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIitpKTtcbiAgICAgICAgY29uc29sZS5sb2codG9ibyk7XG4gICAgICAgIHZhciBjdHggPSB0b2JvLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuQmFyKGRhdGEsIHtiYXJTaG93U3Ryb2tlOiBmYWxzZX0pO1xuICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH0pXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAkKCcuYWN0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgY29uc29sZS5sb2coJ2hlcmUxJylcbiAgICB2YXIgdGFnID0gJy4nKyQodGhpcykudGV4dCgpO1xuICAgICQoJy5hY3RpdmUnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0YWcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgfSk7XG5cblxuXG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyIsInRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuICAkKCcjc2VhcmNoQnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB0ZWFtMSA9ICQoJy5zZWFyY2hUZWFtMScpLnZhbCgpO1xuICAgIHZhciB0ZWFtMiA9ICQoJy5zZWFyY2hUZWFtMicpLnZhbCgpO1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvc2VhcmNoJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgZGF0YToge2ZpcnN0VGVhbTogdGVhbTEsIHNlY29uZFRlYW06IHRlYW0yfSxcbiAgICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgY2hhcnRzID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIHZhciBncmFwaFR5cGUgPSBjaGFydHMudHlwZTtcbiAgICAgIGNvbnNvbGUubG9nKGdyYXBoVHlwZSlcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGFydHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIG9wdGlvbnMgPSBjaGFydHNbaV0ub3B0aW9uc1xuICAgICAgICAgIGdyYXBoVHlwZSA9IGNoYXJ0c1tpXS50eXBlO1xuICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgbGFiZWxzOiBjaGFydHNbaV0uY29sdW1uTmFtZXMsXG4gICAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInJnYmEoMjIwLDIyMCwyMjAsMC41KVwiLFxuICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCJyZ2JhKDIyMCwyMjAsMjIwLDAuOClcIixcbiAgICAgICAgICAgICAgaGlnaGxpZ2h0RmlsbDogXCJyZ2JhKDIyMCwyMjAsMjIwLDAuNzUpXCIsXG4gICAgICAgICAgICAgIGhpZ2hsaWdodFN0cm9rZTogXCJyZ2JhKDIyMCwyMjAsMjIwLDEpXCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBjaGFydHNbaV0udGVhbTEsXG4gICAgICAgICAgICAgIGRhdGE6IGNoYXJ0c1tpXS50ZWFtMVN0YXRzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInJnYmEoMTUxLDE4NywyMDUsMC41KVwiLFxuICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCJyZ2JhKDE1MSwxODcsMjA1LDAuOClcIixcbiAgICAgICAgICAgICAgaGlnaGxpZ2h0RmlsbDogXCJyZ2JhKDE1MSwxODcsMjA1LDAuNzUpXCIsXG4gICAgICAgICAgICAgIGhpZ2hsaWdodFN0cm9rZTogXCJyZ2JhKDE1MSwxODcsMjA1LDEpXCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBjaGFydHNbaV0udGVhbTIsXG4gICAgICAgICAgICAgIGRhdGE6IGNoYXJ0c1tpXS50ZWFtMlN0YXRzLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnaGVyZScpXG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBjYW52YXMud2lkdGg9NDAwO1xuICAgICAgICBjYW52YXMuaGVpZ2h0PTQwMDtcbiAgICAgICAgY2FudmFzLmlkPSdjYW52YXMnK2lcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgY29uc29sZS5sb2coY2FudmFzKTtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzRGl2Jyk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgICAgICB2YXIgdG9ibyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIraSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRvYm8pO1xuICAgICAgICB2YXIgY3R4ID0gdG9iby5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZihncmFwaFR5cGUgPT09IFwiQmFyXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuQmFyKGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICB9aWYoZ3JhcGhUeXBlID09PSBcImxpbmVcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5MaW5lKGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICB9aWYoZ3JhcGhUeXBlID09PSBcIlJhZGFyXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUmFkYXIoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiUG9sYXJcIil7XG4gICAgICAgICAgdmFyIG15TmV3Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4KS5Qb2xhckFyZWEoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1pZihncmFwaFR5cGUgPT09IFwiUGllXCIpe1xuICAgICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuUGllKGRhdGEsIG9wdGlvbnMpO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9KVxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgJCgnLmFjdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGNvbnNvbGUubG9nKCdoZXJlMScpXG4gICAgdmFyIHRhZyA9ICcuJyskKHRoaXMpLnRleHQoKTtcbiAgICAkKCcuYWN0aXZlJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQodGFnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gIH0pO1xuXG5cblxufSlcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
>>>>>>> 9d4ee09a6d1ed8317de4feb908612549f9d84f3e
