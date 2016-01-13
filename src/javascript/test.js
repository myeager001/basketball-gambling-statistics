$(document).ready(function(){
  $('.action').on('click', function(e){
    console.log('here1')
    var tag = '.'+$(this).text();
    $('.active').toggleClass('active');
    $(tag).toggleClass('active');
  })
<<<<<<< HEAD

=======
>>>>>>> 05232d6587d1393e17e7494bb394f487c899e998
})
