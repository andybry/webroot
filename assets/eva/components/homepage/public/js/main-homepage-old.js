requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    'nav': '../components/eva-global-navigation/public/js/nav'
  }
});

requirejs(['nav'], function(nav){
  
  $(function(){
  if(typeof window.onload == 'function') {
    var oldonload = window.onload;
    oldonload();
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
  });
});

