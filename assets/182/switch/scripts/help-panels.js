 $(document).ready(function() {
	 
	if($.browser.msie && $.browser.version <= 6) return;//IE6 will use the non-js version of help text
	
	// hide the non-js help panel
	$('#content .pf-help').addClass('hidden');
		$('#page, #content').css('overflow', 'visible');

	// for each of the help buttons
    $('#content .help-button').click(function () {
		// ref elements
		var link = $(this);
						
			// Get the position of the anchor - the popup will be positioned relative to this

			var windowHeight = $(window).height(); // Height of viewport
			var link_top = (($(this).position().top) + 10); // Distance from top of parent to top of link
			var link_left = (($(this).position().left) + 10); // Distance of link from left of parent
			var viewportOffset = (($(this).offset().top) - ($(window).scrollTop())); // Position of link in relation to viewport
			
			// clear existing help-popup
			$('#help-popup').remove();

			// get the anchored help-panel content and construct popup box
			$(link.attr('href'))		
				.clone() // copy	
				.removeAttr('id') // no dup ids
				.insertAfter(link) // insert after link
				.prepend('<span id="help-close">x</span>') // add the close button
				.wrap('<div id="help-popup"><div id="sb"></div></div>')  // wrap in required divs
				.parent().append('<!--[if lte IE 6.5]><iframe src="javascript:false;"></iframe><![endif]-->') // bug fix for IE6
				.find('#help-popup strong:first').remove() // remove the heading 
				;
				
				var positionHelpPanels = true;
				
				//If there is a page variable set, dontPositionHelpPanels = false, don't re-positon the help popups
				if (window.dontPositionHelpPanels != undefined) {
					if(dontPositionHelpPanels) {
						positionHelpPanels = false;
					}
				}
				
				if (positionHelpPanels) {
					
					var contentWidth = $("#content").width();
					
					// if anchor is too close to right or bottom edges then adjust help div position
					var popupHeight = $("#help-popup").height();
					var popupWidth = $("#help-popup").width();
					
					if ((viewportOffset + popupHeight)  > windowHeight) {
						link_top = (link_top - (popupHeight + 20));
					} 
					
					if (link_left > (contentWidth - popupWidth)) {
						link_left = (link_left - (popupWidth + 10));
					}
				}
				
				// popup has been constructed and position calculated so now ready to be shown
				$("#help-popup").css({ left: link_left, top: link_top, visibility:"visible" })  
				
	
				
			// add close link event
			$('#help-popup #help-close').click(function () {
				$(this).parent().parent().parent().remove();
				$('body').unbind('click');
				return false;			
	        });
			
			// add close to body
			$('body').click(function () {
				$('#help-popup').remove();
				$('body').unbind('click');
				return false;				
	        });
			
			// cancel the default link behaviour
			return false;
        });
		  	  	  
});



