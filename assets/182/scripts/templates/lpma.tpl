<div class="js-promo-ma lp-v12 adtech-ad" style='position: relative'>
	<div class="wrapper">
		<div class="text">
			<h3>{$T.promointro}</h3>
			<div class='a-grow' style='float: left; position: absolute; bottom: 20px'>
				{#if $T.bypasslightbox}
					<a href="{$T.adclick}http://www.which.co.uk/signup">
				{#elseif $T.linktoreview}
					<a href='{$T.adclick}http://www.which.co.uk{$P.rdata.u}'>
				{#else}
					<a href="#TB_inline?height={$T.lbheight}&width={$T.lbwidth}&inlineId={$T.lbid}&modal=true" class="thickbox adrecord">
				{#/if}
					<span class="a-left">&nbsp;</span><span class="a-link">{$T.btntext}</span><span class="a-right">&nbsp;</span>
				</a>
			</div>					
		</div>
		<div class="image">
			<img src='{$T.imgurl}' alt='{$T.alttext}' width='210' height='97' />
		</div>
	</div>
</div>