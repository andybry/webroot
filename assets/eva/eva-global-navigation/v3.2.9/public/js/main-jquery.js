/* main.js */

/* 

These settings are application specific. You will need to copy 
this file (or just the settings) and adjust them to suit your application.

*/

requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    'jquery': '../components/jquery/jquery',
    'nav': '../js/nav'
  }
});

requirejs(['jquery', 'nav'], function($, nav){
  $(function(){
    nav.init({
      // Show logo as red or black
      logo: true,
      // Show search open on start = true, closed = false
      search_open: false,
      // Make search available on site
      search: true,
      // Show signin
      signin: true
    });
  });
});
