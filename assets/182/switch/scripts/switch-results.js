var ajaxQueue = $({});
var switchResults = {
	//Show/hides the individual filter sets
	filtersShowHide:function() {
		$resultsFilter.find("h3 a").click(function(){
			return false;
		});
	
		$resultsFilter.find("h3").click(function(){
			 var filterOptions = $(this).siblings(".toggle");
			 if (filterOptions.is(':visible')) {
					 filterOptions.hide();
					$(this).addClass("closed");
	         } else {
					 filterOptions.show();
					$(this).removeClass("closed");
	         }
		});
	},
	inputChange:function() {
		
		$resultsFilter.find(":radio").hide().end();//Hide the radio buttons in the filters
		$resultsFilter.find(":radio").parents("label").find("span").wrapInner('<a href="#" class="keyboard-access"></a>');//Adding accessibility links for keyboard only users
		//$resultsFilter.find(".keyboard-access").click(function(){return false;})
		
		$("#online-tarrifs").change(function() {
			if ($(this).is(":checked")) {
				arrFilters["switchableTariffsOnly"] = "TRUE";
			}
			else {
				arrFilters["switchableTariffsOnly"] = "";
			}
			switchResults.ajaxResultsBuilder("filter");//Creates the ajax url and makes the call
		});
		
		//This deals with checkbox changes
		$resultsFilter.find(":checkbox").change(function(){//Add change function to all checkboxes
			
//alert("change check")
			
			if($(this).hasClass("disable-filter")) {//It's a disabler checkbox filter
				
//alert("filterBreadcrumb: 1")				
				switchResults.filterBreadcrumb($selectedLabel);
			}
			else {//It's a normal checkbox filter
				var $selectedLabel = $(this).parent("label"); //Label of changed checkbox
				var $selectedCheckbox = $(this);//Changed checkbox 
				if ($selectedCheckbox.is(":checked")) {
					
					arrFilters[$selectedCheckbox.attr("name")] = "TRUE";
					
					if ($selectedCheckbox.attr("name") == "greenTariffsOnly") {//Green Tariffs is checked
						
						//Sets the slider to 40% and shows it
						$("#green-energy-at-least").val("40%");
						$("#slider-fuel-mix").find("div").attr("style", "width:40%;");
						$("#slider-fuel-mix").find("a").attr("style", "left:40%;");
						$("#fuelMixContainer").show();
						arrFilters["sortOrder"] = "FUEL_MIX_DESC";//Sets the sorter associated to this filter
						fuelMixHeader.children("#which-tariff-fuelmix").attr("class", "desc");
						//Sort the sorters TODO
						$("#which-tariff-satisfaction, #annual").attr("class", "");//Visually resets the sorters
						$("#special-message").remove();//Removes previous message
						$("#current-filters").after('<div id="special-message" class="green-fuel">'+strGreenFuel+'</div>');
						bolFakeCall = true;
						arrFilters["minimumRenewableFuelMix"] = "40";//Sets the default on the renewable fuel
						switchResults.filterBreadcrumb($("#slider-label-green-energy-at-least"));
					}
				}
				else {
					
					arrFilters[$selectedCheckbox.attr("name")] = "";
					
					if ($selectedCheckbox.attr("name") == "greenTariffsOnly") {//If green tariffs is unchecked
						$("#special-message").remove();//Removes previous message
						if (arrFilters["sortOrder"] = "FUEL_MIX_DESC"){//Resets the sorter to default
							arrFilters["sortOrder"] = "";
						}
						$("#fuelMixContainer").hide();//Hides the fuel mix enabler and slider until green tariff is selected
						bolFakeCall = true;
						$("#current-filters .slider-label-green-energy-at-least a").trigger("click");//Remove the fuel % filter from filters applied list
						arrFilters["minimumRenewableFuelMix"] = "";//Sets the default on the renewable fuel
						switchResults.filterBreadcrumb($("#slider-label-green-energy-at-least"));
					}
				}
//alert("filterBreadcrumb 2")
				switchResults.filterBreadcrumb($selectedLabel);
				
			}
			if ($("#current-filters ul li").length == 0){
				$("#current-filters ul").append('<li id="no-filters">No filters selected</li>');
			}
		});		
		
		//This deals with clicking the labels of radio buttons
		$resultsFilter.find(":radio").parent("label").click(function(){//Add click function to all labels	
//alert("change radio")
			
			var $selectedLabel = $(this); //Clicked label 
			
			//If the clicked label is greyed out do nothing
			if ($selectedLabel.is(".disabled")) {return false;}
			
			var $selectedInput = $(this).find("input");//Clicked label 
			var selectedInputName = $selectedInput.attr("name");//Clicked input's name
			var selectedInputValue = $selectedInput.attr("value");//Clicked input's value
		
			//Sibling radio labels to the selected label
			$filteredLabels = $selectedLabel.siblings("label").find("input:radio").parent("label");
			
			// If clicked label has class .selected reset the form labels
			if ($selectedLabel.is(".selected")) {
				switchResults.resetLabels($selectedLabel, $filteredLabels);		
				$("#current-filters li." + $(this).parents("fieldset").attr("id")).remove();
				arrFilters[selectedInputName] = "";//Empty this value from the array
				switchResults.ajaxResultsBuilder("filter");//Creates the ajax url and makes the call
				if ($("#current-filters ul li").length == 0){
					$("#current-filters ul").append('<li id="no-filters">No filters selected</li>');
				}
				return false;
			}
			else {//This is a valid clean label click
				
				if ($filteredLabels.length > 1) {// If there is more than one radio option
						
					$filteredLabels.addClass('disabled').attr('disabled', 'disabled');//Grey out/disable all sibling radio labels
					$selectedLabel.addClass('selected').prepend('<span class="removed">'+removerFilterText+'</span>');//Add .selected class to selected label and append a reset link 
					arrFilters[selectedInputName] = selectedInputValue;//Adds this to the filter array
					
					// Add strike through class to selected labels on hover
					/*$filteredLabels.hover(
						function() {
							if ($(this).is(".disabled")) {
								$(this).addClass("strike");
							}
						}, 	
						function() {
							$(this).removeClass("strike");
						}
					);*/
					
				} 
				switchResults.filterBreadcrumb($selectedLabel);
				return false; 
			}
			if ($("#current-filters ul li").length == 0){
				$("#current-filters ul").append('<li id="no-filters">No filters selected</li>');
			}
		});
	},
	filterBreadcrumb:function(label) {
		
		switchResults.ajaxResultsBuilder("filter");//Creates the ajax url and makes the call
		if ($("#remove-filters a:visible")) {//If the "remove all filters" link is hidden, make it visible
			$("#remove-filters a").show();
		}
		var labelId = label.attr("id");
		
//alert("filterBreadcrumb: "+labelId);
		var labelFor = label.attr("for");
		var $filterId = label.parents("fieldset").attr("id");
		var $filterText = label.text();
		var filterInputType = label.find("input").attr("type");
		var filterCheckedStatus = label.find("input").is(":checked");
		var $filterBreadcrumb = $("#current-filters ul");	
		
		if (labelFor != "fuel-by-percent") {//Fuel by percentage enabler is an exception as it's not logged as a filter
			$("#no-filters").remove();//Remove no filters message
		}
		else {
			return;//Nothing further needs to be done for Fuel by percentage enabler
		}
		
		//Checks if it's a slider label
		if (labelId.match("slider-label-")) {
			var sliderInputValue = $("#"+labelId.replace(/slider-label-/,"")).val();
			$filterBreadcrumb.find("li."+labelId).remove().end()
			.append('<li class="'+labelId+'"><a href="#">'+$filterText+' '+sliderInputValue+'<span class="icon"></span></a></li>');
		}
		
		if (filterInputType == "checkbox") {//Checkbox
			
			var checkboxId = label.find("input").attr("id");
			if (filterCheckedStatus) {//If the checkbox is checked
				$filterBreadcrumb.append('<li class="check-'+checkboxId+'"><a href="#">'+removerFilterText+$filterText+'<span class="icon"></span></a></li>').find("span.removed").remove();
			}
			else {//Checkbox is not checked
				$filterBreadcrumb.find("li.check-" + checkboxId).remove();//Remove from filters
			}
		}
		else if (filterInputType == "radio") {//Radio button
			
			$filterBreadcrumb.find("li."+$filterId).remove().end()
			.append('<li class="'+$filterId +'"><a href="#">'+$filterText+'<span class="icon"></span></a></li>')
			.find("span.removed").remove();
			
			var $breadcrumbClose = $("#current-filters li span");
			
			$breadcrumbClose.click(function() {
				$(this).parent().remove();
				resetLabels (label, $filteredLabels);
	
			});
		}
		switchResults.filterBreadcrumbController();
		
	},
	resultsExpand:function() {
		//This needs to be done via AJAX
		/*$("#results-list table").find(".more-details").hide().end().find(".view-details").live("click", function() {
			var $contractedLinks = $(this).parent("div.contracted-links");
			var $moreDetails = $(this).parents("tr").next("tr.more-details");
			//$("#results-wrapper .more-details").hide();
			//$("#results-wrapper div.contracted-links").show();
			$contractedLinks.hide();
			$moreDetails.show();
			return false;
		});*/

	},
	resultsContract:function() {
		$("#results-list table").find(".hide-details").live("click", function() {
			var $contractedLinks = $("#results-wrapper div.contracted-links");
			var $moreDetails = $(this).parents("tr.more-details");
			$contractedLinks.show();
			$moreDetails.hide();
			return false;
		});
	},
	resetLabels:function ($selectedLabel, $filteredLabels) {
		$selectedLabel.removeClass('selected').find("span.removed").remove(); // Remove class .selected and .removed span
		$filteredLabels.removeClass('disabled').removeAttr('disabled'); // Remove .disabled from siblings to make all labels active again
	},
	resultsShow:function() {
		$("tbody tr").hide().each(function(){
			var t=setTimeout('($(this).show())',1000)
		})
		
		//var t=setTimeout('($("tbody tr").hide().filter(":first").show())',7000)
	},
	//Mag 20090925: Renders the results table rows after the ajax call returns values successful
	renderResults:function (providerUrl, providerName, tariffName, paymentType, annualSavingAsPoundSterlingCurrency, tariffRating, id, chooseThisUrl, highligthClass, rated, situationType, compareToCurrentUrl, moreInformation, fuelMix) {
		
		var rowCSSClass = ""
			
		if (highligthClass != "" && situationType != "") {
			rowCSSClass = ' class="'+highligthClass+' '+situationType+'"';
		}
		else if (highligthClass != "" || situationType != "") {
			rowCSSClass = ' class="'+highligthClass+situationType+'"';
		}
		
		var tableRow = '\t<tr'+rowCSSClass+' id="tr-'+id+'">\n\
	    	\t<th id="id-'+id+'" class="logo"><img src="//www.staticwhich.co.uk'+providerUrl+'" width="115" height="90" alt="'+providerName+'" /></th>\n\
	        \t<td headers="id-'+id+'" class="tariff-name-billing">\n\
	        \t\t<p class="tariff-type">'+tariffName+'</p>\n\
        	\t\t<p class="billing-type">'+paymentType+'</p>';
        	if (situationType != "your-tariff") {
        		tableRow+='\t\t<ul class="contracted-links">\n';
                tableRow+='\t\t\t<li class="rates-info" ><a href="/switch/tariffLabelInformation?id='+id+'&energyType='+arrFilters["energyType"]+'" rel="external">Tariff Information Label</a></li>';
        			if (situationType != "your-tariff" && compareToCurrentUrl != "") {
        				tableRow+='\t\t\t<li><a class="compare-details" href="'+compareToCurrentUrl+'" target="_blank">Compare to current</a></li>';
        			}

        		tableRow+='\t\t\t<li class="rates-info"><a href="viewTariffSavingsSummary?id='+id+'&energyType='+arrFilters["energyType"]+'" target="_blank">Tariff costs and details</a></li>';
        		tableRow+='\t\t</ul>';
        	}
        	tableRow+='\t</td>\n\
            \t<td headers="id-'+id+'" class="annual-saving">'+annualSavingAsPoundSterlingCurrency+'</td>\n\
            \t<td class="tariff-satisfaction">';
            if (rated && (tariffRating >= 0 && tariffRating <= 5)){//If this tariff is rated and it has a rating
            tableRow+='\t\t<img src="//www.staticwhich.co.uk/assets/images/icons/'+tariffRating+'-stars.png" width="67" height="14" alt="'+tariffRating+' Stars" />';
            }
            else{
            tableRow+='&nbsp;'
            }
            // if green tariffs selected then add in extra cell
            if (arrFilters[$("#green-tariffs").attr("name")] != null &&
					arrFilters[$("#green-tariffs").attr("name")] != "") {
	            tableRow+='\t</td>\n\
	            	\t<td headers="id-'+id+'" class="green-energy">';
	            if (fuelMix != null) {
	            	tableRow += '\t\t' + fuelMix + '%';
	            } else {
	            	tableRow += '&nbsp;';
	            }
            }
            tableRow+='\t</td>\n\
            \t<td headers="id-'+id+'" class="choose-this">';
        	if (moreInformation && situationType != "your-tariff") {
    		tableRow+='\t\t<a class="more-information" target="_blank" href="'+chooseThisUrl+'">More information</a>\n\
    		\t\t<span class="change_mind">We are unable to switch you to this tariff</span>';		
            }
        	else if (situationType != "your-tariff") {
            tableRow+='\t\t<a href="'+chooseThisUrl+'" data-trackervalues="'+providerName+': '+tariffName+' '+paymentType+' Tariff" ><img src="//www.staticwhich.co.uk/assets/images/buttons/btn-choose-this-2.png" alt="Choose '+providerName+': '+tariffName+' '+paymentType+' Tariff" /></a>\n\
            \t\t<span class="change_mind">You will confirm your switch on the next screen</span>';
            }
            tableRow+='\t</td>\n\
            </tr>';
		$("#infiniteScrollLoader").remove();//Remove the ajax loading icon	
        $resultsTableBody.append(tableRow);
        loadMoreInfiniteResults = true;
	},
	//Mag 20090918: This function builds the filter parameters that need to go on the ajax call for results
	ajaxResultsBuilderRawCall:function(resultsType) {

//alert("ajaxResultsBuilder is bolFakeCall: "+bolFakeCall+" and resultsType: "+resultsType)
		
		if (bolFakeCall) {
			bolFakeCall = false;
			return;
		}
		
		if (resultsType == "filter") {
			$resultsTableBody.find("tr").remove();//Remove the results if this is a filter rather than infinite scroll
			resultsStartNumber = 0;//Reset the start number to 0 post any increase caused by infinite scroll
			if (xhr && xhr.readyState !== 4) {
				//If there is an unfinished ajax call, cancel it
				xhr.abort();
			}
		}
		
		//Loading icon before the ajax results get written
		var infinitieScrollLoading = '<tr id="infiniteScrollLoader">\n\
			\t<td colspan="5">&nbsp;</td>\n\
			</tr>';
			
		var resultsEndNumber = resultsStartNumber+resultsSize;
		//This is the message if there was a technical problem in the AJAX call
		var errorAJAXResults = '<tr class="error">\n\
			\t<td colspan="5">We are very sorry, but we are having technical difficulties with results '+resultsStartNumber+' to '+resultsEndNumber+'.</td>\n\
			</tr>';
			
		var generalErrorAJAXResults = '<tr class="error">\n\
			\t<td colspan="5">We are very sorry, there are no results available at this time.</td>\n\
			</tr>';
			
		var noResultsAJAXResults = '<tr class="error">\n\
			\t<td colspan="5">We have not found a way to save you money&hellip;</td>\n\
			</tr>';
	
		var errorSessionTimeout = '<tr class="error">\n\
			\t<td colspan="5">We are very sorry, your session has timed out. Please <a href="\/switch\/">start your search again</a></td>\n\
			</tr>';
		
		var errorUnexpectedException = '<tr class="error">\n\
			\t<td colspan="5">We are very sorry, we seem to be having a problem getting your results at the moment. Please try again later.</td>\n\
			</tr>';
			
		if(!$("#infiniteScrollLoader").length){
			$resultsTableBody.append(infinitieScrollLoading);
		}
		
		var filterResultsAjaxURL = "/switch/service/results/basic?startNumber="+resultsStartNumber+"&resultSize="+resultsSize;
		bolResultsReturned = true;
				
		for (i in arrFilters) { 
			if (arrFilters[i] != "") {
				filterResultsAjaxURL+="&"+i+"="+arrFilters[i];
			}
		}
		
		//$("h1").text(filterResultsAjaxURL);
		
		//filterResultsAjaxURL = "//www.staticwhich.co.uk/assets/5.9.4-SNAPSHOT/scripts/json-results.js"
		//filterResultsAjaxURL = "//www.staticwhich.co.uk/assets/5.9.4-SNAPSHOT/scripts/error.js"
		
		//Makes the AJAX call
		xhr = $.ajax({
			type: "GET",
			url: filterResultsAjaxURL,
			dataType: "json",
			error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (textStatus === "timeout") {
					whichAjax.ajaxSessionTimeout();
                }
			},
			success: function(data){
				
				whichAjax.ajaxHandleError(data);
				 
				var paymentType = "";
				var providerName = "";
				var providerUrl = ""
				var tariffName = "";
				var tariffRating = "";
				var situationType = "";
				var annualSavingAsPoundSterlingCurrency = "";
				var id = "";
				var chooseThisUrl = "";
				var highligthClass = "highlight";
				var situationType = "";
				var compareToCurrentUrl = "";
				maximumSavingAsCurrency = "";
				var moreInformation = false;
				
				if (data.error != undefined) {
					if (data.error.errorCode != undefined) {
						if (data.error.errorCode == 1000) { // If unexpected execption error message returned
							failedAjaxAttempts ++; // Increase retry counter by one
							if (failedAjaxAttempts < 3) { // If less than two attempts then try again
								switchResults.ajaxResultsBuilder();
							} 
							else { // If retried twice
								failedAjaxAttempts = 0; // reset counter
								$resultsTableBody.html(errorUnexpectedException); // Write error message to page
							};
							return;
						}
					}
				}
				
				if ((arrFilters[$("#green-tariffs").attr("name")] != null &&
						arrFilters[$("#green-tariffs").attr("name")] != "") && 
						!fuelMixAttached) {
					fuelMixAttached = true;
					fuelMixHeader.insertBefore('#results-table thead tr th.last');
					fuelMixHeader.children('#which-tariff-fuelmix').click(switchResults.tableSortersClick);
				} else if ((arrFilters[$("#green-tariffs").attr("name")] == null ||
						arrFilters[$("#green-tariffs").attr("name")] == "") && 
						fuelMixHeader.parent().length > 0){
					fuelMixHeader.remove();
					fuelMixAttached = false;
				}
				
				if (data.tariffResults == undefined) {//No AJAX results returned - technical error on AJAX response
					which.ajaxLogReporter("The tariffResults JSON node in undefined", filterResultsAjaxURL)
					bolResultsReturned = false;
				}
				else {
					//Number of tariff results
					if (data.tariffResults.maxResults == undefined) {
//alert("data.tariffResults.maxResults == undefined")
						which.ajaxLogReporter("The data.tariffResults.maxResults JSON node in undefined", filterResultsAjaxURL)
					}
					else {
						maxResults = data.tariffResults.maxResults;//This is all the results
						maxPositiveResults = data.tariffResults.maxPositiveResults;//The is the number of results that save you money
						$("#tariff-count").text(maxPositiveResults);
						$("#results-false").remove();
						if (maxPositiveResults == 0) {
							$("#results-true").hide();
							if ($("#results-false").length === 0) {
								$("#content").find("h1").append('<span id="results-false">We have not found a way to save you money...</span>');
							}
						}
						else {
							$("#results-true").show();
						}
					}
					//Maximum saving
					if (data.tariffResults.maximumSavingAsCurrency == undefined) {
//alert("data.tariffResults.maximumSavingAsCurrency == undefined")
						which.ajaxLogReporter("The data.tariffResults.maximumSavingAsCurrency JSON node in undefined", filterResultsAjaxURL)
					}
					else {
						maximumSavingAsCurrency = data.tariffResults.maximumSavingAsCurrency;
						$("#tariff-max-saving").text(maximumSavingAsCurrency);
//alert("maximumSavingAsCurrency = "+maximumSavingAsCurrency)
					}
					//Show the h1 & intro paragraph if all the values are available
					if (!$("h1").is(":visible")) {
						if ((maxResults > 0) && (maxResults != "undefined") && (maximumSavingAsCurrency != "") && (maximumSavingAsCurrency != "undefined")){
							$("h1, #intro").show();
						}
					}
					if (data.tariffResults.results == undefined) {//No AJAX results returned as none exist
						which.ajaxLogReporter("The tariffResults.results JSON node in undefined", filterResultsAjaxURL)
						bolResultsReturned = false;
					}
					else {
						if (data.tariffResults.results.length == 0) {//There are no results
							bolResultsReturned = false;
						}
				 		$.each(data.tariffResults.results, function(i,tariff){
							if (tariff.details == undefined) {
								which.ajaxLogReporter("The data.tariffResults.results["+i+"].details JSON node in undefined", filterResultsAjaxURL)
								bolResultsReturned = false;
							}
							else {
								//Provider's logo
								if (tariff.details.providerUrl == undefined) {
//alert("data.tariffResults.results["+1+"].details.providerUrl == undefined")
									which.ajaxLogReporter("The data.tariffResults.results["+i+"].details.providerUrl JSON node in undefined", filterResultsAjaxURL)
									providerUrl = "";
								}
								else {
									providerUrl = tariff.details.providerUrl;
//alert("providerUrl = "+providerUrl)
								}
								//Provider Name
								if (tariff.details.providerName == undefined) {
//alert("data.tariffResults.results["+i+"].details.providerName == undefined")
									which.ajaxLogReporter("The data.tariffResults.results["+i+"].providerName JSON node in undefined", filterResultsAjaxURL)
									providerName = "";
								}
								else {
									providerName = tariff.details.providerName;
//alert("providerName = "+providerName)
								}
								//Tariff Name
								if (tariff.details.tariffName == undefined) {
//alert("data.tariffResults.results["+i+"].details.tariffName == undefined")
									which.ajaxLogReporter("The data.tariffResults.results["+i+"].tariffName JSON node in undefined", filterResultsAjaxURL)
									tariffName = "";
								}
								else {
									tariffName = tariff.details.tariffName;
//alert("tariffName = "+tariffName)
								}
								//Payment Type
								if (tariff.details.paymentType == undefined) {
//alert("data.tariffResults.results["+i+"].details.paymentType == undefined")
									which.ajaxLogReporter("The data.tariffResults.results["+i+"].paymentType JSON node in undefined", filterResultsAjaxURL)
									paymentType = "";
								}
								else {
									paymentType = tariff.details.paymentType;
//alert("paymentType = "+paymentType)
								}
								//Annual Saving
								if (tariff.annualSavingAsPoundSterlingCurrency == undefined) {
//alert("data.tariffResults.results["+i+"].annualSavingAsPoundSterlingCurrency == undefined")
									which.ajaxLogReporter("The data.tariffResults.results["+i+"].annualSavingAsPoundSterlingCurrency JSON node in undefined", filterResultsAjaxURL)
									annualSavingAsPoundSterlingCurrency = "";
								}
								else {
									annualSavingAsPoundSterlingCurrency = tariff.annualSavingAsPoundSterlingCurrency;
//alert("annualSavingAsPoundSterlingCurrency = "+annualSavingAsPoundSterlingCurrency)
								}
								//Tariff Rated
								if (tariff.details.rated == undefined) {
//alert("data.tariffResults.results["+i+"].details.rated == undefined")
									which.ajaxLogReporter("The data.tariffResults.results["+i+"].details.rated JSON node in undefined", filterResultsAjaxURL)
									rated = false;
									tariffRating = ""
								}
								else {
									rated = tariff.details.rated;
									
									if (rated) {
										//Tariff Rating
										if (tariff.details.tariffRating == undefined) {
//alert("data.tariffResults.results["+i+"].tariffRating == undefined")
											which.ajaxLogReporter("The data.tariffResults.results["+i+"].tariffRating JSON node in undefined", filterResultsAjaxURL)
											tariffRating = "";
										}
										else {
											tariffRating = tariff.details.tariffRating;
										}
									}
									else {tariffRating = "";}
//alert("rated = "+rated+" tariffRating "+tariffRating);
								}
								//Id for this tariff
								if (tariff.id == undefined) {
//alert("data.tariffResults.results["+i+"].id  == undefined")
									which.ajaxLogReporter("The data.tariffResults.results["+i+"].id JSON node in undefined", filterResultsAjaxURL)
									id = "";
								}
								else {
									id = tariff.id;
//alert("id = "+id)
								}
								//Choose This Url
								if (tariff.chooseThisUrl == undefined) {
//alert("data.tariffResults.results["+i+"].chooseThisUrl == undefined")
									which.ajaxLogReporter("The data.tariffResults.results["+i+"].chooseThisUrl JSON node in undefined", filterResultsAjaxURL)
									chooseThisUrl = "";
								}
								else {
									chooseThisUrl = tariff.chooseThisUrl;
//alert("chooseThisUrl = "+chooseThisUrl)
								}
								//Compare This Url
								if (tariff.compareToCurrentUrl == undefined) {
//alert("data.tariffResults.results["+i+"].compareToCurrentUrl == undefined")
									which.ajaxLogReporter("The data.tariffResults.results["+i+"].compareToCurrentUrl JSON node in undefined", filterResultsAjaxURL)
									compareToCurrentUrl = "";
								}
								else {
									compareToCurrentUrl = tariff.compareToCurrentUrl;
//alert("compareToCurrentUrl = "+compareToCurrentUrl)
								}
								//More information
								if (tariff.moreInformation == undefined) {
//alert("data.tariffResults.results["+i+"].moreInformation == undefined")
									which.ajaxLogReporter("The data.tariffResults.results["+i+"].moreInformation JSON node in undefined", filterResultsAjaxURL)
								}
								else {
									moreInformation = tariff.moreInformation;
//alert("moreInformation = "+moreInformation)
								}
								//Situation Type - better, worse or current
								if (tariff.situationType == undefined) {
//alert("data.tariffResults.results["+i+"].situationType == undefined")
									which.ajaxLogReporter("The data.tariffResults.results["+i+"].situationType JSON node in undefined", filterResultsAjaxURL)
									situationType = "";
								}
								else {
									situationType = tariff.situationType;
//alert("situationType = "+situationType)
									//Sets the css class baseed on situation type
									switch (situationType) {
										case "BETTER": 
											situationType = ""
											break;
										case "WORSE": 
											situationType = "worse-tariff"
											break;
										case "CURRENT":
											situationType = "your-tariff"
											break;
									}
								}
								
								if (arrFilters[$("#green-tariffs").attr("name")] != null &&
										arrFilters[$("#green-tariffs").attr("name")] != "") {
									var fuelMix = tariff.details.renewableFuelMixPercentage;
								} else {
									fuelMix = null;
								}
								
								if (bolResultsReturned) {//If there are results, render them
									switchResults.renderResults(providerUrl, providerName, tariffName, paymentType, annualSavingAsPoundSterlingCurrency, tariffRating, id, chooseThisUrl, highligthClass, rated, situationType, compareToCurrentUrl, moreInformation, fuelMix);
								}
								else {//Remove the loading icon
									$("#infiniteScrollLoader").remove();//Remove the ajax loading icon	
								}
								
					 			//Sort out the css highlight class
					 			if (highligthClass == "highlight") {
					 				highligthClass = "";//Don't use highlight class
					 			}
					 			else {
					 				highligthClass = "highlight";//Use highlight class
					 			}
							}
				 		});
					}
				}
				if (!bolResultsReturned) {
				
					$("#infiniteScrollLoader").remove();
					$("tr.error").remove();
					if (maxResults == 0) {
						$resultsTableBody.append(noResultsAJAXResults);
					} else {
						$resultsTableBody.append(generalErrorAJAXResults);
					}
					
					resultsStartNumber+=resultsSize;//Increase the start result position
					if (maxResults > resultsStartNumber){//Prevents unnecessary AJAX requests
						switchResults.ajaxResultsBuilder("error");
					}
				}
			 }
        });
		if (bolResultsReturned && resultsType == "filter") {$resultsTableBody.fadeIn("slow");}//Show the results
	},
	ajaxResultsBuilder:function(resultsType) {
        ajaxQueue.queue(switchResults.ajaxResultsBuilderRawCall(resultsType));
    },
	//Deal with the page if it loads with preselected values in the filters
	initialiseFilters:function() {
		
		//Sorts out radios and checkboxes
		$filterSets.find("input:checked").each(function(i,n){
			if($(this).attr("value") != "ALL" && $(this).attr("value") != ""){//If they are not the non-js default checked radios
				if ($(this).attr("type")=="checkbox"){
					$(this).trigger("change");
				}	
				else if ($(this).attr("type")=="radio"){
					$(this).parent("label").trigger("click");
				}
				/*else if ($(this).attr("type")=="text"){
alert("Test");
				}*/
			}
			
		});
	},
	//Adds functionality to the click of the filter breadcrumbs to control the deletion of filters on click
	filterBreadcrumbController:function() {
		
		$("#current-filters ul li").click(function (){	
//alert("filterBreadcrumbController")			
			
			if($(this).attr("id") == "no-filters"){return}//Don't do anything for the no filters message
			
			var currentFilter = $(this).attr("class");

			if (currentFilter.match("check-")) {//This is a checkbox filter
				currentFilter = currentFilter.replace(/check-/,"");
				//The trigger click alone doesn't kick off the on click function, so calling it explicitly
				$("#"+currentFilter).trigger("click");
				arrFilters[$("#"+currentFilter).attr("name")]="";
				
				//Green tariffs behave non standardly as are filter/sorters
				if(currentFilter == "green-tariffs") {//If green tariff is unchecked
					$("#fuelMixContainer").hide()//Hides the fuel mix section of green tariffs
					$("#special-message").remove()//Removes the special message
					arrFilters["fuelPercentage"] = "";//Sets value for AJAX call
					arrFilters["greenTariffsOnly"] = "";
					bolFakeCall = true;
					$("#current-filters .slider-label-green-energy-at-least").trigger("click");
					arrFilters["minimumRenewableFuelMix"] = "";//Sets the default on the renewable fuel
					if (!$("#annual").hasClass("desc")){//If it's not sorted by savings descending
						bolFakeCall = true;
						$("#annual").trigger("click");//Trigger a click on the sorter for saving descending
					}
				}
				
				switchResults.ajaxResultsBuilder("filter");
				
			}
			else if (currentFilter.match("slider-")) {//This is a slider filter
				
				//Green tariffs & fuel mix slider behave non standardly as are filter/sorters
				if(currentFilter == "slider-label-green-energy-at-least") {//If fuel percentage slider is unfiltered
					arrFilters["fuelPercentage"] = "";//Sets value for AJAX call
					//Sets the slider to 0%
					$("#green-energy-at-least").val("0%");
					$("#slider-fuel-mix").find("div").attr("style", "width:0%;");
					$("#slider-fuel-mix").find("a").attr("style", "left:0%;");
					if (!$("#annual").hasClass("asc")){//If it's not sorted by savings descending
						bolFakeCall = true;
						$("#annual").trigger("click");//Trigger a click on the sorter for saving descending
					}
				}
				
				arrFilters[$("#"+currentFilter.replace(/slider-label-/,"")).attr("name")]="";
				switchResults.ajaxResultsBuilder("filter");
			}
			else {
//alert("else")				
				$("#"+currentFilter+" .selected").trigger("click");
			}
			
			$(this).remove();//Removes this filter from the breadcrumbs
			
			if ($("#current-filters ul li").length == 0){
				$("#current-filters ul").append('<li id="no-filters">No filters selected</li>');
				$("#remove-filters a").hide();//Hide the "remove all filters" link if there are no more filters left
			}
		})
		
	},
	//Resets the filters to default on clicking the reset filter link
	removeFilters:function() {
		
		$removeFilters = $("#remove-filters a");
		$removeFilters.click(function() {
			$removeFilters.hide();//Hide the "remove all filters" link if there are no more filters left
			if ($("#current-filters li#no-filters").is("visible")) {return false}
			$("#current-filters li").remove();	
			$("#current-filters ul").append('<li id="no-filters">No filters selected</li>');	
			$filterSets.find("input:checkbox").removeAttr("checked");//Uncheck all checkboxes
			$filterSets.find("input.disable-filter:checkbox").attr("checked", "checked");//Check all disable filter checkboxes
			$filterSets.find("label.selected input:radio").trigger("click");//Reset the radio buttons
			
			//Empty the filter array
			for (i in arrFilters) {
				if ((i != "energyType") && (i != "switchableTariffsOnly")) {//Don't delete the tab filter
					arrFilters[i]="";
				}
			}
			switchResults.ajaxResultsBuilder("filter");//Make new Ajax call for results with no filters
			
			return false;
			
		});
		
	},
	tabFilterController: function() {
		$("#inpage-nav a").click(function() {
			$("#inpage-nav li.on").removeClass("on");//Removes on state from previous one
			$(this).parents("li").addClass("on");//Adds on state from current selected tab
			arrFilters["energyType"]=$(this).attr("id");
			switchResults.ajaxResultsBuilder("filter");//Make new Ajax call for results
			return false;
		});
	},
	initialiseResults:function() {
		$("h1, #intro").hide();//Hide until ready
		$("#remove-filters a").hide();//Hide "remove all filters" until there is a filter applied
		
		if ($.browser.msie) {//IE fix for on change handling (http://stackoverflow.com/questions/208471/getting-jquery-to-recognise-change-in-ie)
	        $("input:radio, input:checkbox").click(function () {
	            this.blur();
	            this.focus();
	        });
	    }
		
		switchResults.ajaxResultsBuilder();
		switchResults.removeFilters();
		switchResults.tabFilterController();
		switchResults.filtersShowHide();
		switchResults.inputChange();
		switchResults.sliderFilter("#slider-customer-satisfaction", "#customer-rating-at-least");//Sets the slider for customer satisfaction rating
		switchResults.sliderFilter("#slider-fuel-mix", "#green-energy-at-least");//Sets the slider for green energy mix
		switchResults.initialiseFilters();
		switchResults.tableResultsSorter();
		$(window).scroll(function(){
			if (($(document).height() - $(window).height()) - $(window).scrollTop() < 300){
				switchResults.infiniteScrollResults();
			}
		});
		switchResults.viewTariffDetails();
	},
	tableSortersClick: function() {
		$("#special-message").remove();//Removes previous message for special filter/sorter exceptions 
		$tableSorters.attr("class", "");//Remove the current arrows
		$tableSorters.find("span").text("");//Remove the current accessibility text
		
		var currentSorter = arrFilters["sortOrder"];
		var tableSortersId = $(this).attr("id");
		var ascText = " : ascending";
		var descText = " : descending";
		
		switch(tableSortersId) {
			case "annual":
				if (currentSorter == "SAVINGS_ASC") {
					arrFilters["sortOrder"] = "SAVINGS_DESC";
					$(this).attr("class", "desc");
					$(this).find("span").text(descText);
				}	
				else if (currentSorter == "SAVINGS_DESC") {
					arrFilters["sortOrder"] = "SAVINGS_ASC";
					$(this).attr("class", "asc");
					$(this).find("span").text(ascText);
				}
				else {
					arrFilters["sortOrder"] = "SAVINGS_DESC";
					$(this).attr("class", "desc");
					$(this).find("span").text(descText);
				}
				break;
			case "which-tariff-satisfaction":
				if (currentSorter == "RATING_DESC") {
					arrFilters["sortOrder"] = "RATING_ASC";
					$(this).attr("class", "asc");
					$(this).find("span").text(ascText);
				}	
				else if (currentSorter == "RATING_ASC") {
					arrFilters["sortOrder"] = "RATING_DESC";
					$(this).attr("class", "desc");
					$(this).find("span").text(descText);
				}
				else {
					arrFilters["sortOrder"] = "RATING_DESC";
					$(this).attr("class", "desc");
					$(this).find("span").text(descText);
				}
				break;
			case "which-tariff-fuelmix":
				if (currentSorter == "FUEL_MIX_DESC") {
					arrFilters["sortOrder"] = "FUEL_MIX_ASC";
					$(this).attr("class", "asc");
					$(this).find("span").text(ascText);
				}	
				else {
					arrFilters["sortOrder"] = "FUEL_MIX_DESC";
					$(this).attr("class", "desc");
					$(this).find("span").text(descText);
				}
				break;
			default:
				break;
		}
		switchResults.ajaxResultsBuilder("filter");//Make new Ajax call for new sorted results
		return false;
	},
	tableResultsSorter:function (){
		$tableSorters = $("#which-tariff-satisfaction, #annual");
		$tableSorters.push(fuelMixHeader.children('#which-tariff-fuelmix')[0]);
		arrFilters["sortOrder"]="SAVINGS_DESC";//Default value on page load
		$tableSorters.click(switchResults.tableSortersClick);
	},
	sliderFilter:function (sliderContainer, sliderInput){
		
//alert("slider")		
		
		$(sliderInput).css("disabled","disabled").css("border","0").css("color","#000").end();//Makes the input look like a not-input
		
		sliderValue = 0;//Default value
		
		//Finds if the sliders input has a value and initialises slider with that value
		if($(sliderInput).attr("value") > 0){
			sliderValue = $(sliderInput).attr("value");
		}
		
		$(sliderContainer).slider({//Initialises the slider
			range: "min",
			value: sliderValue,
			min: 0,
			max: 100,
			slide: function(event, ui) {
				$(sliderInput).val(ui.value+"%");
			},
			stop: function(event, ui) {
				arrFilters[$(sliderInput).attr("name")] = $(sliderInput).val().replace(/%/,"");
				switchResults.filterBreadcrumb($("#slider-label-"+$(sliderInput).attr("id")));
			}
		});
		
		
		/*sliderFieldsetId = $(sliderInput).parents("fieldset").attr("id");
		
		$("#"+sliderFieldsetId+" .ui-slider-handle").click(function() {//When you are done sliding
			arrFilters[$(sliderInput).attr("name")] = $(sliderInput).val().replace(/%/,"");
			switchResults.filterBreadcrumb($("#slider-label-"+$(sliderInput).attr("id")));
			
		});*/
		
	},
	//Deals with infinite scrolling of results
	infiniteScrollResults:function () {
		if (loadMoreInfiniteResults) {
			resultsStartNumber+=resultsSize;//Increase the start result position
			if (maxResults > resultsStartNumber && loadMoreInfiniteResults){//Prevents unnecessary AJAX requests
				switchResults.ajaxResultsBuilder();
				loadMoreInfiniteResults = false;
			}
		}
	},
	//Renders the returned Ajax tariff details
	renderTariffDetails:function (rating, rated, arrNotes, estimatedMonthlyBillAsCurrency, id, tariffInformationUrl, compareToCurrentUrl, resultType) {
		
		var highlightClass = "";
		
		if (bolDetailsHighlightCurrent){highlightClass = " your-tariff"}
		else {
			if (bolDetailsHighlight){highlightClass = " highlight"}
			if (bolDetailsHighlightWorse){highlightClass += " worse-tariff"}
		}
		
		var tariffDetailsDiv = '<tr id="more-'+id+'" class="more-details'+highlightClass+'" style="display:none;">\n\
			\t<td></td>\n\
		    \t<td colspan="4" headers="id-'+id+'">';
			
		tariffDetailsDiv+='\t\t<p class="highlight">New estimated monthly bill: <strong>&pound;'+estimatedMonthlyBillAsCurrency+'</strong></p>\n';
		if(rated && rating != "") {
			tariffDetailsDiv+='\t\t<p>Customer satisfaction rating: <strong>'+rating+'%</strong></p>\n';
		}
		if(arrNotes.length>0){//If there are notes
			tariffDetailsDiv+='\t\t<ul class="notes">\n'
			//Get all the notes out
			for (i in arrNotes) {
				tariffDetailsDiv+='\t\t\t<li>'+arrNotes[i]+'</li>\n';
			}
			tariffDetailsDiv+='\t\t</ul>\n';
		}			
		
		tariffDetailsDiv+='\t\t<ul class="expanded-links">\n\
		\t\t\t<li><a href="" class="less-details">Hide details</a></li>';
		if (compareToCurrentUrl != ""){
			tariffDetailsDiv+='\t\t\t<li><a href="'+compareToCurrentUrl+'" target="_blank">Compare to current situation</a></li>';
		}
		if (tariffInformationUrl != ""){
			tariffDetailsDiv+='\t\t\t<li class="rates-info"><a href="'+tariffInformationUrl+'" target="_blank">Tariff information</a></li>';
		}
		tariffDetailsDiv+='\t\t</ul>';
		tariffDetailsDiv+='\t</td>\n\
        </tr>';
		$("#id-"+id).parents("tr").after(tariffDetailsDiv).fadeIn("slow");
		$("#more-"+id).fadeIn("slow");
			
	},
	//Gets & validates the ajax results for the tariff details
	ajaxTariffDetailsBuilder:function(tariffDetailsAjaxURL, currentTariffId) {
		
		var id = "";
		var rating = "";
		var rated = "";
		var estimatedMonthlyBillAsCurrency = "";
		var arrNotes = new Array();
		var bolDetailsReturned = true;
		var tariffInformationUrl = "";
		var compareToCurrentUrl = "";
		var resultType = "success"
		
		//tariffDetailsAjaxURL = "//www.staticwhich.co.uk/assets/5.9.4-SNAPSHOT/scripts/json-details.js";
		
		//Makes the AJAX call
		$.ajax({

			type: "GET",
			url: tariffDetailsAjaxURL,
			dataType: "json",
			error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (textStatus === "timeout") {
					whichAjax.ajaxSessionTimeout();
                }
			},
			success: function(data){
				
				whichAjax.ajaxHandleError(data);

				if (data.tariffResult == undefined) {//No AJAX results returned - technical error on AJAX response
					which.ajaxLogReporter("The tariffResult JSON node in undefined", tariffDetailsAjaxURL)
					bolDetailsReturned = false;
					
				}
				else {
					//Id of this tariff
					if (data.tariffResult.id == undefined) {//If id isn't set don't do anything
						which.ajaxLogReporter("The tariffResult.id JSON node in undefined", tariffDetailsAjaxURL)
					}
					else {
						id = data.tariffResult.id;
						
						//Monthly estimate
						if (data.tariffResult.estimatedMonthlyBillAsCurrency == undefined) {
							which.ajaxLogReporter("The tariffResult.estimatedMonthlyBillAsCurrency JSON node in undefined", tariffDetailsAjaxURL)
						}
						else {
							estimatedMonthlyBillAsCurrency = data.tariffResult.estimatedMonthlyBillAsCurrency;
						}
						//Tariff Information Link
						if (data.tariffResult.tariffInformationUrl == undefined) {
							which.ajaxLogReporter("The tariffResult.tariffInformationUrl JSON node in undefined", tariffDetailsAjaxURL)
						}
						else {
							tariffInformationUrl = data.tariffResult.tariffInformationUrl;
						}
						//Compare to current url
						if (data.tariffResult.compareToCurrentUrl == undefined) {
							which.ajaxLogReporter("The tariffResult.compareToCurrentUrl JSON node in undefined", tariffDetailsAjaxURL)
						}
						else {
							compareToCurrentUrl = data.tariffResult.compareToCurrentUrl;
						}
						//Extended details for tariff
						if (data.tariffResult.extendedDetails == undefined) {
							which.ajaxLogReporter("The tariffResult.extendedDetails JSON node in undefined", tariffDetailsAjaxURL)
						}
						else {
							//Notes on tariff
							if (!(data.tariffResult.extendedDetails.notes  == undefined)) {
								$.each(data.tariffResult.extendedDetails.notes, function(i,notes){//Loops through notes
									//Tariff note
									if (notes.note == undefined) {
										which.ajaxLogReporter("The data.tariffResult.extendedDetails.notes["+i+"].note JSON node in undefined", tariffDetailsAjaxURL)
									}
									else {
										arrNotes[i] = notes.note;
									}
								});
							}
							if (data.tariffResult.extendedDetails.provider == undefined) {
								which.ajaxLogReporter("The tariffResult.extendedDetails.provider JSON node in undefined", tariffDetailsAjaxURL)
							}
							else {
								//Rated needs to be true for rating to be used
								if (data.tariffResult.extendedDetails.provider.rated == undefined) {
									which.ajaxLogReporter("The tariffResult.extendedDetails.provider.rated JSON node in undefined", tariffDetailsAjaxURL)
								}
								else {
									rated = data.tariffResult.extendedDetails.provider.rated;
									//Rated is true
									if (data.tariffResult.extendedDetails.provider.rating == undefined) {
										which.ajaxLogReporter("The tariffResult.extendedDetails.provider.rating JSON node in undefined", tariffDetailsAjaxURL)
									}
									else {
										rating = data.tariffResult.extendedDetails.provider.rating;
									}
								}
							}
						}
					}
				}
				if (bolDetailsReturned) {switchResults.renderTariffDetails(rating, rated, arrNotes, estimatedMonthlyBillAsCurrency, id, tariffInformationUrl, compareToCurrentUrl, resultType);}//Render the tariff details
			}
		});
		
	},
	//Deals with the view details of a specific tariff
	viewTariffDetails:function () {
		
		var strAjaxViewDetailsBase = "/switch/service/results/detail?id=";
		bolDetailsHighlight = false;
		bolDetailsHighlightCurrent = false;
		bolDetailsHighlightWorse = false;
		
		$("#results-table a.view-details").each(function(){//Changes the links to be js/ajax (by default they are non js links)
			var tariffDetailsId = $(this).parents("td").attr("headers").replace(/id-/,"");
			$(this).attr("href",strAjaxViewDetailsBase+tariffDetailsId)
		});
		
		//Deals with all clicks on view details links of a tariff
		$("#results-table a.view-details").live("click", function(){
			
			bolDetailsHighlight = $(this).parents("tr").hasClass("highlight");
			bolDetailsHighlightCurrent = $(this).parents("tr").hasClass("your-tariff");
			bolDetailsHighlightWorse = $(this).parents("tr").hasClass("worse-tariff");
			
			var currentTariffId = $(this).attr("href").replace(strAjaxViewDetailsBase, "");///Get the id of the tariff
			
			if ($("#more-"+currentTariffId).length){//Show it if the view details div is already in the page to save an ajax call
				$("#more-"+currentTariffId).fadeIn("slow");
			}
			else {//Make the ajax call
				switchResults.ajaxTariffDetailsBuilder($(this).attr("href"), currentTariffId);
			}
			$(this).parents(".contracted-links").fadeOut("slow");
			//$("h1").text($(this).attr("href"));
			return false;
			
		});
		
		//Deals with all clicks on hide details links of a tariff
		$("#results-table tr.more-details a.less-details").live("click", function(){
			$(this).parents("tr").fadeOut("slow");
			$(this).parents("tr").prev("tr").find("ul.contracted-links").fadeIn("slow");//Show the view the links
			return false;
			
		});
		
	},
	infoPopup:function() {
		
		var $infoLink = $("#results-list li.rates-info a"); // Info popup launching links

		// create info popup div and set dimensions
		var $infoPopup = $('<div class="inner"></div>')
		.dialog({
			autoOpen: false,
			title: '',
			dialogClass: 'info-popup',
			closeText: 'X',
			width:300,
			maxWidth:300,
			modal:false,
			resizable:false
		});

		// Launching help popup
		$infoLink.live('click', function() {
			var link = $(this); // Clicked link
			var infoUrl = $(link).attr("href")+" #tariff-info"
			// Get the position of the anchor - the popup will be positioned relative to this
			var link_top = ((link.position().top) - 100); // Distance from top of parent to top of link
			var link_left = ((link.position().left) + 300); // Distance of link from left of parent

			// Insert content from tariff info page into popup and position it
			$infoPopup.load(infoUrl, function(response, status, xhr) {
				if (status == "error" || response.search('id="tariff-info"') == -1) {
					$infoPopup.html("<p>We are very sorry, we are having trouble getting these details for you. Please try again later  or <a href='/switch/'>start your search again</a></p>").dialog('open').parents("div.info-popup").css({ left: link_left, top: link_top }) ;
				} else {
					$infoPopup.load(infoUrl).dialog('open').parents("div.info-popup").css({ left: link_left, top: link_top });
				}
			});
			
			return false;
		});

		//$('#page').click(function() { $infoPopup.dialog("close"); });

	}
}
$(document).ready(function() {
	
	//if ($.browser.msie && $.browser.version <= 6 ) {bolAjaxOn=false;}//Forcing IE6 users to get a different version
	
	$("body").addClass("js-on");
	$("#fuelMixContainer").hide();//Hides the fuel mix sliders/inputs
	
	if(bolAjaxOn) {//If Ajax is on (required ajax.js)
		
		//Global variables for this page
		xhr = null;
		fuelMixHeader = $('<th scope="col"><a id="which-tariff-fuelmix" href="#">Fuel Mix</a></th>');
		fuelMixAttached = false;
		bolFakeCall = false;//Sometimes the process is kicked off but do no want AJAX call to be made
		loadMoreInfiniteResults = true;
		arrFilters = new Array();//Store the js filter string for the ajax calls
		arrFilters["energyType"] = tabEnergyType;//This is a result page variable
		failedAjaxAttempts = 0; // Number of unexpected exceptions returned by ajax
		removerFilterText = 'Remove filter: ';
		$resultsFilter = $("#results-filter");
		$filterSets = $("#results-filter fieldset");	
		$resultsTableBody = $("#results-table tbody");
		resultsStartNumber = 0;//Position to start results at
		resultsSize = 10;//How many results to return in an Ajax call
		maxResults = 0;//Total number of results returned
		switchResults.initialiseResults();
		
		// collapse the filters by default (js)
		$resultsFilter.find("h3").each(function(){
			var filterOptions = $(this).siblings(".toggle");
			filterOptions.hide();
			$(this).addClass("closed");
		});
	}
	else {
		$("#results-filter .js-hide").removeClass("js-hide").attr("style", "");
	}
});
