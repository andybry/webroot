var whichAjax = {
	
	//Switches Ajax on and off for screenreaders
	accessibilityAjax:function () {
	
		bolAjaxOn = true;
		
		//Preparing the turn ajax off links
		$("#turnOffAjaxLink").live("click", function() {
			which.createCookie("ajaxOff",true,365);
			location.reload(true);//Reload page
		});
		
		//Preparing the turn ajax on links
		$("#turnOnAjaxLink").live("click", function() {
			which.deleteCookie("ajaxOff");
			location.reload(true);//Reload page
		});
		
		//Ajax is on
		var ajaxOnText = '<p id="turnOffAjax" class="removed"><strong>Which: <abbr title="Asynchronous JavaScript and XML">AJAX</abbr> & accessibility:<br /></strong>\n\
			\tAjax is used on this page but may not be well supported by screen readers.<br/>\n\
			\tAjax is a method of updating content on the page dynamically without a page refresh, but the method of informing the screen reader user of the content change isnot guaranteed across all screen readers<br/>\n\
			\tWould you like to <a href="#" id="turnOffAjaxLink">disable ajax on this machine (requires cookies)</a>?<br/>\n\
			\tIf you elect to switch off Ajax now, there will be an option to turn it back on again at the top of the page.\n\
			</p>';
		
		//Ajax is off
		var ajaxOffText = '<p id="turnOnAjax" class="removed"><strong>Which: <abbr title="Asynchronous JavaScript and XML">AJAX</abbr> & accessibility</strong>\n\
			\tYou have elected to turn off Ajax for this page as it may not be well supported by screen readers.<br/>\n\
			\tAjax is a method of updating content on the page dynamically without a page refresh, but the method of informing the screen reader user of the content change is not guaranteed across all screen readers<br/>\n\
			\tWould you like to <a href="#" id="turnOnAjaxLink">enable ajax on this machine (requires cookies)</a>?<br/>\n\
			\tIf you elect to switch Ajax on now, there will be an option to turn it off again at the top of the page.\n\
			</p>' 
			
		
		if (which.readCookie("ajaxOff") != null) {bolAjaxOn = false}
		
		//If Ajax should be on
		if (bolAjaxOn) {
			$("body").prepend(ajaxOnText);//Adds - Ajax is off, would you like to turn on?
		}
		else if (!bolAjaxOn) {
			$("body").prepend(ajaxOffText);//Adds - Ajax is on, would you like to turn off?
		}
	},
	ajaxHandleError : function(data) {
		if (data.error != undefined) {	
			if (data.error.errorCode != undefined) {
				if (data.error.errorCode == 1101) { // If session timeout error message returned
					whichAjax.ajaxSessionTimeout(); // redirect to home page with session timeout message
				}
			}
		}
	},
	ajaxSessionTimeout : function() {
		location.href = '/switch/?sessionError=true'; //Redirect to the home page with session timeout status
	}
}
$(document).ready(function() {
	whichAjax.accessibilityAjax();
});