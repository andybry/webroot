define(["jquery","fr/lib/scripts/bootstrap-affix.mod","fr/lib/scripts/bootstrap-scrollspy.mod"],function(c,a,d){console.info("module.leftNav");var b=function(){var i=c("body"),g=c("html"),f=c(".tpl_article aside");if(!f.length){return}var h=f.offset().top-20,e=c("#ft").height()+210;f.affix({offset:{top:h,bottom:e}});i.scrollspy({target:"aside",offset:20});f.on("click","ul a",function(l){l.preventDefault();var j=c(this).attr("href"),k=c(j).offset().top;g.animate({scrollTop:k},1400,function(){location.hash=j});c.publish("analytics.interaction",{module:"article.navigation",key:j,val:document.location.pathname})})};return b()});