$(document).ready(function(){
  $('.action').on('click', function(e){
    console.log('here1')
    var tag = '.'+$(this).text();
    $('.active').toggleClass('active');
    $(tag).toggleClass('active');
  })

  $('.user-icon').on('click', function(e){
    var selector = $('.dropDownMenu1');
    var hasClass = selector.hasClass('active');
    console.log(hasClass)
    if(hasClass){
      console.log('here')
      selector.removeClass('active');
    }else{
      selector.addClass('active');
    }
  })
})
