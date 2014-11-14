var addthis_config = { data_track_clickback: true, pubid: "which" };

var which = {
	navTab: function() {
		if (!jQuery.support.style) return; //IE will fail this test
		
		$.getScript('/assets/topics/scripts/jquery.color-RGBa-patch.js', function() {
			$("#category-nav li:not('.current')>ul a, #category-nav li:not('.current')>span").each(function() {
				$(this).css('background','transparent'); //change the property for non-js
			});
			
			$("#category-nav li:not('.current') *:not(div.extra-nav)").hover(
				function() {
					$(this).stop().animate({'backgroundColor':'#fff'}, 500);
				},
				
				function() {
					$(this).stop().animate({'backgroundColor':'transparent'}, 400);
				}
			);
		});
	}, 
	productsAddHover:function() {
		$(this).addClass("hovering");
		$productsAZ.show();
	},
	productsRemoveHover:function() {
		$(this).removeClass("hovering");
		$productsAZ.hide();
	},
	productsHoverInit:function() {
		$productsAZ = $("#products-a-z");
		var linkText = $productsAZ.find("h2").html();
		var menuToggle = "<span id='menu-toggle'><a href='#'>" + linkText + "</a></span>"
			
		$productsAZ.hide().find("h2").hide();
		$("#nav-wrapper").append($productsAZ);

		$productsAZ.wrap("<div id='menu-wrapper' />").before(menuToggle);
			
		var $menuWrapper = $("#menu-wrapper")
			
	 	var hoverConfig = {
		 	interval: 300,
		 	sensitivity: 4,
		 	over: which.productsAddHover,
		 	timeout: 0,
		 	out: which.productsRemoveHover
		 };
	 	 $menuWrapper.hoverIntent(hoverConfig);
		
		$menuWrapper.find("span a").click(function(){return false;})
	},
	
	//Mag 20090226: This function controls the behaviour of switching the enabling or disabling of an element based on a select option value change
	//Arguments: The select's id, the option value that kicks off the switch, the id of the element to be switched
	//Example: which.selectDrivenEnable("problems", "Other", "other-problem") place this in the $(document).ready
	selectDrivenEnable:function(selectId, optionValue, enableId)
	{
		if($('#'+selectId).val()==optionValue) {$('#'+enableId).removeAttr("disabled")} //If the element to be switched is disabled on page load, enable it
		$('#'+selectId).change(function()
			{
				
				if($('#'+selectId).val()==optionValue) {$('#'+enableId).removeAttr("disabled");} //enable
				else //disable
				{
					$('#'+enableId).attr("disabled", "disabled");
					$('p.error[htmlfor='+enableId+']').remove();//Removes the error message that may have occurred
				} 
			}
		);
	},
	showForJS:function()
	{
		$("#page .show-for-js").show();
	},
	//Mag 200903: Adds print page link before the h1 and give the h1 a right padding so both can co-exist peacefully
	printPage:function() 
	{
		if (!document.getElementsByTagName) return;
		
		$("#content h1").attr("id","print-page-positioner").before('<p id="print-page-js"><a href="#">Print this page</a></p>');
		$("#print-page-js a").click( function() { window.print(); return false; } );
	},
	//Mag 200904: Added accesibility for users with mobility issues to delay dissapearance of css hover nav
	enlargeImage:function(enlargerSelector)
	{
		$(enlargerSelector+" a").click(
			function(){
				$("#enlarged-image").remove();//Remove previous enlarged images
				$(this).parent().before('<div id="enlarged-image"><img src="/assets/images/icons/close.png" alt="Close" class="close" /><img src="'+this.href+'" height="400" width="400" alt="" /></div>');
				$("#enlarged-image").click(
					function(){
						$(this).remove();
					}
				);
				return false; //Do not follow href
			}
		);
	},
	
	socialBookmarks:function() {
		$('#socialbookmarks').append(
			'<h3>Share, bookmark or subscribe</h3>'
			+ '<div class="addthis_toolbox addthis_default_style">'
				+ '<a class="addthis_button_email"></a>'
				+ '<a class="addthis_button_twitter"></a>'
				+ '<a class="addthis_button_favorites"></a>'
				+ '<a class="addthis_button_facebook"></a>'
				+ '<a class="addthis_button_google"></a>'
				+ '<a class="addthis_button_compact"><img src="http://www.which.co.uk/assets/images/icons/more-bookmarks.jpg" width="76" height="16" border="0"/></a>'
			+ '</div>'
		);
		$.ajax({
		    cache: true,
		    dataType: 'script',
		    success: function(data) {
		    	addthis.init();
		    },
		    url: 'http://s7.addthis.com/js/250/addthis_widget.js'
		});
	},
	
	//Mag 200905: This function performs js tabbed content
	//It takes in 2 arguments: tabSelector is the css selector that identifies tabs content, tabTextSelector is the element that contains the tabs text for each tab
	//Example function call: which.tabController(".tab-container","h2");
	tabController:function(tabSelector, tabTextSelector)
	{
		tabTextSelector = tabSelector+" "+tabTextSelector;
		var firstTabText = $(tabTextSelector).eq(0).text();
		var currentTabText = "";
		
		$(tabSelector).eq(0).before('<ul id="inpage-nav"><li class="on"><a href="#"><span>'+firstTabText+'</span></a></li></ul>');
		$(tabTextSelector).eq(0).addClass("removed");//Remove first heading
		
		if ($(tabSelector).length > 1) {//Check there are two tab containers on the page
			for(i=1;i<=$(tabSelector).length-1;i++) {//Loop through all tabs content after the first one
				$(tabSelector).eq(i).hide();//Hide the tabs
				currentTabText = $(tabTextSelector).eq(i).text();//Get the text heading of the tab
				$(tabTextSelector).eq(i).addClass("removed");;//Hide the original text heading
				$("#inpage-nav").append('<li><a href="#"><span>'+currentTabText+'</span></a></li>');//Add new tab styled version of text heading
			}
		}
		
		$("#inpage-nav li").click(
			function(){
				$(tabSelector).hide();//Hides all tabs
				$("#inpage-nav li.on").removeClass("on");//Remove highlighted tab
				$(this).addClass("on");//Add highlighted tab css
				var showTabIndex = $("#inpage-nav li").index(this);
				$(tabSelector).eq(showTabIndex).show();
				return false; //Do not follow href*/
			}
		);
		
	}, 
	//Mag 200904: Added accesibility for users with mobility issues to delay dissapearance of css hover nav
	navigationHoverEnhancer:function()
	{
		if(!$.browser.opera){//Not working in Opera
			
			//Removes all other delayed hover sub nav displayed
			$("#tabs li").mouseover(
				function(){
					$("#tabs ul").removeClass("js-hover");
				}
			);
			
			//Delays the secondary navs focus on mouseleave to assist users with mobility issues
			$("#tabs ul").bind("mouseleave", 
				function(){
					$(this).addClass("js-hover");
					var t=setTimeout(function(){$("#tabs ul").removeClass("js-hover")},500);
				}
			);
		}
	}, 
	//Reports any Ajax problems via Ajax to be logged by Java
	ajaxLogReporter:function (strMessage, strAjaxURL) {
		var strAjaxLogURL = "service/util/log"
		var jsonLogMessage = '{"logMessage":{"message":"'+strMessage+'","ajaxRequestURL":"'+strAjaxURL+'"}}';
		$.ajax({type: "POST", url: strAjaxLogURL, data: jsonLogMessage, dataType: "json", contentType: "application/json; charset=utf-8"});
	},
	createCookie:function (name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	},
	readCookie:function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	deleteCookie:function (name) {
		which.createCookie(name,"",-1);
	},
	omnitureSwitchCharityIDs: function() {
		var omnitureParam,
		Id = '?cid=' + $('#charity-switch-form').attr('class');
		
		if (Id.length > 0) {
			$('#tabs a, #sidebar a').each(function() {
				omnitureParam = $(this).attr('href') + Id;
				$(this).attr('href', omnitureParam);
			});
			
			omnitureParam = $('#charity-switch-form').attr('action') + Id
			$('#charity-switch-form').attr('action', omnitureParam);
		}
	},
	pageReferrer: function() {
		if (!document.getElementsByTagName) return;
		var referrer;
		var metas = document.getElementsByTagName("meta");
		for (i=0; i < metas.length; i++) {
			if (metas[i].name == "referrerUrl") {
				referrer = metas[i].content;
				return (referrer);
				break;
			}
		}
	},
	/**
	 * @name tariffToggle
	 * @memberOf which
	 * @description Gives tariffs collapsible behaviour on category pages
	 */
	tariffToggle: function () {
		var $subCategories;
		$subCategories = $("#tariff-listing.slider");
		$subCategories.find("div").each(function(){
			$subCategory = $(this);
			$subCategoryHeader = $(this).find("h3");
			$subCategoryList = $(this).find("div.tabContents");
			$subCategoryList.toggle();
			$subCategoryHeader.addClass("closed");
			$subCategoryHeader.click(function() {
				$currentHeader = $(this);
				$currentHeader.parent().find("div.tabContents").slideToggle(1000, function() {
					$currentHeader.toggleClass("open");
					$currentHeader.toggleClass("closed");
				});
				return false;
			})
		});
	},
	/**
	 * @name tariffChart
	 * @memberOf which
	 * @description Adds a Google Chart to tariffs, based on the tariff table
	 */
	tariffChart: function () {
		var width = 695,
			height = 225,
			barColour = '73357C',
			altText = 'Graph showing tariff history',
			urlBase = 'http://chart.apis.google.com/chart?'
					+ 'chxt=x,y,x,y'                                         // Axes
					+ '&chs=' + width + 'x' + height                         // Chart size
					+ '&cht=bvs'                                             // Bar chart (vertical)
					+ '&chco=' + barColour                                   // Bar colours
					+ '&chg=-1,-1,1,1'                                       // Grid
					+ '&chbh=r,0.5'                                          // Spacing between bars
					+ '&chxs=0,000000|1,000000|2,000000|3,000000';           // Label colours

		$('.tariffChart').each(function () {
			var i, chartUrl, chartMonths, chartYears, chartPrices, chartAveragePrice, chartMargin, chartMinPrice, chartMaxPrice, chartPoundLabel,
			currentPrice, currentMonth, imageHtml, interpolatedMonth, months = [], monthPoints = [], prices = [], pricePoints = [],
			monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			
			$(this).find('th.month').each(function () {
				months.push(new Date('1 ' + $(this).text()));
			});

			$(this).find('td.price').each(function () {
				prices.push($(this).text().replace('£', '').replace(/,/g, ''));
			});

			currentMonth = months[0];
			currentPrice = prices[0];
			monthPoints.push(currentMonth);
			pricePoints.push(currentPrice);
			
			for (i = 1; i < months.length; i = i + 1) {
				interpolatedMonth = new Date(currentMonth);
				interpolatedMonth.setMonth(interpolatedMonth.getMonth() + 1);
				while (interpolatedMonth < months[i]) {
					monthPoints.push(new Date(interpolatedMonth));
					pricePoints.push(currentPrice);
					interpolatedMonth.setMonth(interpolatedMonth.getMonth() + 1);
				}
				currentMonth = new Date(months[i]);
				currentPrice = prices[i];
				monthPoints.push(currentMonth);
				pricePoints.push(currentPrice);
			}
			
			chartMonths = '&chxl=0:|';         // Labels for month name (first x-axis label)
			chartYears = '2:|';                // Labels for year (second x-axis label)
			chartPrices = '&chd=t:';           // Data for prices
			chartPriceRange = '&chds=';        // Range of values for price (first y-axis label)
			chartPriceLabels = '&chxr=1,';     // Range of labels for price (first y-axis label)
			chartPoundLabel = '3:|£|';         // Text for pound sign (second y-axis label)
			chartPoundPosition = '&chxp=3,50'; // Position of pound sign (second y-axis label)
			
			for (i = 0; i < monthPoints.length; i = i + 1) {
				if (i > 0) {
					chartPrices = chartPrices + ',';
				}
				chartPrices = chartPrices + pricePoints[i];
				chartMonths = chartMonths + monthNames[monthPoints[i].getMonth()] + '|';
				chartYears = chartYears + monthPoints[i].getFullYear() + '|';
			}
			
			chartMinPrice = pricePoints[0];
			chartMaxPrice = pricePoints[0];

			for (i = 1; i < pricePoints.length; i = i + 1) {
				chartMinPrice = Math.min(chartMinPrice, pricePoints[i])
				chartMaxPrice = Math.max(chartMaxPrice, pricePoints[i])
			}
			
			chartMargin = Math.floor((chartMaxPrice - chartMinPrice) * 0.4);
			chartMinPrice = Math.max(chartMinPrice - chartMargin, 0);
			chartMaxPrice = chartMaxPrice + chartMargin;
			chartPriceRange = chartPriceRange + chartMinPrice + ',' + chartMaxPrice;
			chartPriceLabels = chartPriceLabels + chartMinPrice + ',' + chartMaxPrice;

			chartUrl = urlBase + chartPrices + chartMonths + chartYears + chartPoundLabel + chartPoundPosition;
			if (monthPoints.length > 1) {
				chartUrl = chartUrl + chartPriceRange + chartPriceLabels;
			}
			
			imageHtml = $('<img></img>').attr('src', chartUrl).attr('width', width).attr('height', height).attr('alt', altText);
			$('<div class="tariffChartImage"></div>').prepend(imageHtml).prependTo(this);
		});
	}
	//end of which closure
}
var pageInfo = {
	url: location.href,
	urlContains:function(value) {
		return (pageInfo.url.indexOf(value) > -1) ? true : false;
	}
}
/* ***************************************************************
	The following functions were moved to this file from jquery-specific.jsp
 * *******************************************************************/
//Opens links with rel="external" in a new window
function externalLinks() 
{
	$('a[rel*=external]').live("click", function() {
		window.open(this.href);
		return false;
	});
} 

//Adds js for print page to print text that stays on the page regardless of js on/off
//If a link is purely for 
function printPageLinks() 
{
	if (!document.getElementsByTagName) return;
 	var spans = document.getElementsByTagName("span");
 	
 	for (var i=0; i < spans.length; i++) 
 	{
   		var span = spans[i];
	   	if ($(span).attr("class") == "js-print") 
	   	{
	   		$(span).wrap('<a href="#"></a>');
	   		$(span).parent('a').click( function() { window.print(); return false; } );
	   	}
	 }
}
//Hides for JS version by reference to .js-hide
function hideForJS() 
{
	$('.js-hide').css({ position:"absolute", left:"-99999px" });
} 
//Mag Leahy 20080604: This function goes upwards in seach of element with class of strErrorContainerClass's value
//Arguments: Element that is causing the error
//There is limit of numMaxAscensions to limit steps up. This may need to be revisited. 
var numCounter = 0, numMaxAscensions = 4, strErrorContainerClass = 'er', strErrorElement = 'body';
function findErrorDiv(element){
	while (numCounter < numMaxAscensions){
		numCounter++; 
		var bolErrorHolder = element.hasClass(strErrorContainerClass); 
		if (bolErrorHolder){numCounter = 0; return element;}			
		else element = element.parent();
	}
	return $(strErrorElement); //If there's no match for error placement return default tag. 
}
//Mag Leahy 20080718: JQuery Custom Methods for validation
//http://docs.jquery.com/Plugins/Validation/Validator/addMethod#namemethodmessage
if(jQuery.validator) //Error checks that validation js is on the page
{
	//addMehtod: money checks if the value entered is numeric but allows "," and "£" in their correct use and 2 decimal places (optional).
	jQuery.validator.addMethod("money", function(value, element) {return this.optional(element) || /^£?((\d{1,}(\.\d{1,2})?$)|((\d{1,3}(\,\d{3})*)((\.\d{2})?)$))/.test(value);}, "Please enter a money value (e.g. 100,000.00 or 100000)");
	//addMehtod: moneywhole checks if the value entered is numeric but allows "," and "£" in their correct use but decimal places are not allowed.
	jQuery.validator.addMethod("moneywhole", function(value, element) {return this.optional(element) || /^£?((\d{1,}$)|((\d{1,3}(\,\d{3})*)$))/.test(value);}, "Please enter a whole money value (e.g. 100,000 or 100000)");
	//addMehtod: alphanumeric checks if the value entered is alphanumeric
	jQuery.validator.addMethod("alphanumeric", function(value, element) {return this.optional(element) || /^\w+$/i.test(value);}, "Please enter an alphanumeric value");
}
/* ***************************************************************
	The following functions were moved to this file from tools.js
 * *******************************************************************/
//Mag Leahy 20080604: This function loops though all radio buttons and performs show/hide actions.
//Arguments: Name of the radio button group 
//If a radio button is checked (e.g. #radio1) it shows the corresponding extra information (e.g. radio1-extra).
//All other extra information for non-checked radio buttons is hidden
function radioButtonControl(name){
	$('input[name='+name+']').each(	
	function(){
		
		if($(this).is(":checked")) $('#'+$(this).attr('id')+'-extra').css({ position:"static", left:"auto" });
		else $('#'+$(this).attr('id')+'-extra').css({ position:"absolute", left:"-99999px" });
		
	});
}
//Mag Leahy 20080604: Sorts out show/hide on load, of radio button extra information.
//Adds code to the onclick event
//Arguments: Name of the radio button group 
//Example call: radioClickEvent('buttongroupname');
function radioClickEvent(name){

	radioButtonControl(name);
	$('input[name='+name+']').click(function() {radioButtonControl(name);});
	
}

var inPageNav = {
	defaultAdtechPanel: '',
	init: function() {
		$('#in-page-nav div.category-taster').find('h3.title').remove().end().hide();
		var $Id = $('#in-page-nav .current a').attr('href');
		var tasterHtml = $($Id).html();
		$('#category-taster-holder').prepend(tasterHtml);
		$('#in-page-nav a.tab-label').click(function() {
			inPageNav.flip($(this).parent(), $(this).attr('href'));
			return false;
		});
	},
	flip: function($new, $Id) {
		var tasterHtml = $($Id).html();
		if ($('#category-taster-holder #adtech-technology-verticaltop-np div').length > 0) inPageNav.defaultAdtechPanel = $('#adtech-technology-verticaltop-np').wrap('<div>').parent().html();
		if ($($Id).find('.adtech-promo').html() == '') tasterHtml += inPageNav.defaultAdtechPanel;
		$('#category-taster-holder').html(tasterHtml);
		$('#in-page-nav li.current').removeClass('current');
		$new.addClass('current');
	}
}

var moneyTables = {
	init: function() {
		var tabs, linkUrl, linkText;
		$('#recommended-providers > div:not(".current-table")').hide(); // hide all but the current table
		$('#recommended-providers h3.tab-title').each(function(i) {
			var $elem = $(this);
			linkUrl = $elem.parent().attr('id');
			linkText = $elem.text();
			if (i == 0) {
				tabs = '<li class="current">';
				tabs += '<a href="#' + linkUrl + '"><span>' + linkText + '</span></a></li>';
			}
			else if ($elem.parent().find('table').length == 0) {
				tabs += '<li class="disabled">';
				tabs += '<span><span>' + linkText + '</span></span></li>';
			}
			else {
				tabs += '<li>';
				tabs += '<a href="#' + linkUrl + '"><span>' + linkText + '</span></a></li>';
			}
		});
	
		$('#relationship-with-providers').hide().addClass('money-popup');
		$('#relationship-with-providers').append('<a id="relationship-with-providers-close-link">Close</a>');	
		$('#relationship-with-providers').wrapInner('<div class="money-popup-inner" />');
		$('#recommended-providers h2').after('<a id="link-relationship-with-providers" href="#relationship-with-providers">How Which? makes money from its tables</a><ul id="money-nav">' + tabs + '</ul>');
		$('#recommended-providers h3.tab-title').remove();
		$('#recommended-providers #money-nav li:not(".disabled") a').click(function() {
			moneyTables.flip($(this));
			return false;
		});
		$('#relationship-with-providers-close-link').click(function() {
			$('#relationship-with-providers').hide();
			return false;
		});	
		$('#link-relationship-with-providers').click(function() {
			$('#relationship-with-providers').show();
			return false;
		});
	},
	flip: function($new) {
		$('#recommended-providers li.current').first().removeClass('current');
		$('#recommended-providers div.current-table').first().removeClass('current-table').hide();
		$new.parent().addClass('current');
		$new.blur();
		$new = $('#' + $new.attr('href').split('#')[1]);
		$new.addClass('current-table').fadeIn('slow');
	}
}

var homepage = {
	carousel: function() {
		var $homeIntro = $("#home-intro");
		var $introTabs = $("#intro-tabs li a");
		var firstDiv = $homeIntro.find("div:first div").attr("class");
						
		$homeIntro.addClass("js-enabled").tabs();
		$introTabs.first().addClass(firstDiv);
		
		$introTabs.click(function(){
			var visibleDiv = $homeIntro.find("div:visible div").attr("class");
			$introTabs.removeClass();
			
			$(this).addClass(visibleDiv);
		});
	}
}

//Onload function calls
$(document).ready(function (){
	if (document.getElementById('nav')) which.navTab();
	if (document.getElementById('in-page-nav')) inPageNav.init();
	if (document.getElementById('recommended-providers')) moneyTables.init();
	if (document.getElementById('home-intro')) homepage.carousel();
	if (document.getElementById('products-a-z')) which.productsHoverInit();
	if ($('#tabs ul').length > 0) which.navigationHoverEnhancer();
	if (document.getElementById('socialbookmarks')) which.socialBookmarks();
	if (document.getElementById('charity-switch-form')) which.omnitureSwitchCharityIDs();
	which.showForJS();
	if (document.getElementById('video-gallery')) $('#video-gallery').tabs(); // video tabs
	if (document.getElementById('tariff-listing')) which.tariffToggle();
	if (document.getElementById('tariff-listing')) which.tariffChart();
	externalLinks();
	if ($('span.js-print').length > 0) printPageLinks();
	hideForJS();
});