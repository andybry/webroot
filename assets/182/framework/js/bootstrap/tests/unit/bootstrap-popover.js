$(function(){module("bootstrap-popover");test("should be defined on jquery object",function(){var a=$("<div></div>");ok(a.popover,"popover method is defined")});test("should return element",function(){var a=$("<div></div>");ok(a.popover()==a,"document.body returned")});test("should render popover element",function(){$.support.transition=false;var a=$('<a href="#" title="mdo" data-content="http://twitter.com/mdo">@mdo</a>').appendTo("#qunit-fixture").popover("show");ok($(".popover").length,"popover was inserted");a.popover("hide");ok(!$(".popover").length,"popover removed")});test("should store popover instance in popover data object",function(){$.support.transition=false;var a=$('<a href="#" title="mdo" data-content="http://twitter.com/mdo">@mdo</a>').popover();ok(!!a.data("popover"),"popover instance exists")});test("should get title and content from options",function(){$.support.transition=false;var a=$('<a href="#">@fat</a>').appendTo("#qunit-fixture").popover({title:function(){return"@fat"},content:function(){return"loves writing tests （╯°□°）╯︵ ┻━┻"}});a.popover("show");ok($(".popover").length,"popover was inserted");equals($(".popover .popover-title").text(),"@fat","title correctly inserted");equals($(".popover .popover-content").text(),"loves writing tests （╯°□°）╯︵ ┻━┻","content correctly inserted");a.popover("hide");ok(!$(".popover").length,"popover was removed");$("#qunit-fixture").empty()});test("should get title and content from attributes",function(){$.support.transition=false;var a=$('<a href="#" title="@mdo" data-content="loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻" >@mdo</a>').appendTo("#qunit-fixture").popover().popover("show");ok($(".popover").length,"popover was inserted");equals($(".popover .popover-title").text(),"@mdo","title correctly inserted");equals($(".popover .popover-content").text(),"loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻","content correctly inserted");a.popover("hide");ok(!$(".popover").length,"popover was removed");$("#qunit-fixture").empty()});test("should respect custom classes",function(){$.support.transition=false;var a=$('<a href="#">@fat</a>').appendTo("#qunit-fixture").popover({title:"Test",content:"Test",template:'<div class="popover foobar"><div class="arrow"></div><div class="inner"><h3 class="title"></h3><div class="content"><p></p></div></div></div>'});a.popover("show");ok($(".popover").length,"popover was inserted");ok($(".popover").hasClass("foobar"),"custom class is present");a.popover("hide");ok(!$(".popover").length,"popover was removed");$("#qunit-fixture").empty()});test("should destroy popover",function(){var a=$("<div/>").popover({trigger:"hover"}).on("click.foo",function(){});ok(a.data("popover"),"popover has data");ok(a.data("events").mouseover&&a.data("events").mouseout,"popover has hover event");ok(a.data("events").click[0].namespace=="foo","popover has extra click.foo event");a.popover("show");a.popover("destroy");ok(!a.hasClass("in"),"popover is hidden");ok(!a.data("popover"),"popover does not have data");ok(a.data("events").click[0].namespace=="foo","popover still has click.foo");ok(!a.data("events").mouseover&&!a.data("events").mouseout,"popover does not have any events")})});