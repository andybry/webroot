requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    'jquery': '../components/jquery/jquery',
    'nav': '../components/eva-global-navigation/public/js/nav',
    'hero': 'hero',
    'oldnew': 'oldnew',
    'pagebody' : 'pagebody',
    'eprivacy': '../components/eva-eprivacy/main',
    'cookie-monster': '../components/cookie-monster',
    'lightbox_me': 'lightbox_me',
    'lightbox': 'lightbox'
  }
});

requirejs(['jquery', 'nav', 'hero', 'pagebody', 'eprivacy', 'oldnew', 'lightbox_me', 'lightbox'], function($, nav, hero, pb, eprivacy, oldnew, lightbox_me, lightbox){
  $(function(){
    if(typeof window.onload == 'function') {
      var oldonload = window.onload;
      oldonload();
    }
    if($('.oldnew').length) {
      $('#eprivacy').insertAfter('.oldnew');
    } else {
      $('#eprivacy').insertAfter('body');
    }

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
