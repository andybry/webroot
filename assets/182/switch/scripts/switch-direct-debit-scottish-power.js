/**
 * Created by ukondoz on 12/03/2014.
 */

/*
 Title:     Which? Switch Direct Debit Scripts which was based on signup page
 */

jQuery(function($) {

    $('.showForJS').show();
    $('#confirmOrder').attr('value', 'complete');
    ddPrintSetup();

    // Set up the Direct Debit preview box
    $('input#directDebitAccountHoldersName').blur(function() {
        $('#ddPreviewName').text($(this).val());
    });
    $('input#directDebitAccountHoldersName').blur();

    $('input#directDebitAccountNumber').blur(function() {
        $('#ddPreviewNumber').html(boxNumbers($(this).val()));
    });
    $('input#directDebitAccountNumber').blur();

    function ddPreviewSortCode() {
        // Only show preview of sort code if all three boxes filled
        if (/^\d{2}$/.exec($("#sortCode1").val()) &&  /^\d{2}$/.exec($("#sortCode2").val()) && /^\d{2}$/.exec($("#sortCode3").val()) ) {
            var numbers = $.map(
                ['sortCode1', 'sortCode2', 'sortCode3'],
                function(id) { return $('#' + id).val() }
            );
            $('#ddPreviewSortCode').html(boxNumbers(numbers.join("")));
            if (/^\d{8}$/.exec($("#directDebitAccountNumber").val())){
                BANKLOOKUP.getBankAddress(numbers.join(""), document.getElementById("directDebitAccountNumber"));
            }
        }
        else $('#ddPreviewSortCode').html("");
    }

    $('#sortCode1,#sortCode2,#sortCode3').blur(ddPreviewSortCode);
    ddPreviewSortCode();

    //Update Card preview box

    // Pre-populate accountName with first and last names
    $('input#firstnameField,input#surnameOrCompany').change(function() {
        $('input#accountName').val(
            $('input#foreName').val() + ' ' +
                $('input#surnameOrCompany').val()
        );
        // Don't forget to update the direct debit preview
        $('#ddPreviewName').text($('input#accountName').val());
    });

    function boxNumbers(numbers) {
        //split at each number and wrap each one in a <span>
        var numbersDisplay = '';
        for (var n = 0; n < numbers.length; n++) {
            numbersDisplay += '<span>' + numbers.substring(n, n+1) + '</span>';
        }
        return numbersDisplay;
    }

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
    $('h1,.mandatory-area, .progress-bar, .intro, .detailsArea, #hideForPrintDD, #footer, #masthead, #tabs, #user-controls, #breadcrumbs, #sign-up-lower, #form-error-1').hide();
    $('#viewPrintable').html('<p class="ddPrintLinks-1"><a href="#" id="printNow">Print</a></p><p class="ddPrintLinks-2"><a href="#" id="ddReturnToFullForm" class="backButton">Return to form</a></p>');
    $('#printNow').click(function() { self.print(); return false;});
    $('#ddReturnToFullForm').click(function() { ddPrintReset() });
    $('#printDD').hide();
    $('#ddArea .ddRight p.newLine').show();
    $('#signUp').addClass('ddPrintable');
}

function ddPrintReset() {
    $('#viewPrintable').empty();
    $('h1,.mandatory-area, .progress-bar, .intro, .detailsArea, #hideForPrintDD, #footer, #masthead, #tabs, #user-controls, #breadcrumbs, #sign-up-lower, #form-error-1').show();
    $('#confirmArea .finalNote').show();
    $('#signUp').removeClass('ddPrintable');
    ddPrintSetup();
}

var switchApplication = {

    //Sorts writing new previous address fieldsets
    previousAddressController:function(addressNumber) {

        var addressFieldset = '<fieldset id="address-'+addressNumber+'">\n\
	        \t<legend>Enter your previous address</legend>\n\
	      	\t<div class="wrapper">\n\
			\t\t<div class="field-wrapper">\n\
			\t\t\t<label for="previousAddress'+addressNumber+'.addressLine1">Address line 1 <span class="mandatory">*</span></label>\n\
			\t\t\t<input id="previousAddress'+addressNumber+'.addressLine1" name="previousAddress'+addressNumber+'.addressLine1" class="text" type="text" value="" maxlength="40"/>\n\
			\t\t</div>\n\
			\t\t<div class="field-wrapper">\n\
			\t\t\t<label for="previousAddress'+addressNumber+'.addressLine2">Address line 2&nbsp;&nbsp;</label>\n\
			\t\t\t<input id="previousAddress'+addressNumber+'.addressLine2" name="previousAddress'+addressNumber+'.addressLine2" class="text" type="text" value="" maxlength="40"/>\n\
			\t\t</div>\n\
			\t\t<div class="field-wrapper">\n\
			\t\t\t<label for="previousAddress'+addressNumber+'.town">Town &#47; City <span class="mandatory">*</span></label>\n\
			\t\t\t<input id="previousAddress'+addressNumber+'.town" name="previousAddress'+addressNumber+'.town" class="text" type="text" value="" maxlength="30"/>\n\
			\t\t</div>\n\
			\t\t<div class="field-wrapper">\n\
			\t\t\t<label for="previousAddress'+addressNumber+'.postcode">Postcode (e.g. SE5 7TR) <span class="mandatory">*</span></label>\n\
			\t\t\t<input id="previousAddress'+addressNumber+'.postcode" name="previousAddress'+addressNumber+'.postcode" class="text" type="text" value="" maxlength="8"/>\n\
			\t\t</div>\n';

        if ($("#address-0.once").length == 0) {
            addressFieldset += '\t\t<div class="fieldWrapper js-multiple-validate">\n\
		        \t\t\t<label for="previousAddress'+addressNumber+'yearsAtAddress">Time at this address <span class="mandatory">*</span></label>\n\
		        \t\t\t<label for="previousAddress'+addressNumber+'yearsAtAddress" class="removed">Years</label>\n\
		        \t\t\t<select id="previousAddress'+addressNumber+'yearsAtAddress" name="previousAddress'+addressNumber+'.yearsAtAddress">\n\
		        \t\t\t\t<option value="">Years&nbsp;</option>\n\
				\t\t\t\t<option value="0">00</option>\n\
		        \t\t\t\t<option value="1">01</option>\n\
		        \t\t\t\t<option value="2">02</option>\n\
		        \t\t\t\t<option value="3">03</option>\n\
		        \t\t\t\t<option value="4">04</option>\n\
		        \t\t\t\t<option value="5">05</option>\n\
		        \t\t\t\t<option value="6">06</option>\n\
		        \t\t\t\t<option value="7">07</option>\n\
		        \t\t\t\t<option value="8">08</option>\n\
		        \t\t\t\t<option value="9">09</option>\n\
		        \t\t\t\t<option value="10">10</option>\n\
		        \t\t\t\t<option value="11">11</option>\n\
		        \t\t\t</select>\n\
		        \t\t\t<label for="previousAddress'+addressNumber+'monthsAtAddress" class="removed">Months</label>\n\
				\t\t\t<select id="previousAddress'+addressNumber+'monthsAtAddress" name="previousAddress'+addressNumber+'.monthsAtAddress">\n\
				\t\t\t\t<option value="">Months&nbsp;</option>\n\
				\t\t\t\t<option value="0">00</option>\n\
				\t\t\t\t<option value="1">01</option>\n\
				\t\t\t\t<option value="2">02</option>\n\
				\t\t\t\t<option value="3">03</option>\n\
				\t\t\t\t<option value="4">04</option>\n\
				\t\t\t\t<option value="5">05</option>\n\
				\t\t\t\t<option value="6">06</option>\n\
				\t\t\t\t<option value="7">07</option>\n\
				\t\t\t\t<option value="8">08</option>\n\
				\t\t\t\t<option value="9">09</option>\n\
				\t\t\t\t<option value="10">10</option>\n\
				\t\t\t\t<option value="11">11</option>\n\
				\t\t\t</select>\n\
				\t\t</div>\n';
        }

        addressFieldset += '\t</div>\n\
			</fieldset>';

        //Insert fieldset in the correct place
        if (addressNumber == 1) {
            $("#address-0").after(addressFieldset);
            //Deals with multiple previous addresses
            $("#previousAddress1yearsAtAddress, #previousAddress1monthsAtAddress").change(function (){
                switchApplication.previousAddress();
            });
        } else if (addressNumber == 2) {
            $("#address-1").after(addressFieldset);
            //Deals with multiple previous addresses
            $("#previousAddress2yearsAtAddress, #previousAddress2monthsAtAddress").change(function (){
                switchApplication.previousAddress();
            });
        }
    },
    previousAddressControllerNonUK:function() {
        var nonUKFieldset = "<fieldset id='previous-address-country'>\n"
            + "<legend>Previous address UK status</legend>\n"
            + "<div class='wrapper'>\n"
            + "<div class='field-wrapper'>\n"
            + "<label for='previousAddressOverseas'>My previous address was in the United Kingdom</label>\n"
            + "<input type='radio' name='previousAddressOverseas' value='Yes' /> Yes \n"
            + "<input type='radio' name='previousAddressOverseas' value='No' /> No \n"
            + "</div>\n"
            + "</div>\n"
            + "</fieldset>\n";
        $("#address-0").after(nonUKFieldset);

        $("#previous-address-country input").click(function() {
            if (($(this).val() == "Yes") && ($("#address-1").length==0)) {
                switchApplication.previousAddressControllerUK();
            } else if ($(this).val() == "No") {
                $("#address-1").remove();
            }
        });
    },
    //Sorts writing new previous address fieldsets
    previousAddressControllerUK:function() {

        var addressFieldset = "<fieldset id='address-1'>\n"
            + "<legend>Enter your previous address</legend>\n"
            + "<div class='wrapper'>\n"
            + "<div class='field-wrapper'>\n"
            + "<label for='previousAddress1.buildingName'>Building name&nbsp;&nbsp;</label>\n"
            + "<input id='previousAddress1.buildingName' name='previousAddress1.buildingName' class='text' type='text' value='' maxlength='40'/>\n"
            + "</div>\n"
            + "<div class='field-wrapper'>\n"
            + "<label for='previousAddress1.houseNumber'>Building number&nbsp;&nbsp;</label>\n"
            + "<input id='previousAddress1.houseNumber' name='previousAddress1.houseNumber' class='text' type='text' value='' maxlength='40'/>\n"
            + "</div>\n"
            + "<div class='field-wrapper'>\n"
            + "<label for='previousAddress1.addressLine1'>Street <span class='mandatory'>*</span></label>\n"
            + "<input id='previousAddress1.addressLine1' name='previousAddress1.addressLine1' class='text' type='text' value='' maxlength='40'/>\n"
            + "</div>\n"
            + "<div class='field-wrapper'>\n"
            + "<label for='previousAddress1.addressLine2'>Address line 2&nbsp;&nbsp;</label>\n"
            + "<input id='previousAddress1.addressLine2' name='previousAddress1.addressLine2' class='text' type='text' value='' maxlength='40'/>\n"
            + "</div>\n"
            + "<div class='field-wrapper'>\n"
            + "<label for='previousAddress1.town'>Town &#47; City <span class='mandatory'>*</span></label>\n"
            + "<input id='previousAddress1.town' name='previousAddress1.town' class='text' type='text' value='' maxlength='30'/>\n"
            + "</div>\n"
            + "<div class='field-wrapper'>\n"
            + "<label for='previousAddress1.postcode'>Postcode (e.g. SE5 7TR) <span class='mandatory'>*</span></label>\n"
            + "<input id='previousAddress1.postcode' name='previousAddress1.postcode' class='text' type='text' value='' maxlength='8'/>\n"
            + "</div>\n"
            + "</div>\n"
            + "</fieldset>";

        //Insert fieldset in the correct place
        $("#previous-address-country").after(addressFieldset);
    },
    //Adds previous addresses to capture previous address
    previousAddressWithNonUK:function() {

        //Address 0 = current address, Address 1 = previous address

        var monthsRequired = 36;
        var monthsTotal = 0;
        var months0 = 0;

        //Total months in the current address
        months0 = parseInt($("#supplyAddressyearsAtAddress").val()) * 12;
        if (parseInt($("#supplyAddressmonthsAtAddress").val()) > 0) {
            months0 += parseInt($("#supplyAddressmonthsAtAddress").val());
        }

        monthsTotal = months0;

        if (monthsTotal >= monthsRequired) {//Person has lived at current address for required amount of time
            $("#previous-address-country").remove();
            $("#paf-lookup").remove();
            $("#address-1").remove();//Remove other previous address fields
            return;
        } else if ((monthsTotal < monthsRequired) && ($("#previous-address-country").length == 0)) {//If previous address does not exist, create it
            switchApplication.previousAddressControllerNonUK();//Add previous address
        }
    },
    //Adds previous addresses to capture previous 3 years/or 3 addresses
    previousAddress:function() {

        //Address 0 = current address, Address 1 = previous address, Address 2 = 2nd previous address

        var monthsRequired = 36;
        var monthsTotal = 0;
        var months0 = 0;
        var months1 = 0;
        var months2 = 0;

        //Total months in the current address
        months0 = parseInt($("#supplyAddressyearsAtAddress").val()) * 12;
        if (parseInt($("#supplyAddressmonthsAtAddress").val()) > 0) {
            months0 += parseInt($("#supplyAddressmonthsAtAddress").val());
        }

        //alert("months0: "+months0)

        //Total months in the previous address
        if ($("#previousAddress1yearsAtAddress").val() != undefined && $("#previousAddress1yearsAtAddress").val() != "") {
            months1 = parseInt($("#previousAddress1yearsAtAddress").val()) * 12;
        }
        if ($("#previousAddress1monthsAtAddress").val() != undefined && $("#previousAddress1monthsAtAddress").val() != "") {
            months1 += parseInt($("#previousAddress1monthsAtAddress").val());
        }

        //alert("months1: "+months1)

        //Total months in the 2nd previous address
        if ($("#previousAddress2yearsAtAddress").val() != undefined && $("#previousAddress2yearsAtAddress").val() != "") {
            months2 = parseInt($("#previousAddress2yearsAtAddress").val()) * 12;
        }
        if ($("#previousAddress2monthsAtAddress").val() != undefined && $("#previousAddress2monthsAtAddress").val() != "") {
            months2 += parseInt($("#previousAddress2monthsAtAddress").val());
        }

        //alert("months2: "+months2)

        monthsTotal = months0;

        if (monthsTotal >= monthsRequired) {//Person has lived at current address for required amount of time
            $("#address-1, #address-2").remove();//Remove other previous address fields
            return;
        } else {
            if ((monthsTotal <= (monthsRequired - 12)) && $("#supplyAddressyearsAtAddress").val() != "") {//The total time cannot be made up by months
                if ($("#address-1").length == 0) {//If previous address does not exist, create it
                    switchApplication.previousAddressController(1);//Add previous address
                } else if ($("#address-0.once").length == 0) {//Previous address exists
                    if ((months0 + months1) >= monthsRequired) {//Delete 2nd previous address if the current and previous fulfil the time
                        $("#address-2").remove();//Remove 2nd previous address fieldset
                        return;
                    }
                    if (months1 > 0) {//There is time selected in the dropdown
                        if ($("#supplyAddressyearsAtAddress").val() != "" && $("#supplyAddressmonthsAtAddress").val() != "" && $("#previousAddress1yearsAtAddress").val() != "" && $("#previousAddress1monthsAtAddress").val() != "") {
                            monthsTotal += months1;
                            if (monthsTotal < monthsRequired && $("#address-2").length == 0) {//Need 2nd previous address
                                switchApplication.previousAddressController(2);//Add previous address
                            }
                        }
                    }
                    else {
                        $("#address-2").remove();//Remove 2nd previous address fieldset
                    }
                }
            } else {
                $("#address-1, #address-2").remove();//Remove other previous address fields
            }
        }
    }
}

function elementRequired(element) {
    if ((typeof switchApplicationValidationExceptions !== "undefined") && (switchApplicationValidationExceptions)) {
        for (i=0; i < switchApplicationValidationExceptions.length; i++) {
            if (switchApplicationValidationExceptions[i] == element.name) {
                return false;
            }
        }
    }

    return true;
}

$(document).ready(function (){
    var validator = $("#registrationForm").validate({
        rules: {
            "title": "required", "firstName": "required", "surname": "required", "dobDay": "required", "dobMonth": "required", "dobYear": "required",
            "daytimePhoneNumber": {required: true, number: true}, "eveningPhoneNumber": {required: {depends: function(element){return $(element).is(':visible')}}, number: true}, "mobilePhoneNumber": {required: {depends: function(element){return $(element).is(':visible')}}, number: true}, "emailAddressType": {required: {depends: function(element){return $(element).is(':visible')}}},
            "emailAddress": {required: {depends: elementRequired}, email: true},
            "confirmEmailAddress": {required: {depends: elementRequired}, email: true, equalTo: "#emailAddress"},
            "telephoneNumberType": {required: {depends: function(element){return $(element).is(':visible')}}},
            "supplyAddressBuildingNameOrNumber": {required: {depends: function(element){return $(element).is(':visible')}}},
            "supplyAddress.town": {required: {depends: function(element){return $(element).is(':visible')}}},
            "supplyAddress.postcode": {required: {depends: function(element){return $(element).is(':visible')}}},
            "supplyAddressThoroughfare": {required: {depends: function(element){return $(element).is(':visible')}}},
            "previousAddress1.addressLine1": {required: {depends: function(element){return $(element).is(':visible')}}},
            "previousAddress1.town": {required: {depends: function(element){return $(element).is(':visible')}}},
            "previousAddress1.postcode": {required: {depends: function(element){return $(element).is(':visible')}}},
            "previousAddress2.addressLine1": {required: {depends: function(element){return $(element).is(':visible')}}},
            "previousAddress2.town": {required: {depends: function(element){return $(element).is(':visible')}}},
            "previousAddress2.postcode": {required: {depends: function(element){return $(element).is(':visible')}}},
            "billingAddressBuildingNameOrNumber": {required: {depends: function(element){return $(element).is(':visible')}}},
            "billingAddressThoroughfare": {required: {depends: function(element){return $(element).is(':visible')}}},
            "contactAddress.addressLine1": {required: {depends: function(element){return $(element).is(':visible')}}},
            "contactAddress.addressLine2": {required: {depends: function(element){return $(element).is(':visible')}}},
            "contactAddress.town": {required: {depends: function(element){return $(element).is(':visible')}}},
            "contactAddress.postcode": {required: {depends: function(element){return $(element).is(':visible')}}},
            "preferredCommunicationMethod": {required: {depends: function(element){return $(element).is(':visible')}}},
            "preferredCommunicationFormat": {required: {depends: function(element){return $(element).is(':visible')}}},
            "supplyAddress.yearsAtAddress": {required: {depends: function(element){return $(element).is(':visible')}}},
            "supplyAddress.monthsAtAddress": {required: {depends: function(element){return $(element).is(':visible')}}},
            "previousAddress2.yearsAtAddress": {required: {depends: function(element){return $(element).is(':visible')}}},
            "previousAddress1.monthsAtAddress": {required: {depends: function(element){return $(element).is(':visible')}}},
            "previousAddress2.yearsAtAddress": {required: {depends: function(element){return $(element).is(':visible')}}},
            "previousAddress2.monthsAtAddress": {required: {depends: function(element){return $(element).is(':visible')}}},
            "directDebitAccountHoldersName": {required: {depends: function(element){return $(element).is(':visible')}}},
            "directDebitAccountNumber": {required: {depends: function(element){return $(element).is(':visible')}}, number: true},
            "sortCode1": {required: {depends: function(element){return $(element).is(':visible')}}, number: true},
            "sortCode2": {required: {depends: function(element){return $(element).is(':visible')}}, number: true},
            "sortCode3": {required: {depends: function(element){return $(element).is(':visible')}}, number: true},
            "directDebitDate": {required: {depends: function(element){return $(element).is(':visible')}}},
            "onlineMothersName": {required: {depends: function(element){return $(element).is(':visible')}}},
            "onlinePassword": {required: {depends: function(element){return $(element).is(':visible')}}},
            "confirmOnlinePassword": {required: {depends: function(element){return $(element).is(':visible')}}, equalTo: "#onlinePassword"},
            "loyaltyCardNumber": {required: {depends: function(element){return $(element).is(':visible')}}, number: true},
            "employmentStatus": {required: {depends: function(element){return $(element).is(':visible')}}},
            "residentialStatus": {required: {depends: function(element){return $(element).is(':visible')}}},
            "acceptedTermsAndConditions": "required",
            "acceptedTermsAndConditionsSwitch": {required: {depends: function(element){return $(element).is(':visible')}}},
            "tariffInformationLabel": "required", "tariffInformationLabel": {required: {depends: function(element){return $(element).is(':visible')}}},
            "understandSmartMeter": {required: {depends: function(element){return $(element).is(':visible')}}}
        },
        messages: {
            "title": {required: "Please select a title"}, "firstName": {required: "Please enter first name"}, "surname": {required: "Please enter last name"}, "dobDay": {required: "Please select a date of birth"}, "dobMonth": {required: "Please select a date of birth"}, "dobYear": {required: "Please select a date of birth"},
            "daytimePhoneNumber": {required: "Please enter a telephone number", number: "Please enter a valid telephone number"}, "eveningPhoneNumber": {required: "Please enter an evening telephone number", number: "Please enter a valid evening telephone number"}, "mobilePhoneNumber": {required: "Please enter a mobile phone number", number: "Please enter a valid mobile phone number"}, "emailAddressType": {required: "Please select your email address type"}, "emailAddress": {required: "Please enter your email address", email: "Please enter a valid email address"}, "confirmEmailAddress": {required: "Please re-enter your email address", email: true, equalTo: "This email address does not match that given above"}, "telephoneNumberType": {required: "Please select a telephone number type"},
            "supplyAddressBuildingNameOrNumber": {required: "Please enter a house name or a house number"} ,"supplyAddressThoroughfare" : {required: "Please enter a street name"} ,"supplyAddress.town": {required: "Please enter a town/city"}, "supplyAddress.postcode": {required: "Please enter a UK postcode"},
            "previousAddress1.addressLine1": {required: "Please enter address line 1"}, "previousAddress1.town": {required: "Please enter a town/city"}, "previousAddress1.postcode": {required: "Please enter a UK postcode"},
            "previousAddress2.addressLine1": {required: "Please enter address line 1"}, "previousAddress2.town": {required: "Please enter a town/city"}, "previousAddress2.postcode": {required: "Please enter a UK postcode"},
            "contactAddress.addressLine1": {required: "Please enter correspondence house name or house number"},"contactAddress.addressLine2": {required: "Please enter correspondence street name"} ,"contactAddress.town": {required: "Please enter a correspondence town/city"}, "contactAddress.postcode": {required: "Please enter a correspondence UK postcode"},
            "preferredCommunicationMethod": {required: "Please select a preferred communication method"}, "preferredCommunicationFormat": {required: "Please select a preferred communication format"},
            "supplyAddress.yearsAtAddress": {required: "Please select years at address"}, "supplyAddress.monthsAtAddress": {required: "Please select months at address"},
            "previousAddress1.yearsAtAddress": {required: "Please select years at address"}, "previousAddress1.monthsAtAddress": {required: "Please select months at address"},
            "previousAddress2.yearsAtAddress": {required: "Please select years at address"}, "previousAddress2.monthsAtAddress": {required: "Please select months at address"},
            "directDebitAccountHoldersName": {required: "Please enter the name of the account holder"}, "directDebitAccountNumber": {required: "Please enter an account number", number: "Please enter a valid account number"}, "sortCode1": {required: "Please enter a valid sort code", number: "Please enter a valid sort code"}, "sortCode2": {required: "Please enter a valid sort code", number: "Please enter a valid sort code"}, "sortCode3": {required: "Please enter a valid sort code", number: "Please enter a valid sort code"}, "directDebitDate": {required: "Please select a direct debit day of month"},
            "onlineMothersName": {required: "Please supply your Mother's name"}, "onlinePassword": {required: "Please enter your password."}, "confirmOnlinePassword": {required: "Please re-enter your password.", equalTo: "This password does not match that given above"}, "loyaltyCardNumber": {number: "Please enter a valid loyalty card number"},
            "employmentStatus": {required: "Please select your employment status"}, "residentialStatus": {required: "Please select your residential status"},
            "acceptedTermsAndConditions": {required: "You need to accept these terms &amp; conditions in order to complete your switch"}, "acceptedTermsAndConditionsSwitch": {required: "You need to accept these terms &amp; conditions in order to complete your switch"},
            "tariffInformationLabel": {required: "You need to confirm that you read the TIL in order to complete your switch"}, "tariffInformationLabel": {required: "You need to confirm that you read the TIL in order to complete your switch"},
            "understandSmartMeter": {required: "You need to accept these terms &amp; conditions in order to complete your switch"}
        },
        errorPlacement: function(error, element) {
            if (!element.parent().hasClass("js-multiple-validate")){
                element.siblings("p.error").remove();
                error.prependTo(element.parent());
            }
            else {
                if (element.parent().find("p.error").length == 0) {
                    error.prependTo(element.parent());
                }
            }
            generalFormError(validator.numberOfInvalids(), "#form-error-1");
        },
        errorElement: 'p class="no-label error"',
        onfocusout: false,
        onkeyup: false,
        success: "removed"
    });

    //Workaround for multiple inputs to be validated on the same line
    $("#confirmOrder").click(function(){
        $(".js-multiple-validate p.error").remove();
    });

    //Deals with the contact address
    if ((document.getElementById('useCorrespondenceAddressForMailing')!=null) && (!document.getElementById('useCorrespondenceAddressForMailing').checked)) {
        $("#correspondence-address").hide();
    }
    $("#useCorrespondenceAddressForMailing").click(function () {
        if (this.checked) {
            $("#correspondence-address").show();
        } else {
            $("#correspondence-address").hide();
        }
    });

    //Deals with multiple previous addresses
    $("#supplyAddressyearsAtAddress, #supplyAddress1yearsAtAddress, #supplyAddress2yearsAtAddress, #supplyAddressmonthsAtAddress, #supplyAddres1smonthsAtAddress, #supplyAddress2monthsAtAddress").change(function (){
        var jsAction = $("#jsAction").val();
        if (jsAction=="previousAddressWithNonUK") {
            switchApplication.previousAddressWithNonUK();
        } else {
            switchApplication.previousAddress();
        }
    });

    xhr = null;

    //Based on the QAS dropdown, populates the address input fields
    $("#qasId").change(function(){
        if (xhr && xhr.readyState !== 4) { //If there is an ajax call, cancel it
            //If there is an unfinished ajax call, cancel it
            xhr.abort();
        }

        var qasIdValue = $(this).val();

        if (qasIdValue != ""){
            var addressAjaxUrl = "/address/addressWithMeterNumber/"+qasIdValue;
            //Makes the AJAX call
            var xhr = $.ajax({
                type: "GET",
                url: addressAjaxUrl,
                dataType: "json",
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    which.ajaxLogReporter("There was an AJAX error for QAS address lookup from Switch Applicatoion page", addressAjaxUrl)
                },
                success: function(data){
                    if (data.address == undefined) {//No AJAX results returned - technical error on AJAX response
                        which.ajaxLogReporter("There was an AJAX error for QAS address lookup from Switch Applicatoion page at address node", addressAjaxUrl)
                    }
                    else {
                        if (data.address.addressLines == 0) {//There are no address lines
                            which.ajaxLogReporter("There was an AJAX error for QAS address lookup from Switch Applicatoion page at addressLines node", addressAjaxUrl)
                        }
                        else {
                            $.each(data.address.addressLines, function(i,addressLine){

                                var lineType = "";
                                var addressDetails = "";

                                if (addressLine.lineType == undefined) {
                                    which.ajaxLogReporter("The data.address.addressLines["+i+"].lineType JSON node in undefined", addressAjaxUrl);
                                }
                                else {
                                    if (addressLine.details == undefined) {
                                        which.ajaxLogReporter("The data.address.addressLines["+i+"].details JSON node in undefined", addressAjaxUrl);
                                        alert("The data.address.addressLines["+i+"].details JSON node in undefined")
                                    }
                                    else {

                                        addressDetails = addressLine.details;
                                        lineType = addressLine.lineType;

                                        switch(lineType){
                                            case "addressLine_1":
                                                if (lineType != ""){
                                                    $("#supplyAddress\\.addressLine1").val(addressDetails)
                                                } else {
                                                    $("#supplyAddress\\.addressLine1").val("")
                                                }
                                                break;
                                            case "addressLine_2":
                                                if (lineType != ""){
                                                    $("#supplyAddress\\.addressLine2").val(addressDetails)
                                                } else {
                                                    $("#supplyAddress\\.addressLine2").val("")
                                                }
                                                break;
                                            case "townCity":
                                                if (lineType != ""){
                                                    $("#supplyAddress\\.town").val(addressDetails)
                                                } else {
                                                    $("#supplyAddress\\.town").val("");
                                                }
                                                break;
                                        }
                                    }
                                }
                            });//end each loop
                        }
                    }
                }//end success
            });	//end ajax call
        }
    });

    //Populates the date of the month the direct debit is taken from the account.
    $("#directDebitDate").change(function (){
        var directDebitDate = $("#directDebitDate").val();
        if (directDebitDate > 0){
            $("#dd-day-of-month").text(directDebitDate);
            $("#dd-day-of-month").parents("span").show();
            $("#dd-day-of-month-container").attr("style", "");
            $("#dd-day-of-month-container").show();
        }
        else {$("#dd-day-of-month-container").hide()}
    });

    ddInfoPopup = function() {

        $('<div id="dialog-ddinfo"></div>').dialog({
            autoOpen: false,
            width: 942,
            modal: true,
            dialogClass: "dialog-ddinfo-parent"
        });

        // Dialog Link
        $('#dialog-ddinfo-link').click(function(){
            var dialogUrl = $(this).attr("href")+" #content";
            $('#dialog-ddinfo').load(dialogUrl).dialog("open");
            return false;
        });

    }

    $("#previous-address-country input").click(function() {
        if (($(this).val() == "Yes") && ($("#address-1").length==0)) {
            switchApplication.previousAddressControllerUK();
        } else if ($(this).val() == "No") {
            $("#address-1").remove();
        }
    });

});

function attachNectarCardEvent() {
    $("#loyaltyCardType").change(function() {
        showHideNectarNumber();
    });
}

function showHideNectarNumber() {
    if($("#loyaltyCardType").val() == "I_HAVE_CARD") {
        $("#nectar-card-number").show();
    }else {
        $("#loyaltyCardNumber").val("");
        $("#nectar-card-number").hide();
    }
}
//Info Popup for Direct Debit Guarantee
$(document).ready(function() {
    showHideNectarNumber();
    attachNectarCardEvent();
    ddInfoPopup();
    // FAQ Link
    var $faqDialog = $(".faq-content").dialog({width: 942, autoOpen: false, modal: true, dialogClass: "dialog-ddinfo-parent"});
    $(".faq-link").click(function(){
        $faqDialog.dialog("open");
        return false;
    });
});