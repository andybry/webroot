var addthis_config={data_track_clickback:true,pubid:"which"};var which={loadTrackingImage:function(a){var b=document.createElement("img");b.src="//www.staticwhich.co.uk/assets/images/tracking-images/"+a+".gif";document.body.appendChild(b)},selectDrivenEnable:function(a,c,b){if($("#"+a).val()===c){$("#"+b).removeAttr("disabled")}else{$("#"+b).attr("disabled","disabled")}$("#"+a).change(function(){if($("#"+a).val()===c){$("#"+b).removeAttr("disabled")}else{$("#"+b).attr("disabled","disabled");$("p.error[htmlfor="+b+"]").remove()}})},showForJS:function(){$("#page .show-for-js").show()},printPage:function(){if(!document.getElementsByTagName){return}$("#content h1").attr("id","print-page-positioner").before('<p id="print-page-js"><a href="#">Print this page</a></p>');$("#print-page-js a").click(function(){window.print();return false})},enlargeImage:function(a){$(a+" a").click(function(){$("#enlarged-image").remove();$(this).parent().before('<div id="enlarged-image"><img src="/assets/images/icons/close.png" alt="Close" class="close" /><img src="'+this.href+'" height="400" width="400" alt="" /></div>');$("#enlarged-image").click(function(){$(this).remove()});return false})},contactUs:function(){var b=$("form.contact-form").find("div.which-member"),a=$("div.which-member input[@name=membershipNumberNoYes]:checked");b.on("click","label.membershipNumberNo input",function(){$("div.membership-number").slideUp("fast")});b.on("click","label.membershipNumberYes input",function(){$("div.membership-number").slideDown()});if(a.attr("id")==="membershipNumberYes"){a.trigger("click")}if(which.helpBubble){which.helpBubble.init("#content","#membershipnumber")}},socialBookmarks:function(b){var a=(b?b:"#socialbookmarks");$(a).append('<div class="addthis_toolbox addthis_default_style"><a class="addthis_button_email"></a><a class="addthis_button_twitter"></a><a class="addthis_button_favorites"></a><a class="addthis_button_facebook"></a><a class="addthis_button_google_plusone" g:plusone:count="false"></a><a class="addthis_button_compact"><img src="http://www.which.co.uk/assets/images/icons/more-bookmarks.jpg" width="76" height="16" alt="" border="0"/></a></div>');if(a==="#socialbookmarks"){$(a).prepend("<h3>Share, bookmark or subscribe</h3>");$.ajax({cache:true,dataType:"script",success:function(c){addthis.init()},url:"http://s7.addthis.com/js/250/addthis_widget.js"})}},socialBookmarksInNews:function(){var a=document,c=a.getElementById("breadcrumbs"),b;if(!c||a.getElementById("image-gallery")){return}c=c.getElementsByTagName("li");b=$("#content").find("img:first").parent();if(c&&c[2]&&c[2].innerHTML.toLowerCase().indexOf("/news/")>0&&c.length>4&&b.length>0){b.wrap('<div class="share-this-news"></div>');which.socialBookmarks("div.share-this-news")}},loadScript:function(b,c){var a=document.createElement("script");a.type="text/javascript";a.async=true;a.src=b.src;if(c&&c!=""){if(a.addEventListener){a.addEventListener("load",function(){c()},false)}else{a.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){c()}}}}document.body.appendChild(a)},loadStylesheet:function(a){var c=document,b=c.createElement("link");b.type="text/css";b.rel="stylesheet";b.href=a;c.getElementsByTagName("head")[0].appendChild(b)},contentSlide:function(e){var b="Hide all details",c="Show all details",d='<a href="#" id="show-all-content">'+c+"</a>",a=e.find("h2:first");if(document.getElementById("tab-content")){return}else{this.categoryToggle(e.find("div"))}$("#show-all-content").toggle(function(){$("#report-listing").find("div.review-section").removeClass("collapsed").removeAttr("style").end().find("h2").removeClass("closed").addClass("open");$(this).html(b).blur();return false},function(){$("#report-listing").find("div.review-section").addClass("collapsed").removeAttr("style").end().find("h2").attr("class","closed");$(this).html(c).blur();return false})},categoryToggle:function(a){a.each(function(){$subCategory=$(this);$subCategoryHeader=$(this).find("h3");$subCategoryList=$(this).find("ul");if($(this).index()===1){$subCategoryHeader.addClass("open")}else{$subCategoryList.toggle();$subCategoryHeader.addClass("closed")}$subCategoryHeader.click(function(){$currentHeader=$(this);$currentHeader.parent().find("ul").slideToggle(1000,function(){if($(this).index()===1){$currentHeader.toggleClass("open");$currentHeader.toggleClass("closed")}});return false})})},productReviewContent:function(c){var b="h2",a="div.review-section";c.find(a).addClass("collapsed");c.find(b).addClass("closed");c.delegate(b,"click",function(){$(this).toggleClass("open").toggleClass("closed").next(a).slideToggle(500);return false});c.find(b).first().trigger("click")},modalSignup:function(){$("body").append('<div id="modalSignupDiv"><iframe id="modalSignupIFrame" width="100%" height="100%" marginWidth="0" marginHeight="0" frameBorder="0" scrolling="auto" title="Signup"></iframe></div>');$("#modalSignupDiv").dialog({modal:true,autoOpen:false,height:"700",width:"980",draggable:false,resizeable:false,closeOnEscape:true,dialogClass:"signup-dialog",show:"fade",close:function(a,b){window.location.reload()}});$(".modalSignup").click(function(){$("#modalSignupDiv").dialog("option","title","Sign up to Which?");$("#modalSignupDiv").dialog("open");$("#modalSignupIFrame").attr("src","http://www.which.co.uk/signup");return false});if(/iPhone|iPod|iPad/.test(navigator.userAgent)){$("iframe").wrap(function(){var a=$(this);return $("<div />").css({width:a.attr("width"),height:a.attr("height"),overflow:"auto","-webkit-overflow-scrolling":"touch"})})}},tabController:function(d,e){e=d+" "+e;var a="",b=$(e).eq(0).text(),c;$(d).eq(0).before('<ul id="inpage-nav"><li class="on"><a href="#"><span>'+b+"</span></a></li></ul>");$(e).eq(0).addClass("removed");if($(d).length>1){for(c=1;c<=$(d).length-1;c+=1){$(d).eq(c).hide();a=$(e).eq(c).text();$(e).eq(c).addClass("removed");$("#inpage-nav").append('<li><a href="#"><span>'+a+"</span></a></li>")}}$("#inpage-nav li").click(function(){$(d).hide();$("#inpage-nav li.on").removeClass("on");$(this).addClass("on");var f=$("#inpage-nav li").index(this);$(d).eq(f).show();return false})},navigationHoverEnhancer:function(){if(!$.browser.opera){$("#tabs li").mouseover(function(){$("#tabs ul").removeClass("js-hover")});$("#tabs ul").bind("mouseleave",function(){$(this).addClass("js-hover")})}},ajaxLogReporter:function(c,d){var b="service/util/log",a='{"logMessage":{"message": "'+c+'", "ajaxRequestURL":"'+d+'"}}';$.ajax({type:"POST",url:b,data:a,dataType:"json",contentType:"application/json; charset=utf-8"})},createCookie:function(c,d,e){var b,a="";if(e){b=new Date();b.setTime(b.getTime()+(e*24*60*60*1000));a="; expires="+b.toGMTString()}document.cookie=c+"="+d+a+"; path=/"},readCookie:function(b){var f,a,d,e;a=document.cookie.split(";");e=b+"=";for(d=0;d<a.length;d+=1){f=a[d];while(f.charAt(0)===" "){f=f.substring(1,f.length)}if(f.indexOf(e)===0){return f.substring(e.length,f.length)}}return null},deleteCookie:function(a){which.createCookie(a,"",-1)},resetCookies:function(){var h,d,l,k,j,i;h=document.cookie.split("; ");j=0;i="Thu, 01 Jan 1970 00:00:00 GMT";for(k=0;k<h.length&&h[k];k+=1){j+=1;for(d="."+location.host;d;d=d.replace(/^(?:\.|[^\.]+)/,"")){for(l=location.pathname;l;l=l.replace(/.$/,"")){document.cookie=(h[k]+"; domain="+d+"; path="+l+"; expires="+i)}}document.cookie=h[k]+"; expires="+i}window.location.reload()},omnitureSwitchCharityIDs:function(){var b,a="?cid="+$("#charity-switch-form").attr("class");if(a.length>0){$("#tabs a, #sidebar a").each(function(){b=$(this).attr("href")+a;$(this).attr("href",b)});b=$("#charity-switch-form").attr("action")+a;$("#charity-switch-form").attr("action",b)}},pageReferrer:function(){if(!document.getElementsByTagName){return("")}var b,c=document.getElementsByTagName("meta"),a;for(b=0;b<c.length;b+=1){if(c[b].name==="referrerUrl"){a=c[b].content;return(a)}}return("")}};var pageInfo={url:location.href,urlContains:function(a){return(pageInfo.url.indexOf(a)>-1)?true:false}};function externalLinks(){$("#content").find("a[rel*=external]").live("click",function(){window.open(this.href);return false})}function printThisPage(){window.print();return false}function printPageLinks(){if(!document.getElementsByTagName){return}var b,c,a=document.getElementsByTagName("span");for(b=0;b<a.length;b+=1){c=a[b];if($(c).attr("class")==="js-print"){$(c).wrap('<a href="#"></a>');$(c).parent("a").click(printThisPage())}}}function hideForJS(){$(".js-hide").css({position:"absolute",left:"-99999px"})}var numCounter=0,numMaxAscensions=4,strErrorContainerClass="er",strErrorElement="body";function findErrorDiv(b){while(numCounter<numMaxAscensions){numCounter+=1;var a=b.hasClass(strErrorContainerClass);if(a){numCounter=0;return b}else{b=b.parent()}}return $(strErrorElement)}if(jQuery.validator){jQuery.validator.addMethod("money",function(b,a){return this.optional(a)||/^£?((\d{1,}(\.\d{1,2})?$)|((\d{1,3}(\,\d{3})*)((\.\d{2})?)$))/.test(b)},"Please enter a money value (e.g. 100,000.00 or 100000)");jQuery.validator.addMethod("moneywhole",function(b,a){return this.optional(a)||/^£?((\d{1,}$)|((\d{1,3}(\,\d{3})*)$))/.test(b)},"Please enter a whole money value (e.g. 100,000 or 100000)");jQuery.validator.addMethod("alphanumeric",function(b,a){return this.optional(a)||/^\w+$/i.test(b)},"Please enter an alphanumeric value")}function radioButtonControl(a){$("input[name="+a+"]").each(function(){if($(this).is(":checked")){$("#"+$(this).attr("id")+"-extra").css({position:"static",left:"auto"})}else{$("#"+$(this).attr("id")+"-extra").css({position:"absolute",left:"-99999px"})}})}function radioClickEvent(a){radioButtonControl(a);$("input[name="+a+"]").click(function(){radioButtonControl(a)})}var inPageNav={defaultAdtechPanel:"",init:function(){var b,d,a=$("#in-page-nav"),c=a.find("div.category-taster");c.find("h3.title").remove().end().hide();b=a.find(".current a").attr("href");d=$(b).html();$("#category-taster-holder").prepend(d);a.find("a.tab-label").click(function(){inPageNav.flip($(this).parent(),$(this).attr("href"));return false})},flip:function(b,a){var c=$(a).html();if($("#category-taster-holder #adtech-technology-verticaltop-np div").length>0){inPageNav.defaultAdtechPanel=$("#adtech-technology-verticaltop-np").wrap("<div>").parent().html()}if($(a).find(".adtech-promo").html()===""){c+=inPageNav.defaultAdtechPanel}$("#category-taster-holder").html(c);$("#in-page-nav").find("li.current").removeClass("current");b.addClass("current")},initHorizontal:function(){var b,d,a=$("#in-page-nav"),c=a.find("div.category-taster");c.find("h3.title").remove().end().hide();b=a.find(".current a").attr("href");d=$(b).html();$(b).find(".adtech-promo").attr("id","");$("#category-taster-holder").prepend(d);$("#in-page-nav").find("a.tab-label").click(function(){inPageNav.flipHorizontal($(this).parent(),$(this).attr("href"));return false})},flipHorizontal:function(b,a){var d=$("#category-taster-holder");if(d.find(".adtech-promo div").length>0){inPageNav.defaultAdtechPanel=d.find(".adtech-promo").html()}if($(a).find(".adtech-promo").html()===""){$(a).find(".adtech-promo").html(inPageNav.defaultAdtechPanel)}var c=$(a).html();d.html(c);$("#in-page-nav").find("li.current").removeClass("current");b.addClass("current")}};var moneyTables={init:function(){var c,a,b;$('#recommended-providers > div:not(".current-table")').hide();$("#recommended-providers h3.tab-title").each(function(e){var d=$(this);a=d.parent().attr("id");b=d.text();if(e===0){c='<li class="current">';c+='<a href="#'+a+'"><span>'+b+"</span></a></li>"}else{if(d.parent().find("table").length===0){c+='<li class="disabled">';c+="<span><span>"+b+"</span></span></li>"}else{c+="<li>";c+='<a href="#'+a+'"><span>'+b+"</span></a></li>"}}});$("#relationship-with-providers").hide().addClass("money-popup");$("#relationship-with-providers").append('<a id="relationship-with-providers-close-link">Close</a>');$("#relationship-with-providers").wrapInner('<div class="money-popup-inner" />');$("#recommended-providers h2").after('<a id="link-relationship-with-providers" href="#relationship-with-providers">How Which? makes money from its tables</a><ul id="money-nav">'+c+"</ul>");$("#recommended-providers h3.tab-title").remove();$('#recommended-providers #money-nav li:not(".disabled") a').click(function(){moneyTables.flip($(this));return false});$("#relationship-with-providers-close-link").click(function(){$("#relationship-with-providers").hide();return false});$("#link-relationship-with-providers").click(function(){$("#relationship-with-providers").show();return false})},flip:function(a){$("#recommended-providers li.current").first().removeClass("current");$("#recommended-providers div.current-table").first().removeClass("current-table").hide();a.parent().addClass("current");a.blur();a=$("#"+a.attr("href").split("#")[1]);a.addClass("current-table").fadeIn("slow")}};var homepage={counter:1,carousel:function(){var b=$("#home-intro"),c=$("#intro-tabs li a"),d=b.find("div:first div").attr("class"),a=(typeof(carouselProps)!=="undefined")?carouselProps:{};homepage.props=a;homepage.props.enabled=a.enabled||"on";homepage.props.opacityType=a.opacityType||"toggle";homepage.props.speedOut=a.speedOut||1000;homepage.props.speedIn=a.speedIn||1000;homepage.props.timeout=a.timeout||6000;b.addClass("js-enabled").tabs({fx:[{opacity:homepage.props.opacityType,duration:homepage.props.speedOut},{opacity:homepage.props.opacityType,duration:homepage.props.speedIn}]});c.first().addClass(d);if(homepage.props.enabled==="on"){b.tabs("rotate",homepage.props.timeout)}}};var MT={hideHelp:function(){if($("#contextual-help").length>0){$("#contextual-help").remove();$("div.help-wrapper").css("z-index","10")}},showHelp:function(d){var c,a=d.find("a.column-help").attr("href"),b;if(a.indexOf("#")>0){c=a.split("#");a="#"+c[1]}b=$(a).html();d.find("div.help-wrapper").append('<div id="contextual-help">'+b+"</div>");$("#contextual-help").append('<span id="close-contextual-help">X</span>').bind("click",function(){MT.hideHelp();return false});d.find("div.help-wrapper").css("z-index","20")},setupHelp:function(){var c,d=$("table.money-table").find("thead"),b,a;d.find("a.column-help").each(function(){b=$(this);c=b.parent();b.css({position:"absolute",top:"-15px",right:"-5px"});a=c.html();c.bind("click",function(){MT.hideHelp();MT.showHelp($(this));return false});c.html('<div class="help-wrapper">'+a+"</div>")})},ieVersion:function(){var c,a=3,d=document.createElement("div"),b=d.getElementsByTagName("i");while(d.innerHTML="<!--[if gt IE "+(++a)+"]><i></i><![endif]-->",b[0]){}return a>4?a:c},isIE:function(){if(MT.ieVersion()<9){var a=document.createElement("script");a.async="true";a.src="//www.staticwhich.co.uk/assets/scripts/ie-css-fix.js";document.getElementsByTagName("head")[0].appendChild(a)}},init:function(){$("#contextual-help-text").hide();MT.isIE();MT.setupHelp()}};which.VIDEO={initPortalPlayer:function(){var a=document.createElement("script");a.src="http://admin.brightcove.com/js/BrightcoveExperiences_all.js";if(a.addEventListener){a.addEventListener("load",function(){brightcove.createExperiences()},false)}else{a.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){brightcove.createExperiences()}}}document.getElementsByTagName("head")[0].appendChild(a)},playVideo:function(d){var c=$("object.BrightcoveExperience").attr("id"),a=brightcove.getExperience(c),b=a.getModule(APIModules.VIDEO_PLAYER);b.loadVideo(d)},pauseVideo:function(d){var c=$("object.BrightcoveExperience").attr("id"),a=brightcove.getExperience(c),b=a.getModule(APIModules.VIDEO_PLAYER);b.pause()},enableHighlightVideos:function(){$(document).ready(function(){$("#featured-videos").bind("click",function(b){var a=$(b.target).closest("div").attr("data-video-id");if(a){which.VIDEO.playVideo(a)}})})}};$(document).ready(function(){var c=document;$("html").addClass("js");if($("#in-page-nav.horizontal").size()>0){inPageNav.initHorizontal()}else{if(c.getElementById("in-page-nav")){inPageNav.init()}}if(c.getElementById("recommended-providers")){moneyTables.init()}if(c.getElementById("home-intro")){homepage.carousel()}if(c.getElementById("products-a-z")){which.productsHoverInit()}if($("#tabs").find("ul").length>0){which.navigationHoverEnhancer()}if(($("a.dialogbox").length>0&&!c.getElementById("signUp")&&!c.getElementById("log-in")&&!c.getElementById("signup-gift"))||(c.getElementById("contact-online-form"))){which.loadStylesheet("/assets/styles/jquery-ui.css");which.loadScript({src:"/assets/scripts/modal-window.js"},"")}if($("form.contact-form").length>0){which.contactUs()}$("#content").find(".contact-item").find(".google-map").show();if($("object.BrightcoveExperience").length>0){which.VIDEO.initPortalPlayer();which.VIDEO.enableHighlightVideos()}if(c.getElementById("video-gallery")){$("#video-gallery").tabs();if($("div.podcast-gallery").length>0&&c.createElement("audio").canPlayType){var a,d=c.querySelectorAll("audio"),b=d.length;$("#video-gallery").find("li").find("a").click(function(){for(a=b;a--;){d[a].pause()}return false})}}if(c.getElementById("socialbookmarks")||c.getElementById("image-gallery")){which.socialBookmarks();which.socialBookmarksInNews()}$STplayers=$("#main").find(".STplayer");if($STplayers.length>0){which.loadScript({src:"/assets/scripts/jquery.captionbox.js"},"");STglobalSettings={initialState:"closed"}}if(c.getElementById("image-gallery")){which.loadScript({src:"/assets/scripts/image-gallery-new.js"},"")}if(c.getElementById("photo-gallery")||c.getElementById("gallery")){which.loadScript({src:"/assets/scripts/gallery.js"},"")}if(c.getElementById("money")&&$("table.money-table").length>0){MT.init()}if(c.getElementById("charity-switch-form")){which.omnitureSwitchCharityIDs()}if($("span.js-print").length>0){printPageLinks()}if($("#report-listing.slider").length>0){which.contentSlide($("#report-listing.slider"))}if($('img[data-subscription="true"]').length>0){console.log("found sub icon");if(!which.helpBubble){return}which.helpBubble.init("#content",'img[data-subscription="true"]',{id:"subscription-icon-message"})}if($("#product-table").length>0&&$("#slider").length!==0){which.loadScript({src:"/assets/scripts/page-slide.js"},"")}if(c.getElementById("computing")&&c.getElementById("help-desk")){if(!which.helpBubble){return}which.helpBubble.init("#content","a.help-button")}if($(".modalSignup").length>0&&!(/iPhone|iPod|iPad|Android/.test(navigator.userAgent))&&!($.browser.msie&&parseInt($.browser.version,10)<=7)){which.modalSignup()}externalLinks();which.showForJS();hideForJS()});