!function(b){var a=function(d,c){this.options=b.extend({},b.fn.affix.defaults,c);this.$window=b(window).on("scroll.affix.data-api",b.proxy(this.checkPosition,this));this.$element=b(d);this.checkPosition()};a.prototype.checkPosition=function(){if(!this.$element.is(":visible")){return}var g=b(document).height(),i=this.$window.scrollTop(),c=this.$element.offset(),j=this.options.offset,e=j.bottom,f=j.top,h="affix affix-top affix-bottom",d;if(typeof j!="object"){e=f=j}if(typeof f=="function"){f=j.top()}if(typeof e=="function"){e=j.bottom()}d=this.unpin!=null&&(i+this.unpin<=c.top)?false:e!=null&&(c.top+this.$element.height()>=g-e)?"bottom":f!=null&&i<=f?"top":false;if(this.affixed===d){return}this.affixed=d;this.unpin=d=="bottom"?c.top-i:null;this.$element.removeClass(h).addClass("affix"+(d?"-"+d:""))};b.fn.affix=function(c){return this.each(function(){var f=b(this),e=f.data("affix"),d=typeof c=="object"&&c;if(!e){f.data("affix",(e=new a(this,d)))}if(typeof c=="string"){e[c]()}})};b.fn.affix.Constructor=a;b.fn.affix.defaults={offset:0};b(window).on("load",function(){b('[data-spy="affix"]').each(function(){var d=b(this),c=d.data();c.offset=c.offset||{};c.offsetBottom&&(c.offset.bottom=c.offsetBottom);c.offsetTop&&(c.offset.top=c.offsetTop);d.affix(c)})})}(window.jQuery);