$(function() {

  var host = (("https:" == document.location.protocol) ? "https://" : "http://")
      client = 'which',
      sli_style_a = document.createElement('link'),
      sli_style_b = document.createElement('link'),
      sli_script = document.createElement('script'),
      page_head = document.getElementsByTagName('head')[0],
      load_array = [sli_style_a, sli_style_b, sli_script];

  sli_style_a.type = sli_style_b.type = "text/css";
  sli_style_a.rel = sli_style_b.rel = "stylesheet";

  sli_style_a.href = host + 'assets.resultspage.com/js/rac/sli-rac.1.5.css';
  sli_style_b.href = host + client + '.resultsdemo.com/rac/sli-rac.css';

  sli_script.src = host + client + '.resultsdemo.com/rac/sli-rac.config.js';

  for(var i = 0, len = load_array.length; i < len; i++) {
    page_head.appendChild(load_array[i]);
  }

});