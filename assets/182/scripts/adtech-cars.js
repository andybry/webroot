adtech.setAdTagPrefix("CAR");adtech.setAdTagData({LB:"2387619|0|277",L2:"2387618|0|2973",BL:"2374384|0|1358",BA:"2387541|0|2973",BR:"2374385|0|1945",ML:"2374386|0|1356",MR:"2374382|0|1357",TL:"2374387|0|2892",TR:"2374383|0|1946",VLB:"2823218|0|3585"});adtech.dynamicLink=false;adtech.savedLBLogin="";adtech.savedLinkName="";adtech.savedLinkURL="";adtech.defaultLinkName="download single reviews";adtech.defaultLinkHref="http://www.whichdigitalstore.co.uk/individual-car-reports/";adtech.adclickL2="";adtech.metaData=$("meta[name^='car.']");adtech.superAdTagWrite=adtech.adTagWrite;adtech.adTagWrite=function(b,a){this.superAdTagWrite(b,a);$("div.promo-single-logged-out, div.promo-logged-out").find(".inner>ul li").each(function(){var c=$(this);adtech.metaData.each(function(){var d=this;c.text(c.text().replace("{"+d.name+"}",d.content))})});if(b=="LB"){adtech.adTagWrite("VLB",a);adtech.adTagWrite("L2",a)}};$.getScript("http://www.whichdigitalstore.co.uk/car-reports-index.js");try{adtech.carUrl=document.location.href.slice(document.location.href.lastIndexOf("/")+1)}catch(Err){adtech.carUrl=""}adtech.registerLightboxTriggers=function(){$("button.valuations-link").unbind().click(function(){this.form.submit()})};adtech.adTagWriteCallback=adtech.registerLightboxTriggers;adtech.initialised=false;adtech.setup=function(){var b=$("#idlink");var a=b.text();if(adtech.initialised&&(a.indexOf("{link.")<0)){return}adtech.savedLinkName=a;adtech.defaultLinkName=b.attr("rel")||adtech.defaultLinkName;adtech.savedLBLogin=$("#lblogin").attr("href");adtech.savedLinkURL=adtech.adclickL2+b.attr("href");adtech.defaultLinkHref=adtech.adclickL2+adtech.defaultLinkHref;adtech.dynamicLink=adtech.savedLinkName.indexOf("{link.")>=0;if(adtech.dynamicLink){b.text(adtech.defaultLinkName);b.attr("href",adtech.defaultLinkHref)}adtech.registerLightboxTriggers();adtech.initialised=true};$(window).load(function(){setTimeout(adtech.setup,500)});tb_close_callback=function(){$("#lblogin").attr("href",adtech.savedLBLogin);var a=$("#idlink");if(adtech.dynamicLink){a.text(adtech.defaultLinkName);a.attr("href",adtech.defaultLinkHref);$("#idpriceprefix").each(function(){$(this).text($(this).text().replace(/for\s/,"from "))})}};adtech.showValuationsLightbox=function(b){adtech.setup();var a=$(b);var d=a.attr("href");if(a.is("button")){d=a.parents("form").attr("action")}if($("#carslightbox").size()==0){adtech.log("Unable to find valuations lightbox in page");window.location.href=d;return false}if($("#carslightbox-panel").find(".innerTwo").size()==0){$("#carslightbox-panel").append($("#valuations-panel").detach())}$("#carslightbox-panel").find(".inner").hide().end().find(".innerTwo").show();var c=tb_close_callback;tb_close_callback=function(){tb_close_callback=c;$("#carslightbox-panel").find(".inner").show().end().find(".innerTwo").hide()};$("#vlbcaplink").attr("href",$("#vlbcaplink").attr("href").split("link=")[0]+"link="+d);tb_show("","TB_inline?inlineId=carslightbox&height=600&width=600&modal=true",false);return false};