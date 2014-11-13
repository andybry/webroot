/* SiteCatalyst code version: H.23.3.
Copyright 1996-2011 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

/************************ ADDITIONAL FEATURES ************************
     Plugins
*/

var s_account="whichdev";//Default value if none is set on the third party page
if ((typeof window.omnitureAccount != "undefined") && (typeof omnitureAccount == "function")) {
	if (window.omnitureAccount && (omnitureAccount() != "")) {s_account = omnitureAccount();}//Available in /includes/siteCatalyst.jsp
}
var metaOmnitureAccount = "";
var metas = document.getElementsByTagName('meta');
for (var x=0,y=metas.length; x<y; x++) {
  if (metas[x].name == "omnitureAccount") metaOmnitureAccount = metas[x].content;
}
if (metaOmnitureAccount != "") s_account = metaOmnitureAccount;
var setSiteUrl="which.co.uk";//Default value if s_account is not set on the page
var setTrackingServer="metrics.which.co.uk";//Default value if s_account is not set on the page
var setTrackingServerSecure="smetrics.which.co.uk";//Default value if s_account is not set on the page
switch(s_account){ //This changed the urls of the site based on the account name
	case "whichdigitalstore":
		siteUrl="whichdigitalstore.co.uk";
		setTrackingServer="metrics.whichdigitalstore.co.uk";
		setTrackingServerSecure="smetrics.whichdigitalstore.co.uk";
	break;
	case "whichmortgageadvisersdev":
	case "whichmortgageadvisersdev,whichglobaldev":	// deprecated - no longer using whichglobaldev
		setSiteUrl=siteUrl="whichmortgageadvisers.co.uk";
	break;
	case "whichmortgageadvisersprod":
	case "whichmortgageadvisersprod,whichglobal":	// deprecated - no longer using whichglobal
		setSiteUrl=siteUrl="whichmortgageadvisers.co.uk";
	break;
	case "whichtechblogdev":
	case "whichtechblogdev,whichglobaldev":
		setSiteUrl=siteUrl="blogs.which.co.uk/technology/";
	break;
	case "whichtechbloglive":
	case "whichtechbloglive,whichglobal":
		setSiteUrl=siteUrl="blogs.which.co.uk/technology/";
	break;
}
if (window.omnitureSiteURL) {setSiteUrl = omnitureSiteURL();}//Available in /includes/siteCatalyst.jsp
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.currencyCode="GBP"
s.cookieDomainPeriods="3"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,rtf,png,jpeg,jpg"
s.linkInternalFilters="javascript:,"+setSiteUrl
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"
/* Form Analysis Config (should be above doPlugins section) */
s.formList=""
s.trackFormList=false
s.trackPageName=true
s.useCommerce=false
s.varUsed="prop18"
s.eventList=""
/* Page Name Plugin Config 
s.siteID=""            // leftmost value in pagename
s.defaultPage=""       // filename to add when none exists
s.queryVarsList=""     // query parameters to keep
s.pathExcludeDelim=";" // portion of the path to exclude
s.pathConcatDelim=""   // page name component separator
s.pathExcludeList=""   // elements to exclude from the path
*/
/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
	/* Add calls to plugins here */
/************** doPlugins Script **************/
/* page names created by filters if no page name is supplied and it is not an error page
    if(!s.pageType && !s.pageName)
    s.pageName=s.getPageName();
*/

// Check if s.events has events. If it does only fire them once (as the combination in this case)
// EXAMPLE: ,event3,purchase,event2 would be a unique entry and only get sent once
if(s.events){
	var omniturePreviousPageName=s.getPreviousValue(s.pageName,'gpv_pageName');//The value of the page name on the request before this
	var omnitureCurrentPageName=s.pageName;
	//alert("Current Page Name: *"+omnitureCurrentPageName+"* Last Page Name: *"+omniturePreviousPageName+"*");
	if ((omnitureCurrentPageName==omniturePreviousPageName) && (s_account == "whichtest" || s_account == "whichdev")) {//Only do this for the main which accounts
		var currentEvents=s.events;
		//alert("s.events before: "+s.events);
		currentEvents=currentEvents.replace(/,event4/,""); //Only record signup visits once, remove ',event4' from the s.events
		currentEvents=currentEvents.replace(/,event3/gi,""); //Only record signup complete once, remove ',event3' from the s.events
		currentEvents=currentEvents.replace(/,purchase/gi,""); //Only record purchase once, remove ',purchase' from the s.events
		s.events=currentEvents;
		//alert("s.events after: "+s.events);
	}
}
/* Page Analysis */ 
//Previous page name
s.eVar71 = s.prop71 = s.getPreviousValue(s.pageName,'gpv_pageName_prop71'); //contains the previous page name
//Percentage Page Viewed
var ppvArray = s.getPercentPageViewed(s.pageName); 
s.prop73 = ppvArray[1] //contains the total percent viewed 
s.eVar74 = s.prop74 = ppvArray[2] //contains the percent viewed on initial load 
s.eVar75 = s.prop75 = ppvArray[3] //contains the total number of vertical pixels 
s.eVar73 = s.prop73=(s.prop73=="0")? "zero":s.prop73;
/* Enable Form Analysis */
s.setupFormAnalysis();
/* External Campaign Tracking */
if(!s.campaign){
	s.campaign=s.getQueryParam('cmp,cid,rmid'); 
	/* Unified Sources VISTA Rule adjustment - Campaign Tracking Code passed to eVar45 before getValOnce */
	s.eVar45=s.campaign;
	s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
}
/* External Campaign Tracking - Responsys Integration */
if (!s.campaign && s.getQueryParam('rmid')) {
    s.eVar10 = s.getQueryParam('rrid') //Responsys Recipient Id
    s.eVar21 = s.getQueryParam('reid') //Responsys Email Address
    s.eVar30 = s.getQueryParam('rrcid') //Responsys Preferece Category
}
/* Internal Campaign Tracking */
if(!s.eVar15){
	s.eVar15=s.getQueryParam('intcmp')
	s.eVar15=s.getValOnce(s.eVar15,'s_ev5',0)
}
/* Site Search - Internal Search Terms */
if(s.prop1){
        s.prop1=s.prop1.toLowerCase();
        s.eVar1=s.prop1;
        var t_search=s.getValOnce(s.eVar1,'ev1',0);
        if(t_search){
               s.events=s.apl(s.events,"event1",",",2);
               /* uncomment the next line if merchandising the search term */
               //s.products=s.apl(s.products,";",",",2);
        }
}
/* Set Page View Event */
s.events=s.apl(s.events,'event2',',',2)
/* Set Time Parting Variables - 0 */
var currentYear = new Date().getFullYear( );
s.prop11=s.getTimeParting('h','0',currentYear); // Set hour
if(s.prop11&&!s.eVar11) s.eVar11=s.prop11;
s.prop12=s.getTimeParting('d','0',currentYear); // Set day
if(s.prop12&&!s.eVar12) s.eVar12=s.prop12;
s.prop13=s.getTimeParting('w','0',currentYear); // Set weekend weekday
if(s.prop13&&!s.eVar13) s.eVar13=s.prop13;
/* New/Repeat Status and Pathing Variables */
s.prop19=s.eVar22=s.getNewRepeat(365);
if(s.pageName && s.prop19 == 'New') s.prop20 = s.pageName; // Need to script for null page name
if(s.pageName && s.prop19 == 'Repeat') s.prop21 = s.pageName; // Need to script for null page name
/* Copy props to eVars */
if(s.pageName && !s.eVar2) s.eVar2=s.pageName;
if(s.prop3 && !s.eVar3) s.eVar3=s.prop3; // Content Title (Non Blog)
if(s.prop4 && !s.eVar4) s.eVar4=s.prop4; // Content ID
if(s.prop5 && !s.eVar5) s.eVar5=s.prop5; // Content Type
if(s.prop6 && !s.eVar6) s.eVar6=s.prop6; // Site Section
if(s.prop7 && !s.eVar7) s.eVar7=s.prop7; // Sub Section
if(s.prop8 && !s.eVar8) s.eVar8=s.prop8; // Sub Section 2
if(s.prop9 && !s.eVar9) s.eVar9=s.prop9; // Sub Section 3
if(s.prop10 && !s.eVar20) s.eVar20=s.prop10; // Content/Post Title
if(s.prop17) s.eVar17=s.prop17; // Switch Funnel Time Total: How long user spent from start of the switch to confirmation page
if(s.prop23) s.eVar23=s.prop23; // User Type 
if(s.prop25) s.eVar25=s.prop25; // Switch Energy Supplier Switched From
if(s.prop31 && !s.eVar31) s.eVar31=s.prop31; // Switch Type (Gas/Electric/Dual Fuel)
if(s.prop32 && !s.eVar32) s.eVar32=s.prop32; // Switch Energy Supplier Switched To
if(s.prop33 && !s.eVar33) s.eVar33=s.prop33; // Switch Gas Energy Supplier Switched From
if(s.prop34 && !s.eVar34) s.eVar34=s.prop34; // Switch Electricity Energy Supplier Switched From
if(s.prop35 && !s.eVar35) s.eVar35=s.prop35; // Switch Region
if(s.prop36 && !s.eVar36) s.eVar36=s.prop36; // Switch Economy 7
if(s.prop37 && !s.eVar37) s.eVar37=s.prop37; // Switch Bill Size Gas
if(s.prop38 && !s.eVar38) s.eVar38=s.prop38; // Switch Bill Size Electricity
if(s.prop39 && !s.eVar39) s.eVar39=s.prop39; // Same Supplier Gas & Electricity switched from
if(s.prop40 && !s.eVar40) s.eVar40=s.prop40; // Switch Tariff Switched To
if(s.prop41 && !s.eVar41) s.eVar41=s.prop41; // Switch Gas Tariff Switched From
if(s.prop42 && !s.eVar42) s.eVar42=s.prop42; // Switch Electricity Tariff Switched From
if(s.prop43 && !s.eVar43) s.eVar43=s.prop43; // Switch Savings
if(s.prop44 && !s.eVar44) s.eVar44=s.prop44; // Switch Bill Size Complete
if(s.prop49 && !s.eVar49) s.eVar49=s.prop49; // Switch From Supplier By Fuel Type Combo
if(s.prop50 && !s.eVar50) s.eVar50=s.prop50; // Switch From Tariff By Fuel Type Combo

//Following code added for date / email tracking request 2010-07-16
if (s.events) {
    var currentEvents=s.events;
    if (currentEvents.indexOf("event7")) {
        var now = new Date();
        s.prop31 = now;
    }           
}

}
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getQueryParam 2.1 - return query string parameter(s)
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t)v+=v?d+t:t;p=p.subs"
+"tring(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");
/*
 * Plugin: getNewRepeat 1.1 - 365 Return whether user is new or repeat
 */
s.getNewRepeat=new Function("d",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();e.setTime(ct+d*24*"
+"60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w('s_nr',ct+'"
+"-New',e);return 'New';}sval=cval.split('-');if(ct-sval[0]<30*60*100"
+"0&&sval[1]=='New'){s.c_w('s_nr',ct+'-New',e);return 'New';}else {s."
+"c_w('s_nr',ct+'-Repeat',e);return 'Repeat';}");
/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
 * Plugin: getTimeParting 1.3 - Set timeparting values based on time zone
 */
s.getTimeParting=new Function("t","z","y",""
+"dc=new Date('1/1/2000');f=15;ne=8;if(dc.getDay()!=6||"
+"dc.getMonth()!=0){return'Data Not Available'}else{;z=parseInt(z);"
+"if(y=='2009'){f=8;ne=1};gmar=new Date('3/1/'+y);dsts=f-gmar.getDay("
+");gnov=new Date('11/1/'+y);dste=ne-gnov.getDay();spr=new Date('3/'"
+"+dsts+'/'+y);fl=new Date('11/'+dste+'/'+y);cd=new Date();"
+"if(cd>spr&&cd<fl){z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneO"
+"ffset()*60000);tz=new Date(utc + (3600000*z));thisy=tz.getFullYear("
+");var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Fr"
+"iday','Saturday'];if(thisy!=y){return'Data Not Available'}else{;thi"
+"sh=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();var dow="
+"days[thisd];var ap='AM';var dt='Weekday';var mint='00';if(thismin>3"
+"0){mint='30'}if(thish>=12){ap='PM';thish=thish-12};if (thish==0){th"
+"ish=12};if(thisd==6||thisd==0){dt='Weekend'};var timestring=thish+'"
+":'+mint+ap;var daystring=dow;var endstring=dt;if(t=='h'){return tim"
+"estring}if(t=='d'){return daystring};if(t=='w'){return en"
+"dstring}}};"
);
/* 
 * Plugin: getPercentPageViewed v1.5 
 */ 
s.handlePPVevents=new Function("","" 
+"var s=s_c_il["+s._in+"];if(!s.getPPVid)return;var dh=Math.max(Math." 
+"max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.ma" 
+"x(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max(" 
+"s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.i" 
+"nnerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeigh" 
+"t),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s" 
+".wd.document.body.scrollTop),vh=st+vph,pv=Math.min(Math.round(vh/dh" 
+"*100),100),c=s.c_r('s_ppv'),a=(c.indexOf(',')>-1)?c.split(',',4):[]" 
+",id=(a.length>0)?(a[0]):escape(s.getPPVid),cv=(a.length>1)?parseInt" 
+"(a[1]):(0),p0=(a.length>2)?parseInt(a[2]):(pv),cy=(a.length>3)?pars" 
+"eInt(a[3]):(0),cn=(pv>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy" 
+")?vh:cy)):'';s.c_w('s_ppv',cn);"); 
s.getPercentPageViewed=new Function("pid","" 
+"pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false;if(typeof(s.l" 
+"inkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'" 
+"),a=(v.indexOf(',')>-1)?v.split(',',4):[];if(a.length<4){for(var i=" 
+"3;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape(" 
+"a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid));if(ist){s.getPPVid" 
+"=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('" 
+"s_ppv',escape(s.getPPVid));if(s.wd.addEventListener){s.wd.addEventL" 
+"istener('load',s.handlePPVevents,false);s.wd.addEventListener('scro" 
+"ll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handl" 
+"ePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onlo" 
+"ad',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevent" 
+"s);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-'" 
+")?(a):(a[1]);");
/*
 * Function - read combined cookies v 0.1
 */
s.c_rr=s.c_r;
s.c_r=new Function("k",""
+"var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
+"urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
+"c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
+",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"
+"m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
+"Time()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}ret"
+"urn v;");
/*
 * Function - write combined cookies v 0.1
 */
s.c_wr=s.c_w;
s.c_w=new Function("k","v","e",""
+"var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
+"c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
+".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
+"ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
+".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
+"ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
+"{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
+"='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t){v"
+"ar t1=parseInt(t.substring(t.indexOf('|')+1,t.indexOf(';')));t=t.su"
+"bstring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.setTime(ht);s.c_wr(pn,p"
+"v,d);}return v==s.c_r(s.epa(k));");
/*
 * Plugin: Form Analysis 2.0 (Success, Error, Abandonment)
 */
s.setupFormAnalysis=new Function(""
+"var s=this;if(!s.fa){s.fa=new Object;var f=s.fa;f.ol=s.wd.onload;s."
+"wd.onload=s.faol;f.uc=s.useCommerce;f.vu=s.varUsed;f.vl=f.uc?s.even"
+"tList:'';f.tfl=s.trackFormList;f.fl=s.formList;f.va=new Array('',''"
+",'','')}");
s.sendFormEvent=new Function("t","pn","fn","en",""
+"var s=this,f=s.fa;t=t=='s'?t:'e';f.va[0]=pn;f.va[1]=fn;f.va[3]=t=='"
+"s'?'Success':en;s.fasl(t);f.va[1]='';f.va[3]='';");
s.faol=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,r=true,fo,fn,i,en,t,tf;if(!e)e=s.wd."
+"event;f.os=new Array;if(f.ol)r=f.ol(e);if(s.d.forms&&s.d.forms.leng"
+"th>0){for(i=s.d.forms.length-1;i>=0;i--){fo=s.d.forms[i];fn=fo.name"
+";tf=f.tfl&&s.pt(f.fl,',','ee',fn)||!f.tfl&&!s.pt(f.fl,',','ee',fn);"
+"if(tf){f.os[fn]=fo.onsubmit;fo.onsubmit=s.faos;f.va[1]=fn;f.va[3]='"
+"No Data Entered';for(en=0;en<fo.elements.length;en++){el=fo.element"
+"s[en];t=el.type;if(t&&t.toUpperCase){t=t.toUpperCase();var md=el.on"
+"mousedown,kd=el.onkeydown,omd=md?md.toString():'',okd=kd?kd.toStrin"
+"g():'';if(omd.indexOf('.fam(')<0&&okd.indexOf('.fam(')<0){el.s_famd"
+"=md;el.s_fakd=kd;el.onmousedown=s.fam;el.onkeydown=s.fam}}}}}f.ul=s"
+".wd.onunload;s.wd.onunload=s.fasl;}return r;");
s.faos=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,su;if(!e)e=s.wd.event;if(f.vu){s[f.v"
+"u]='';f.va[1]='';f.va[3]='';}su=f.os[this.name];return su?su(e):tru"
+"e;");
s.fasl=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,a=f.va,l=s.wd.location,ip=s.trackPag"
+"eName,p=s.pageName;if(a[1]!=''&&a[3]!=''){a[0]=!p&&ip?l.host+l.path"
+"name:a[0]?a[0]:p;if(!f.uc&&a[3]!='No Data Entered'){if(e=='e')a[2]="
+"'Error';else if(e=='s')a[2]='Success';else a[2]='Abandon'}else a[2]"
+"='';var tp=ip?a[0]+':':'',t3=e!='s'?':('+a[3]+')':'',ym=!f.uc&&a[3]"
+"!='No Data Entered'?tp+a[1]+':'+a[2]+t3:tp+a[1]+t3,ltv=s.linkTrackV"
+"ars,lte=s.linkTrackEvents,up=s.usePlugins;if(f.uc){s.linkTrackVars="
+"ltv=='None'?f.vu+',events':ltv+',events,'+f.vu;s.linkTrackEvents=lt"
+"e=='None'?f.vl:lte+','+f.vl;f.cnt=-1;if(e=='e')s.events=s.pt(f.vl,'"
+",','fage',2);else if(e=='s')s.events=s.pt(f.vl,',','fage',1);else s"
+".events=s.pt(f.vl,',','fage',0)}else{s.linkTrackVars=ltv=='None'?f."
+"vu:ltv+','+f.vu}s[f.vu]=ym;s.usePlugins=false;s.tl(true,'o','Form A"
+"nalysis');s[f.vu]='';s.usePlugins=up}return f.ul&&e!='e'&&e!='s'?f."
+"ul(e):true;");
s.fam=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa;if(!e) e=s.wd.event;var o=s.trackLas"
+"tChanged,et=e.type.toUpperCase(),t=this.type.toUpperCase(),fn=this."
+"form.name,en=this.name,sc=false;if(document.layers){kp=e.which;b=e."
+"which}else{kp=e.keyCode;b=e.button}et=et=='MOUSEDOWN'?1:et=='KEYDOW"
+"N'?2:et;if(f.ce!=en||f.cf!=fn){if(et==1&&b!=2&&'BUTTONSUBMITRESETIM"
+"AGERADIOCHECKBOXSELECT-ONEFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=e"
+"n;sc=true}else if(et==1&&b==2&&'TEXTAREAPASSWORDFILE'.indexOf(t)>-1"
+"){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==2&&kp!=9&&kp!=13){f.va["
+"1]=fn;f.va[3]=en;sc=true}if(sc){nface=en;nfacf=fn}}if(et==1&&this.s"
+"_famd)return this.s_famd(e);if(et==2&&this.s_fakd)return this.s_fak"
+"d(e);");
s.ee=new Function("e","n",""
+"return n&&n.toLowerCase?e.toLowerCase()==n.toLowerCase():false;");
s.fage=new Function("e","a",""
+"var s=this,f=s.fa,x=f.cnt;x=x?x+1:1;f.cnt=x;return x==a?e:'';");
/*
 * Plugin: linkHandler 0.5 - identify and report custom links
 */
s.linkHandler=new Function("p","t",""
+"var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
+"ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
+"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
+"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
s.p_gn=new Function("t","h",""
+"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+"return 0;");
/*
 * Utility Function: p_gh
 */
s.p_gh=new Function(""
+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");
/*
 * Plugin: downloadLinkHandler 0.5 - identify and report download links
 */
s.downloadLinkHandler=new Function("p",""
+"var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkT"
+"ype&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;"
+"if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;");
/*
 * Plugin: exitLinkHandler 0.5 - identify and report exit links
 */
s.exitLinkHandler=new Function("p",""
+"var s=this,h=s.p_gh(),n='linkInternalFilters',i,t;if(!h||(s.linkTyp"
+"e&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;h="
+"s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt(h)=='e')s.li"
+"nkType='e';else h='';s[n]=t;return h;");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");
/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
	+"var s=this,a=new Date;"
	+"e=e?e:0;"
	+"a.setTime(a.getTime()+e*86400000);"
	+"if(v)s.c_w(c,v,e?a:0);"
	+"return s.c_r(c);"
);
/*
 * s.join: 1.0 - s.join(v,p)
 *
 *  v - Array (may also be array of array)
 *  p - formatting parameters (front, back, delim, wrap)
 *
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/* Configure Modules and Plugins */
s.loadModule("Media")
s.Media.autoTrack=true // ONLY IF YOU WISH TO TRACK EVERY ACTION; VALUABLE OR NOT
s.Media.trackVars="None"
s.Media.trackEvents="None"


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="which"
s.trackingServer=setTrackingServer
s.trackingServerSecure=setTrackingServerSecure

/****************************** MODULES *****************************/
/* Module: Media */
s.m_Media_c="(`OWhilePlaying~='s_media_'+m._in+'_~unc^D(~;`E~m.ae(mn,l,\"'+p+'\",~){var m=this~o;w.percent=((w.off^e+1)/w`X)*100;w.percent=w.percent>1~o.'+f~=new ~o.Get~:Math.floor(w.percent);w.timeP"
+"layed=i.t~}`x p');p=tcf(o)~Time~x,x!=2?p:-1,o)}~if(~m.monitor)m.monitor(m.s,w)}~m.s.d.getElementsByTagName~ersionInfo~'^N_c_il['+m._in+'],~'o','var e,p=~else~i.to~=Math.floor(~}catch(e){p=~m.track~"
+"s.wd.addEventListener~.name~m.s.rep(~layState~||^8~Object~m.s.wd[f1]~^A+=i.t+d+i.s+d+~.length~parseInt(~Player '+~s.wd.attachEvent~'a','b',c~Media~pe='m~;o[f1]~m.s.isie~.current~);i.~p<p2||p-p2>5)~"
+".event=~m.close~i.lo~vo.linkTrack~=v+',n,~.open~){w.off^e=~;n=m.cn(n);~){this.e(n,~v=e='None';~Quick~MovieName()~);o[f~out(\"'+v+';~return~1000~i.lx~m.ol~o.controls~m.s.ape(i.~load',m.as~)}};m.~scr"
+"ipt';x.~,t;try{t=~Version()~n==~'--**--',~pev3~o.id~i.ts~tion~){mn=~1;o[f7]=~();~(x==~){p='~&&m.l~l[n])~:'')+i.e~':'E')+o~var m=s~!p){tcf~xc=m.s.~Title()~()/~7+'~+1)/i.l~;i.e=''~3,p,o);~m.l[n]=~Dat"
+"e~5000~;if~i.lt~';c2='~tm.get~Events~set~Change~)};m~',f~(x!=~4+'=n;~~^N.m_i('`c');m.cn=f`2n`5;`x `Rm.s.rep(`Rn,\"\\n\",''),\"\\r\",''),^9''^g`o=f`2n,l,p,b`5,i`8`U,tm`8^X,a='',x`ql=`Yl)`3!l)l=1`3n&"
+"&p){`E!m.l)m.l`8`U`3m.^K`k(n)`3b&&b.id)a=b.id;for (x in m.l)`Em.l[x]^J[x].a==a)`k(m.l[x].n`hn=n;i.l=l;i.p=m.cn(p`ha=a;i.t=0;^C=0;i.s`M^c`C^R`y`hlx=0;^a=i.s;`l=0^U;`L=-1;^Wi}};`k=f`2n`r0,-1^g.play=f"
+"`2n,o`5,i;i=m.e(n,1,o`hm`8F`2`Ii`3m.l){i=m.l[\"'+`Ri.n,'\"','\\\\\"')+'\"]`3i){`E`z==1)m.e(i.n,3,-1`hmt=^e`Cout(i.m,^Y)}}'`hm(^g.stop=f`2n,o`r2,o)};`O=f`2n`5^Z `0) {m.e(n,4,-1^4e=f`2n,x,o`5,i,tm`8^"
+"X,ts`M^c`C^R`y),ti=`OSeconds,tp=`OMilestones,z`8Array,j,d=^9t=1,b,v=`OVars,e=`O^d,`dedia',^A,w`8`U,vo`8`U`qi=n^J&&m.l[n]?m.l[n]:0`3i){w`Q=n;w`X=i.l;w.playerName=i.p`3`L<0)w`j\"OPEN\";`K w`j^H1?\"PL"
+"AY\":^H2?\"STOP\":^H3?\"MONITOR\":\"CLOSE\")));w`o`C`8^X^Gw`o`C.^e`C(i.s*`y)`3x>2||^i`z&&^i2||`z==1))) {b=\"`c.\"+name;^A = ^2n)+d+i.l+d+^2p)+d`3x){`Eo<0&&^a>0){o=(ts-^a)+`l;o=o<i.l?o:i.l-1}o`Mo)`3"
+"x>=2&&`l<o){i.t+=o-`l;^C+=o-`l;}`Ex<=2){i.e+=^H1?'S^M;`z=x;}`K `E`z!=1)m.e(n,1,o`hlt=ts;`l=o;`W`0&&`L>=0?'L'+`L^L+^i2?`0?'L^M:'')^Z`0){b=0;`d_o'`3x!=4`p`600?100`A`3`F`E`L<0)`d_s';`K `Ex==4)`d_i';`K"
+"{t=0;`sti=ti?`Yti):0;z=tp?m.s.sp(tp,','):0`3ti&&^C>=ti)t=1;`K `Ez){`Eo<`L)`L=o;`K{for(j=0;j<z`X;j++){ti=z[j]?`Yz[j]):0`3ti&&((`L^T<ti/100)&&((o^T>=ti/100)){t=1;j=z`X}}}}}}}`K{m.e(n,2,-1)^Z`0`pi.l`6"
+"00?100`A`3`F^W0`3i.e){`W`0&&`L>=0?'L'+`L^L^Z`0){`s`d_o'}`K{t=0;m.s.fbr(b)}}`K t=0;b=0}`Et){`mVars=v;`m^d=e;vo.pe=pe;vo.^A=^A;m.s.t(vo,b)^Z`0){^C=0;`L=o^U}}}}`x i};m.ae=f`2n,l,p,x,o,b){`En&&p`5`3!m."
+"l||!m.^Km`o(n,l,p,b);m.e(n,x,o^4a=f`2o,t`5,i=^B?^B:o`Q,n=o`Q,p=0,v,c,c1,c2,^Ph,x,e,f1,f2`1oc^h3`1t^h4`1s^h5`1l^h6`1m^h7`1c',tcf,w`3!i){`E!m.c)m.c=0;i`1'+m.c;m.c++}`E!^B)^B=i`3!o`Q)o`Q=n=i`3!^0)^0`8"
+"`U`3^0[i])`x;^0[i]=o`3!xc)^Pb;tcf`8F`2`J0;try{`Eo.v`H&&o`g`c&&^1)p=1`N0`B`3^O`8F`2`J0^6`9`t`C^7`3t)p=2`N0`B`3^O`8F`2`J0^6`9V`H()`3t)p=3`N0`B}}v=\"^N_c_il[\"+m._in+\"],o=^0['\"+i+\"']\"`3p==1^IWindo"
+"ws `c `Zo.v`H;c1`np,l,x=-1,cm,c,mn`3o){cm=o`g`c;c=^1`3cm&&c^Ecm`Q?cm`Q:c.URL;l=cm.dura^D;p=c`gPosi^D;n=o.p`S`3n){`E^88)x=0`3^83)x=1`3^81`T2`T4`T5`T6)x=2;}^b`Ex>=0)`4`D}';c=c1+c2`3`f&&xc){x=m.s.d.cr"
+"eateElement('script');x.language='j^5type='text/java^5htmlFor=i;x`j'P`S^f(NewState)';x.defer=true;x.text=c;xc.appendChild(x`v6]`8F`2c1+'`E^83){x=3;'+c2+'}^e`Cout(`76+',^Y)'`v6]()}}`Ep==2^I`t`C `Z(`"
+"9Is`t`CRegistered()?'Pro ':'')+`9`t`C^7;f1=f2;c`nx,t,l,p,p2,mn`3o^E`9`u?`9`u:`9URL^Gn=`9Rate^Gt=`9`CScale^Gl=`9Dura^D^Rt;p=`9`C^Rt;p2=`75+'`3n!=`74+'||`i{x=2`3n!=0)x=1;`K `Ep>=l)x=0`3`i`42,p2,o);`4"
+"`D`En>0&&`7^S>=10){`4^V`7^S=0}`7^S++;`7^j`75+'=p;^e`C`w`72+'(0,0)\",500)}'`e`8F`2`b`v4]=-^F0`e(0,0)}`Ep==3^IReal`Z`9V`H^Gf1=n+'_OnP`S^f';c1`nx=-1,l,p,mn`3o^E`9^Q?`9^Q:`9Source^Gn=`9P`S^Gl=`9Length^"
+"R`y;p=`9Posi^D^R`y`3n!=`74+'){`E^83)x=1`3^80`T2`T4`T5)x=2`3^80&&(p>=l||p==0))x=0`3x>=0)`4`D`E^83&&(`7^S>=10||!`73+')){`4^V`7^S=0}`7^S++;`7^j^b`E`72+')`72+'(o,n)}'`3`V)o[f2]=`V;`V`8F`2`b1+c2)`e`8F`2"
+"`b1+'^e`C`w`71+'(0,0)\",`73+'?500:^Y);'+c2`v4]=-1`3`f)o[f3]=^F0`e(0,0^4as`8F`2'e',`Il,n`3m.autoTrack&&`G){l=`G(`f?\"OBJECT\":\"EMBED\")`3l)for(n=0;n<l`X;n++)m.a(^K;}')`3`a)`a('on^3);`K `E`P)`P('^3,"
+"false)";
s.m_i("Media");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.23.3';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s."
+"d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window."
+"s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload"
+"=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTrackin"
+"g){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.na"
+"me))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){va"
+"r s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s"
+".pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.su"
+"bstring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,s"
+"earch_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',"
+"')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs"
+"='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)){nfm=0;if(nf"
+"l)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(n"
+"ke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='ret"
+"rieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss"
+")){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs!='')qs+='&.'+k"
+"}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrac"
+"kVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+f"
+"e+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if("
+"v&&(!fv||fv.indexOf(k)>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}"
+"else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else i"
+"f(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else i"
+"f(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel"
+"')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q"
+"='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';"
+"else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='ligh"
+"tStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q"
+"='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else "
+"if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('"
+"?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;"
+"return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&l"
+"ft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Func"
+"tion('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&"
+"s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');"
+"s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o."
+"protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot="
+"function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.ty"
+"pe&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t="
+"='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o"
+".value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t"
+",un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return"
+" q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t"
+".indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='"
+"s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s."
+"squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wd"
+"l=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\""
+"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)"
+"s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.vis"
+"itorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};"
+"s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dy"
+"asmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if"
+"(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun"
+")s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m"
+"_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s',"
+"'n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._i"
+"n]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]="
+"new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}"
+"m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x"
+");u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else i"
+"f(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadMod"
+"ule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))"
+"&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o"
+".l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f"
+"2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.o"
+"nreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;"
+"o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){"
+"k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.leng"
+"th;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime"
+"()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if("
+"!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&"
+"&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.ge"
+"tHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tf"
+"s.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s"
+".isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if"
+"(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerH"
+"eight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&"
+"&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b."
+"addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;p"
+"n++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb)"
+";s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer"
+"=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.paren"
+"tElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)r"
+"eturn ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||"
+"t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1"
+";i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s"
+".sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs"
+");}else{s.dl(vo);}if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};"
+"s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncre"
+"mentBy=i;s.t(vo)};s.jsLoaded=function(){var s=this,x;if(s.lmq)for(i=0;i<s.lmq.length;i++){x=s.lmq[i];s.loadModule(x.n,x.u,x.d)}if(s.onLoad)s.onLoad(s);if(s.tq)for(i=0;i<s.tq.length;i++)s.t(s.tq[i])"
+"};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navi"
+"gator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='"
+"Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substrin"
+"g(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(St"
+"ring.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,vis"
+"itorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,co"
+"okieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,z"
+"ip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s"
+".vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,color"
+"Depth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerS"
+"ecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,"
+"trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';"
+"s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(u"
+"n,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,x,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||x=='s_l')&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}


var omnitureSiteCatalyst = {
	// methods:
	log: function(message) {
		var console = window['console'];
		if (console && console.log && this.loggingEnabled) {
			console.log(message + "\n");
		}
	},
	setLoggingEnabled: function(enable) {
		this.loggingEnabled = enable;
	},
	showLog: function() {
		this.log("");
		this.log("*** Omniture Log ***");
		// core variables:
		this.log("omnitureAccount: " 					+ this.omnitureAccount);
		this.log("omnitureContentId: " 					+ this.omnitureContentId);
		this.log("omniturePageType: " 					+ this.omniturePageType);
		this.log("omniturePageName: " 					+ this.omniturePageName);
		this.log("omnitureLastPageName: " 				+ this.omnitureLastPageName);
		this.log("omnitureChannel: " 					+ this.omnitureChannel);
		this.log("omnitureHier1: " 						+ this.omnitureHier1);
		this.log("omnitureSection: " 					+ this.omnitureSection);
		this.log("omnitureSubSection1: " 				+ this.omnitureSubSection1);
		this.log("omnitureSubSection2: " 				+ this.omnitureSubSection2);
		this.log("omnitureSubSection3: " 				+ this.omnitureSubSection3);
		this.log("omnitureUsername: " 					+ this.omnitureUsername);
		this.log("omnitureMemberType: " 				+ this.omnitureMemberType);
		this.log("omnitureCustomerId: "					+ this.omnitureCustomerId);
		this.log("omnitureLogoutPageVisited: " 			+ this.omnitureLogoutPageVisited);
		this.log("omnitureWelcomePageVisited: " 		+ this.omnitureWelcomePageVisited);
		this.log("omnitureJustLoggedIn: " 				+ this.omnitureJustLoggedIn);
		this.log("omnitureSignupPageVisited: " 			+ this.omnitureSignupPageVisited);
		this.log("omnitureLoginPageVisited: " 			+ this.omnitureLoginPageVisited);
		this.log("omnitureSearchButtonClicked: "		+ this.omnitureSearchButtonClicked);
		this.log("omnitureMoneyButtonClicked: "			+ this.omnitureMoneyButtonClicked);
		this.log("omnitureSignUpTeaserPageVisited: "	+ this.omnitureSignUpTeaserPageVisited);
		this.log("omnitureSignUpTeaserCompleted: "		+ this.omnitureSignUpTeaserCompleted);
		this.log("omnitureSignUpGiftSubPageVisited: "	+ this.omnitureSignUpGiftSubPageVisited);
		this.log("omnitureSignUpGiftSub6Completed: "	+ this.omnitureSignUpGiftSub6Completed);
		this.log("omnitureSignUpGiftSub12Completed: "	+ this.omnitureSignUpGiftSub12Completed);
		this.log("omnitureSignUpGiftSub13Completed: "	+ this.omnitureSignUpGiftSub13Completed);
		this.log("omnitureSignUpModalWelcome: "			+ this.omnitureSignUpModalWelcomed);
		this.log("omnitureEvents: " 					+ this.omnitureEvents);
		this.log("omnitureProducts: " 					+ this.omnitureProducts);
		this.log("omniturePurchaseID: " 				+ this.omniturePurchaseID);
		this.log("omnitureTimestamp: " 					+ this.omnitureTimestamp);
		this.log("omnitureSearchKeywords: "				+ this.omnitureSearchKeywords);
		this.log("omnitureContainsVideo: "				+ this.omnitureContainsVideo);
		this.log("omnitureContainsUserComments: " 		+ this.omnitureContainsUserComments);
		this.log("omnitureContainsInteractiveTool: "	+ this.omnitureContainsInteractiveTool);
		this.log("omnitureNonStandardReview: " 			+ this.omnitureNonStandardReview);
		this.log("omnitureVertical: " 					+ this.omnitureVertical);
		this.log("omnitureCategory: "					+ this.omnitureCategory);
		this.log("omnitureSubcategory: "				+ this.omnitureSubcategory);
		// switch variables:
		this.log("omnitureSwitchStarted: " 							+ this.omnitureSwitchStarted);							
		this.log("omnitureCurrentSituationPageVisited: " 			+ this.omnitureCurrentSituationPageVisited);	
		this.log("omnitureResultsPageVisited: "						+ this.omnitureResultsPageVisited);						
		this.log("omnitureSaveResultsPageVisited: "					+ this.omnitureSaveResultsPageVisited);					
		this.log("omnitureSwitchConfirmationPageVisited: "			+ this.omnitureSwitchConfirmationPageVisited);			
		this.log("omnitureRegion: "									+ this.omnitureRegion);									
		this.log("omnitureSavings: "								+ this.omnitureSavings);								
		this.log("omnitureOldGasSupplier: "							+ this.omnitureOldGasSupplier);						
		this.log("omnitureOldElectricitySupplier: "					+ this.omnitureOldElectricitySupplier);				
		this.log("omnitureSameSupplierSwitchedFrom: "				+ this.omnitureSameSupplierSwitchedFrom);				
		this.log("omnitureTariff: "									+ this.omnitureTariff);								
		this.log("omnitureOldGasTariff: "							+ this.omnitureOldGasTariff);							
		this.log("omnitureOldElectricityTariff: "					+ this.omnitureOldElectricityTariff);				
		this.log("omnitureEnergySupplier: "							+ this.omnitureEnergySupplier);						
		this.log("omnitureBillSizeGas: "							+ this.omnitureBillSizeGas);						
		this.log("omnitureBillSizeElectricity: "					+ this.omnitureBillSizeElectricity);				
		this.log("omnitureSecondsTotalElapsed: "					+ this.omnitureSecondsTotalElapsed);					
		this.log("omnitureProcessedEnergyType: "					+ this.omnitureProcessedEnergyType);				
		this.log("omnitureSupplierSwitchedFromByFuelTypeCombo: "	+ this.omnitureSupplierSwitchedFromByFuelTypeCombo);	
		this.log("omnitureTariffSwitchedFromByFuelTypeCombo: "		+ this.omnitureTariffSwitchedFromByFuelTypeCombo);		
		this.log("omnitureBillSizeComplete: "						+ this.omnitureBillSizeComplete);						
		this.log("omnitureEnergySupplierSwitchedFromSingleDual: "	+ this.omnitureEnergySupplierSwitchedFromSingleDual);		
		this.log("omnitureEconomy7: "								+ this.omnitureEconomy7);			
		this.log("Omniture complete.");
	},
	getMeta: function(name) {
		var result = "";
		var metas = document.getElementsByTagName('meta');
		for (var x=0,y=metas.length; x<y; x++) {
		  if (metas[x].name == name) result = metas[x].content;
		}
		return result;
	},
	getOmniturePageName: function() {
		var omniturePageName = this.getMeta("omniturePageName");
		omniturePageName = omniturePageName.toLowerCase();
		omniturePageName = omniturePageName.replace(" home ::", "");
		var omnitureBreadcrumbs = omniturePageName.split(":"); 
		if (omnitureBreadcrumbs.length > 1) { 
			// if the last array item of breadcrumbs has the value of "home" this means this page is a parent
			//if (omnitureBreadcrumbs[omnitureBreadcrumbs.length-1].indexOf("home")>-1) {
			if (omnitureBreadcrumbs[omnitureBreadcrumbs.length - 1].replace(/ /g, '') === "home") {
				omniturePageName = omniturePageName.substring(0, omniturePageName.length - 6); // leave ": home" out of the page name as per http://whichonline.onjira.com/browse/TWO-13 to prevent continuity issues in the data
			}
		}
		omniturePageName = omniturePageName.replace(/[: ]+$/, "");
		return omniturePageName;
	},
	getOmnitureLastPageName: function() {
		var omnitureLastPageName = this.getMeta("omnitureLastPageName");
		omnitureLastPageName = omnitureLastPageName.toLowerCase();
		omnitureLastPageName = omnitureLastPageName.replace(" home ::", "");
		var omnitureBreadcrumbs = omnitureLastPageName.split(":"); 
		if (omnitureBreadcrumbs.length > 1) { 
			// if the last array item of breadcrumbs has the value of "home" this means this page is a parent
			//if (omnitureBreadcrumbs[omnitureBreadcrumbs.length-1].indexOf("home")>-1) {
			if (omnitureBreadcrumbs[omnitureBreadcrumbs.length - 1].replace(/ /g, '') === "home") {
				omnitureLastPageName = omnitureLastPageName.substring(0, omnitureLastPageName.length - 6); // leave ": home" out of the page name as per http://whichonline.onjira.com/browse/TWO-13 to prevent continuity issues in the data
			}
		}
		omnitureLastPageName = omnitureLastPageName.replace(/[: ]+$/, "");
		return omnitureLastPageName;
	},
	getOmniturePageType: function() {
		var omniturePageType = this.getMeta("omniturePageType");
		if (omniturePageType.toLowerCase() == "reviews-ns") omniturePageType = "reviews";
		return omniturePageType;
	},
	getOmnitureChannel: function() {
		var omniturePageName = this.getMeta("omniturePageName");
		omniturePageName = omniturePageName.toLowerCase();
		omniturePageName = omniturePageName.replace(" home ::", "");
		var omnitureBreadcrumbs = omniturePageName.split(":"); 
		var numChannelHierCount = omnitureBreadcrumbs.length-1; 
		var omnitureChannel = "";
		for (i=0;i<=numChannelHierCount;i++){
			omnitureChannel = omnitureChannel + omnitureBreadcrumbs[i] + ":";
		}
		omnitureChannel = omnitureChannel.slice(0,omnitureChannel.length-1);
		return omnitureChannel;
	},
	getOmnitureHier1: function() {
		var omniturePageName = this.getMeta("omniturePageName");
		omniturePageName = omniturePageName.toLowerCase();
		omniturePageName = omniturePageName.replace(" home ::", "");
		var omnitureBreadcrumbs = omniturePageName.split(":"); 
		var numChannelHierCount = omnitureBreadcrumbs.length-2; 
		var omnitureHier1 = "";
		for (i=0;i<=numChannelHierCount;i++){
			omnitureHier1 = omnitureHier1 + omnitureBreadcrumbs[i].replace(",", "") + ",";
		}
		omnitureHier1 = omnitureHier1.replace(/, /g, ",");
		omnitureHier1 = omnitureHier1.slice(0,omnitureHier1.length-1);
		return omnitureHier1;
	},
	getOmnitureSection: function() {
		var omnitureBreadcrumbs = this.omniturePageName.split(":"); 
		var omnitureSection = "";
		if (omnitureBreadcrumbs.length>=1) omnitureSection = omnitureBreadcrumbs[0];
		return omnitureSection;
	},
	getOmnitureSubSection1: function() {
		var omnitureBreadcrumbs = this.omniturePageName.split(":"); 
		var numChannelHierCount = omnitureBreadcrumbs.length-1; 
		var omnitureSubSection1 = "";
		if (numChannelHierCount>=1) omnitureSubSection1 = omnitureBreadcrumbs[1];
		return omnitureSubSection1;
	},
	getOmnitureSubSection2: function() {
		var omnitureBreadcrumbs = this.omniturePageName.split(":"); 
		var numChannelHierCount = omnitureBreadcrumbs.length-1; 
		var omnitureSubSection2 = "";
		if (numChannelHierCount>=2) omnitureSubSection2 = omnitureBreadcrumbs[2];
		return omnitureSubSection2;
	},
	getOmnitureSubSection3: function() {
		var omnitureBreadcrumbs = this.omniturePageName.split(":"); 
		var numChannelHierCount = omnitureBreadcrumbs.length-1; 
		var omnitureSubSection3 = "";
		if (numChannelHierCount>=3) omnitureSubSection3 = omnitureBreadcrumbs[3];
		return omnitureSubSection3;
	},
	getOmnitureUsername: function() {
		var omnitureUsername = "";
		if ((this.getCookie("sso_auth") != null) && (this.getCookie("sso_auth")!="0") && (this.getCookie("sso_auth").split(",").length > 1)) {
			omnitureUsername = this.getCookie("sso_auth").split(",")[0];
			omnitureUsername = omnitureUsername.replace("\"", "");			
		}
		return omnitureUsername;
	},
	getOmnitureMemberType: function() {
		var omnitureMemberType = "anonymous";
		if ((this.getCookie("sso_auth") != null) && (this.getCookie("sso_auth")!="0") && (this.getCookie("sso_auth").split(",").length > 1)) {
			omnitureMemberType = this.getCookie("sso_auth").split(",")[1];
			omnitureMemberType = omnitureMemberType.replace("\"", "");	
		}
		return omnitureMemberType;
	}, 
	getOmnitureCustomerId: function() {
		var omnitureCustomerId = "";
		if ((this.getCookie("sso_auth") != null) && (this.getCookie("sso_auth")!="0") && (this.getCookie("sso_auth").split(",").length > 4)) {
			omnitureCustomerId = this.getCookie("sso_auth").split(",")[4];
			omnitureCustomerId = omnitureCustomerId.replace("\"", "");
		}
		return omnitureCustomerId;
	},
	isOmnitureConversionPage: function(pageName) {
		var conversionPage = this.getMeta("conversionPage");
		if (pageName==conversionPage) return true;
		return false;
	},
	getOmnitureEvents: function() {
		var omnitureEvents = "";
		// core events
		if (this.omnitureLogoutPageVisited) omnitureEvents += ",event6";
		if (this.omnitureWelcomePageVisited) omnitureEvents += ",event3,purchase";
		if (this.omnitureSignupPageVisited) omnitureEvents += ",event4";
		if (this.omnitureLoginPageVisited) omnitureEvents += ",event5";
		if (this.omnitureJustLoggedIn) omnitureEvents += ",event7";
		if (this.omnitureSearchButtonClicked) omnitureEvents += ",event1";
		if (this.omnitureSignUpTeaserPageVisited) omnitureEvents += ",event8";
		if (this.omnitureSignUpTeaserCompleted) omnitureEvents += ",event9";
		// switch events (different report suite)
		if (this.omnitureSwitchStarted) omnitureEvents += ",event7";
		if (this.omnitureResultsPageVisited) omnitureEvents += ",event5";
		if (this.omnitureSaveResultsPageVisited) omnitureEvents += ",event16";
		if (this.omnitureSwitchConfirmationPageVisited) omnitureEvents += ",event4,event18";
		if (this.getMeta("omnitureProcessedEnergyType")=="electricity") omnitureEvents += ",event10,event13";
		if (this.getMeta("omnitureProcessedEnergyType")=="gas") omnitureEvents += ",event10,event14";
		if (this.getMeta("omnitureProcessedEnergyType")=="dual") omnitureEvents += ",event11,event14,event13";
		if (this.omnitureMoneyButtonClicked) omnitureEvents += ",event30";
		if (this.omnitureSignUpGiftSubPageVisited) omnitureEvents += ",event31";
		if (this.omnitureSignUpGiftSub6Completed) omnitureEvents += ",event32";
		if (this.omnitureSignUpGiftSub12Completed) omnitureEvents += ",event33";
		if (this.omnitureSignUpGiftSub13Completed) omnitureEvents += ",event34";
		return omnitureEvents;
	},
	getOmnitureProducts: function() {
		if (this.getOmnitureEvents().indexOf("purchase")>-1) return this.omnitureLastPageName;
		return "";
	},
	getOmniturePurchaseID: function() {
		if (this.omnitureWelcomePageVisited && this.omnitureUsername != "" && this.omnitureTimestamp != "") return this.omnitureUsername + "-" + this.omnitureTimestamp;
		return "";
	},
	getOmnitureSearchKeywords: function() {
		var referrer, location, qIndex, keywords; 
		referrer = unescape(document.referrer).toLowerCase();
		location = unescape(document.location.href).toLowerCase();
		if ((location.indexOf("&cmp=knc") > -1) || (location.indexOf("?cmd=knc") >-1 )) {
			return "";
		} 
		if ((referrer.indexOf("http://www.google") > -1) || (referrer.indexOf("http://www.bing") > -1) || (referrer.indexOf("ask.com") > -1)) {
			qIndex = referrer.indexOf("?q=") + 3;
			if (qIndex==2) qIndex = referrer.indexOf("&q=") + 3;
			keywords = referrer.substring(qIndex, referrer.length).substring(0, referrer.substring(qIndex, referrer.length).indexOf("&")).split("+").join(" ");
		}
		else if (referrer.indexOf("search.yahoo.com") > -1) {
			qIndex = referrer.indexOf("?p=") + 3;
			if (qIndex==2) qIndex = referrer.indexOf("&p=") + 3;
			keywords = referrer.substring(qIndex, referrer.length).substring(0, referrer.substring(qIndex, referrer.length).indexOf("&")).split("+").join(" ");
		}
		else {
			return "";
		}
		return keywords;
	},
	getOmnitureContainsVideo: function() {
		if (this.getMeta("omnitureContainsVideo")=="true") return "true";
		return "false";
	},
	getOmnitureContainsUserComments: function() {
		if (this.getMeta("omnitureContainsUserComments")=="true") return "true";
		return "false";
	},
	getOmnitureContainsInteractiveTool: function() {
		if (this.getMeta("omnitureContainsInteractiveTool")=="true") return "true";
		return "false";
	},
	getOmnitureNonStandardReview: function() {
		if (this.getMeta("omnitureNonStandardReview")=="true") return "true";
		return "false";
	},
	getOmnitureCategory: function() {
		var result = "";
		if (this.getMeta("omnitureVertical")!="") {
			var categories = this.getMeta("categories").split(",");
			if (categories.length>1) result = categories[categories.length-2];
		}
		return result;
	},
	getOmnitureSubcategory: function() {
		var result = "";
		if (this.getMeta("omnitureVertical")!="") {
			var categories = this.getMeta("categories").split(",");
			if (categories.length>2) result = categories[categories.length-3];
		}
		return result;
	},
	getOmnitureSameSupplierSwitchedFrom: function() {
		if (this.isOmnitureConversionPage("confirmation")) {
			if ( (this.getMeta("omnitureOldGasSupplier") != "") && 
				 (this.getMeta("omnitureOldGasSupplier") == this.getMeta("omnitureOldElectricitySupplier")) ) {
				return "yes";
			} 
			else {
				return "no";
			}
		}
		return "";
	},
	getOmnitureSupplierSwitchedFromByFuelTypeCombo: function() {
		if (this.getMeta("omnitureProcessedEnergyType")=="electricity") return "electricity:" + this.getMeta("omnitureOldElectricitySupplier");
		if (this.getMeta("omnitureProcessedEnergyType")=="gas") return "gas:" + this.getMeta("omnitureOldGasSupplier");
		if (this.getMeta("omnitureProcessedEnergyType")=="dual") {
			if ((this.getMeta("omnitureOldGasSupplier")==this.getMeta("omnitureOldElectricitySupplier"))&&(this.getMeta("omnitureOldElectricitySupplier")!="")) {
				return "dual:" + this.getMeta("omnitureOldElectricitySupplier");
			}
			else {
				return "both:" + this.getMeta("omnitureOldGasSupplier") + "," + this.getMeta("omnitureOldElectriticySupplier");
			}
		}
		return "";
	},
	getOmnitureTariffSwitchedFromByFuelTypeCombo: function() {
		if (this.getMeta("omnitureProcessedEnergyType")=="electricity") return "electricity:" + this.getMeta("omnitureOldElectricityTariff");
		if (this.getMeta("omnitureProcessedEnergyType")=="gas") return "gas:" + this.getMeta("omnitureOldGasTariff");
		if (this.getMeta("omnitureProcessedEnergyType")=="dual") {
			if ((this.getMeta("omnitureOldGasTariff")==this.getMeta("omnitureOldElectricityTariff"))&&(this.getMeta("omnitureOldElectricityTariff")!="")) {
				return "dual:" + this.getMeta("omnitureOldElectricityTariff");
			}
			else {
				return "both:" + this.getMeta("omnitureOldGasTariff") + "," + this.getMeta("omnitureOldElectriticyTariff");
			}
		}
		return "";
	},
	getOmnitureEnergySupplierSwitchedFromSingleDual: function() {
		if (this.getMeta("omnitureProcessedEnergyType")=="electricity") return this.getMeta("omnitureOldElectricitySupplier");
		return this.getMeta("omnitureOldGasSupplier");
	},
	getOmnitureBillSizeComplete: function() {
		if (this.getMeta("omnitureProcessedEnergyType")=="electricity") return this.getMeta("omnitureBillSizeElectricity");
		if (this.getMeta("omnitureProcessedEnergyType")=="gas") return this.getMeta("omnitureBillSizeGas");
		if (this.getMeta("omnitureProcessedEnergyType")=="dual") return this.getMeta("omnitureBillSizeGas");
		return "";
	},
	setOmnitureCustomLinks: function() {
		if (document.getElementById('money')) {
			var tables = document.getElementsByTagName("table");
			var moneyTables = false;
			for (var i = 0; i < tables.length; i++) {
				var classes = tables[i].className.split(" ");
				for (var j = 0; j < classes.length; j++) {
					if (classes[j] === 'money-table') {
						moneyTables = true;
					}
				}
			}
			if (moneyTables) {
				var images = document.images;
				var links = false;
				for (var i = 0; i < images.length; i++) {
					if (images[i].src.indexOf('btn-visit-site') !== -1) {
						if (images[i].parentNode.tagName.toLowerCase() === 'a') {
							links = true;
							images[i].parentNode.onclick = function() {
								s.tl(this, 'o', 'Money visit website');
								omnitureSiteCatalyst.omnitureMoneyButtonClicked = true;
							};
						}
					}
					if (images[i].src.indexOf('btn-apply-now') !== -1) {
						if (images[i].parentNode.tagName.toLowerCase() === 'a') {
							links = true;
							images[i].parentNode.onclick = function() {
								s.tl(this, 'o', 'Money apply now');
								omnitureSiteCatalyst.omnitureMoneyButtonClicked = true;
							};
						}
					}
				}
				if (links) {
					omnitureSiteCatalyst.omnitureEvents += ",event30";
				}
			}
		}

		/* Custom links removed as per Pivotal Tracker #42361389
		var pageDivs, carouselLinks;
		
		// top nav custom links
		if (document.getElementById("om-login-tn") != null) {
			document.getElementById("om-login-tn").onclick = function() {
				s.tl(this, 'o', 'log in: top navigation: button');
			}
		}
		// setting custom link capture for signup on top navigation
		if (document.getElementById("om-signup-tn") != null) {
			document.getElementById("om-signup-tn").onclick = function() {
				s.tl(this, 'o', 'sign up: top navigation');
			}
		}
		// setting custom link capture for search on top navigation
		if (document.getElementById("om-search-tn") != null) {
			document.getElementById("om-search-tn").onclick = function() {
				s.tl(this, 'o', 'search: top navigation');
				omnitureSiteCatalyst.omnitureSearchButtonClicked = true;
				omnitureSiteCatalyst.omnitureEvents += ",event1";
			}
		}
		// setting custom link capture for log out on top navigation
		if (document.getElementById("om-logout-tn") != null) {
			document.getElementById("om-logout-tn").onclick = function() {
				s.tl(this, 'o', 'log out: top navigation: button');
			}
		}
		// capturing clicks on adtech promos
		pageDivs = document.getElementsByTagName("div");
		for (i = 0; i < pageDivs.length; i++) {
			if (pageDivs[i].className.indexOf("adtech-promo")>-1) {
				pageDivs[i].onclick = function() {
					promoId = this.id;
					promoName = promoId.replace("adtech-", "");
					promoName = promoName.replace("-", " ");
					promoName = promoName.replace("-", " ");
					promoImage = this.getElementsByTagName("img");
					if (promoImage.length>0) promoAlt = promoImage[0].alt;
					promoText = "promo: " + promoName + ": " + promoAlt;
					promoText = promoText.toLowerCase();
					s.tl(this,'o',promoText);
				}
			}
		}
		// capturing clicks on the home page "carousel"
		carouselLinks = document.getElementsByTagName("a");
		for (i = 0; i < carouselLinks.length; i++) {
			if (carouselLinks[i].href.indexOf("#intro-1") > -1) {
				carouselLinks[i].onclick = function(e) {
					var evt = window.event || e;
					carouselPos = "far left"
					carouselText = this.innerHTML.toLowerCase();
					carouselText = "carousel: home: " + carouselPos + ": " + carouselText;
					if (evt.clientX && evt.clientY) {
						s.tl(this, 'o', carouselText);
					}
				}
			}
			if (carouselLinks[i].href.indexOf("#intro-2") > -1) {
				carouselLinks[i].onclick = function(e) {
					var evt = window.event || e;
					carouselPos = "centre left"
					carouselText = this.innerHTML.toLowerCase();
					carouselText = "carousel: home: " + carouselPos + ": " + carouselText;
					if (evt.clientX && evt.clientY) {
						s.tl(this, 'o', carouselText);
					}
				}
			}
			if (carouselLinks[i].href.indexOf("#intro-3") > -1) {
				carouselLinks[i].onclick = function(e) {
					var evt = window.event || e;
					carouselPos = "centre right"
					carouselText = this.innerHTML.toLowerCase();
					carouselText = "carousel: home: " + carouselPos + ": " + carouselText;
					if (evt.clientX && evt.clientY) {
						s.tl(this, 'o', carouselText);
					}
				}
			}
			if (carouselLinks[i].href.indexOf("#intro-4") > -1) {
				carouselLinks[i].onclick = function(e) {
					var evt = window.event || e;
					carouselPos = "far right"
					carouselText = this.innerHTML.toLowerCase();
					carouselText = "carousel: home: " + carouselPos + ": " + carouselText;
					if (evt.clientX && evt.clientY) {
						s.tl(this, 'o', carouselText);
					}
				}
			}
		}
*/
	},
	getCookie: function(cookieName) {
		var documentCookies = "" + document.cookie;
		var ind = documentCookies.indexOf(cookieName);
		if (ind==-1 || cookieName=="") return ""; 
		var ind1 = documentCookies.indexOf(';',ind);
		if (ind1 == -1) ind1 = documentCookies.length; 
		return unescape(documentCookies.substring(ind+cookieName.length+1,ind1));
	},
	// variables:
	loggingEnabled: false,
	omnitureAccount: "",
	omnitureContentId: "",
	omniturePageType: "",
	omniturePageName: "",
	omnitureChannel: "",
	omnitureHier1: "",
	omnitureSection: "",
	omnitureSubSection1: "",
	omnitureSubSection2: "",
	omnitureSubSection3: "",
	omnitureUsername: "", 
	omnitureMemberType: "", 
	omnitureCustomerId: "",
	omnitureLogoutPageVisited: false, 
	omnitureWelcomePageVisited: false, 
	omnitureJustLoggedIn: false,
	omnitureSignupPageVisited: false, 
	omnitureLoginPageVisited: false, 
	omnitureSearchButtonClicked: false,
	omnitureMoneyButtonClicked: false,
	omnitureEvents: "",
	omnitureProducts: "",
	omniturePurchaseID: "",
	omnitureTimestamp: "",
	omnitureSearchKeywords: "",
	omnitureContainsVideo: "",
	omnitureContainsUserComments: "",
	omnitureContainsInteractiveTool: "",
	omnitureNonStandardReview: "",
	omnitureVertical: "",
	omnitureCategory: "",
	omnitureSubcategory: "",
	// switch variables:
	omnitureSwitchStarted: false,
	omnitureCurrentSituationPageVisited: false,
	omnitureResultsPageVisited: false,
	omnitureSaveResultsPageVisited: false,
	omnitureSwitchConfirmationPageVisited: false,
	omnitureRegion: false,
	omnitureSavings: false,
	omnitureOldGasSupplier: "",
	omnitureOldElectricitySupplier: "",
	omnitureSameSupplierSwitchedFrom: "",
	omnitureTariff: "",
	omnitureOldGasTariff: "",
	omnitureOldElectricityTariff: "",
	omnitureEnergySupplier: "",
	omnitureBillSizeGas: "",
	omnitureBillSizeElectricity: "",
	omnitureSecondsTotalElapsed: "",
	omnitureProcessedEnergyType: "",
	omnitureSupplierSwitchedFromByFuelTypeCombo: "",
	omnitureTariffSwitchedFromByFuelTypeCombo: "",
	omnitureBillSizeComplete: "",
	omnitureEnergySuppliedSwitchedFromSingleDual: "",
	omnitureEconomy7: "",			
	// init method:
	init: function() {

		// core variables:
		this.omnitureAccount					= this.getMeta("omnitureAccount");
		this.omnitureContentId					= this.getMeta("contentId");
		this.omniturePageType					= this.getOmniturePageType();
		this.omniturePageName					= this.getOmniturePageName();
		this.omnitureLastPageName				= this.getOmnitureLastPageName();
		this.omnitureChannel					= this.getOmnitureChannel();
		this.omnitureHier1						= this.getOmnitureHier1();
		this.omnitureSection					= this.getOmnitureSection();
		this.omnitureSubSection1				= this.getOmnitureSubSection1();
		this.omnitureSubSection2				= this.getOmnitureSubSection2();
		this.omnitureSubSection3				= this.getOmnitureSubSection3();
		this.omnitureUsername					= this.getOmnitureUsername();
		this.omnitureMemberType					= this.getOmnitureMemberType();
		this.omnitureCustomerId					= this.getOmnitureCustomerId();
		this.omnitureLogoutPageVisited			= this.isOmnitureConversionPage("logout");
		this.omnitureWelcomePageVisited			= this.isOmnitureConversionPage("welcome");
		this.omnitureJustLoggedIn				= this.isOmnitureConversionPage("justLoggedIn");
		this.omnitureSignUpTeaserPageVisited	= this.isOmnitureConversionPage("teaserWelcome");
		this.omnitureSignUpTeaserCompleted		= this.isOmnitureConversionPage("teaserComplete");
		this.omnitureSignUpGiftSubPageVisited	= this.isOmnitureConversionPage("giftSubWelcome");
		this.omnitureSignUpGiftSub6Completed	= this.isOmnitureConversionPage("giftSub6Complete");
		this.omnitureSignUpGiftSub12Completed	= this.isOmnitureConversionPage("giftSub12Complete");
		this.omnitureSignUpGiftSub13Completed	= this.isOmnitureConversionPage("giftSub13Complete");
		this.omnitureSignUpModalWelcome			= (this.isOmnitureConversionPage("welcome")) ? this.getMeta("modalSignup") : '';
		this.omnitureSignupPageVisited			= this.isOmnitureConversionPage("signup");
		this.omnitureLoginPageVisited			= this.isOmnitureConversionPage("login");
		this.omnitureSearchButtonClicked		= false; // see setOmnitureCustomLinks
		this.omnitureMoneyButtonClicked			= false; // see setOmnitureCustomLinks
		this.omnitureProducts					= this.getOmnitureProducts(); 
		this.omniturePurchaseID					= this.getOmniturePurchaseID(); 
		this.omnitureTimestamp					= this.getMeta("timestamp");
		this.omnitureSearchKeywords				= this.getOmnitureSearchKeywords();
		this.omnitureContainsVideo				= this.getOmnitureContainsVideo();
		this.omnitureContainsUserComments		= this.getOmnitureContainsUserComments();
		this.omnitureContainsInteractiveTool	= this.getOmnitureContainsInteractiveTool();
		this.omnitureNonStandardReview			= this.getOmnitureNonStandardReview();
		this.omnitureVertical					= this.getMeta("omnitureVertical");
		this.omnitureCategory					= this.getOmnitureCategory();
		this.omnitureSubcategory				= this.getOmnitureSubcategory();
		this.setOmnitureCustomLinks();
		
		// switch variables:
		this.omnitureSwitchStarted							= this.isOmnitureConversionPage("currentSituation");
		this.omnitureCurrentSituationPageVisited			= this.isOmnitureConversionPage("currentSituation");
		this.omnitureResultsPageVisited						= this.isOmnitureConversionPage("results");
		this.omnitureSaveResultsPageVisited					= this.isOmnitureConversionPage("save");
		this.omnitureSwitchConfirmationPageVisited			= this.isOmnitureConversionPage("confirmation");
		this.omnitureRegion									= this.getMeta("omnitureRegion");
		this.omnitureSavings								= this.getMeta("omnitureSavings");
		this.omnitureOldGasSupplier							= this.getMeta("omnitureOldGasSupplier");
		this.omnitureOldElectricitySupplier					= this.getMeta("omnitureOldElectricitySupplier");
		this.omnitureSameSupplierSwitchedFrom				= this.getOmnitureSameSupplierSwitchedFrom();
		this.omnitureTariff									= this.getMeta("omnitureTariff");
		this.omnitureOldGasTariff							= this.getMeta("omnitureOldGasTariff");
		this.omnitureOldElectricityTariff					= this.getMeta("omnitureOldElectricityTariff");
		this.omnitureEnergySupplier							= this.getMeta("omnitureEnergySupplier");
		this.omnitureBillSizeGas							= this.getMeta("omnitureBillSizeGas"); // "yes" if true, "no" if false (no quotes)
		this.omnitureBillSizeElectricity					= this.getMeta("omnitureBillSizeElectricity"); // "yes" if true, "no" if false (no quotes)
		this.omnitureSecondsTotalElapsed					= this.getMeta("omnitureSecondsTotalElapsed");
		this.omnitureProcessedEnergyType					= this.getMeta("omnitureProcessedEnergyType"); // "electricity", "gas" or "dual" (no quotes)
		this.omnitureSupplierSwitchedFromByFuelTypeCombo	= this.getOmnitureSupplierSwitchedFromByFuelTypeCombo();
		this.omnitureTariffSwitchedFromByFuelTypeCombo		= this.getOmnitureTariffSwitchedFromByFuelTypeCombo();
		this.omnitureBillSizeComplete						= this.getOmnitureBillSizeComplete();
		this.omnitureEnergySupplierSwitchedFromSingleDual	= this.getOmnitureEnergySupplierSwitchedFromSingleDual();
		this.omnitureEconomy7								= this.getMeta("omnitureEconomy7"); // "yes" if true, "no" if false (no quotes)

		// events
		this.omnitureEvents					= this.getOmnitureEvents(); 
		
		// logging:
		this.showLog();

	},
	exec: function(response) {
		
		this.setLoggingEnabled(true); // change to false to disable logging to the console

		// this section of code was formerly in siteCatalyst.jsp 

		this.init(); // get the latest omniture values

		var s_account = this.omnitureAccount;
		
		// the 50 sProps and 50 eVars hold information about the state of the request 
		// not all are used, and some are reserved for various purposes or used by external apps (e.g. switch) 
		// an attempt has been made here to detail where each variable is used 

		s.pageName		= this.omniturePageName;								// section: sub section: sub sub section: page name
		s.server		= "";
		s.channel		= this.omnitureChannel;									// derived from the page name, section: sub section: sub sub section
		s.pageType		= "";
		s.hier1			= this.omnitureHier1;									// derived from the page name, section,sub section,sub sub section
		s.prop1			= "";													// internal search terms
		s.prop2			= "";													// page names
		s.prop3			= "";
		s.prop4			= this.omnitureContentId;
		s.prop5			= this.omniturePageType;
		s.prop6			= this.omnitureSection;									// derived from the page name, section
		s.prop7			= this.omnitureSubSection1;								// derived from the page name, sub section
		s.prop8			= this.omnitureSubSection2;								// derived from the page name, sub section 2
		s.prop9			= this.omnitureSubSection3;								// derived from the page name, sub section 3
		s.prop10		= "";
		s.prop11		= "";													// hour of day
		s.prop12		= "";													// day of week
		s.prop13		= "";													// weekday / weekend
		s.prop14		= this.omnitureUsername;								// memberid / username
		s.prop15		= "";
		s.prop16		= "";
		s.prop17		= this.omnitureSecondsTotalElapsed;						// switch
		s.prop18		= "";													// form analysis
		s.prop19		= "";													// new vs. repeat visitors
		s.prop20		= "";													// new visitors path
		s.prop21		= "";													// pathing
		s.prop22		= ""; 
		s.prop23		= this.omnitureMemberType;								// acs online, anonymous, or magazine
		s.prop24		= "";
		s.prop25		= this.omnitureEnergySupplierSwitchedFromSingleDual;	// switch
		// s.prop26 is missing or available for use
		s.prop27		= this.omnitureCustomerId;								// unique customer id
		// s.prop28 to s.prop29 are switch variables configured in question-delay.js
		// s.prop30 is missing or available for use
		s.prop31		= this.omnitureProcessedEnergyType;						// switch
		s.prop32		= this.omnitureEnergySupplier;							// switch
		s.prop33		= this.omnitureOldGasSupplier;							// switch
		s.prop34		= this.omnitureOldElectricitySupplier;					// switch
		s.prop35		= this.omnitureRegion;									// switch
		s.prop36		= this.omnitureEconomy7;								// switch
		s.prop37		= this.omnitureBillSizeGas;								// switch
		s.prop38		= this.omnitureBillSizeElectricity;						// switch
		s.prop39		= this.omnitureSameSupplierSwitchFrom;					// switch
		s.prop40		= this.omnitureTariff;									// switch
		s.prop41		= this.omnitureOldGasTariff;							// switch
		s.prop42		= this.omnitureOldElectricityTariff;					// switch
		s.prop43		= this.omnitureSavings;									// switch
		// s.prop45 to s.prop48 are missing or available for use
		s.prop51		= this.omnitureSearchKeywords;							// natural search keywords
		s.prop52		= this.omnitureContainsVideo;							// page contains video
		s.prop53		= this.omnitureContainsUserComments;					// page contains user comments
		s.prop54		= this.omnitureContainsInteractiveTool;					// page contains interactive tool
		s.prop55		= this.omnitureNonStandardReview;						// page contains non-standard review
		s.prop56 		= this.omnitureVertical;								// the current vertical
		s.prop57		= this.omnitureCategory;								// the current category
		s.prop58		= this.omnitureSubcategory;								// the current subcategory

		/* conversion variables */
		s.campaign		= "";
		s.state			= "";
		s.zip			= "";
		s.events		= this.omnitureEvents; 			
		s.products		= this.omnitureProducts; 
		s.purchaseID	= this.omniturePurchaseID; 
		
		s.eVar1			= ""; 										// internal search terms
		s.eVar2			= ""; 										// page names
		s.eVar3			= ""; 										// content title
		s.eVar4			= ""; 										// content id
		s.eVar5			= this.omniturePageType;					// content type
		s.eVar6			= "";										// site section
		s.eVar7			= "";										// sub section
		s.eVar8			= "";										// sub section 2
		s.eVar9			= "";										// sub section 3
		s.eVar10		= "";		
		s.eVar11		= "";										// hour of day
		s.eVar12		= "";										// day of week
		s.eVar13		= "";										// weekday / weekend
		s.eVar14		= "";
		s.eVar15		= "";										// internal campaign tracking
		s.eVar16		= "";			
		s.eVar17		= "";										// switch specific, so not applicable
		s.eVar18		= "";
		s.eVar19		= this.omnitureUsername;					// memberid / username
		s.eVar20		= "";										// content / post title
		// s.eVar21 is missing
		s.eVar22		= "";										// new vs. repeat visitors
		// s.eVar23 to s.eVar24 are missing
		s.eVar25		= ""; // switch
		// s.eVar26 is missing
		s.eVar27		= this.omnitureCustomerId;								// unique customer id
		// s.eVar28 to s.eVar29 are switch variables configured in question-delay.js
		// s.eVar30 is missing
		s.eVar31		= ""; // switch
		s.eVar32		= ""; // switch
		s.eVar33		= ""; // switch
		s.eVar34		= ""; // switch
		s.eVar35		= ""; // switch
		s.eVar36		= ""; // switch
		s.eVar37		= ""; // switch
		s.eVar38		= ""; // switch
		s.eVar39		= ""; // switch
		s.eVar40		= ""; // switch
		s.eVar41		= ""; // switch
		s.eVar42		= ""; // switch
		s.eVar43		= ""; // switch
		// s.eVar45 to s.eVar46 are being injected by the Vista engine, regarding search engine, paid or not
		// s.eVar47 to s.eVar48 are reserved by Omniture
		s.eVar51		= this.omnitureSearchKeywords;
		s.eVar52		= this.omnitureContainsVideo;							// page contains video
		s.eVar53		= this.omnitureContainsUserComments;					// page contains user comments
		s.eVar54		= this.omnitureContainsInteractiveTool;					// page contains interactive tool
		s.eVar55		= this.omnitureNonStandardReview;						// page contains non-standard review
		s.eVar56 		= this.omnitureVertical;								// the current vertical
		s.eVar57		= this.omnitureCategory;								// the current category
		s.eVar58		= this.omnitureSubcategory;								// the current subcategory
		
		if (this.omnitureSignUpModalWelcome != '') {
			s.eVar72		= this.omnitureSignUpModalWelcome;					// welcome page - modal or not?
		}
		
		// url tracking request
		s.prop44=s.eVar44="D=g"; // full URL with query information - requires correlation against page
		
		if ((typeof s != "undefined") && (typeof s.t != "undefined")) {
			var s_code=s.t();if(s_code)document.write(s_code)
		}
	}
}
var om_otheronload = window.onload;
window.onload = function() {
	if (om_otheronload) om_otheronload();
	omnitureSiteCatalyst.exec(); 
};