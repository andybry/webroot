(function(d){var c={text:/^['"]?(.+?)["']?$/,url:/^url\(["']?(.+?)['"]?\)$/};function b(g){if(g&&g.length){var h=g.match(c.text)[1],f=h.match(c.url);return f?'<img src="'+f[1]+'" />':h}}function a(h,g,f){if(h!="after"){h="before"}if(f=b(g.currentStyle[h])){d(g)[h=="before"?"prepend":"append"](d(document.createElement("span")).addClass(h).html(f))}}d.pseudo=function(f){a("before",f);a("after",f);f.runtimeStyle.behavior=null};if(document.createStyleSheet){var e=document.createStyleSheet(null,0);e.addRule(".dummy","display: static;");e.cssText="html, head, head *, body, *.before, *.after, *.before *, *.after * { behavior: none; } * { behavior: expression($.pseudo(this)); }"}})(jQuery);