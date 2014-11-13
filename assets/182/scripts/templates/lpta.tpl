{#template imageref}
	  <div class='image'>
		  <img src='{$T.imgurl}' alt='{$T.alttext}' width='262' height='184' />
	  </div>		
{#/template imageref}

{#template promotext}
	<div class='text'>
		<p class='intro'>{$T.promointro}</p>
		<p>{$T.promotext}</p>
		<div class='a-grow' style='float: {$P.btn_align}; position: absolute; bottom: 20px'>
		  {#if $T.bypasslightbox} 
			<a href='{$T.adclick}http://www.which.co.uk/signup'>
		  {#elseif $T.linktoreview}
			<a href='{$T.adclick}http://www.which.co.uk{$P.rdata.u}'>
		  {#else}
			<a href='#TB_inline?height={$T.lbheight}&width={$T.lbwidth}&inlineId={$T.lbid}&modal=true' class='thickbox adrecord'>
		  {#/if}
			<span class='a-left'>&nbsp;</span><span class='a-link'>{$T.btntext}</span><span class='a-right'>&nbsp;</span></a>
		</div>
	</div>
{#/template promotext}
	
{#template bbdbpanel}
	<div class='info'>
		<h3>Which? Best Buys &amp; Don't Buys</h3>
		<h4 class='removed'>Best Buys</h4>
		<p class='best-buy'>As part of our tests, we award Which? Best Buy status to the highest scoring {$T.productplural}.</p>
		<h4 class='removed'>Don't Buys</h4>
		<p class='dont-buy'>Any {$T.productplural} that fail our tests are flagged as Which? Don't Buys.</p>
	</div>	
{#/template bbdbpanel}
	
{#template MAIN}
	<div class='js-promo-ta adtech-ad' style='position: relative'>
		<h2>{$T.promoheader}</h2>
{#if $T.showbbdb}
	{#param name=btn_align value="left"}
		<div class='wrapper'>
	{#include promotext root=$T}
	{#include imageref root=$T}
	{#include bbdbpanel root=$T}
{#else}
	{#if $T.imageright}
		<div class='wrapper promo-left'>
		{#param name=btn_align value="right"}
	{#else}
		<div class='wrapper promo-right'>
		{#param name=btn_align value="left"}
	{#/if}
	{#include promotext root=$T}
	{#include imageref root=$T}
{#/if}
		</div><!-- wrapper-->
	</div>
{#/template MAIN}