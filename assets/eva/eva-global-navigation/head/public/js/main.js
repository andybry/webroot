/* main.js */

/* 

These settings are application specific. You will need to copy 
this file (or just the settings) and adjust them to suit your application.

*/

requirejs.config({
  paths: {
    'nav': '../js/nav'
    // 'autocomplete': '../js/autocomplete'
  }
});

requirejs(['nav'], function(nav){
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