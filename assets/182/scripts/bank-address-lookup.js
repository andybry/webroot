var BANKLOOKUP={};BANKLOOKUP={bankAddressClearWarning:function(){$("#bankPostalAddress p.warning").remove()},bankAddressLookupFailure:function(b){var a;BANKLOOKUP.bankAddressClearWarning();if(b==="ajaxError"){a="Sorry, the remote lookup cannot be used at this time."}else{a="Sorry, no bank address details were found. Please check your sort code and account number."}$('<p class="warning">'+a+"</p>").insertAfter("#bankPostalAddress h4")},removeCommas:function(a){a=a.replace(/, ,/g,",");a=a.replace(/, </g,"<");return a},insertBankAddress:function(b){if(b.address&&b.address.addressLines){var h=b.address.addressLines,c=BANKLOOKUP.getAddressLineDetails(h,"bankName","").substring(0,31),g=BANKLOOKUP.getAddressLineDetails(h,"addressLine_1","").substring(0,27),e=BANKLOOKUP.getAddressLineDetails(h,"addressLine_2","").substring(0,31),d=BANKLOOKUP.getAddressLineDetails(h,"addressLine_3","").substring(0,31),f=BANKLOOKUP.getAddressLineDetails(h,"townCity","").substring(0,31),a=BANKLOOKUP.getAddressLineDetails(h,"postCode","");e+=d+f;e=BANKLOOKUP.removeCommas(e);$("#ddPreviewBankName").text(c);$("#ddPreviewBankAddress1").text(g);$("#ddPreviewBankAddress2").text(e);$("#ddPreviewBankPostCode").text(a);$("#ddPreviewBankNameField").attr("value",c);$("#ddPreviewBankAddress1Field").attr("value",g);$("#ddPreviewBankAddress2Field").attr("value",e);$("#ddPreviewBankPostCodeField").attr("value",a)}else{BANKLOOKUP.bankAddressLookupFailure("noResults")}},getBankAddress:function(b,a){$.ajax({type:"POST",url:"/address/bank-address/branch-lookup/",data:"sortCode="+b+"&accountNumber="+a.value,dataType:"json",success:function(c){BANKLOOKUP.insertBankAddress(c)},error:function(){BANKLOOKUP.bankAddressLookupFailure("ajaxError")}})},getAddressLineDetails:function(f,e,a){var g,c=a,b,d;if(f&&e){if($.isArray(f)){for(b=0;b<f.length;b+=1){g=f[b];d=g.lineType;if(d===e){c=g.details;if(!c||c===null){c=a}return c}}}else{c=f.details}}return c}};