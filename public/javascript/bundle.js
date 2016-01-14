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
      //console.log(data);
      for(var i = 0; i < charts.length; i++){
        var data = {
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
        var myNewChart = new Chart(ctx).Bar(data, {barShowStroke: false});
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyIsInRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG4gICQoJyNzZWFyY2hCdXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHRlYW0xID0gJCgnLnNlYXJjaFRlYW0xJykudmFsKCk7XG4gICAgdmFyIHRlYW0yID0gJCgnLnNlYXJjaFRlYW0yJykudmFsKCk7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9zZWFyY2gnLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBkYXRhOiB7Zmlyc3RUZWFtOiB0ZWFtMSwgc2Vjb25kVGVhbTogdGVhbTJ9LFxuICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XG4gICAgICBjaGFydHMgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGFydHMubGVuZ3RoOyBpKyspe1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBsYWJlbHM6IGNoYXJ0c1tpXS5jb2x1bW5OYW1lcyxcbiAgICAgICAgICBkYXRhc2V0czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwicmdiYSgyMjAsMjIwLDIyMCwwLjUpXCIsXG4gICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcInJnYmEoMjIwLDIyMCwyMjAsMC44KVwiLFxuICAgICAgICAgICAgICBoaWdobGlnaHRGaWxsOiBcInJnYmEoMjIwLDIyMCwyMjAsMC43NSlcIixcbiAgICAgICAgICAgICAgaGlnaGxpZ2h0U3Ryb2tlOiBcInJnYmEoMjIwLDIyMCwyMjAsMSlcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGNoYXJ0c1tpXS50ZWFtMSxcbiAgICAgICAgICAgICAgZGF0YTogY2hhcnRzW2ldLnRlYW0xU3RhdHMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6IFwicmdiYSgxNTEsMTg3LDIwNSwwLjUpXCIsXG4gICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcInJnYmEoMTUxLDE4NywyMDUsMC44KVwiLFxuICAgICAgICAgICAgICBoaWdobGlnaHRGaWxsOiBcInJnYmEoMTUxLDE4NywyMDUsMC43NSlcIixcbiAgICAgICAgICAgICAgaGlnaGxpZ2h0U3Ryb2tlOiBcInJnYmEoMTUxLDE4NywyMDUsMSlcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGNoYXJ0c1tpXS50ZWFtMixcbiAgICAgICAgICAgICAgZGF0YTogY2hhcnRzW2ldLnRlYW0yU3RhdHMsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZXJlJylcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aD00MDA7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQ9NDAwO1xuICAgICAgICBjYW52YXMuaWQ9J2NhbnZhcycraVxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICBjb25zb2xlLmxvZyhjYW52YXMpO1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNEaXYnKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICAgIHZhciB0b2JvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIitpKTtcbiAgICAgICAgY29uc29sZS5sb2codG9ibyk7XG4gICAgICAgIHZhciBjdHggPSB0b2JvLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHZhciBteU5ld0NoYXJ0ID0gbmV3IENoYXJ0KGN0eCkuQmFyKGRhdGEsIHtiYXJTaG93U3Ryb2tlOiBmYWxzZX0pO1xuICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH0pXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAkKCcuYWN0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgY29uc29sZS5sb2coJ2hlcmUxJylcbiAgICB2YXIgdGFnID0gJy4nKyQodGhpcykudGV4dCgpO1xuICAgICQoJy5hY3RpdmUnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0YWcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgfSk7XG5cblxuXG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
