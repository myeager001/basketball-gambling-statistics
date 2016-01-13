$(document).ready(function(){
  $('.action').on('click', function(e){
    var tag = '.'+$(this).text();
    $('.active').toggleClass('active');
    $(tag).toggleClass('active');
  })
})
