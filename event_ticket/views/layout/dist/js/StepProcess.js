$(document).ready( function() {
  $('.step').each(function(index, element) {
    // element == this
    $(element).not('.active').addClass('done');
    $('.done').html('&#10003;');
    if($(this).is('.active')) {
      return false;
    }
  });    
});