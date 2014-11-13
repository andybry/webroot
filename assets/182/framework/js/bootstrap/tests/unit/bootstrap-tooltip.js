$(function(){module("bootstrap-tooltip");test("should be defined on jquery object",function(){var a=$("<div></div>");ok(a.tooltip,"popover method is defined")});test("should return element",function(){var a=$("<div></div>");ok(a.tooltip()==a,"document.body returned")});test("should expose default settings",function(){ok(!!$.fn.tooltip.defaults,"defaults is defined")});test("should remove title attribute",function(){var a=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').tooltip();ok(!a.attr("title"),"title tag was removed")});test("should add data attribute for referencing original title",function(){var a=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').tooltip();equals(a.attr("data-original-title"),"Another tooltip","original title preserved in data attribute")});test("should place tooltips relative to placement option",function(){$.support.transition=false;var a=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({placement:"bottom"}).tooltip("show");ok($(".tooltip").is(".fade.bottom.in"),"has correct classes applied");a.tooltip("hide")});test("should always allow html entities",function(){$.support.transition=false;var a=$('<a href="#" rel="tooltip" title="<b>@fat</b>"></a>').appendTo("#qunit-fixture").tooltip("show");ok($(".tooltip b").length,"b tag was inserted");a.tooltip("hide");ok(!$(".tooltip").length,"tooltip removed")});test("should respect custom classes",function(){var a=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({template:'<div class="tooltip some-class"><div class="tooltip-arrow"/><div class="tooltip-inner"/></div>'}).tooltip("show");ok($(".tooltip").hasClass("some-class"),"custom class is present");a.tooltip("hide");ok(!$(".tooltip").length,"tooltip removed")});test("should not show tooltip if leave event occurs before delay expires",function(){var a=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({delay:200});stop();a.trigger("mouseenter");setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in");a.trigger("mouseout");setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in");start()},200)},100)});test("should not show tooltip if leave event occurs before delay expires, even if hide delay is 0",function(){var a=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({delay:{show:200,hide:0}});stop();a.trigger("mouseenter");setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in");a.trigger("mouseout");setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in");start()},200)},100)});test("should not show tooltip if leave event occurs before delay expires",function(){var a=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({delay:100});stop();a.trigger("mouseenter");setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in");a.trigger("mouseout");setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in");start()},100)},50)});test("should show tooltip if leave event hasn't occured before delay expires",function(){var a=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({delay:150});stop();a.trigger("mouseenter");setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in")},100);setTimeout(function(){ok($(".tooltip").is(".fade.in"),"tooltip has faded in");start()},200)});test("should destroy tooltip",function(){var a=$("<div/>").tooltip().on("click.foo",function(){});ok(a.data("tooltip"),"tooltip has data");ok(a.data("events").mouseover&&a.data("events").mouseout,"tooltip has hover event");ok(a.data("events").click[0].namespace=="foo","tooltip has extra click.foo event");a.tooltip("show");a.tooltip("destroy");ok(!a.hasClass("in"),"tooltip is hidden");ok(!a.data("tooltip"),"tooltip does not have data");ok(a.data("events").click[0].namespace=="foo","tooltip still has click.foo");ok(!a.data("events").mouseover&&!a.data("events").mouseout,"tooltip does not have any events")})});