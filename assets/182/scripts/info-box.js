(function(a){a.fn.whichInfoBox=function(){var j=document,g=j.createElement("canvas"),e,l,h,m=jQuery.parseJSON(j.getElementById(this.attr("id")).getAttribute("data-settings")),i=(Math.PI/180),b=i*90,c=i*180,f=i*270,k=0,d;if("undefined"===typeof(which.usingExCanvas)){if(!g||!g.getContext){return}}d=a.extend({bgColor:"255,255,255",height:210,leftSideDepth:35,opacity:0.85,radius:5,width:435},m);h=d.leftSideDepth||(Math.tan(4*i)*d.width)+d.radius;e=j.getElementById("info-box");l=e.getContext("2d");l.beginPath();l.fillStyle="rgba("+d.bgColor+","+d.opacity+")";l.arc(d.radius,h,d.radius,c,f,false);l.arc((d.width-2*d.radius),d.radius,d.radius,f,k,false);l.arc((d.width-2*d.radius),(d.height-d.radius),d.radius,k,b,false);l.arc(d.radius,(d.height-h),d.radius,b,c,false);l.fill();l.closePath();a("html").addClass("canvas")}})(jQuery);(function(){canvasEnabled=function(b){var a=document.createElement("canvas");if(jQuery&&a&&a.getContext){b.whichInfoBox()}else{if(which.usingExCanvas){$(window).load(function(){b.whichInfoBox()})}else{return}}}})();