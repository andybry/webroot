if(window.adgroupid==undefined){window.adgroupid=Math.round(Math.random()*1000)}var dw=document.write;var adtech={timestamp:new Date().getTime(),liveNetworkID:"987.1",testNetworkID:"72.49",liveAdTagData:{LB:"2241372|0|277",TA:"2241371|0|750",MA:"2241373|0|751",L2:"2366222|0|1358"},testAdTagData:{LB:"2180432|0|277",TA:"2180431|0|750",MA:"2180433|0|751"},liveAdTagPrefix:"WLP",testAdTagPrefix:"LP",networkID:this.liveNetworkID,adTagData:this.liveAdTagData,adTagPrefix:this.liveAdTagPrefix,contentID:$("meta[name='content_id']").attr("content"),keywords:$("meta[name='categories']").attr("content"),hostname:"www.which.co.uk",adtechHostName:"adtech.which.co.uk",setHostname:function(a){if(a!=undefined){this.hostname=a}},getHostname:function(){return this.hostname},getAdtechHostname:function(){return this.adtechHostName},log:function(){if(window.console!=undefined){try{window.console.log(arguments)}catch(a){}}},setModeLive:function(){this.networkID=this.liveNetworkID;this.adTagData=this.liveAdTagData;this.adTagPrefix=this.liveAdTagPrefix},setModeTest:function(){this.networkID=this.testNetworkID;this.adTagData=this.testAdTagData;this.adTagPrefix=this.testAdTagPrefix},getReviewData:function(b){if(b.adclick==undefined){b.adclick=""}var c={p:b.pcount,b:b.bcount,d:b.dcount,v:0,u:"/reviews"};try{c=r[b.reviewid]}catch(a){}return c},invokeURL:function(a){if((a!=undefined)&&(a!="")){var b=new Image();b.src=a}},renderCallback:function(){},adTag:function(c,f){var a=(f==undefined)?true:f;var b=(!a)?Math.round(Math.random()*1000):window.adgroupid;var d=this.adTagPrefix+this.contentID+c;var e="http://"+this.getAdtechHostname()+"/addyn|3.0|"+this.networkID+"|"+this.adTagData[c]+"|ADTECH"+(a?";alias="+d:"")+(this.keywords?(";key="+this.keywords.replace(/\s+/g,"").split(",").join("+")):"")+";cookie=info;loc=100;target=_blank;grp="+b+";misc="+this.timestamp;return e},cookieBind:function(e,a,c,d){var b=this.getCookieUrl(e,a,c);$.ajax({type:"GET",url:b,async:false,dataType:"script",complete:d})},getCookieUrl:function(d,a,c){var b="";if((c==null)||(c=="remove")){b=";expiresDays=-1"}else{if(a=="session"){b=";expiressession=1"}else{b=";expiresDays="+a}}return"http://"+adtech.adtechHostName+"/bind?ckey1="+d+";cvalue1="+c+b+";adct=text/javascript"},bindOfferCodeCookie:function(a,b){this.cookieBind("user_offer",90,a,b)},bindMemberCookie:function(a,b){this.cookieBind("member",90,a,b)},unbindMemberCookie:function(a){this.cookieBind("member",0,"remove",a)},setAdtechOfferCodeCookie:function(c,b){var a=new Date();if(c>0){a.setTime(a.getTime()+(c*24*60*60*1000))}document.cookie="adtech_code="+b+"; expires="+a.toGMTString()+"; path=/"},setAdtechLoginCookie:function(c,b){var a=new Date();if(c>0){a.setTime(a.getTime()+(c*24*60*60*1000))}document.cookie="adtech_auth="+b+"; expires="+a.toGMTString()+"; path=/"},isOfferCodeBindRequired:function(){if(which.readCookie("adtech_code")==null){return true}if(which.readCookie("adtech_code")!=which.readCookie("offer_code")){return true}return false},isBindRequired:function(){if((which.readCookie("sso_auth")!="0")&&(which.readCookie("adtech_auth")=="0")){return true}return false},isUnbindRequired:function(){if(which.readCookie("adtech_auth")==null){return true}if((which.readCookie("sso_auth")=="0")&&(which.readCookie("adtech_auth")!="0")){return true}return false},testCookieBinding:function(c){message="sso_auth: "+which.readCookie("sso_auth")+", adtech_auth: "+which.readCookie("adtech_auth")+", offer_code: "+which.readCookie("offer_code")+", adtech_code: "+which.readCookie("adtech_code")+", unbind? "+this.isUnbindRequired()+", bind? "+this.isBindRequired()+", bindoffer? "+this.isOfferCodeBindRequired();if(this.isUnbindRequired()){adtech.unbindMemberCookie(function(){adtech.setAdtechLoginCookie(90,"0");if(adtech.isOfferCodeBindRequired()){var d=which.readCookie("offer_code");adtech.bindOfferCodeCookie(d,function(){adtech.setAdtechOfferCodeCookie(90,d);if(typeof c=="function"){c.call(this,null)}})}else{if(typeof c=="function"){c.call(this,null)}}})}else{if(this.isBindRequired()){adtech.bindMemberCookie("wol",function(){adtech.setAdtechLoginCookie(90,"1");if(adtech.isOfferCodeBindRequired()){var d=which.readCookie("offer_code");adtech.bindOfferCodeCookie(d,function(){adtech.setAdtechOfferCodeCookie(90,d);if(typeof c=="function"){c.call(this,null)}})}else{if(typeof c=="function"){c.call(this,null)}}})}else{if(this.isOfferCodeBindRequired()){var b=which.readCookie("offer_code");if(b==null){b=""}adtech.bindOfferCodeCookie(b,function(){adtech.setAdtechOfferCodeCookie(90,b);if(typeof c=="function"){c.call(this,null)}})}else{if(typeof c=="function"){c.call(this,null)}}}}var a=window.console;if(a&&a.log){a.log(message)}},adTagWrite:function(b,a){document.write("<div id='adtech-"+b+"'></div>");if(b=="LB"){document.write("<div id='adtech-L2'></div>")}document.write=function(c){__ADTECH_CODE__+=c};if(b=="LB"){this.testCookieBinding(function(){inFIF=false;__ADTECH_CODE__="";$.getScript(adtech.adTag(b,a),function(){$("#adtech-"+b).empty();$("#adtech-"+b).append(__ADTECH_CODE__)});$.getScript(adtech.adTag("L2",a),function(){$("#adtech-L2").empty();$("#adtech-L2").append(__ADTECH_CODE__)})})}else{this.testCookieBinding(function(){inFIF=false;__ADTECH_CODE__="";$.getScript(adtech.adTag(b,a),function(){$("#adtech-"+b).empty();$("#adtech-"+b).append(__ADTECH_CODE__)})})}document.write=dw},renderTA:function(a){var b=this.getReviewData(a);$("#promo-TA").setTemplateURL("http://"+this.getHostname()+"/assets/5.9.4-SNAPSHOT/scripts/templates/lpta.tpl").setParam("rdata",b).processTemplate(a).find("a.adrecord").click(function(){adtech.invokeURL(a.adclick+this.href)});if(tb_init!=undefined){tb_init("div.a-grow a.thickbox")}return this.renderCallback},renderMA:function(a){var b=this.getReviewData(a);$("#promo-MA").setTemplateURL("http://"+this.getHostname()+"/assets/5.9.4-SNAPSHOT/scripts/templates/lpma.tpl").setParam("rdata",b).processTemplate(a).find("a.adrecord").click(function(){adtech.invokeURL(a.adclick+this.href)});if(tb_init!=undefined){tb_init("div.a-grow a.thickbox")}return this.renderCallback},renderLB:function(a){var b=this.getReviewData(a);$("#promo-LB").setTemplateURL("http://"+this.getHostname()+"/assets/5.9.4-SNAPSHOT/scripts/templates/lplb.tpl").setParam("rdata",b).processTemplate(a).hide().find("a.adrecord").click(function(){adtech.invokeURL(a.adclick+this.href)});return this.renderCallback},beacon:function(a){this.invokeURL("https://secserv.adtech.de/pcsale/3.0/987/0/0/0/BeaconId=4511;rettype=img;subnid=1;SalesValue=1;custom1="+a+" width='1' height'1'")},updateLB:function(a){$("#WhichLightbox div.promo-detail a, #WhichLightbox p.pdf-download a").eq(1).each(function(){var b=$(this).attr("href");var c="link=";var d=b.indexOf(c);if(d>=0){b=b.slice(d+c.length)}$(this).attr("href",a+b)})},init:function(){this.setModeLive()}};adtech.init();var host="www.which.co.uk";try{host=adtech.setHostname(document.location.host)}catch(Err){}$(document).ready(function(){$(".promo-ba").hide();$("div[class^='js-promo'] a.thickbox").each(function(){var a=this.href;var b=a.indexOf("#");if(b!=-1){var c=a.substr(b+1);a="#TB_inline?keepThis=true&amp;height=558&amp;width=736&amp;modal=true&amp;inlineId="+c}$(this).attr("href",a)})});