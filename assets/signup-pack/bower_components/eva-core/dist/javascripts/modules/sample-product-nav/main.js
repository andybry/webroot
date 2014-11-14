//=require jquery
var WHICH = WHICH || {};

WHICH.createWidget('sampleProductNav', function(data) {

	var $widget = $(this),
			pageBeforeSampleProduct = window.Cookies.read('page_before_sample_product');

	if (pageBeforeSampleProduct) {
		$widget
				.find('.js-sample-product-nav__link--back')
				.attr('href', pageBeforeSampleProduct);

		$widget.on('click', '.sample-product-nav__link--start', function() {
			window.Cookies.write('SESSION_REFERRAL_PAGE', pageBeforeSampleProduct, null, '/');
		});
	}
});

(function($) {

	$(function() {
		// Remember the location from which the user navigates to the sample product page
		$(document).on('click','.js-sample-product-link', function() {
			window.Cookies.write('page_before_sample_product', location.href, null, '/');
		});
	});

})(jQuery);