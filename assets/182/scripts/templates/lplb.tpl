<div id="{$T.lbid}" class="lp-lightbox-v3">
	<div id="panel-masthead">
		<a href="#" id="TB_closeWindowButton"><img src="http://www.staticwhich.co.uk/assets/images/panels/thickbox-close.png" height="17" width="18" alt="Close"/></a>
	</div>
	<div id="promo-panel" class="adtech-ad adtech-panel review-data-{$T.reviewid}">
		<div id="promo-panel-wrapper">
			<h2>The Which? {$T.productsingular} review</h2>
			<div class="promo-intro">
				<img src='{$T.mainimage}' alt='{$T.alttext}' height="184" width="262"/>
				<h3><span class="pcount">{$P.rdata.p}</span> {$T.productplural} individually tested and reviewed:</h3>
				<ul class="which-badge">
				
				{#if $P.rdata.b==1}
					<li class="bestbuy">
						<img src="http://www.staticwhich.co.uk/assets/images/icons/best-buy-small.png" height="32" width="32" alt="Which? Best Buy"/>
						<span class="bbcount">{$P.rdata.b}</span> Which? Best Buy {$T.productsingular}. {$T.bestbuysubtext}
						{#if $T.productsingular.length < 20} <br/><br/> {#/if}
					</li>
				{#elseif $P.rdata.b>1}
					<li class="bestbuy">
						<img src="http://www.staticwhich.co.uk/assets/images/icons/best-buy-small.png" height="32" width="32" alt="Which? Best Buy"/>
						<span class="bbcount">{$P.rdata.b}</span> Which? Best Buy {$T.productplural}. {$T.bestbuysubtext}
					</li>
				{#/if}
				
				{#if $P.rdata.d==1}
					<li class="dontbuy">
						<img src="http://www.staticwhich.co.uk/assets/images/icons/dont-buy-small.png" height="32" width="32" alt="Which? Don't Buy"/>
						<span class="dbcount">{$P.rdata.d}</span> Which? Don't Buy {$T.productsingular}. {$T.dontbuysubtext}
					</li>
				{#elseif $P.rdata.d>1}
					<li class="dontbuy">
						<img src="http://www.which.co.uk/assets/images/icons/dont-buy-small.png" height="32" width="32" alt="Which? Don't Buy"/>
						<span class="dbcount">{$P.rdata.d}</span> Don't Buy {$T.productplural}. {$T.dontbuysubtext}
					</li>
				{#/if}
				</ul>
			</div>
			
			<div class="promo-choices">
			
			{#if $T.promotions=='trial'}
				
				<div class="promo-detail">
					<h4>Get instant access to hundreds of expert product reviews</h4>
					<p class="promo-description">Find out which products earn Which? Best Buy status - and which ones are woeful impersonators - with a one month trial of Which? for just {$T.trialofferprice}.</p>
					<div class="btn-holder btn-right">
						<div class="a-grow"><a href="{$T.adclick}{$T.downloadurl}"><span class="a-left">&nbsp;</span><span class="a-link">Sign up now</span><span class="a-right">&nbsp;</span></a></div>
					</div>
				</div>
			
			{#elseif $T.promotions=='both'}
				
				<h3>There are two ways to get access to Which? expert guides and reviews:</h3>
				<div class="promo-detail">
					<h4>Get instant access to hundreds of exper product reviews</h4>
					<p class="promo-description">Find out which products earn Which? Best Buy status - and which ones are woeful impersonators - with a one month trial of Which? for just {$T.trialofferprice}.</p>
					<div class="btn-holder btn-right">
						<div class="a-grow"><a href="{$T.adclick}{$T.signupurl}"><span class="a-left">&nbsp;</span><span class="a-link">Sign up now</span><span class="a-right">&nbsp;</span></a></div>
					</div>
				</div>
				
				<div class="promo-detail">
					<h4>Instant download of the Which? {$T.productsingular} review</h4>
					<p class="promo-description">For {$T.idofferprice} buy the Which? {$T.productsingular} review <abbr title="Portable Document Format">PDF</abbr>.</p>
					<div class="btn-holder btn-right">
						<div class="a-grow"><a href="{$T.downloadurl}"><span class="a-left">&nbsp;</span><span class="a-link">{$T.idbtntext}</span><span class="a-right">&nbsp;</span></a></div>
					</div>
				</div>
			
			{#elseif $T.promotions=='idownload'}
			
				<div class="promo-detail">
					<h4>{$T.promodetailtitletext}</h4>
					<p class="promo-description">Find out which products earn Which? Best Buy status - and which ones are woeful impersonators - with a one month trial of Which? for just {$T.trialofferprice}.</p>
					<div class="btn-holder btn-right">
						<div class="a-grow"><a href="{$T.adclick}{$T.signupurl}"><span class="a-left">&nbsp;</span><span class="a-link">{$T.idbtntext}</span><span class="a-right">&nbsp;</span></a></div>
					</div>
				</div>
				
			{#/if}
			
			</div>
			
			{#if $T.promotions=='idownload'}
				
				<p class="pdf-download">Alternatively for {$T.idofferprice} buy the <a href="{$T.downloadurl}">Which? {$T.productsingular} review</a> <abbr title="Portable Document Format">PDF</abbr>.</p>
			
			{#/if}
			
			<p>Existing subscriber? <a href="http://www.which.co.uk/login">Log in now</a></p>
		</div>
	</div>
	<div id="promo-panel-footer">&nbsp;</div>
</div>