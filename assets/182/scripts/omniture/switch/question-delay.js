/* This section deal with the homepage, current situation and results page and the requirement to track each questions elapsed time/filters clicked.
 * The solution relies on tracking each question response as a separate page as recommend by
 * */

//How do the questions get tied to one user and one page? 
//DAVID: Do we need to log the option selected?
//TODO fix the problem with alternative selects after the paragraph
//Product purchase
//Page views - is there a time per page report?
//AJAX supplier from and to on the confirmation page?
//Application page - group by fieldsets? 
//How will I test this? 

var switchOmniture = {
	
	fieldDelayTracker:function (inputBusinessName) {
		//alert(inputBusinessName+" : "+secondsElapsed);
	    s.eVar28=s.prop28=secondsElapsed; //Form Field Delay
	    s.eVar29=s.prop29=inputBusinessName; //Form Field Name
	    s.linkTrackVars="prop28,prop29,eVar28,eVar29";
		//alert('Form Field Delay Prop= '+ s.prop28 + ': Form Field Delay Var = ' + s.eVar28);
		//alert('Form Field Name Prop= '+ s.prop29 + ': Form Field Name Var = ' + s.eVar29);
		s.tl(true,'o',inputBusinessName);
    },
	getTimeInSeconds:function () {
		
		newTimeMilliSeconds = new Date()
		newTimeMilliSeconds = newTimeMilliSeconds.getTime();//Sets the new time
		
		//Converts time to seconds
		newTimeSeconds = Math.round(newTimeMilliSeconds/1000);
		
		secondsElapsed = newTimeSeconds - lastTimeSeconds; //Does the maths of the time elapsed
		
		//Customising the seconds into business driven fragments
		var secondGrouping = 30; //Group the time delays into this quantity
		var secondGroupingRemainder =  secondsElapsed%secondGrouping; //Remainder from the previous/next second grouping
		if (secondsElapsed < secondGrouping) {//Round seconds below first grouping, up
			secondsElapsed = secondGrouping;
		} else if (secondGroupingRemainder >= (secondGrouping/2)) {//Round seconds up to next grouping
			secondsElapsed = secondsElapsed + (secondGrouping - secondGroupingRemainder)
		} else if (secondGroupingRemainder > 0) {//Round seconds down to previous grouping
			secondsElapsed = secondsElapsed - secondGroupingRemainder;
		}
		
		lastTimeSeconds = newTimeSeconds; //Resets the last time recorded
	},
	initialiseOmnitureFormWatcher:function () {
	
		/*
		 * HOMEPAGE
		 * ========
		 */
		//Logs each input change with Omniture Site Catalyst
		$("#start-switching-form input, #start-switching-form select").change(function (){
			
			switchOmniture.getTimeInSeconds();//Calculates the seconds elapsed
			var $inputName = $(this).attr("name");
			var $inputValue = $(this).val();
			
			switch ($inputName){
				case "postcode":
					switchOmniture.fieldDelayTracker("which switch: home: postcode");
				break;
				case "supplyArea":
					switchOmniture.fieldDelayTracker("which switch: home: supply area");
				break;
				case "energyType":
					switchOmniture.fieldDelayTracker("which switch: home: energy type");
				break;	
				default:
					//alert($inputName+" is not being handeled within /scripts/omniture/switch/question-delay.js");
			}
		});
	
		/*
		 * CURRENT SITUATION PAGE
		 * ============
		 */
		//Logs each input change with Omniture Site Catalyst
		$("#current-situation select").change(function (){
			
			switchOmniture.getTimeInSeconds();//Sorts the seconds elapsed
			var $selectName = $(this).attr("name");
			var $selectedValue = $(this).find("option:selected").val();
			
			if ($selectedValue != "") {//Only log a result when the user chooses a valid option, else assume the question is not answered
				
				switch ($selectName){
					case "currentProvider":
						switchOmniture.fieldDelayTracker("which switch: current situation: current "+switchType +" supplier");
					break
					case "currentElectricityProvider":
						switchOmniture.fieldDelayTracker("which switch: current situation: current electricity supplier");
					break
					case "currentGasProvider":
						switchOmniture.fieldDelayTracker("which switch: current situation: current gas supplier");
					break
					case "gasUsageType":
						switchOmniture.fieldDelayTracker("which switch: gas usage");
					break
					case "gasUsagePeriod":
						switchOmniture.fieldDelayTracker("which switch: current situation: gas usage period");
					break
					case "howYouPayForGas":
						switchOmniture.fieldDelayTracker("which switch: current situation: gas payment method");
					break
					case "howYouPayForElectricity":
						switchOmniture.fieldDelayTracker("which switch: current situation: electricity payment method");
					break
					case "gasTariffId":
						switchOmniture.fieldDelayTracker("which switch: current situation: gas tariff");
					break
					case "electricityUsageType":
						switchOmniture.fieldDelayTracker("which switch: current situation: electricity usage");
					break
					case "electricityUsagePeriod":
						switchOmniture.fieldDelayTracker("which switch: current situation: electricity usage period");
					break
					case "electricityTariffId":
						switchOmniture.fieldDelayTracker("which switch: current situation: electricity tariff");
					break
					case "howYouPay":
						switchOmniture.fieldDelayTracker("which switch: current situation: payment method");
					break
					case "dualTariffId":
						switchOmniture.fieldDelayTracker("which switch: current situation: tariff");
					break
					case "alternativeGasUsagePeriod":
						switchOmniture.fieldDelayTracker("which switch: current situation: alternative gas usage period");
					break
					case "alternativeGasUsageType":
						switchOmniture.fieldDelayTracker("which switch: current situation: alternative gas usage");
					break
					case "alternativeElectricityUsagePeriod":
						switchOmniture.fieldDelayTracker("which switch: current situation: alternative electricity usage period");
					break
					case "alternativeElectricityUsageType":
						switchOmniture.fieldDelayTracker("which switch: current situation: alternative electricity usage");
					break
					default:
						//alert($selectName+" is not being handeled within /scripts/omniture/switch/question-delay.js");
				}
				
			}
		});
		
		//Logs each input change with Omniture Site Catalyst
		$("#current-situation input").change(function (){
			switchOmniture.getTimeInSeconds();//Calculates the seconds elapsed		
			var $inputType = $(this).attr("type");
			var $inputName = $(this).attr("name");
			
			if ($inputType == "radio") {//Deals with radio buttons
				
				switch ($inputName){
					case "sameSupplierForGasAndElec":
						switchOmniture.fieldDelayTracker("which switch: current situation: same supplier");
					break	
					case "economyMeter":
						switchOmniture.fieldDelayTracker("which switch: current situation: economy meter");
					break
					case "economyMeterType":
						switchOmniture.fieldDelayTracker("which switch: current situation: economy meter type");
					break
					case "gasMainsSupply":
						switchOmniture.fieldDelayTracker("which switch: current situation: gas mains supply");
					break
					case "igtGasCustomer":
						switchOmniture.fieldDelayTracker("which switch: current situation: igt customer");
					break
					case "haveBill":
						switchOmniture.fieldDelayTracker("which switch: current situation: have "+switchType+" bill");
					break
					case "knowBillSize":
						switchOmniture.fieldDelayTracker("which switch: current situation: know "+switchType+" bill size");
					break
					case "numberInProperty":
						switchOmniture.fieldDelayTracker("which switch: current situation: number in property");
					break
					case "roomsInProperty":
						switchOmniture.fieldDelayTracker("which switch: current situation: rooms in property");
					break
					case "propertyHasCentralHeating":
						switchOmniture.fieldDelayTracker("which switch: current situation: central heating in property");
					break
					case "haveGasBill":
						switchOmniture.fieldDelayTracker("which switch: current situation: have "+switchType+" gas bill");
					break
					case "knowGasBillSize":
						switchOmniture.fieldDelayTracker("which switch: current situation: know "+switchType+" gas bill size");
					break
					case "haveElectricityBill":
						switchOmniture.fieldDelayTracker("which switch: current situation: have "+switchType+" electricity  bill");
					break
					case "knowElectricityBillSize":
						switchOmniture.fieldDelayTracker("which switch: current situation: know "+switchType+" electricity bill size");
					break
					default:
						//alert($inputName+" is not being handeled within /scripts/omniture/switch/question-delay.js");
				}
			}
				
			//Deals with text input
			if ($inputType == "text") {	
				
				switch ($inputName){
					case "nightTimeRatePercentage":
						switchOmniture.fieldDelayTracker("which switch: current situation: night time rate");
					break
					case "gasUsage":
						switchOmniture.fieldDelayTracker("which switch: current situation: gas units");
					break
					case "electricityUsage":
						switchOmniture.fieldDelayTracker("which switch: current situation: electricity units");
					break
					case "alternativeGasUsage":
						switchOmniture.fieldDelayTracker("which switch: current situation: alternative gas units");
					break
					case "alternativeElectricityUsage":
						switchOmniture.fieldDelayTracker("which switch: current situation: alternative electricity units");
					break
					default:
						//alert($inputName+" is not being handeled within /scripts/omniture/switch/question-delay.js");
				}
			}
			
		});
	
		/*
		 * RESULTS PAGE
		 * ============
		 */
		$("#results-filter input").change(function (){
			
			switchOmniture.getTimeInSeconds();//Calculates the seconds elapsed
			var $filterName = $(this).attr("name");
			var $filterText = $(this).parents("label").find("span").html();
			
			if ($(this).is(":checked")){//Checkboxes
				switchOmniture.fieldDelayTracker("which switch: results: filter: "+$filterText);
			}
		})
		
		$("#results-filter label a").click(function (){
			
			switchOmniture.getTimeInSeconds();//Calculates the seconds elapsed
			if (!$(this).parents("label").hasClass("selected") && !$(this).parents("label").hasClass("disabled")){//Only log the ones that are not already selected
				switchOmniture.fieldDelayTracker("which switch: results: filter: "+$(this).html());
			}
		});
		
		$("#results-filter a.ui-slider-handle").click(function (){//Handles the slider changes
	
			switchOmniture.getTimeInSeconds();//Calculates the seconds elapsed
			
			//Rmeoves help anchor from the slider heading
			var filterName = $(this).parents("fieldset").find("h3").html();
			var startLinkPosition = filterName.indexOf("<a");
			filterName = filterName.substring(0,startLinkPosition);
			
			switchOmniture.fieldDelayTracker("which switch: results: filter: "+filterName);
		});
		
		/*
		 * SAVE QUOTE PAGE
		 * ===============
		 */
		//Logs each input change with Omniture Site Catalyst
		$("#switch-details input, #switch-details select").change(function (){
			
			switchOmniture.getTimeInSeconds();//Calculates the seconds elapsed
			var $inputName = $(this).attr("name");
			var $inputValue = $(this).val();
			
			switch ($inputName){
				case "title":
					switchOmniture.fieldDelayTracker("which switch: save quote: title");
				break;
				case "firstName":
					switchOmniture.fieldDelayTracker("which switch: save quote: first name");
				break;
				case "lastName":
					switchOmniture.fieldDelayTracker("which switch: save quote: last name");
				break;	
				case "emailAddress":
					switchOmniture.fieldDelayTracker("which switch: save quote: email");
				break;
				case "emailAddressConfirm":
					switchOmniture.fieldDelayTracker("which switch: save quote: email confirm");
				break;
				case "contactMe":
					switchOmniture.fieldDelayTracker("which switch: save quote: contact me");
				break;
				default:
					//alert($inputName+" is not being handeled within /scripts/omniture/switch/question-delay.js");
			}
		});
	},
	quickQuoteTracking:function($inputObj) {//Logs each input change with Omniture Site Catalyst
	
		switchOmniture.getTimeInSeconds();//Calculates the seconds elapsed
		var $inputName = $inputObj.attr("name");
		var $inputType = $inputObj.attr("type");
		
		if ($inputType == "checkbox") {//Deals with checkboxes
		
			switch ($inputName){
				case "propertyHasDoubleGlazing":
					switchOmniture.fieldDelayTracker("which switch: current situation: quick quote: double glazing");
				break
				case "propertyHasCavityWallInsulation":
					switchOmniture.fieldDelayTracker("which switch: current situation: quick quote: cavity wall insulation");
				break
				case "propertyHasLoftInsulation":
					switchOmniture.fieldDelayTracker("which switch: current situation: quick quote: loft insulation");
				break
				case "propertyHasSolarPanels":
					switchOmniture.fieldDelayTracker("which switch: current situation: quick quote: solar panels");
				break
				case "pensionerExists":
					switchOmniture.fieldDelayTracker("which switch: current situation: quick quote: pensioner");
				break
				case "houseboundExists":
					switchOmniture.fieldDelayTracker("which switch: current situation: quick quote: housebound");
				break
				case "unemployedExists":
					switchOmniture.fieldDelayTracker("which switch: current situation: quick quote: unemployed");
				break
				default:
					//alert($inputName+" is not being handeled within /scripts/omniture/switch/question-delay.js");
			}
		}
		
		if ($inputType == "radio") {//Deals with radio buttons
			
			switch ($inputName){
				case "numberInProperty":
					switchOmniture.fieldDelayTracker("which switch: current situation: quick quote: people in property");
				break
				case "roomsInProperty":
					switchOmniture.fieldDelayTracker("which switch: current situation: quick quote: rooms in property");
				break
				case "propertyHasCentralHeating":
					switchOmniture.fieldDelayTracker("which switch: current situation: quick quote: central heating in property");
				break
				default:
					//alert($inputName+" is not being handeled within /scripts/omniture/switch/question-delay.js");
			}
		}
	}	
}

$(document).ready(function() {
	
	
	
	//Global variables
	lastTimeMilliSeconds = new Date();
	lastTimeMilliSeconds = lastTimeMilliSeconds.getTime(); //Captures the time on page load
	lastTimeSeconds = Math.round(lastTimeMilliSeconds/1000); //Converts to seconds
	newTimeMilliSeconds = 0;
	secondsElapsed = 0;
	lastQuestionName = "";
	newQuestionName = "";
	
	var switchOmnitureIntenseOff = false; //Quick way of turning off this js, set to true for off
	if (switchOmnitureIntenseOff) {return;}
	
	switchOmniture.initialiseOmnitureFormWatcher();
	$("#fs-property-details input").live("click", function(){ //Once the Quick Quote is written to the page & highlighted (workaround as live does not work with change)
		switchOmniture.quickQuoteTracking($(this));
	});

});	
