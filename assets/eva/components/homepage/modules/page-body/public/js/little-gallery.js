// which read reviews controls - uncomment if required (+ include js in index)

// little gallery for product reviews

$(function () {

	// set gallery wrapper to 0
	// keep track of gallery position, multiply by pixel value to get new position

	var galleryWrapper = $('.product-reviews-wrapper-inner'),
		position = 0,
		length = 6;

	$('.product-reviews-controls .prev').click(function () {
		if(position > 0) {
			position -= 1;
			moveWrapper();
		}
	});

	$('.product-reviews-controls .next').click(function () {
		if(position < length - 1) {
			position += 1;
			moveWrapper();
		}
	});

	function moveWrapper () {
		galleryWrapper.css('left', position * -222);
	}

	// Hammer JS

	// $('.products-large').hammer().on('tap', function (){ alert('test'); });
	$('.products-large').click(function () { alert('test'); });

});