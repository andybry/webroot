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

requirejs(['jquery', 'hero', 'pagebody', 'eprivacy', 'new'], function($, hero, pb, eprivacy, oldnew){
  $(function(){

    if(typeof window.onload == 'function') {
      var oldonload = window.onload;
      oldonload();
    }

    if($('.oldnew').length) {
      $('#eprivacy').insertAfter('.oldnew');
    } else {
      //$('#eprivacy').insertAfter('body');
      $('body').prepend($('#eprivacy'));
    }

    eprivacy.init();

  });
});
