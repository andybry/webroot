$(document).ready(function(){var a=$("#help-desk").validate({rules:{title:{required:true},firstName:{required:true},lastName:{required:true},emailAddress:{required:true,email:true},emailAddressConf:{required:true,email:true,equalTo:"#email"},membershipNumber:{required:true},skills:{required:true},problems:{required:true},problemsOther:{required:{depends:function(){return $("#problems").val()=="Other"}}},operatingSystem:{required:true},operatingSystemOther:{required:{depends:function(){return $("#operating-system").val()=="Other"}}},memory:{required:true},memoryOther:{required:{depends:function(){return $("#ram").val()=="Other"}}},processor:{required:true},processorOther:{required:{depends:function(){return $("#processor").val()=="Other"}}},connection:{required:true},accessInternet:{required:true},modemRouter:{required:true},wirelessNetwork:{required:true},otherInfo:{required:true,maxlength:500}},messages:{},errorPlacement:function(b,c){c.parent().siblings("p.error").remove();b.prependTo(c.parent().parent());generalFormError(a.numberOfInvalids(),"#form-error-1")},errorElement:'p class="no-label error"',onfocusout:false,onkeyup:false,success:"removed"});which.selectDrivenEnable("problems","Other","other-problem");which.selectDrivenEnable("operating-system","Other","other-operating-system");which.selectDrivenEnable("processor","Other","other-processor");which.selectDrivenEnable("ram","Other","other-ram")});