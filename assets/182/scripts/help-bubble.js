which.helpBubble={adjWidth:140,adjVerticalPadding:40,fixedMsgIdSuffix:false,webPageWidth:960,outline:function(a){return'<div id="help-bubble">'+a+'<a href="#" class="close">Close</a><b></b></div>'},show:function(a){var l=arguments,j=(l[1]&&l[1].track)?l[1].track:"",d,k=(which.helpBubble.fixedMsgIdSuffix)?which.helpBubble.fixedMsgIdSuffix:a.attr("id"),b=$("#help-"+k).find(".help-content"),g=a.offset(),e=(a.width()-16)/2,c=g.left-this.adjWidth+e,m=g.top-this.adjVerticalPadding+2,h,f=which.helpBubble.outline(b.html());$("body").append(f);d=$("#help-bubble");h=d.height()+14;d.attr("data-index",j).css({top:m-h+"px",left:c+"px"}).find("a.close").on("click",function(){which.helpBubble.remove();return false});if(!which.helpBubble.availableWidth(g)){c=c-this.adjWidth+8;d.css("left",c+"px").addClass("bubble-align-left")}},availableWidth:function(e){var a,d,c,b;if(window.innerWidth&&window.innerHeight){b=window.innerWidth}else{if(document.body&&document.body.offsetWidth){b=document.body.offsetWidth}else{if(document.compatMode==="CSS1Compat"&&document.documentElement&&document.documentElement.offsetWidth){b=document.documentElement.offsetWidth}}}a=((b-which.helpBubble.webPageWidth)/2);d=a+which.helpBubble.webPageWidth-e.left;c=a+d-45;if(c>which.helpBubble.adjWidth){return true}return false},remove:function(d){var c=document,a=c.getElementsByTagName("body"),b=c.getElementById("help-bubble");d=d||"fade";if(b){switch(d){case"immediate":a[0].removeChild(b);break;default:$("#help-bubble").fadeOut(function(){a[0].removeChild(b)})}return true}return false},currentIndex:function(){var a=document.getElementById("help-bubble");if(a){return parseInt(a.getAttribute("data-index"),10)}},init:function(b,c){var a=arguments;if(a[2]&&a[2].id){which.helpBubble.fixedMsgIdSuffix=a[2].id}$(b).on("click",c,function(){var e=which.helpBubble.currentIndex(),g=$(this),d=$(b).find(c),f=(d.index(g)*1)+1,h=(e===f)?which.helpBubble.remove():which.helpBubble.remove("immediate");if(!h||(e!==f)){which.helpBubble.show(g,{track:f})}return false});$("body").on("click",function(){which.helpBubble.remove()})}};