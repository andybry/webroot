/* nav.js */

;(function(root, name, output){
  if (typeof define == "function" && define.amd) {
    define([], output);
  } else {
    root[name] = output();
  }

})(this.window, "nav", function() {

  var nav = {

    init: function(settings) {

      $ = typeof jQuery != 'undefined' ? jQuery : require(['jquery']);

      var config = {
        // Show logo as black or red
        logo: false,
        // Show search open on start = true, closed = false
        search_open: false,
        // Make search available on site
        search: true,
        // Show signin
        signin: true
      }

      $.extend(config, settings);

      // Config Setup
      if(config.logo) {
        $(".logo-item").removeClass("sub").addClass("main");
      }
      if(config.search_open) {
        $(".search-bar").css("display", "block");
        $(".show-search").addClass("item-on");
      }
      if(!config.search) {
        $(".show-search").addClass("off");
        $(".search-bar").addClass("off");
      }
      if(!config.signin) {
        $(".show-account").addClass("off");
        $(".show-signup").addClass("off");
        $(".show-signin").addClass("off");
        $(".show-search").addClass("spacer");
      }
      // Functions

      // Javasript off
      $(".nav-links").removeAttr("href");

      function reset_accounts() {
        $('.account-dropdown').slideUp();
        $('.show-account').removeClass('item-on');
      }

      function reset_search() {
        $(".search-bar").slideUp();
        $(".show-search").removeClass("item-on");
      }

      function reset_menu() {
        $('.show-menu').removeClass('item-on');
      }

      function reset_quicklinks() {
        $('.quicklinks').slideUp();
        $('.quicklink-item').removeClass('item-on');
        $('.more-less').removeClass('icon-less').addClass('icon-more');
      }

      // Configure item

      $('.quicklink-item').each(function(index){
        $('.quicklink-item').eq(index).click(
          (function(index){
            return function() {
              if(!$('.quicklink-item').eq(index).hasClass('item-on')) {
                // Quicklinks
                $('.quicklink').css('display', 'none');
                $('.quicklink').eq(index).css('display', 'block');
                $('.quicklinks').slideDown();

                // Buttons
                $('.quicklink-item').removeClass('item-on');
                $('.quicklink-item').eq(index).addClass('item-on');
                $('.more-less').removeClass('icon-less').addClass('icon-more');
                $('.more-less').eq(index).removeClass('icon-more').addClass('icon-less');

                // Others
                reset_accounts();
                reset_search();
                reset_menu();
              } else {
                $('.quicklinks').slideUp();
                $('.quicklink-item').eq(index).removeClass('item-on');
                $('.more-less').eq(index).removeClass('icon-less').addClass('icon-more');
              }
            }
          })(index)
        );
      }); // End of quicklink item

      $('.mob-button').each(function(index){
        $('.mob-button').eq(index).click(
          (function(index){
            return function() {
              if($(window).width() < 890) {
                if(!$(".mob-button").eq(index).hasClass('item-on')) {
                  $(".main-links").eq(index).css("display", "block");
                  $(".mob-button").eq(index).addClass('item-on');
                } else {
                  $(".main-links").eq(index).css("display", "none");
                  $(".mob-button").eq(index).removeClass('item-on');
                }
              }
            }
          })(index)
        );
      }); // End of mobile links

      $('.show-search').click(
        function(){
          if(!$('.show-search').hasClass('item-on')) {
            // Search
            $(".search-bar").slideDown();
            $(".show-search").addClass("item-on");

            // Others
            reset_accounts();
            reset_quicklinks();
            reset_menu();
          } else {
            $(".search-bar").slideUp();
            $(".show-search").removeClass("item-on");
          }
        }
      ); // End of show search

      $('.show-account').click(
        function(){
          if(!$('.show-account').hasClass('item-on')) {
            // Account
            $(".account-dropdown").slideDown();
            $(".show-account").addClass("item-on");

            // Others
            reset_quicklinks();
            reset_menu();
            reset_search();
          } else {
            $(".account-dropdown").slideUp();
            $(".show-account").removeClass("item-on");
          }
        }
      ); // End of show click

      $('.show-menu').click(
        function(){
          if(!$('.show-menu').hasClass('item-on')) {

            // Menu
            $(".quicklinks").slideDown();
            $('.show-menu').addClass('item-on');

            // Others
            reset_accounts();
            reset_search();
          } else {
            $(".quicklinks").slideUp();
            $('.show-menu').removeClass('item-on');
          }
        }
      ); // End of show menu

      if(window.innerWidth) {
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        // Window resize function
        $(window).resize(function() {

          // For the wonderful ie and its exceptional window size detection.
          if($(window).width() != winWidth || $(window).height() != winHeight){

            reset_quicklinks();
            reset_menu();
            //reset_search();
            reset_accounts();

            winHeight = $(window).height();

            if($(window).width() < 890) {
              $(".quicklink").css("display", "block");
              $(".main-links").css("display", "none");
            } else {
              $(".quicklinks").css("display", "none");
              $(".main-links").css("display", "block");
              $(".quicklink").css("display", "block");
            }
          }
        });
      } // End of window resize

    } // End of init
  } // End of object
  return nav;
});
