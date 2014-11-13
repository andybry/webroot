requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    'jquery': '../components/jquery/jquery',
    'nav': '../components/eva-global-navigation/public/js/nav',
    'hero': 'hero',
    'new': 'new',
    'pagebody' : 'pagebody',
    'eprivacy': '../components/eva-eprivacy/main',
    'cookie-monster': '../components/cookie-monster',
  }
});

requirejs(['jquery', 'nav', 'hero', 'pagebody', 'eprivacy', 'new'], function($, nav, hero, pb, eprivacy, oldnew){
  $(function(){

    if(typeof window.onload == 'function') {
      var oldonload = window.onload;
      oldonload();
    }

    $('#eprivacy').prependTo('body');

    nav.init({
      // Show logo as red or black
      logo: true,
      // Show search open on start = true, closed = false
      search_open: true,
      // Make search available on site
      search: true,
      // Show signin
      signin: true
    });

    eprivacy.init();

  });
});
