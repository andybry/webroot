jQuery(function($) {
	
	// Fix background image caching problem
	if (jQuery.browser.msie) {
		try {
			document.execCommand("BackgroundImageCache", false, true);
		} catch(err) {}
	}
	
	$("a.thickbox").each(function(){
	
		//If IE hide selects on starting thickbox
		if($.browser.msie)
		{
			$("a.thickbox").click(function(){
				$("#content form select").css("visibility","hidden");
			});
		}  	         	
	});
	

	// Set up credit card / direct debit switcher
	
	$('#paymentCC').click(function() {
	   $('div#creditCardSection').fadeIn('slow'); 
	   $('div#directDebitSection').hide();
	});
	
	$('#paymentDD').click(function() {
	   $('div#creditCardSection').hide();
	   $('div#directDebitSection').fadeIn('slow');     
	});
	
	if ($("input[@name='paymentType']:checked").val() == 'paymentCC') {
   		$('div#creditCardSection').show(); 
   		$('div#directDebitSection').hide();	
	} else if ($("input[@name='paymentType']:checked").val() == 'paymentDD') {
   		$('div#creditCardSection').hide(); 
   		$('div#directDebitSection').show(); 
  	}
	
	$('#autoFillAddress').click(function() {
    	$('div#addressSelectWrapper').fadeIn(); 
	});   
	
	// Set up shopping basket switcher
	
	$('#insert-basket').replaceWith("<li id='open-basket' href='#'><img src='../assets/images/buttons/btn-shopping-basket.png' width='165' height='26' alt='View Shopping basket' class='basket' /></li>");
	
	// click fade in 
	
	$('#open-basket').click(function() {
		$('#shopping-basket').fadeIn(200);
		//$('#shopping-basket').stop().fadeTo(200,1);
	});
	
	// click fade out  

	$('#shopping-basket h2').click(function() {
		$('#shopping-basket').fadeOut(500);   
	});

	// mouse fade out
	
	$('#shopping-basket').bind("mouseleave",function() {
		$('#shopping-basket').animate({opacity: 1.0}, 2000).fadeOut(2000);
	});
    
	// mouse fade in
	
	$('#shopping-basket').bind("mouseenter",function() {
		$('#shopping-basket').stop().fadeTo(500, 1);  
	});
	 
	$('#shopping-basket h2').bind("mouseenter",function() {
		$('#shopping-basket').stop().fadeTo(500, 1);  		
	});
                             
	// main add button
	$('#btn-basket').click(function() {
		$('#shopping-basket').fadeIn(500);
		$('#shopping-basket tbody tr:first').addClass("added-to-basket");
		$('#shopping-basket').animate({opacity: 1.0}, 2000).fadeOut(2000);
		$('#btn-basket').replaceWith("<div class='added'>Added to basket</div>");
		$('#controls input:image').replaceWith("<div class='added'>Added to basket</div>");
	});
	
	// side panel add button
	$('#add-both-to-basket').click(function() {
		$('#add-both-to-basket').replaceWith("<div class='added'>Added to basket</div>");
		$('#btn-basket').replaceWith("<div class='added'>Added to basket</div>");
		$('#controls input:image').replaceWith("<div class='added'>Added to basket</div>");		
	});
    
    // lightbox add buttons
	$('#controls input:image').click(function() {
		$('#controls input:image').replaceWith("<div class='added'>Added to basket</div>");
		$('#btn-basket').replaceWith("<div class='added'>Added to basket</div>"); 
	});
	
	// multiple add buttons
	$('#report-list input:image').each(
		function(intIndex) {
			$(this).bind(
				"click",
				function() { 
					$(this).replaceWith("<div class='added'>Added to basket</div>"); 
				}
			);
        }
	);
	
	
});