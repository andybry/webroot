/* Global window object */
define(['jquery'], function($){

  var hero = {
    /* Set block-set size */
    // This function sets the width of all block sets to th current carousel width
    set_block_set_size: function() {
      $('.block-set').css('width', $('.carousel').width() + 'px');
    },

    /* Slider functionality */

    slide: function(arg) {
      if(typeof arg == 'number') {
        if(arg < $('.block-set').length) {
          hero.current_block = arg;
        }
      } else if(arg == 'right') {
        if(hero.current_block != $('.block-set').length - 1) {
          hero.current_block++;
        }
      } else if(arg == 'left') {
        if(hero.current_block != 0) {
          hero.current_block--;
        }
      }

      $('#slider').animate({
        scrollLeft: $('.carousel').width() * hero.current_block
      }, hero.slide_speed);
      hero.change_color(hero.current_block);

      $('.hero-nav li').removeClass('on');
      $('.hero-nav li').eq(hero.current_block).addClass('on');

      // Hide sidebars
      $('.left-arrow, .left-brace, .right-arrow, .right-brace').removeClass('disabled');

      if(hero.current_block == 0) {
        $('.left-arrow, .left-brace').addClass('disabled');
      } else if(hero.current_block == ($('.block-set').length-1 )) {
        $('.right-arrow, .right-brace').addClass('disabled');
      }

    }, // End of slide

    /*Scroller reset*/
    
    adjust_scroll: function() {
      var total = hero.current_block * $('.carousel').width();
      $('#slider').scrollLeft(total); 
    },

    /* Colour changer  */
    // Array of colours
    change_color: function(num) {
      var colors = ['#82c55b','#7467ae', '#ef435e','#005fae', '#00ac9d'];
      var side_classes = ['spn-type-a', 'spn-type-b', 'spn-type-c', 'spn-type-d', 'spn-type-e'];

      //$('.hero').removeClass().addClass('hero ' + side_classes[num]);
      $('.hero-container').removeClass().addClass('hero-container ' + side_classes[num]);

      $('.left-arrow').css('background', colors[num]);
      $('.right-arrow').css('background', colors[num]);
      $('.left-brace').css('background', colors[num]);
      $('.right-brace').css('background', colors[num]);
    }
  } // End of hero object


  /* IE compatible resize window event */

  $(window).resize(function() {
    hero.set_block_set_size();
    hero.adjust_scroll();
  });

  $(function(){

      $('.hero-container').removeClass('no-js');

      hero.set_block_set_size();

      hero.no_blocks = $('.block-set').length;
      hero.current_block = 0;
      hero.slide_speed = 500;
      hero.slide(0);

      $('.hero').hammer().on('swipeleft', function(){
        hero.slide('right');
      });

      $('.hero').hammer().on('swiperight', function(){
        hero.slide('left');
      });

      function slide_assign(i) {
        return function() {
          hero.slide(i);
        }
      }

      for(var i = 0, len = $('.hero-nav li').length; i < len; i++) {
        $('.hero-nav li').eq(i).click(slide_assign(i));
      }

      $('.right-arrow').click(function(){
        hero.slide('right');
      });

      $('.left-arrow').click(function(){
        hero.slide('left');
      });
    }
  );

  window.hero = hero;
});
