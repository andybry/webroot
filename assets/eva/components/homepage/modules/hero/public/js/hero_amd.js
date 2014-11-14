/* Global window object */
window.homepage = window.homepage || {};

/* Set block-set size */
function set_block_set_size() {
  $('.block-set').css('width', $('.carousel').width() + 'px');
}

/* Disable default scroll event */
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;  
}

// Disable wheel functions
function wheel(e) {
  preventDefault(e);
}

function disable_scroll(obj) {
  if (obj.addEventListener) {
    // If add event listener is available, disable wheel
    obj.addEventListener('DOMMouseScroll', wheel, false);
  }
  obj.onmousewheel = wheel;
}

/* Window onload event */

function slide_left() {
  $('#slider').animate({
    scrollLeft: $('.carousel').width()//$('#slider').scrollLeft()
  }, window.homepage.slide_speed);
  window.homepage.current_block++
  // If IE
  //adjust_scroll();
  change_color(1);
}

function slide_right() {
  $('#slider').animate({
    scrollLeft: 0//$('#slider').scrollLeft()
  }, window.homepage.slide_speed);
  //window.homepage.current_block--;

  window.homepage.current_block = 0;
  // If IE
  //adjust_scroll();
  //
  change_color(0);
}

function adjust_scroll() {
  var current = window.homepage.current_block;
  var car_width = $('.carousel').width();
  var total = current * car_width;

  $('#slider').animate({
    scrollLeft: total
  }, 0);


}

window.onload = function() {
  // Declare slider and disable it
  var slider = document.getElementById('slider');
  
  disable_scroll(slider);

  set_block_set_size();

  window.homepage.no_blocks = $('.block-set').length;
  window.homepage.current_block = 0;
  window.homepage.slide_speed = 500;
}

/* IE compatible resize window event */

window.onresize = function() {
  set_block_set_size();
  adjust_scroll();
}

/* Colour changer  */

// Array of colours
function change_color(num) {
  var colors = ['#82c55b','#7467ae', '#ef435e','#005fae', '#00ac9d'];
  $('.left-arrow').css('background', colors[num]);
  $('.right-arrow').css('background', colors[num]);
  $('.left-brace').css('background', colors[num]);
  $('.right-brace').css('background', colors[num]);

}

$(function(){
    change_color(0);
  }
);

// Read current block
// Animate between
