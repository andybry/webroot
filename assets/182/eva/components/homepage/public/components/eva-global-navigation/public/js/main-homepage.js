requirejs.config({
  paths: {
    jquery: "../components/jquery/jquery",
    nav: "../js/nav"
    // autocomplete: "../js/autocomplete"
  }
});
requirejs(["jquery", "nav"], function(a, b) {
  a(function() {
    if (typeof window.onload == "function") {
      var c = window.onload;
      c()
    }
    b.init({
      logo: true,
      search_open: true,
      search: true,
      signin: true
    })
  })
});