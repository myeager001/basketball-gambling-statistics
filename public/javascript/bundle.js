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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICQoJy5hY3Rpb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBjb25zb2xlLmxvZygnaGVyZTEnKVxuICAgIHZhciB0YWcgPSAnLicrJCh0aGlzKS50ZXh0KCk7XG4gICAgJCgnLmFjdGl2ZScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKHRhZykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICB9KVxuXG4gICQoJy51c2VyLWljb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICB2YXIgc2VsZWN0b3IgPSAkKCcuZHJvcERvd25NZW51MScpO1xuICAgIHZhciBoYXNDbGFzcyA9IHNlbGVjdG9yLmhhc0NsYXNzKCdhY3RpdmUnKTtcbiAgICBjb25zb2xlLmxvZyhoYXNDbGFzcylcbiAgICBpZihoYXNDbGFzcyl7XG4gICAgICBjb25zb2xlLmxvZygnaGVyZScpXG4gICAgICBzZWxlY3Rvci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgfWVsc2V7XG4gICAgICBzZWxlY3Rvci5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfVxuICB9KVxufSlcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
