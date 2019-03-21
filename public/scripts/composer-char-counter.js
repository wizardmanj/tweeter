$(document).ready(function() {
  
  $('.text-place').on('keyup', function () {
    maxChar = 140;
    counter = $(this).val().length;
    count =  maxChar - counter;

    $('.counter').text(count);
    
    if (count < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });
});

