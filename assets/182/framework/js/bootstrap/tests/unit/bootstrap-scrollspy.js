$(function(){module("bootstrap-scrollspy");test("should be defined on jquery object",function(){ok($(document.body).scrollspy,"scrollspy method is defined")});test("should return element",function(){ok($(document.body).scrollspy()[0]==document.body,"document.body returned")});test("should switch active class on scroll",function(){var a='<div id="masthead"></div>',d=$(a).append("#qunit-fixture"),b='<div class="topbar"><div class="topbar-inner"><div class="container"><h3><a href="#">Bootstrap</a></h3><ul class="nav"><li><a href="#masthead">Overview</a></li></ul></div></div></div>',c=$(b).scrollspy();ok(c.find(".active",true))})});