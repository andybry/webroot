var switchForms = {
	currentSituation:function() {
		billState = null;
		//Current situation form inputs clicked
		$("#current-situation :input").click(function(event) {
			$inputId = $(this).attr("id"); // Get the id of the clicked input
			$inputFieldset = $(this).parents("fieldset").attr("id"); // Get the id of the clicked input's parent fieldset
			$propertyDetailsId =  $("#fs-property-details");
			//Checking whether gas & electricity come from same supplier
			if ($inputFieldset == "fs-same-supplier") {

				if ($inputId == "same-supplier-yes") {//If gas & electricity from same supplier
					$differentSuppliers.hide();//Hide different suppliers fieldset
					$sameSuppliers.show();//Show same supplier fieldset
					$bothTariff.show();//Show both tariff selection box and hide gas & electricity tariff boxes
					$gasTariff.hide();//Hide gas tariff box
					$electricityTariff.hide();//Hide electricity tariff box
					$bothBill.find("input").removeAttr("checked");//Removes the checked radio from single supplier bill
					$bothBill.show();//Only ask if they have their bill infront of them
					$gasBill.hide();//Don't ask about gas bill
					$electricityBill.hide();//Don't ask about electricity bill
					$gasBillAmount.hide(); 			// Hide electricity bill amount fields
					$electricityBillAmount.hide(); 	// Hide gas bill amount fields
					$havePersonalProjection.find("input").removeAttr("checked");
					$havePersonalProjectionGas.hide();
					$havePersonalProjectionElectricity.hide();
					$gasPersonalProjectionAmount.hide();
					$electricityPersonalProjectionAmount.hide();
					$propertyDetailsId.remove();
					$gasPayment.hide();
					$electricityPayment.hide();
					$singlePayment.show();
				} 
				else {//If gas & electricity from different suppliers
					$sameSuppliers.hide();//Hide same supliers fieldset
					$differentSuppliers.show();//Show different supplier fieldset
					$bothTariff.hide();//Hide both tariff selection box and show gas & electricity tariff boxes
					$gasTariff.show();//Show gas tariff box
					$electricityTariff.show();//Show electricity tariff box
					$bothBill.hide();//Don't ask about single bill
					$gasBill.find("input").removeAttr("checked");//Removes the checked radio from gas bill
					$gasBill.show();//Ask if they have gas bill infront of them
					$electricityBill.find("input").removeAttr("checked");//Removes the checked radio from electricity bill
					$electricityBill.show();//Ask if they have electricity bill in front of them
					if ($inputId == "same-supplier-no") {
						$gasBillAmount.hide(); 			// Hide electricity bill amount fields
						$electricityBillAmount.hide(); 	// Hide gas bill amount fields
						$havePersonalProjectionGas.find("input").removeAttr("checked");
						$havePersonalProjectionElectricity.find("input").removeAttr("checked");
						$gasPersonalProjectionAmount.hide();
						$electricityPersonalProjectionAmount.hide();
					}
					$havePersonalProjection.hide();
					$propertyDetailsId.remove();
					$singlePayment.hide();
					$gasPayment.show();
					$electricityPayment.show();
				}
			}
			
			switchForms.eonLoyaltyQuestion();

			//Checking whether customer has economy 7 or 10
			if ($inputFieldset == "fs-economy") {
				var $whichEconomy = $("#fs-which-economy");
				if ($inputId == "economy-yes") {//If customer has economy 7 or 10
					$whichEconomy.show();//Show which economy? fieldset
				} 
				else {
					$whichEconomy.hide();//Hide which economy? fieldset
				}
			}
			
			//Checking whether customer is connected to gas main
			if ($inputFieldset == "fs-gas-mains") {
				var $igtCustomer = $("#fs-igt");
				if ($inputId == "gas-mains-no") { // If customer has no gas mains connected
					$igtCustomer.show(); // Ask whether they are IGT customers
				} 
				else {
					$igtCustomer.hide(); // Hide IGT fieldset
				}
			}
			
			// Bill options
			var propertyDetails = '<fieldset id="fs-property-details" >\n\
    			<div>\n\
				<strong>How many people live in your property? Please include anyone over the age of 12. </strong>\n\
    			<input type="radio" name="numberInProperty" value="ONE_TWO" id="how-many-people-1-2" /> <label for="how-many-people-1-2">1 - 2</label>\n\
    			<input type="radio" name="numberInProperty" value="THREE_FOUR" id="how-many-people-3-4" /> <label for="how-many-people-3-4">3 - 4</label>\n\
    			<input type="radio" name="numberInProperty" value="FIVE_PLUS" id="how-many-people-5-more" /> <label for="how-many-people-5-more">5 or more</label>\n\
    			</div>\n\
				<div>\n\
				<strong>Of these people, are they any of the following? Please tick any that apply:  </strong>\n\
    			<input type="checkbox" name="pensionerExists" id="pensioner" /> <label for="pensioner">Pensioner</label>\n\
    			<input type="checkbox" name="houseboundExists" id="housebound" /> <label for="housebound">Housebound</label>\n\
    			<input type="checkbox" name="unemployedExists" id="unemployed" /> <label for="unemployed">Unemployed</label>\n\
    			</div>\n\
				<div>\n\
				<strong>How many bedrooms are there in your property? </strong>\n\
    			<input type="radio" name="roomsInProperty" value="ONE" id="how-many-rooms-1" /> <label for="how-many-rooms-1">1</label>\n\
    			<input type="radio" name="roomsInProperty" value="TWO_THREE" id="how-many-rooms-2-3" /> <label for="how-many-rooms-2-3">2 - 3</label>\n\
    			<input type="radio" name="roomsInProperty" value="FOUR_MORE" id="how-many-rooms-4-more" /> <label for="how-many-rooms-4-more">4 or more</label>\n\
    			</div>\n\
				<div>\n\
				<strong>Does your property have any of the following? Please tick any that apply:  </strong>\n\
    			<input type="checkbox" name="propertyHasDoubleGlazing" id="double-glazing" /> <label for="double-glazing">Double glazing</label>\n\
    			<input type="checkbox" name="propertyHasCavityWallInsulation" id="cavity-wall" /> <label for="cavity-wall">Cavity wall insulation</label>\n\
    			<input type="checkbox" name="propertyHasLoftInsulation" id="loft-insulation" /> <label for="loft-insulation">Loft insulation</label>\n\
    			<input type="checkbox" name="propertyHasSolarPanels" id="solar-panels" /> <label for="solar-panels">Solar panels</label>\n\
    			</div>\n\
				<div>\n\
				<strong>Do you have central heating? </strong>\n\
    			<input type="radio" name="propertyHasCentralHeating" value="yes" id="central-heating-yes" /> <label for="central-heating-yes">Yes</label>\n\
    			<input type="radio" name="propertyHasCentralHeating" value="no" id="central-heating-no" /> <label for="central-heating-no">No</label>\n\
				<div>\n\
				</fieldset>';
			
			// If customer has same supplier for gas and electricity
			if ($inputFieldset == "fs-have-bill") {
				if ($inputId == "have-bill-yes") { 
					if ($(this).parents("fieldset").find("#fs-property-details").is(":visible")) {// Check if property details are visible in this fieldset
						$propertyDetailsId.remove();  // If yes then remove them
					}
					$electricityBillAmount.show(); // Show electricity bill amount fields 
					$gasBillAmount.show(); // Show gas bill amount fields
					$havePersonalProjection.show();	// Show Personal Projection Fields
				} 
				else {
					$gasBillAmount.hide(); // Hide electricity bill amount fields
					$electricityBillAmount.hide(); // Hide gas bill amount fields
					$havePersonalProjection.hide(); // Hide Personal Projection Fields
					if ($($propertyDetailsId).length <= 0) { // Check if property details fieldset exists
						 $(this).parents("fieldset").append(propertyDetails); // If not then append it to this fieldset
					}
				}
				switchForms.billWatcher();
			}
			
			// If customer has different suppliers for gas and electricity
			if ($inputFieldset == "fs-have-bill-gas") {
				if ($inputId == "have-bill-gas-yes") { 
					if ($(this).parents("fieldset").find("#fs-property-details").is(":visible")) {
						$propertyDetailsId.remove();
					}
					$gasBillAmount.show();
					$havePersonalProjectionGas.show();
				} 
				else {
					$gasBillAmount.hide(); 
					$gasPersonalProjectionAmount.hide();
					$havePersonalProjectionGas.hide();

					if ($($propertyDetailsId).length <= 0) { // Check if property details fieldset exists
					 		$(this).parents("fieldset").append(propertyDetails); // If not then append it to this fieldset
					}
				}
				switchForms.billWatcher();
			}
			
			if ($inputFieldset == "fs-have-bill-electricity") {
				if ($inputId == "have-bill-electricity-yes") { 
					if ($(this).parents("fieldset").find("#fs-property-details").is(":visible")) {
						$propertyDetailsId.remove();
					}
					$electricityBillAmount.show();  
					$havePersonalProjectionElectricity.show();
				} 
				else {
					$electricityBillAmount.hide(); 
					$electricityPersonalProjectionAmount.hide();
					$havePersonalProjectionElectricity.hide();

					if ($($propertyDetailsId).length <= 0) { // Check if property details fieldset exists
					 		$(this).parents("fieldset").append(propertyDetails); // If not then append it to this fieldset
					}
				}
				switchForms.billWatcher();
			}
			
			if (($electricityBillAmount.is(":visible") && $gasBillAmount.is(":visible")) || ($gasBillAmount.is(":visible"))) {
				$electricityBillAmount.find("p.enter-amount").hide();
				$gasBillAmount.find("p.enter-amount").show();
			}
			else if ($electricityBillAmount.is(":visible")) {
				$electricityBillAmount.find("p.enter-amount").show();
				$gasBillAmount.find("p.enter-amount").hide();
			}
			

			// Have Personal Projection GAS
			if ((($inputFieldset == "fs-have-personal-projection") && ($inputId == "have-personal-projection--yes")) || 
			    (($inputFieldset == "fs-have-personal-projection-gas") && ($inputId == "have-personal-projection-gas-yes")) || 
				($havePersonalProjection.is(":visible") && document.getElementById('have-personal-projection--yes').checked) || 
				($havePersonalProjectionGas.is(":visible") && document.getElementById('have-personal-projection-gas-yes').checked)
				) {
				$gasPersonalProjectionAmount.show();
//				console.log("gas on");
			} else if ((($inputFieldset == "fs-have-personal-projection") && ($inputId == "have-personal-projection--no")) || 
				    (($inputFieldset == "fs-have-personal-projection-gas") && ($inputId == "have-personal-projection-gas-no")) ||
				    ($(this).parents("fieldset").find("#fs-property-details").is(":visible")) ) {
				$gasPersonalProjectionAmount.hide();
//				console.log("gas off");
			}

			// Have Personal Projection ELECTRICITY
			if ((($inputFieldset == "fs-have-personal-projection") && ($inputId == "have-personal-projection--yes")) || 
				(($inputFieldset == "fs-have-personal-projection-electricity") && ($inputId == "have-personal-projection-electricity-yes")) || 
				($havePersonalProjection.is(":visible") && document.getElementById('have-personal-projection--yes').checked) || 
				($havePersonalProjectionElectricity.is(":visible") && document.getElementById('have-personal-projection-electricity-yes').checked)
				) {
					$electricityPersonalProjectionAmount.show();
//					console.log("electricity oN");
					
					// Hide duplicate heading when dual fuel (same or different suppliers)
					if (( $havePersonalProjection.is(":visible") && document.getElementById('have-personal-projection--yes').checked && switchType != "electricity") ||
						( $havePersonalProjectionGas.is(":visible") && document.getElementById('have-personal-projection-gas-yes').checked  && 
						  $havePersonalProjectionElectricity.is(":visible") && document.getElementById('have-personal-projection-electricity-yes').checked) ) {
//						console.log("HIDE heading - only need one")
						$electricityPersonalProjectionAmount.find("p.enter-amount").hide();
					} else {
//						console.log("SHOW heading - only need one")
						$electricityPersonalProjectionAmount.find("p.enter-amount").show();
					}
				} else if ((($inputFieldset == "fs-have-personal-projection") && ($inputId == "have-personal-projection--no")) || 
					    (($inputFieldset == "fs-have-personal-projection-electricity") && ($inputId == "have-personal-projection-electricity-no")) || 
					    (($inputFieldset == "fs-have-bill") && ($inputId == "have-bill-no")) ||
					    (($inputFieldset == "fs-have-bill-electricity") && ($inputId == "have-bill-electricity-no")) ) {
					$electricityPersonalProjectionAmount.hide();
//					console.log("electricity off");
				}
		});
		

		// Select watcher
		$("#current-situation select").change(function() {
			//Don't kick anything off for the usage selects
			if ($(this).attr("id") == "alternativeGasUsageType" || $(this).attr("id") == "gas-amount-time-copy" || $(this).attr("id") == "alternativeElectricityUsageType" || $(this).attr("id") == "electricity-amount-time-copy")  {
				return false;
			}
			switchForms.billStateController();
		});
	},
	eonLoyaltyQuestion: function() {
			$eonLoyalty = $("#fs-which-eonLoyalty");

			if($("#same-supplier-yes").is(":checked") && $('#supplier').val() == "780") {
				$eonLoyalty.show();
			}
			else if($("#same-supplier-no").is(":checked") && ( $('#electricity-supplier').val() == "780" || $('#gas-supplier').val() == "780")) {
				$eonLoyalty.show();
			}
			else if(!$("#same-supplier-yes").is(":checked") && !$("#same-supplier-no").is(":checked") && $('#supplier').val() == "780") {
			    $eonLoyalty.show();
			}
			else {
				$eonLoyalty.hide();
			}

	},
	// This function is called when only one tariff needs to be looked at 
	singleSwitcher:function (select) {			
	
		var currentId = $(select).attr("id"); // Id of current select
		var currentValue = $(select).find("option:selected").val(); // value of current select
		if (currentValue == undefined) {currentValue = ""} 
		var otherValue = ""; // Value of other select
		
		// Set otherValue variable to electricity value if the current value is gas
		if (currentId == "gas-tariff") {
			var otherValue = $elecTariffSelect.find("option:selected").val();
		} 
		// Set otherValue variable to gas value if the current value is electricity
		else if (currentId == "electricity-tariff") {
			var otherValue = $gasTariffSelect.find("option:selected").val();
		}
		if (otherValue == undefined) {otherValue = ""}

		switchForms.showHideForm("hide", "both"); // clear forms initially

		if (currentValue > "0") { // If a tariff is selected
			// If the extra para is visible and the link to show the forms has already been clicked
			if (($didYouGetYourBill.is(":visible")) && formsEnabled) {
				if (currentId == "gas-tariff") {
					switchForms.showHideForm("show", "gas"); // Show the gas form if current select is the gas tariff
				}
				else if (currentId == "electricity-tariff") {
					switchForms.showHideForm("show", "elecricity"); // Show the electricity form if current select is the electricity tariff
				}
				else if (switchType == "gas" || switchType == "electricity") {//You are on the single fuel swap
					switchForms.showHideForm("show", "single");
				}
				else {
					switchForms.showHideForm("show", "both");
				}
			} 
			// If the extra para is not visible then show the paragraph
			else {
				switchForms.showHideP("show"); 
			}
		}
		else {				
			switchForms.showHideP("hide"); 
		}
		// If both tariff select boxes are set to don't know or please choose, then hide the extra paragraph
		if (((currentValue == "") || (currentValue < "0")) && ((otherValue == "") || (otherValue < "0")) ) {
			switchForms.showHideP("hide");
		}
		
	},
	//Checks the billState and decides what actions to perform
	billStateController:function () {	
		
		switch (billState) {
			
			case 0:
				switchForms.showHideP("hide");
				switchForms.showHideForm("hide", "both");
				break;
			
			case 1:
				switchForms.showHideP("hide");
				switchForms.showHideForm("hide", "gas");
				break;
				
			case 2:
				switchForms.showHideP("hide");
				switchForms.showHideForm("hide", "electricity");
				break;
				
			case 3:
				switchForms.singleSwitcher($bothTariffSelect);
				break;
			
			case 4: //If only gas tariff has all nos selected launch the single switcher function
				switchForms.singleSwitcher($gasTariffSelect);
				break;
			
			case 5: //If only electricity tariff has all nos selected launch the single switcher function
				switchForms.singleSwitcher($elecTariffSelect);
				break;
			
			case 6: //If both tariffs have all nos selected launch the double switcher function
				switchForms.doubleSwitcher();
				break;
			
		}
		
	},
	// Tariff options
	/*
		If the user has said they do not have a bill in front of them or know the size of their bill but then select a tariff from the last group of 
		select boxes in the form then it could mean they may have gone and got their bill when the saw the tariff select box.
		
		Given that they could get a much more accurate page of results if they enter the details from a bill
		we need to ask them if they went and got a bill after all.  If yes then we need to present them with another
		opportunity to enter these details before moving on to the results page.
		
		The following functions keep track of whether the user has said they have a bill or know the size of it. 
		They also keep track of which tariffs they say they have bills details for and which they don't.
		
		They then display the relevant additional information (if any) based on these answers.
	*/
	billWatcher:function () {

		if (switchType == "dual" && $("#same-supplier-no").is(":checked")) {//Dual fuel, different supplier	
			billState = 6;
		}
		if (switchType == "dual" && $("#same-supplier-yes").is(":checked")) {//Dual fuel, same supplier
			//If no bill & don't know size checked
			if ($billNo.is(":checked")) {billState = 3;}
			else {billState = 0;}
		}
		if (switchType == "gas") {//Gas only
			//If no bill & don't know size checked
			if ($billNo.is(":checked")) {billState = 3;}
			//At least one of no bill and don't know size is not checked
			else {billState = 1;}
		}
		if (switchType == "electricity") {//Gas only
			//If no bill & don't know size checked
			if ($billNo.is(":checked")) {billState = 3;}
			//At least one of no bill and don't know size is not checked
			else {billState = 2;}
		}
		switchForms.billStateController();
	},
	//Sorts out the paragraph and forms for the dual fuel page
	doubleSwitcherHelper:function (fuel) {		
		if (fuel == "gas") {
			fuelBillNo = $gasBillNo.is(":checked");
			fuelTariff = !$("#gas-tariff").attr("disabled");	
			if (fuelTariff) { 
				if (!($("#gas-tariff").find("option:selected").val() > 0)) {
					fuelTariff = false;
				}
			}
			otherFuelBillNo = $elecBillNo.is(":checked");
			otherFuelTariff = !$("#electricity-tariff").attr("disabled");	
			if (otherFuelTariff) { 
				if (!($("#electricity-tariff").find("option:selected").val() > 0)) {
					otherFuelTariff = false;
				}
			}
			otherFuelForm = $electricityBillAmountCopy.is(":visible");
		}
		else if (fuel == "electricity") {
			fuelBillNo = $elecBillNo.is(":checked");
			fuelTariff = !$("#electricity-tariff").attr("disabled");	
			if (fuelTariff) { 
				if (!($("#electricity-tariff").find("option:selected").val() > 0)) {
					fuelTariff = false;
				}
			}
			otherFuelBillNo = $gasBillNo.is(":checked");
			otherFuelTariff = !$("#gas-tariff").attr("disabled");	
			if (otherFuelTariff) { 
				if (!($("#gas-tariff").find("option:selected").val() > 0)) {
					otherFuelTariff = false;
				}
			}
			otherFuelForm = $gasBillAmountCopy.is(":visible");
		}
		
//alert("Fuel: "+fuel+" fuelBillNo: "+fuelBillNo+" fuelTariff: "+fuelTariff+" otherFuelBillNo: "+otherFuelBillNo+" otherFuelTariff: "+otherFuelTariff+" formsEnabled: "+formsEnabled+" otherFuelForm: "+otherFuelForm);
		
		if (fuelBillNo && fuelTariff) {//If no is checked to fuel bill, no to fuel bill size & there's a valid fuel tariff selected 			
			switchForms.showHideP("show");
			if (formsEnabled || otherFuelForm) {
				switchForms.showHideForm("show", fuel);
			}
		}
		else {			
			switchForms.showHideForm("hide", fuel);//Hide the fuel form
			if (!(otherFuelBillNo && otherFuelTariff)) {//Check if the paragraph can be deleted 
				switchForms.showHideP("hide");
			}
		}
		
	},
	// Show hide function for extra paragraph
	showHideP:function (showHide) {	
		var showHide = showHide;
		if (showHide == "hide") {
			$didYouGetYourBill.hide();
		} else {
			$didYouGetYourBill.show();
		}
	},
	// Show/hide function for extra forms
	showHideForm:function (showHide, supplier) {	
		
		// Show forms	
		if (showHide == "show") {					
			if (supplier == "both") {
				$gasBillAmountCopy.show();
				$electricityBillAmountCopy.show();
	 		}
	 		else if (supplier == "gas") {
				$gasBillAmountCopy.show();
			}
	 		else if (supplier == "electricity") {			 			
				$electricityBillAmountCopy.show();
			}
	 		else if (supplier == "single") {
	 			if (switchType == "gas") {
	 				$gasBillAmountCopy.show();
	 			}
	 			if (switchType == "electricity") {
	 				$electricityBillAmountCopy.show();
	 			}
			}
		}
		// hide forms
		else if (showHide == "hide") {
			if (supplier == "both") {
				$gasBillAmountCopy.hide();
				$electricityBillAmountCopy.hide();
	 		}
	 		else if (supplier == "gas") {
				$gasBillAmountCopy.hide();
	 		}
	 		else if (supplier == "electricity") {
				$electricityBillAmountCopy.hide();
	 		}
	 		else if (supplier == "single") {
	 			if (switchType == "gas") {
	 				$gasBillAmountCopy.hide();
	 			}
	 			if (switchType == "electricity") {
	 				$electricityBillAmountCopy.hide();
	 			}
			}
		}	
		
	},
	// This function is for dual fuel switch with different suppliers
	doubleSwitcher:function () {			
		switchForms.doubleSwitcherHelper("gas");
		switchForms.doubleSwitcherHelper("electricity");
	},
	/*Mag 20090826: This function show or hides the supplier tip paragraph based on the presence of supplier data via ajax*/
	supplierTipController:function(supplierID) {
		if ((varSupplierName == "") || (varSupplierNumber == "")) {//If either details are empty don't show the paragraph at all
			$("#supplier-tip").addClass("no-read");
		}
		else {
			$("#supplier-tip").removeClass("no-read");
			$("#supplier-name-tip").html(varSupplierName);
			$("#supplier-number-tip").html(varSupplierNumber);
		}
	},
	sideTips:function() {
		$tipsAndInfo = $("#tips-info");
		$tipsAndInfoDetail = $("#tips-info").find("div").not(".inner"); // Find tip divs
		$fieldset = $("#current-situation fieldset"); // find fieldsets
		
		$tipsAndInfoDetail.find("h3").hide().end().not(".intro").hide(); // hide H3s from tip divs and hide all divs other than introduction
		$("#page").css("overflow", "visible");
		
		$($fieldset).click(function(){ // Listen for fieldset click
			var fieldsetId = $(this).attr("id"); // Get ID of clicked fieldset
			var fieldsetClass = $(this).attr("class"); // Get class of clicked fieldset
			
			// Some fieldsets will have multiple classes that we don't need so remove them from fieldsetClass
			fieldsetClass = fieldsetClass.replace("left-label ",""); 
			fieldsetClass = fieldsetClass.replace(" highlight",""); 

			if (fieldsetClass.length > 0) { // If fieldset does have a class we need
				$fieldset.removeClass("highlight"); // Remove highlight from all fieldsets
				$tipsAndInfoDetail.hide(); // hide all tips divs
				if (fieldsetClass == "tariff-help") {switchForms.supplierTipController($("fieldset."+fieldsetClass+" select").val());}//If you select the tariff tip
				$("#" + fieldsetClass).show(); // Show tip div with same ID as fieldsetClass
				
				var position = $(this).position(); // Get the position of fieldset on page
				var positionTop = position.top; // Set position from top as variable
				
				if ((fieldsetId=="fs-gas-bill-amount")||(fieldsetId=="fs-gas-bill-amount-copy")||(fieldsetId=="fs-electricity-bill-amount")||(fieldsetId=="fs-electricity-bill-amount-copy")) {
					var amountLabelVisible = $("#" + fieldsetId + " .enter-amount").is(":visible");
					if (amountLabelVisible) positionTop = positionTop + 60;
				}
				
				$tipsAndInfo.css({"position" : "absolute", "top": positionTop}) // Position tip box next to clicked fieldset
				$(this).addClass("highlight"); // Highlight fieldset
			}
		})
	},
	sideTipsSwitchDetails:function() {
		$tipsAndInfo = $("#tips-info");
		$tipsAndInfoDetail = $("#tips-info").find("div").not(".inner"); // Find tip divs
		$fieldset = $("#switch-details fieldset"); // find fieldsets
		
		$tipsAndInfoDetail.find("h3").hide().end().not(".intro").hide(); // hide H3s from tip divs and hide all divs other than introduction
		$("#page").css("overflow", "visible");
		
		$($fieldset).click(function(){ // Listen for fieldset click
			var fieldsetId = $(this).attr("id"); // Get ID of clicked fieldset
			var fieldsetClass = $(this).attr("class"); // Get class of clicked fieldset
			
			// Some fieldsets will have multiple classes that we don't need so remove them from fieldsetClass
			fieldsetClass = fieldsetClass.replace("left-label ",""); 
			fieldsetClass = fieldsetClass.replace(" highlight",""); 

			if (fieldsetClass.length > 0) { // If fieldset does have a class we need
				$fieldset.removeClass("highlight"); // Remove highlight from all fieldsets
				$tipsAndInfoDetail.hide(); // hide all tips divs
				$("#" + fieldsetClass).show(); // Show tip div with same ID as fieldsetClass
				
				var position = $(this).position(); // Get the position of fieldset on page
				var positionTop = position.top + 15; // Set position from top as variable, adding a margin so it lines up with default box

				$tipsAndInfo.css({"position" : "absolute", "top": positionTop}) // Position tip box next to clicked fieldset
				$(this).addClass("highlight"); // Highlight fieldset
			}
		})
	},
	resetTips:function() {
		$tipsAndInfo.css("position", "static");
		$tipsAndInfoDetail.hide();
		$tipsAndInfo.find("div.intro").show();
		$fieldset.removeClass("highlight");
	},
	/*AndyC 20100219: Takes the ajax url and updates the payment options*/
	ajaxUpdaterForPayment:function (paymentSelectId, strAjaxURL) {
		var ajaxSelect = "#"+paymentSelectId;

		if (ajaxPaymentUpdaters[paymentSelectId] != null) {
			ajaxPaymentUpdaters[paymentSelectId].abort();
		}
		
		//Makes the AJAX call
		ajaxPaymentUpdaters[paymentSelectId] = $.ajax({
			type: "GET",
			url: strAjaxURL,
			dataType: "json",
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				which.ajaxLogReporter("There was an AJAX Error thrown for the payment type dropdown on the current situation page", strAjaxURL);
				whichAjax.ajaxSessionTimeout();
			},			
			success: function(data){
				
				whichAjax.ajaxHandleError(data);
				
				$(ajaxSelect+" option").remove();//Removes the previous options	
				var jsonLogMessages = "";
				
				if (data.paymentTypeInfo.paymentTypes == undefined) {
					which.ajaxLogReporter("The paymentTypeInfo.paymentTypes JSON node in undefined", strAjaxURL)
				}
				else {
					$.each(data.paymentTypeInfo.paymentTypes, function(i,paymentType){
						$(ajaxSelect).append('<option value="'+paymentType.id+'">'+paymentType.name+'</option>');
					});
					$(ajaxSelect).parent("fieldset").find("p.error").remove();
					$(ajaxSelect).removeAttr("disabled");
				}
			}
        });	
		
	},
	/*Mag 20090825: Takes the ajax url and the fuel type and updates the select options as needed*/
	ajaxUpdater:function (strFuelType, strAjaxURL) {		
				
		var ajaxSelect = "#"+strFuelType+"-tariff";
		
		if (ajaxFuelTypeUpdaters[strFuelType] != null) {
			ajaxFuelTypeUpdaters[strFuelType].abort();
		}
		
		//Makes the AJAX call
		ajaxFuelTypeUpdaters[strFuelType] = $.ajax({
			type: "GET",
			url: strAjaxURL,
			dataType: "json",
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				which.ajaxLogReporter("There was an AJAX Error thrown for the tariff dropdown on the current situation page", strAjaxURL);
				whichAjax.ajaxSessionTimeout();
			},
			success: function(data){
				whichAjax.ajaxHandleError(data);
				
				$(ajaxSelect+" option").remove();//Removes the previous options	
				var jsonLogMessages = "";
				
				if (data.supplierInfo == undefined) {
					which.ajaxLogReporter("The supplierInfo JSON node in undefined", strAjaxURL)
				}
				if (data.supplierInfo.details == undefined) {
					which.ajaxLogReporter("The supplierInfo.details JSON node in undefined", strAjaxURL)
				}
				if (!(data.supplierInfo == undefined) && !(data.supplierInfo.details == undefined)) {
					if (data.supplierInfo.details.name == undefined) {
						which.ajaxLogReporter("The supplierInfo.details.name JSON node in undefined", strAjaxURL)
					} 
					else {
						varSupplierName = data.supplierInfo.details.name;
					}
					if (data.supplierInfo.details.phoneNumber == undefined) {
						which.ajaxLogReporter("The supplierInfo.details.phoneNumber JSON node in undefined", strAjaxURL)
					}
					else {
						varSupplierNumber = data.supplierInfo.details.phoneNumber;
					}
				}
				if (data.supplierInfo.tariffs == undefined) {
					which.ajaxLogReporter("The supplierInfo.tariffs JSON node in undefined", strAjaxURL)
				}
				else {
					if (data.supplierInfo.tariffs.length < 2) {//1 are hardcoded in Java as standard
						which.ajaxLogReporter("The number of supplierInfo.tariffs returned via JSOn is less than 2", strAjaxURL)
						$(ajaxSelect).parent("fieldset").prepend('<p class="no-label error">There are no tariffs that match your current situation</p>')
					}
					else {
						$.each(data.supplierInfo.tariffs, function(i,tariff){
							$(ajaxSelect).append('<option value="'+tariff.id+'">'+tariff.name+'</option>');
						});
						$(ajaxSelect).parent("fieldset").find("p.error").remove();
						$(ajaxSelect).removeAttr("disabled");				
					}
				}
			}
        });	
		
		switch(switchType) {
			case "gas":
				$("#did-you-get-your-bill, #fs-gas-bill-amount-copy").hide();
			break;
			case "elecctricity":
				$("#did-you-get-your-bill, #fs-electrictiy-bill-amount-copy").hide();
			break;
			case "dual":
				if (!$("#same-supplier-no").is(":checked")) {//Only do for dual/single supplier
					$("#did-you-get-your-bill, #fs-electricity-bill-amount-copy, #fs-gas-bill-amount-copy").hide();//Hide the gas & electricity usage paragraph and forms
				}
				else {//For dual/different suppliers with change to gas tariff
					switchForms.doubleSwitcher();
				}
			break;
		}		
	},
	/*Mag 20090821: If a select is disabled, delete it's options*/
	selectDisabled:function (selectId) {
		selectId="#"+selectId;	
		if($(selectId).attr("disabled") == true) {
			$(selectId+" option").remove();//Removes the previous options	
		}
	},
	/*Mag 20090821: Sets the tariff via AJAX*/
    tariffSetter:function(objChanger)
    {			
    	objChangerId = $(objChanger).attr("id");
     	var strAjaxURL = "";

     	//Sorts out disabling of the payment dropdowns
     	if ($("#how-do-you-pay") && !($("#how-do-you-pay").find("option").length > 0) || objChangerId == "supplier") {
     		$("#how-do-you-pay").attr("disabled","disabled");
     		switchForms.selectDisabled("how-do-you-pay");
     	}

     	if ($("#how-do-you-pay-gas") && !($("#how-do-you-pay-gas").find("option").length > 0) || objChangerId == "supplier") {
     		$("#how-do-you-pay-gas").attr("disabled","disabled");
     		switchForms.selectDisabled("how-do-you-pay-gas");
     	}

     	if ($("#how-do-you-pay-electricity") && !($("#how-do-you-pay-electricity").find("option").length > 0) || objChangerId == "supplier") {
     		$("#how-do-you-pay-electricity").attr("disabled","disabled");
     		switchForms.selectDisabled("how-do-you-pay-electricity");
     	}

     	//Sorts out disabling of the tariff dropdowns
     	if (!($("#gas-tariff").find("option").length > 0) || objChangerId == "gas-supplier" || objChangerId == "how-do-you-pay-gas") {
     		$("#gas-tariff").attr("disabled","disabled");
     		switchForms.selectDisabled("gas-tariff");
     	}
     	if (!($("#electricity-tariff").find("option").length > 0) || objChangerId == "electricity-supplier" || objChangerId == "how-do-you-pay-electricity") {
     		$("#electricity-tariff").attr("disabled","disabled");
     		switchForms.selectDisabled("electricity-tariff");
     	}
     	if ($("#single-tariff") && !($("#single-tariff").find("option").length > 0) || objChangerId == "how-do-you-pay" || objChangerId == "supplier") {
     		$("#single-tariff").attr("disabled","disabled");
     		switchForms.selectDisabled("single-tariff");
     	}
     	
        if (!($("#how-do-you-pay-gas").is(":visible") || $("#how-do-you-pay-electricity").is(":visible") || $("#how-do-you-pay").is(":visible"))) {//If no tariff dropdown is visible don't do anything
			return;
	   	}

    	//Set the economy part of the url
        strEconomy = "";
		if ($("input[name='economyMeter']").is(":checked")) {
			strEconomy="?economyMeter="+$("input[name='economyMeter']:checked").val();
			if ($("input[name='economyMeterType']").is(":checked")) {
				strEconomy+="&economyMeterType="+$("input[name='economyMeterType']:checked").val();
			}
		}

		//Set the tariff boxes behaviour
    	//Gas single supply journey
		if ((switchType == "gas") && ($("#supplier").val() != "")) {//If you are on the gas switch only page       		  		
			if (!$("#how-do-you-pay").attr("disabled") && $("#how-do-you-pay").val() != "") {
				strAjaxURL = "service/gasTariffs/"+$("#how-do-you-pay").val()+"/"+$("#supplier").val()
				switchForms.ajaxUpdater("single", strAjaxURL);
				return;
			}
			
			strAjaxURL = "service/paymentTypes/"+$("#supplier").val()+"?energyType=GAS";
    		switchForms.ajaxUpdaterForPayment("how-do-you-pay", strAjaxURL);
    	}
		//Electricity single supply journey
    	if ((switchType == "electricity") && ($("#supplier").val() != "" && strEconomy != "")) {//If you are on the electricity switch only page
			if (!$("#how-do-you-pay").attr("disabled") && $("#how-do-you-pay").val() != "") {
				strAjaxURL = "service/electricityTariffs/"+$("#how-do-you-pay").val()+"/"+$("#supplier").val()+strEconomy;
				switchForms.ajaxUpdater("single", strAjaxURL);
				return;
			}
			
			strAjaxURL = "service/paymentTypes/"+$("#supplier").val()+strEconomy+"&energyType=ELECTRICITY";
    		switchForms.ajaxUpdaterForPayment("how-do-you-pay", strAjaxURL);
    	}	
    	//Dual supply journey
    	if (switchType == "dual") {
	    	if ($("#same-supplier-yes").is(":checked")) { //If you are on the dual switch page and have single supplier
	    		if ($("#supplier").val() != "" && strEconomy != "") {
	    			if (!$("#how-do-you-pay").attr("disabled") && $("#how-do-you-pay").val() != "") {	    				
	    				strAjaxURL = "service/tariff/"+$("#how-do-you-pay").val()+"/"+$("#supplier").val()+strEconomy;
			        	switchForms.ajaxUpdater("single", strAjaxURL);
			        	return;
	    			}

					strAjaxURL = "service/paymentTypes/"+$("#supplier").val()+strEconomy;
	        		switchForms.ajaxUpdaterForPayment("how-do-you-pay", strAjaxURL);
	    		}
	        }
	        else if ($("#same-supplier-no").is(":checked")) {//If you are on the dual switch page and have two suppliers
				if ((objChangerId == "electricity-supplier" || objChangerId == "how-do-you-pay-electricity" || $(objChanger).parents("fieldset").attr("id") == "fs-economy") && $("#electricity-supplier").val() != "" && strEconomy != "") {//Electricity tariff updater
					if (!$("#how-do-you-pay-electricity").attr("disabled") && $("#how-do-you-pay-electricity").val() != "") {
						strAjaxURL = "service/electricityTariffs/"+$("#how-do-you-pay-electricity").val()+"/"+$("#electricity-supplier").val()+strEconomy;
						switchForms.ajaxUpdater("electricity", strAjaxURL);
						return;
					}
					
	    			strAjaxURL = "service/paymentTypes/"+$("#electricity-supplier").val()+strEconomy+"&energyType=ELECTRICITY";
	        		switchForms.ajaxUpdaterForPayment("how-do-you-pay-electricity", strAjaxURL);
				}
				else if ((objChangerId == "gas-supplier" || objChangerId == "how-do-you-pay-gas") && $("#gas-supplier").val() != "") {//Gas tariff updater
					if (!$("#how-do-you-pay-gas").attr("disabled") && $("#how-do-you-pay-gas").val() != "") {
						strAjaxURL = "service/gasTariffs/"+$("#how-do-you-pay-gas").val()+"/"+$("#gas-supplier").val()
						switchForms.ajaxUpdater("gas", strAjaxURL);
						return;
					}
					
	    			strAjaxURL = "service/paymentTypes/"+$("#gas-supplier").val()+"?energyType=GAS";
	        		switchForms.ajaxUpdaterForPayment("how-do-you-pay-gas", strAjaxURL);
				} 
			}  
    	}    	
    	
    	//If there are any tariff dropdowns disabled, remove their options
    	switch(switchType) {
	    	case "gas":
	    		if ((objChangerId == "how-do-you-pay") || (objChangerId == "supplier")) {
	    	    	switchForms.selectDisabled("single-tariff");
	    	    	$("#did-you-get-your-bill, #fs-gas-bill-amount-copy").hide();
	        	}
	    		break;
	    	case "electricity":	    		
	    		if ((objChangerId == "how-do-you-pay") || (objChangerId == "supplier")) {	    			
	    	    	switchForms.selectDisabled("single-tariff");
	    	    	$("#did-you-get-your-bill, #fs-electricity-bill-amount-copy").hide();
	        	}
	    		break;
	    	case "dual":
	    		if ($("#same-supplier-no").is(":checked")) {switchForms.doubleSwitcher()}//Ignore dual fuel, different suppliers
	    		else {
		    		if ((objChangerId == "how-do-you-pay") || (objChangerId == "supplier")) {
		    	    	switchForms.selectDisabled("single-tariff");
		    	    	$("#did-you-get-your-bill, #fs-electricity-bill-amount-copy").hide();//Hide the electricity usage paragraph and form
		    	    	$("#did-you-get-your-bill, #fs-gas-bill-amount-copy").hide();//Hide the gas usage paragraph and form
		        	}
		    		if ((objChangerId == "electricity-supplier") || (objChangerId == "how-do-you-pay-electricity")) {
		    	    	switchForms.selectDisabled("electricity-tariff");
		    	    	$("#did-you-get-your-bill, #fs-electricity-bill-amount-copy").hide();//Hide the electricity usage paragraph and form
		        	}
		    		if ((objChangerId == "gas-supplier") || (objChangerId == "how-do-you-pay-gas")) {
		    	    	switchForms.selectDisabled("gas-tariff");
		    	    	$("#did-you-get-your-bill, #fs-gas-bill-amount-copy").hide();//Hide the gas usage paragraph and form
		        	}
	    		}
	    		break;
    	}   
    }
}

//Global variables for the current situation page 
varSupplierName = "";
varSupplierNumber = "";

ajaxPaymentUpdaters = {};
ajaxFuelTypeUpdaters = {};

$(document).ready(function() {
	// disable the how-do-you-pay select box
	//$("#how-do-you-pay").attr("disabled","disabled");
	//switchForms.selectDisabled("how-do-you-pay");
	
	$differentSuppliers = $("#fs-different-suppliers");
	$sameSuppliers = $("#fs-same-suppliers");
	$bothBill = $("#fs-have-bill");
	$gasBill = $("#fs-have-bill-gas");
	$electricityBill = $("#fs-have-bill-electricity");
	$bothTariff = $("#fs-single-tariff");
	$gasTariff = $("#fs-gas-tariff");
	$electricityTariff = $("#fs-electricity-tariff");
	$singlePayment = $("#fs-how-you-pay");
	$gasPayment = $("#fs-how-you-pay-gas");
	$electricityPayment = $("#fs-how-you-pay-electricity");	

	$gasBillAmount = $("#fs-gas-bill-amount");
	$electricityBillAmount = $("#fs-electricity-bill-amount");

	// Personal Projection
	$havePersonalProjection = $("#fs-have-personal-projection");
	$havePersonalProjectionGas = $("#fs-have-personal-projection-gas");
	$havePersonalProjectionElectricity = $("#fs-have-personal-projection-electricity");
	$gasPersonalProjectionAmount = $("#fs-gas-personal-projection-amount");
	$electricityPersonalProjectionAmount = $("#fs-electricity-personal-projection-amount");
	

	//Additional info paragraph and fieldsets
	$didYouGetYourBill = $("#did-you-get-your-bill"); 
	$gasBillAmountCopy = $("#fs-gas-bill-amount-copy");
	$electricityBillAmountCopy = $("#fs-electricity-bill-amount-copy");
	formsEnabled = false; // Has the user clicked the link to display the extra forms yet?
	
	//Tariff select boxes
	$gasTariffSelect = $("#gas-tariff");
	$elecTariffSelect = $("#electricity-tariff");
	$bothTariffSelect = $("#single-tariff");
	
	//Initial bill question inputs as variables
	$billYes = $("#have-bill-yes");
	$billNo = $("#have-bill-no");
	
	$gasBillYes = $("#have-bill-gas-yes");
	$gasBillNo = $("#have-bill-gas-no");
	
	$elecBillYes = $("#have-bill-electricity-yes");
	$elecBillNo = $("#have-bill-electricity-no");
	
	if ($.browser.msie) {//IE fix for on change handling (http://stackoverflow.com/questions/208471/getting-jquery-to-recognise-change-in-ie)
        $("input:radio, input:checkbox").click(function () {
            this.blur();
            this.focus();
        });
    }
	
	//Initial show form function from link in extra paragraph
	$didYouGetYourBill = $("#did-you-get-your-bill");
	$didYouGetYourBill.find("a").click(function() {
		formsEnabled = true; // Initial form display has been activated
		switchForms.billStateController();
		formsEnabled = false; 
		return false;
	})
	
	switchForms.sideTips();
	switchForms.currentSituation();
	switchForms.eonLoyaltyQuestion();

	var validator = $("#current-situation").validate({
		rules: {
			"sameSupplierForGasAndElec": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"currentProvider": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"currentElectricityProvider": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"eonLoyaltyPeriod": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"economyMeter": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"gasMainsSupply": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"smartMeter": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"howYouPay": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"dualTariffId": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"supplier": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"currentGasProvider": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"economyMeterType": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"nightTimeRatePercentage": {required: {depends: function(element) {return $(this).is(":visible");}}, number: true}, 
			"igtGasCustomer": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"gasUsage": {required: {depends: function(element) {return $(this).is(":visible");}}, number: true},
			"electricityUsage": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"electricityTariffId": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"gasTariffId": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"haveBill": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"haveGasBill": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"electricity-amount": {required: {depends: function(element) {return $(this).is(":visible");}}, number: true},
			"numberInProperty": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"roomsInProperty": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"haveElectricityBill": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"propertyHasCentralHeating": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"howYouPayForGas": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"howYouPayForElectricity": {required: {depends: function(element) {return $(this).is(":visible");}}},
			"alternativeElectricityUsage": {number: {depends: function(element) {return $(this).is(":visible");}}},
			"alternativeGasUsage": {number: {depends: function(element) {return $(this).is(":visible");}}}
		},
		messages: {},
		errorPlacement: function(error, element) {
			element.siblings("p.error").remove(); 
			error.prependTo (element.parent());
			fsParent = null;
			if (element.parent().parent().parent().parent()!=undefined) fsParent = element.parent().parent().parent().parent();
			if (fsParent!=null) {
				fsParentId = fsParent.attr("id");
				if ((fsParentId=="fs-gas-bill-amount")||(fsParentId=="fs-gas-bill-amount-copy")||(fsParentId=="fs-electricity-bill-amount")||(fsParentId=="fs-electricity-bill-amount-copy")) {
					// adding hasError class
					fsParent.addClass("hasError");
				}
			}
			generalFormError(validator.numberOfInvalids(), "#form-error-1") 
		},
		errorElement: 'p class="no-label error"',
		onfocusout: false,
		onkeyup: false,
		success: function(element) {
			element.addClass("removed");
			if (element.parent().parent().parent().parent()!=undefined) fsParent = element.parent().parent().parent().parent();
			if (fsParent!=null) {
				fsParentId = fsParent.attr("id");
				if ((fsParentId=="fs-gas-bill-amount")||(fsParentId=="fs-gas-bill-amount-copy")||(fsParentId=="fs-electricity-bill-amount")||(fsParentId=="fs-electricity-bill-amount-copy")) {
					// removing hasError class
					fsParent.removeClass("hasError");
				}
			}
		}
	});
})