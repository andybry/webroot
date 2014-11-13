/* 
Title:     Which? Signup form scripts
Updated:   November 2008 - Responsys submittion
Updated:	June 2009 - Postcode lookup
Updated:	August 2009 - principle changes (1) remove validation as user progresses through form (2) remove most inline help messages
*/

jQuery(function($) {
  	$('.help-area a').remove();
	$("#detailsCC .remove-r-border").show();
	$('#select-button').remove();
	$('.allHelpText').hide();
	$('#tsCs').show();
	$('#supportingInformation').hide();
	$('.showForNonJS').hide();
	$('.showForJS').show();
	$('#offerSummary').hide();
	
	//Update submit button (invokes correct server-side action) - name and button value
	$('#confirmOrder').attr({
		'name': '_eventId_confirm',
		'value': 'Complete Purchase'
	})
	.css('background-image','url(/assets/images/buttons/btn-complete-sign-up.gif)');
	
	//setup data post to Responsys
	$('#emailAddress, #emailAddress2').blur(function() {
		sendToResponsys(false);
		}
	);
	
	$('#contact-me').click(function() {
		sendToResponsys(true);
		}
	);
	
	$('#cPreviewCardType').text($('#ccCardTypeField option:selected').text());
	$('#closeWindow').click(function() { self.close(); return false;});
	$('#printNow').click(function() { self.print(); return false;});
	$('#TandCBack a#closeWindow').text('Close window');

	// Hack to stop IE losing the session
	$('#TandCBack a').attr('href','#');
		
	/*--------------------------------
	postcode lookup plugin definition
	---------------------------------*/
	var clientSideTest;
	var msgEireBeforeAddressLine1;
	var msgEnterAddress;
	
	msgEnterAddress = 'Please enter your address';
	msgEireBeforeAddressLine1 = '<p class="msgEireBeforeAddressLine1">' + msgEnterAddress + '</p>';
	
	$.fn.findAddress = function(options) {
		opts = $.extend({}, $.fn.findAddress.defaults, options);
		$(this).click(lookupAddresses);
		$(opts.addressDropDownSelector).change(addressSelected);
	};

	var opts;
	var dtimeout;

	// private function - lookup the addresses using ajax
	function lookupAddresses() {
		$('#findAddressButton').blur();
		$('#selectAddress').parent().hide();
		clientSideTest = false;
		if (!validateInputs()) return;
		removeError();
		displayThrobber();
		clearAddressesDropDown();
		var house = $(opts.searchHouseNumberSelector).val();
		var postcode = $(opts.searchPostcodeSelector).val();
		var url = "/address/paf/addressesWithMeterNumbers/" + (house == "" ? "*" : house ) + "/" + (postcode == "" ? " " : postcode) + "/";
		$.ajax({
			type: "GET",
			dataType: "json",
			timeout:5000,
			url: url,
			success: delayDisplayResults,
			error: displayRemoteError
		});
	};

	function validateInputs(){
		var postcode = $(opts.searchPostcodeSelector).val().replace(/^\s+|\s+$/g, ''); // trimmed
		var ok = true;
		if (postcode=="") {
			clientSideTest = true;
			displayLocalError(opts.errorMessages.ERR05_MissingPostcode, opts.searchPostcodeSelector, true);
			ok = false;
		} else if (!isUKPostcode(postcode) && !isUKForcesPostcode(postcode)) {
			clientSideTest = true;
			displayLocalError(opts.errorMessages.ERR06_InvalidPostcode, opts.searchPostcodeSelector, true);
			ok = false;
		}
		return ok;
	}

	function isUKPostcode(postcode) {
		var regex = new RegExp("^[A-Z]{1,2}[0-9R][0-9A-Z]?[ ]?[0-9][ABD-HJLNP-UW-Z]{2}$","i");
		return regex.test(postcode);
	}

	function isUKForcesPostcode(postcode) {
		var regex = new RegExp("^(BFPO[ ]?[0-9]{1,4})$","i");
		return regex.test(postcode);
	}

	function displayRemoteError(xhr, textStatus, errorThrown) {
		displayLocalError(xhr.responseText, opts.addressDropDownSelector);
	}

	function displayLocalError(error, fieldSelector, clearErrorMsg) {
		removeThrobber();
		var errorMsg = error;
		if (opts.errorMessages[error]) {
			errorMsg = opts.errorMessages[error];
		} else {
			errorMsg = opts.errorMessages['ERRXX_UnknownProblem'];
		}

		if (clearErrorMsg) removeError();
		
		if (clientSideTest==true) {
			validateField(fieldSelector, false);
		} else {
			error = '';
			$(fieldSelector).parent().prev().append('<div id="errorMessage"><p class="error">'+errorMsg+'</p></div>');
		}
		//show other fields if address not found
		if (error == '' || error == 'ERR01_AddressNotFound' || error == 'ERR07_ConnectionProblem' || error == 'ERRXX_UnknownProblem') {
			$('#addressLine1, #addressLine2, #postCode, #postTown').parent().show();
			country.displayLabel('United Kingdom');
		}
	}

	function removeError() {
		$("#errorMessage").remove();
		$('#lookupPostCode').parent().find('.error').remove(); //ensure error message has been removed from above QAS postcode field
	}

	function displayThrobber() {
		removeThrobber(); //ensure not already visible
		$('#findAddressButton').after('<img id="throbber" src="/assets/images/content/sign-up/throbber.gif" alt=""/>');
	}

	function removeThrobber() {
		$("#throbber").remove();
	}

	function delayDisplayResults(results) {
		clearTimeout(dtimeout);
		var displayResultsFunc = new displayPostCodeSearchResults(results);
        // show the results after a small delay - just long enough so the user realises something is happening...
		dtimeout = setTimeout(displayResultsFunc.showResults, 200);
	}

	function displayPostCodeSearchResults(results) {
		var foundAddresses = results.addressList.addresses;
		this.showResults = function(){
            if ($.isArray(foundAddresses)) {
			    populateDropDownWithResults(foundAddresses);
				showSelectField();
				showAddressFields();
            } else {
                lookupAndShowAddress(foundAddresses.addressId,true);
            }
			removeThrobber();
		};
	}

	function clearAddressesDropDown() {
		$(opts.addressDropDownSelector).children().remove();
	}

	function populateDropDownWithResults(addresses) {
		var selectBox = $(opts.addressDropDownSelector);
		$(selectBox).children().remove();
		$(selectBox).append("<option value='-1'>Please select...</option>");
		if ($.isArray(addresses)) {
			for (var i = 0; i < addresses.length; i++) {
				$(selectBox).append("<option value='" + addresses[i].addressId + "'>" + getAddressLineDetails(addresses[i].addressLines, "singleLineAddress") + "</option>");
			}
		} else {
			$(selectBox).append("<option value='" + addresses.addressId + "'>" + getAddressLineDetails(addresses.addressLines, "singleLineAddress") + "</option>");
		}
	}

    function addressSelected() {
        var addressId =  $(opts.addressDropDownSelector + " option:selected").val();
        lookupAndShowAddress(addressId,false);
    }

	function lookupAndShowAddress(addressId, oneAddressOnly) {
		removeError();
		clearSelectedAddress();
		var responseFunction = (oneAddressOnly) ? displayOneAddress : displaySelectedAddress;
		if ($(opts.addressDropDownSelector).val() != "-1") {
			var url = "/address/paf/address/" + addressId;
			$.ajax({
				type: "GET",
				dataType: "json",
				timeout:5000,
				url: url,
				success: responseFunction,
				error: displayRemoteError
			});
		}
	}

	function displaySelectedAddress(results) {
		populateAddressDetails(results.address);
	}

	function displayOneAddress(results) {
		$('#lookupHouseNumber, #lookupPostCode, #findAddressButton, #outsideUKLink').parent().remove();
		$('#selectAddress').parent().remove();
		$('#addressIntro1').remove();
		$('#addressIntro2').html('<p class="alertMsg"><img height="19" width="21" alt="tick" src="/assets/images/content/sign-up/correct-alert.png"/>'+opts.helpMessages.oneAddressFound+'</p>');
		$('#lookupCountry').next().hide();
		$('#country, #lookupCountry').hide();
		$('#countryDisplay').html('');
		$('#countryDisplay').parent().show();
		populateAddressDetails(results.address);
		country.displayLabel($('#countryId option:selected').text());
	}
	
	function clearSelectedAddress() {
		$(opts.addressLine0Selector).val("");
		$(opts.addressLine1Selector).val("");
		$(opts.townSelector).val("");
		$(opts.postcodeSelector).val("");
	}

	function getAddressLineDetails(addressLinesArray, lineType, defaultValue) {
		var details = defaultValue;
		if (addressLinesArray && lineType) {
			if ($.isArray(addressLinesArray)) {
				for (var i = 0; i < addressLinesArray.length; i++) {
					var addressLine = addressLinesArray[i];
					var type = addressLine.lineType;
					if (type == lineType) {
						details = addressLine.details;
						if (!details || details == null) {
							details = defaultValue;
						}
						return details;
					}
				}
			} else {
				details = addressLinesArray.details;
			}
		}
		return details;
	}

	function populateAddressDetails(address) {
		var addressLinesArray = address.addressLines;
        // note this truncates the lines to fit with the H1LDA field lengths
		$(opts.addressLine0Selector).val(getAddressLineDetails(addressLinesArray, "addressLine_0","").substring(0,27));
		$(opts.addressLine1Selector).val(getAddressLineDetails(addressLinesArray, "addressLine_1","").substring(0,31));
		$(opts.townSelector).val(getAddressLineDetails(addressLinesArray, "town","").substring(0,31));
		$(opts.postcodeSelector).val(getAddressLineDetails(addressLinesArray, "postCode",""));
		showAddressFields();
	}

	function showAddressFields() {
		$('#addressLine1, #addressLine2, #postCode, #postTown').parent().show();
	}
	
	function showSelectField() {
		$('#selectAddress').parent().show();
	}
	
	$("#findAddressButton").findAddress(
		{
			searchHouseNumberSelector:'#lookupHouseNumber',
			searchPostcodeSelector:'#lookupPostCode',
			addressDropDownSelector:'#selectAddress',
			addressLine0Selector:'#addressLine1',
			addressLine1Selector:'#addressLine2',
			townSelector:'#postTown',
			postcodeSelector:'#postCode',
			errorMessages: {
				ERR01_AddressNotFound:'We were unable to find your address. Please try again or type your address below.',
				ERR02_TooManyResults:'Too many results.',
				ERR03_MissingHouseNumber:'Please enter a house number or name.',
				ERR04_MissingHouseNumberAndPostcode:'You need to provide your house name or number and postcode.',
				ERR05_MissingPostcode:'Please enter a UK postcode.',
				ERR06_InvalidPostcode:'Please enter a valid UK postcode.',
				ERR07_ConnectionProblem:'Sorry, there is a problem with the connection to the postcode lookup service.<br/>Please enter your details below instead.',
				ERRXX_UnknownProblem:'Sorry, an unknown problem occurred with the postcode lookup service.<br/>Please enter your details below instead.'
			},
			helpMessages: {
				oneAddressFound:'We found one address matching the details you provided. If this address is not correct please edit the details below.'
			}
		}
	);
	// end of postcode lookup
	
	// Errors are stored here; the key is the ID of the form field
	var formErrors = {}; // Now moved back inside the JQuery closure
	
	// Set up contextual help...
	var contextualHelp = $('<div id="contextualHelp"></div>');
	contextualHelp.hide().appendTo('#signUp');
	$('#contextualHelp').hide(); //was still showing in Safari so set top to -900px
	var contextualHelpInner = $('<div></div>').appendTo(contextualHelp);
	
	// Used to hide help after 1 sec, provided no one else wants to show it
	var hideHelpTimer;
	
	// helpArrow is a div containing the ]- thing
	var helpArrow = $('<div id="helpArrow"></div>').css({
		'position': 'absolute',
		'left': '482px',
		'top': '-900px', // This changes
		'height': '0px', // This changes
		'width': '20px'
	}).hide().appendTo('#signUp');
	var helpBrace = $('<div id="helpArrowBrace"></div>').css({
		'width': '5px',
		'height': '100%', //This will change too as IE was not refreshing height
		'border-right': '1px solid #ccc',
		'border-bottom': '1px solid #ccc',
		'border-top': '1px solid #ccc'
	}).appendTo(helpArrow);
	var helpBar = $('<div id="helpArrowBar"></div>').css({
		'width': '15px',
		'height': '0px',
		'border-top': '1px solid #ccc',
		'position': 'absolute',
		'top': '50%',
		'left': '5px'
	}).appendTo(helpArrow);
	
	
	//Setup progress bar container and image but hide from view until needed
		var processMsg = '<div id="processing"><p><img src="/assets/images/icons/processing-spinner.gif" height="32" width="32" alt="processing form" /></p><p>Processing your registration...</p></div>';
		$(processMsg).appendTo('#content').hide();
		$('#processing').css({
			'display': 'none',
			'position': 'absolute',
			'top': '213px',
			'left': '25%',
			'font-size': '100%',
			'padding': '3em 0 3em 0',
			'text-align': 'center',
			'width': '50%', 
			'font-family': 'Verdana, Helvetica, sans-serif',
			'border': 'solid 2px',
			'border-color': '#CCC #999 #999 #CCC',
			'background-color': '#F6F6F6'		
		});
	
	function showHelp(helpWrapper, helpHtml) {
		// Display contextual help next to helpWrapper div
		if (hideHelpTimer) {
			clearTimeout(hideHelpTimer);
			hideHelpTimer = null;
		}
		
		var top = $(helpWrapper).offset().top;
		var height = $(helpWrapper).height();
		helpArrow.css('top', top + 'px');
		helpBrace.height(height);
		helpArrow.height(height).show();
		contextualHelpInner.html(helpHtml);
		contextualHelp.css('top', top + 'px').show();
	}
	
	function showHelpForField(field) {
		var input = $(field);
		var helpWrapper = input.parents('div.helpWrapper');
		var helpSelector = '.h_' + field.id;
		var helpHtml = $('<p></p>');
		var helpHtmlInner = $(helpSelector + ' + p.helpText').html();
		helpHtml.html(helpHtmlInner);
		if (helpHtmlInner) showHelp(helpWrapper, helpHtml);
	}
	
	$('div.helpWrapper').find(':input').focus(function() {
		showHelpForField(this);
		// Remove help on blurring field
		$(this).blur(function () {
			$('#contextualHelp').hide();
			$('#helpArrow').hide();
			return false;				
        });
	}).end().find('p.helpText').hide();
	// ... contextual help ends
	
	// Set up credit card / direct debit switcher
	function switchPayment() {
		if ($('select#paymentMethod').val() == 'paymentCC') {
			$('div#creditCardSection').show().
				removeClass('childrenAreHidden');
			$('div#creditCardPreview').show();
			$('div#directDebitSection').hide().
				addClass('childrenAreHidden');;
			$('div#directDebitPreview').hide();
			$('div#detailsDD').hide();
			$('#detailsCC').show();
			$('#confirmArea .detailsArea').addClass('detailsDivider');
		} else {
			$('div#creditCardSection').hide().
				addClass('childrenAreHidden');;
			$('div#creditCardPreview').hide();
			$('#detailsCC').hide();
			$('div#detailsDD').show();
			$('div#directDebitSection').show().
				removeClass('childrenAreHidden');
			$('div#directDebitPreview').show();
			$('#confirmArea .detailsArea').removeClass('detailsDivider');
			
			//Setup DD print function
			ddPrintSetup();
		}
	}
	$('select#paymentMethod').change(switchPayment);
	switchPayment(); // For page reloads
	
	// Set up the Direct Debit preview box
	$('input#ddNameField').blur(function() {
		$('#ddPreviewName').text($(this).val());
	});
	$('input#ddNameField').blur();
	$('input#ddNumberField').blur(function() {
		$('#ddPreviewNumber').html(boxNumbers($(this).val()));
	});
	
	$('input#ddNumberField').blur();
	
	function allSortCodeValid() {
		var numbers = $.map(
			['ddSort1Field', 'ddSort2Field', 'ddSort3Field'], 
			function(id) { return /^\d{2}$/.exec($('#' + id).val()) }
		);
		return (numbers.length == 3);
	}
	
	function ddPreviewSortCode() {
		// Only show preview of sort code if all three boxes filled
		if (allSortCodeValid()) {
			var numbers = $.map(
				['ddSort1Field', 'ddSort2Field', 'ddSort3Field'], 
				function(id) { return $('#' + id).val() }
			);
			$('#ddPreviewSortCode').html(boxNumbers(numbers.join("")));
			getBankAddress(numbers.join(""), document.getElementById("ddNumberField"));
		}
		else $('#ddPreviewSortCode').html("");
	}
	
	$('#ddSort1Field,#ddSort2Field,#ddSort3Field').blur(ddPreviewSortCode);
	ddPreviewSortCode();
	
	//Update Card preview box
	$('#ccCardTypeField').blur(function() {
		$('#cPreviewCardType').text($('#ccCardTypeField option:selected').text());
	});
	
	$('#creditCardName').blur(function() {
		$('#cPreviewName').text($(this).val());
	});
	
	$('#ccNumberField').blur(function() {
		$('#cPreviewNumber').text($(this).val());
	});
	
	$('#ccEndMonthField').blur(function() {
		$('#cPreviewMonthExpiry').text($(this).val());
	});
	
	$('#ccEndYearField').blur(function() {
		$('#cPreviewYearExpiry').text($(this).val());
	});

	// Pre-populate accountName with first and last names
	$('input#firstnameField,input#surnameOrCompany').change(function() {
		$('input#accountName').val(
			$('input#foreName').val() + ' ' +
			$('input#surnameOrCompany').val()
		);
		// Don't forget to update the direct debit preview
		$('#ddPreviewName').text($('input#accountName').val());
	});
	
	/* Set up validation. This works as an onblur handler on ALL fields - 
	   when it is fired it checks the validation rules object to see if this
	   field has one, and if it has it runs it, updates the formErrors 
	   object to reflect the result and shows or hides the relevant '!'
	
	   The submit button is going to have to call this on ALL fields.
	*/
	function validateField(field, dueToSubmit) {
		// dueToSubmit is a flag: false means that validation is happening as 
		// a direct result of the user manipulating the field in some way, 
		// true means it is happening indirectly (due to the submit button
		// at the bottom being pressed or because the user has focused on a 
		// different field further down the page). We need to distinguish 
		// between the two to know if we should be updating the contextual
		// help text in the case of a field becoming valid.
		// Returns true if the field was valid, false otherwise.
		var input = $(field);
		removeErrorField(input); //remove any error markers if present-SK

		if (input.parents('.childrenAreHidden').length > 0) {
			delete formErrors[input.attr('id')];
			return true;
		}
		
		if (validationRules) {
			// required to avoid fail if server catches error and sends page back 
			var validator = validationRules[input.attr('id')];
		}
		
		if (typeof validator == 'undefined') {
			return true; // No validation rule for this input
		}
		
		var errorMsg = validator(input.val());
		var wrapper = input.parents('div.fieldWrapper,div.fieldWrapperInline');
		
		if (errorMsg) {
			formErrors[input.attr('id')] = errorMsg;
			applyErrorField(input, wrapper);
			return false;
		} else {
			delete formErrors[input.attr('id')];
			return true;
		}
	}
	
	function isValid(field) {
	    var input = $(field);
        var validator = validationRules[input.attr('id')];
        if (typeof validator == 'undefined') return true;
        if (validator(input.val())) return false;
        return true;
	}
	
	function applyErrorField(input, wrapper) {
		var errorMsg;
		if (validationRules) {
			var validator = validationRules[input.attr('id')];
			errorMsg = validator(input.val());
		}
		else {
			errorMsg = input.attr('title');
		}
		$('<p class="error">' + errorMsg + '</p>').prependTo(wrapper);
	}
	
	function removeErrorField(input) {
		input.removeClass('error');
		input.parents(
			'div.fieldWrapper,div.fieldWrapperInline'
		).find('.error').remove();
	}
	
	/* The validators. These functions return the empty string if the field
	   is valid, and an error message if it is not. Note that while they 
	   are given the value of the feed as an argument they may chose not to
	   use that, or to look at other parts of the DOM (e.g. when comparing
	   the two password fields for equality).
	*/
	function makeRequiredRule(errorMsg) {
		return function(val) {
			if (!$.trim(val)) {
				return errorMsg;
			} else {
				return '';
			}
		}
	}
	
	var fieldErrorMessages = {
		'titleField': 'Please select a title.',
		'firstName': 'Please enter first name.',
		'lastName': 'Please enter last name.',
		'addressLine1': 'Please enter address line 1.',
		'postTown': 'Please enter a Town/City.',
		'postCode': opts.errorMessages.ERR05_MissingPostcode,
		'countryId': 'Please select a country.',
		'houseNumber': opts.errorMessages.ERR03_MissingHouseNumber,
		'invalidPostCode': opts.errorMessages.ERR06_InvalidPostcode,
		'emailAddressUsername': 'If you want to use an email address as your username, it must be the same as the one given in the Email address field.',
		'emailAddress': 'Please enter your email address.',
		'emailAddressInvalid': 'Please enter a valid email address.',
		'emailAddress2': 'This email address does not match that given above.',
		'emailAddressMsg2': 'Please re-enter your email address.',
		'loginPassword': 'Please enter a password of between 6 and 12 characters, using only the letters a - z and the numbers 0 - 9.',
		'loginPassword2': 'This password does not match that given above.',
		'loginPasswordMsg2': 'Please re-enter your password.',
		'secretQuestion': 'Please select a secret question.',
		'secretAnswer': 'Please supply a secret answer.',
		'secretAnswerDate': 'Secret answer date must be in the format DD/MM/YYYY.',
		'username': 'Please enter a username.',
		'usernameMsg2': 'Your username must be at least 6 characters in length.',
		'ddNameField': 'Please enter the name of the account holder.',
		'ddNumberField': 'Please enter an account number.',
		'ddNumberFieldMsg2': 'Account number must be at least 8 digits.',
		'ddSortField': 'Please enter a valid sort code.',
		'creditCardName': 'Please enter the name on the card.',
		'ccNumberField': 'Please enter the card number.',
		'ccNumberFieldLenghth': 'The card number must be 13-19 numeric characters in length.',
		'ccEndMonthField': 'Please select an expiry date.',
		'ccEndYearField': 'Please select an expiry date.',
		'tsandcs': 'You need to agree to our Terms & Conditions.',
		'paymentMethod': 'Please select a payment type.'
	}
	
	var titleRequired = makeRequiredRule(
		fieldErrorMessages['titleField']
	);
	var firstNameRequired = makeRequiredRule(
		fieldErrorMessages['firstName']
	);
	var lastNameRequired = makeRequiredRule(
		fieldErrorMessages['lastName']
	);
	var addressRequired = makeRequiredRule(
		fieldErrorMessages['addressLine1']
	);
	var postTownRequired = makeRequiredRule(
		fieldErrorMessages['postTown']
	);
	var secretQuestionRequired = makeRequiredRule(
		fieldErrorMessages['secretQuestion']
	);
	var usernameRequired = makeRequiredRule(
		fieldErrorMessages['username']
	);
	var countryRequired = makeRequiredRule(
		fieldErrorMessages['countryId']
	);
	var houseNumberRequired = makeRequiredRule(
		fieldErrorMessages['houseNumber']
	);
	var paymentMethodRequired = makeRequiredRule(
		fieldErrorMessages['paymentMethod']
	);

	function sortCodeValid(number) {
		if (!allSortCodeValid()) {
			return fieldErrorMessages['ddSortField'];
		}
	}
	
	function endDateValid(value) {
		if ($('#ccEndMonthField').val() == '' || $('#ccEndYearField').val() == '') {
			return fieldErrorMessages['ccEndMonthField'];
		}
	}

	function postCodeRequired(postcode) {
		if (postcode.length == 0) return fieldErrorMessages['postCode']
		if ((!isUKPostcode(postcode) && !isUKForcesPostcode(postcode))) {
			return fieldErrorMessages['invalidPostCode']
		}
	}
	
	function validateEmailAddress(email,field) {
		if (!field) var field = 'emailAddress';
		if (email.length == 0 && field == 'emailAddress') return fieldErrorMessages['emailAddress'];
		if (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(email)
				|| (email.indexOf("/") > 0 ))
		{
			switch (field) {
				case 'username':
					return fieldErrorMessages['emailAddressUsername'];
					break;
				default:
					return fieldErrorMessages['emailAddressInvalid'];
			}
		}
	}
	
	var validationRules = {
		'titleField': titleRequired,
		'firstName': firstNameRequired,
		'lastName': lastNameRequired,
		'addressLine1': addressRequired,
		'postTown': postTownRequired,
		'postCode': postCodeRequired,
		'lookupPostCode': postCodeRequired,
		'countryId': countryRequired,
		'emailAddress': function(email){
			return validateEmailAddress(email);
		},
		'emailAddress2': function(email2) {
			if (email2 != $('input#emailAddress').val()) {
				return fieldErrorMessages['emailAddress2'];
			}
			if (!$.trim(email2)) {
				return fieldErrorMessages['emailAddressMsg2'];
			}
		},
		'loginPassword': function(password) {
			if (/[^a-zA-Z0-9]/.exec(password)) {
				return fieldErrorMessages['loginPassword'];
			}
			if (password.length < 6) {
				return fieldErrorMessages['loginPassword'];
			}
		},
		'loginPassword2': function(password2) {
			if (password2 != $('input#loginPassword').val()) {
				return fieldErrorMessages['loginPassword2'];
			}
			if (!$.trim(password2)) {
				return fieldErrorMessages['loginPasswordMsg2'];
			}
		},
		'secretQuestion': secretQuestionRequired,
		'secretAnswer': function() {
			var strSecretAnswer = $('#secretAnswer').val();
			if (!$.trim(strSecretAnswer)) return fieldErrorMessages['secretAnswer'];
			if ($('#secretQuestion').val() == 4)
			{
				if (!/^\d{2}[\/-]\d{2}[\/-]\d{4}$/.exec(strSecretAnswer))
				{
					return fieldErrorMessages['secretAnswerDate'];
				}
			}
		},
		'username': function() {
			var strUsername = $('#username').val();
			if (!$.trim(strUsername)) return fieldErrorMessages['username'];
			if (strUsername.length < 6) return fieldErrorMessages['usernameMsg2'];
			if (strUsername.indexOf('@') > 0) {
				return validateEmailAddress(strUsername, 'username');
			}
		},
		'ddNameField': makeRequiredRule(
			fieldErrorMessages['ddNameField']
		),
		'ddNumberField': function(number) {
			if (!$.trim(number)) {
				return fieldErrorMessages['ddNumberField'];
			}
			if (!/^\d{8}$/.exec(number)) {
				return fieldErrorMessages['ddNumberFieldMsg2'];
			}
		},
		'ddSort1Field': sortCodeValid,
		'ddSort2Field': sortCodeValid,
		'ddSort3Field': sortCodeValid,
		'creditCardName': makeRequiredRule(
			fieldErrorMessages['creditCardName']
		),
		'ccNumberField': function(number) {
			if (!$.trim(number)) {
				return fieldErrorMessages['ccNumberField'];
			}
			number = number.replace(/\s/g, '');
			if (!/^\d{13,19}$/.exec(number)) {
				return fieldErrorMessages['ccNumberFieldLenghth'];
			}
			number = number.replace(/\s/g, '');
			if(number.length < 13 || number.length > 19) {
				return fieldErrorMessages['ccNumberField'];
			}
		},
		'ccEndMonthField': endDateValid,
		'ccEndYearField': endDateValid,
		'tsandcs': function() {
			if (!$('input#tsandcs').get(0).checked) {
				return fieldErrorMessages['tsandcs'];
			}
		},
		'paymentMethod':paymentMethodRequired
	};
	
	// Final step: set up form onsubmit to check validation
	$('form#registrationForm').submit(function(ev) {
		// Validate all fields
		var allInputs = $(':input').not(':hidden');
		var allValid = true;
		window.problemFields = []; // TODO: Change to local var
		allInputs.each(function(i, input) {
			if (!validateField(input, 'dueToSubmit')) {
				allValid = false;
				// Add corresponding label or input title (if available) to problemFields list
				if (input.id) {
					var label = $('label[for=' + input.id + ']');
					//problemFields.push(label.text().replace('*', '').replace(/[:.]$/, '').trim()); //keep code in case switch back to using label name.
					problemFields.push(formErrors[input.id]);
				}
			}
		});
		if (!allValid) {
			$('#form-error-signup').html("");
			ev.preventDefault();
			// Show note about some fields being invalid
			$('div#youNeedToComplete').remove();
			var submit = $('input#confirmOrder');
			var div = $(strErrorMessageWrapPrefix + '<p>One or more fields have been missed or completed incorrectly, these are listed below. Please complete or amend appropriately.</p>' + strErrorMessageWrapSuffix);
			div.prependTo('#form-error-signup');
		
			problemFields = removeDuplicates(problemFields);
		
			var ul = $('<ul class="standard"></ul>');
			$.each(problemFields, function(i, errorMessage) {
				ul.append($('<li></li>').text(errorMessage));
			});
			div.append(ul);
			
			window.scrollTo(0,0);
			return false;
		} else {
			$('div#youNeedToComplete').hide();
			$('div#contextualHelp').hide();
			$('div#helpArrow').hide();
			processSignup(); //Show a progress bar while form is submitting
			return true; // Allow the form to submit!
			ev.preventDefault();
		}
	});

	function removeDuplicates(arr){
	    var result = new Array(); //get sorted array as input and returns the same array without duplicates.
	    var lastValue = "";
	
	    for (var i = 0; i < arr.length; i++) {
		  var currentValue = arr[i];
		  if (currentValue != lastValue) {
				result[result.length] = currentValue;
	  		}
	  		lastValue = currentValue;
	    }
	    return result;
	}
   
	// Function to show a progress bar while form is submitting
	function processSignup() {
		window.scrollTo(0,0);
		$('#signUp').fadeTo("normal", 0.2);
		$('#processing').show();
		$('select').hide(); //IE insists on showing these fields so need to remove them
		$('#confirmOrder').click(function(ev) {ev.preventDefault();});		
	}
	
	function boxNumbers(numbers) {
		//split at each number and wrap each one in a <span>
		var numbersDisplay = '';
		for (var n = 0; n < numbers.length; n++) {
			numbersDisplay += '<span>' + numbers.substring(n, n+1) + '</span>';
		}
		return numbersDisplay;
	}


	/* Lookup bank address from sortcode and a/c number
	----------------------------------------------------*/	
	function getBankAddress(sortCode, ddNumberField) {
	
		if(isValid(ddNumberField)) {
			$.ajax({
				type: "GET",
				url: "https://www.which.co.uk/services/bankaddress",
				data: "sortCode=" + sortCode + "&accountNumber=" + ddNumberField.value,
				dataType: "xml",
				//-- leave for possible debugging -- error: function (XMLHttpRequest, textStatus, errorThrown) { alert("an error occurred using XHR: textStatus = " + textStatus + "; errorThrown = " + errorThrown ); },
				error: function() { bankAddressLookupFailure('ajaxError'); },
				success: function(xml){ insertBankAddress(xml); }
			});
		}
	}
	
	function insertBankAddress(xml) {
		var addressCounter = $(xml).find("address").children().length;

		if(addressCounter > 0) {
			//The expected result
			bankAddressClearWarning();
			
			$(xml).find("address").each(function(){
				var bankName = $("bank", this).text();
				var bankBranch = $("branch", this).text();
				
				if(bankBranch != '') {bankName += ' (' + bankBranch + ')';}
				
				var addressLine1 = '';
				var addressLine2 = '';
				var addressLine3 = '';
				if($("addressLine:eq(0)", this).text() != '') { addressLine1 = $("addressLine:eq(0)", this).text()}
				if($("addressLine:eq(1)", this).text() != '') { addressLine2 = $("addressLine:eq(1)", this).text() + ", "}
				if($("addressLine:eq(2)", this).text() != '') { addressLine3 = $("addressLine:eq(2)", this).text() + ", "}
				var bankPostTown = $("postTown", this).text();
				var bankPostCode = $("postCode", this).text();
				
				addressLine2 += addressLine3 + bankPostTown;
				addressLine2 = removeCommas(addressLine2);
				
				$('#ddPreviewBankName').text(bankName);
				$('#ddPreviewBankAddress1').text(addressLine1);
				$('#ddPreviewBankAddress2').text(addressLine2);
				$('#ddPreviewBankPostCode').text(bankPostCode);
			});
		}
		else {
			//No results, or too many - either way unexpected
			bankAddressLookupFailure('noResults');
		}
	}
	
	function bankAddressClearWarning() {
		$('#bankPostalAddress p.warning').remove(); //remove current message if it exists
	}
	
	function bankAddressLookupFailure(type) {
		bankAddressClearWarning();
		var errorText;
		if(type=='ajaxError') {
			errorText = 'Sorry, the remote lookup cannot be used at this time.';
		}
		else {
			errorText = 'Sorry, no bank address details were found.' +
			 ' Please check your sort code and account number.';
		}
		
		$('<p class="warning">' + errorText + '</p>').
		 insertAfter('#bankPostalAddress h4');
	}
	
	function removeCommas(s) {
		s = s.replace(/, ,/g, ',');
		s = s.replace(/, </g, '<');
		return s;
	}
	
	
	/* Responsys - send data to server if email address is correct
	---------------------------------------------------------------*/
	function sendToResponsys(contactMeChanged) {
		var proceed = true;
		var $sc = $('#sourceCode');
		var scValue = $sc.attr('value');
		var e1 = $("#emailAddress").val();
		var e2 = $("#emailAddress2").val();
		
		//decide if to continue the post to responsys or not
		if($sc.val().indexOf("processed") > 0) proceed = false;
		if(contactMeChanged) {
			proceed = true;
			scValue = scValue.replace(/processed/g,'');
		}
		
		if(e1 != e2) proceed = false;
		
		if(proceed) {
			var emailCheck = validateEmailAddress($('#emailAddress').val());
			if(typeof emailCheck == 'undefined') {
			
				var responsysData = "";
				var t = $("#titleField").val();
				var fn = $("#firstName").val();
				var soc = $("#lastName").val();
				var a1 = $("#addressLine1").val();
				var a2 = $("#addressLine2").val();
				var pt = $("#postTown").val();
				var pc = $("#postCode").val();
				var permitPromote = ( $('#contact-me').attr('checked') == true ) ? 'Y' : 'N';
				
				responsysData += "sourceCode=" + scValue
					+ "&customer.title=" + t
					+ "&customer.foreName=" + fn
					+ "&customer.surnameOrCompany=" + soc
					+ "&customer.addressLine1=" + a1
					+ "&customer.addressLine2=" + a2
					+ "&customer.postTown=" + pt
					+ "&customer.postCode=" + pc
					+ "&customer.emailAddress=" + e1
					+ "&customer.permitPromote=" + permitPromote;
				
				$.ajax({
					type: "POST",
					url: "/services/responsys",
					data: responsysData,
					success: function() {
						$sc.attr('value', scValue+'processed'); //add "processed" to field so that data cannot be sent more than once unless the contact-me option is changed
					}
				}); 
			}
		}
	}
	
	//Postcode lookup initialisation
	var country = {
		displayCountryText:'<div class="fieldWrapper displayCountryWrapper"><label>Country</label><span id="displayCountryLabel">[countryName]</span></div>',
		returnedFromServer: false,
		
		init:function() {
			//Check to see if form data has been sent back by the server, if it has keep the address fields visible and align the postcode values
			if ($('#addressLine1').val() != '' || $('#addressLine2').val() != '' || $('#postCode').val() != '' || $('#postTown').val() != '')
			{
				this.returnedFromServer = true;
				country.select($('#countryId option:selected').val());
				$('#lookupPostCode').attr('value',$('#postCode').val());
				$('#addressLine1, #addressLine2, #postCode, #postTown').parent().show(); //Ensure these fields are visible
			}
			else {
				$('#addressLine1, #addressLine2, #postCode, #postTown').parent().hide();
			}
		},
		
		select:function(id) {
			var countryName = $('#countryId option:selected').text();
			switch(id) {
				case '764':
					country.Eire(countryName);
					break;
				case '1000000':
					country.UK(countryName);
					break;
				default:
					break;
			}
		},
		
		Eire:function(countryName) {
			//hide un-needed fields
			$('#lookupPostCode, #lookupHouseNumber, #findAddressButton, #selectAddress').parent().hide();
			$('#addressIntro2').hide();
			var $beforeAddressLine1 = $('#addressLine1').parent().html();
			if($beforeAddressLine1.indexOf(msgEireBeforeAddressLine1) == -1) {
				$('#addressLine1').parent().parent().before(msgEireBeforeAddressLine1);
			}
			$('#countryId').blur(); //ensure the help message box is removed
			$("label[for='postCode'] .mandatory").hide(); //remove asterisk from postcode label
			$("label[for='postCode']").append('<span class="not-mandatory">&nbsp;&nbsp;</span>');
			delete validationRules.postCode; //remove madatory check for postcode
			delete validationRules.lookupPostCode;
			if(!this.returnedFromServer) {
				$('#addressLine1, #addressLine2, #postCode, #postTown').val('');
			}
			else {
				this.returnedFromServer = false; //reset value in case of new changes
			}
			$('#addressLine1, #addressLine2, #postCode, #postTown').parent().show();
			country.displayLabel(countryName); //Insert chosen country - for display only
		},
		
		UK:function(countryName) {
			//Essentially reverse the Eire selection
			$('#lookupPostCode, #lookupHouseNumber, #findAddressButton').parent().show();
			$('#addressIntro1, #addressIntro2').show();
			$('p.msgEireBeforeAddressLine1').remove();
			$("label[for='postCode'] .not-mandatory").hide();
			$("label[for='postCode'] .mandatory").show();
			validationRules.postCode = addressRequired;
			validationRules.lookupPostCode = postCodeRequired;
			if(this.returnedFromServer) {
				this.returnedFromServer = false; //reset value in case of new changes
			}
			else {
				$('#addressLine1, #addressLine2, #postCode, #postTown').val('');
				$('#addressLine1, #addressLine2, #postCode, #postTown').parent().hide();
			}
			country.displayLabel(countryName);
		},
		
		displayLabel:function(countryName) {
			//test for field first and change if exists else insert
			if ($('#displayCountryLabel').length > 0) {
				$('#displayCountryLabel').html(countryName);
			}
			else {
				$('#postCode').parent().parent().after(country.displayCountryText.replace('[countryName]',countryName));
			}
		}
	}
	
	country.init(); //Initialise the country fields - in case posted back from the server

	$('#findAddressButton').click(lookupAddresses);
	$('.no-label').css('margin-bottom','4px');
	$('#countryId').change(function() {country.select($(this).val())});
});
//End of JQuery closure	


/* Print Direct Debit form
---------------------------- */
function ddPrintSetup() {
	$('#viewPrintable').html('<p class="printable"><img src="//www.staticwhich.co.uk/assets/images/content/sign-up/printable.png" alt="print" /><a href="" id="printDD">View printable version of your Direct Debit instruction</a></p>');
	$('#printDD').click(function(){ddPrintPreview(); return false;});
	$('#ddArea .ddRight p.newLine').hide();	
}

function ddPrintPreview() {
	$('#viewPrintable').empty();
	$('#a0-2, #a6-1, #a0-1, #a0-1b, .intro, #hideForPrintDD, .detailsArea, .infoMsg, #sign-up-lower, #footer, #form-error-signup, #masthead, #tabs, #user-controls, #breadcrumbs, #singup-intro').hide();
	$('#viewPrintable').html('<p class="ddPrintLinks-1"><a href="#" id="printNow">Print</a></p><p class="ddPrintLinks-2"><a href="#" id="ddReturnToFullForm" class="backButton">Return to form</a></p>');
	$('#printNow').click(function() { self.print(); return false;});
	$('#ddReturnToFullForm').click(function() { ddPrintReset() });
	$('#printDD').hide();
	$('#confirmArea .finalNote').hide();
	$('#ddArea .ddRight p.newLine').show();
	$('#signUp').addClass('ddPrintable');
	$('div#contextualHelp').hide();
	$('div#helpArrow').hide();
}

function ddPrintReset() {
	$('#viewPrintable').empty();
	$('#a0-2, #a6-1, #a0-1, #a0-1b, .intro, .detailsArea, .infoMsg, #hideForPrintDD, #sign-up-lower, #footer, #form-error-signup, #masthead, #tabs, #user-controls, #breadcrumbs, #singup-intro').show();
	$('#confirmArea .finalNote').show();
	$('#signUp').removeClass('ddPrintable');
	ddPrintSetup();
}

var ajaxDocumentFragment = ' #content'; //used in the ajax request to get a fragment of the document instead of the whole document
var css_thickboxPrintStylesheet = '/assets/5.9.4-SNAPSHOT/styles/print-thickbox.css';
var thickboxPrintStylesheet = '<link type="text/css" rel="stylesheet" media="print" charset="utf-8" href="' + css_thickboxPrintStylesheet + '"/>';
var YQL_TermsConditionsRequest = 'https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fwww.which.co.uk%2Fterms-and-conditions%2F%22%20AND%20xpath%3D%22%2F%2Fdiv[%40id%3D%27content%27]%22&format=xml&callback=getTermsConditions';

var tb_header = '<div id="thick-box-popup">'
	+ '<div class="window-lid">'
	+ '<h1>WHICH? ONLINE TRIAL SIGN UP</h1>'
	+ '<a href="#" onclick="addThickboxPrintStylesheet(); window.print(); return false;" class="print-js" title="This document is approximately 12 pages long.">Print this page</a>'
	+ '</div></div>';

var tb_footer = '<div class="window-footer">'
	+ '<a id="TB_closeWindowButton" title="Close" href="#" onclick="self.parent.tb_remove(); removeThickboxStylesheet();" >'
	+ '<img alt="Close" src="/assets/images/buttons/btn-close.png"/></a>'
	+ '</div>';

function addThickboxPrintStylesheet() {
	if($('head link[href="' + css_thickboxPrintStylesheet + '"]').length === 0) {
		$('head').append(thickboxPrintStylesheet);
	}
}
		
function removeThickboxStylesheet() {
	$('head link[href="' + css_thickboxPrintStylesheet + '"]').remove();
	$('head style[title="ajaxContentScrollFix"]').remove();
}

function addThickboxStylesheet() {
	if($('head style[title="ajaxContentScrollFix"]').length === 0) {
		$('head').append(
			'<style type="text/css" title="ajaxContentScrollFix">'
			+ '#TB_window {background:#FFF;}'
			+ '#TB_ajaxContent {overflow-y:scroll; overflow-x:hidden;}'
			+ '#TB_ajaxContent .bodyfield {width:95%}'
			+ '</style>'
		);
	}
}

function getTermsConditions(o) {
  var out = document.getElementById('page');
  var content = o.results[0];
  //out.innerHTML = content.replace(/href="\//g,'href="http://twitter.com/');
  $('#page').append('<div id="terms-and-conditions-content" style="display:none;">' + content + '</div>');
  $('#terms-and-conditions-content a').attr('target','_blank');
  $('#terms-and-conditions-content a[href^=#]').removeAttr('target'); //remove from any in page links
}

function initPostCodeLookup() {
	var addressContainer;
	var addressIntro1;
	var addressIntro2;
	var countryHTML;
	var lookupHouseNumHTML;
	var lookupPostCode;
	
	if (!bolWexLoggedInUser) {
		$addressContainer = $('#addressDetails').parent();
		addressIntro1 = '<p id="addressIntro1">Please select your country of residence</p>';
		addressIntro2 = '<p id="addressIntro2">Use the quick address search facility and select your address from the results</p>';
		countryHTML = $('#countryWrapper').html();
		lookupHouseNumHTML = '<div class="fieldWrapper">'
			+ '<label for="lookupHouseNumber">House number or name &nbsp;</label>'
			+ '<input maxlength="27" type="text" name="lookupHouseNumber" id="lookupHouseNumber" class="text skipValidation" /></div>';
		lookupPostCode = '<div class="fieldWrapper">'
			+ '<label for="lookupPostCode">Postcode (e.g. SE5 7TR) <span class="mandatory">*</span></label>'
			+ '<input type="text" name="lookupPostCode" id="lookupPostCode" class="text"/></div>'
			+ '<div class="fieldWrapper">'
			+ '<a href="#" id="findAddressButton" title="Find address" onclick="return false;">'
			+ '<img src="/assets/images/content/sign-up/btn-find-address.png" alt="Find address" height="26" width="108"/></a></div>'
			+ '<div class="fieldWrapper">'
			+ '<p class="qasResultMessage">Please select your address from the drop-down, if it is not available then select the closest match and edit it</p>'
			+ '<label for="selectAddress">Select a possible match <span class="mandatory">*</span></label>'
			+ '<select id="selectAddress"></select></div>';
	
		$('#countryWrapper').children().remove();
		$('#countryWrapper').hide();
		$addressContainer.prepend(addressIntro1 + countryHTML + addressIntro2 + lookupHouseNumHTML + lookupPostCode);
		$('#selectAddress').parent().hide();
		$('#addressLine1, #addressLine2, #postCode, #postTown').parent().hide();
		tb_init('#outsideUKLink'); //ensure thickbox onclick is set on the moved link
		$('#outsideUKLink').css('display','inline');
	}
}