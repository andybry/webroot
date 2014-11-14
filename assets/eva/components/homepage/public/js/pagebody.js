/* page body js */

define(['jquery'], function ($) {

	// which read reviews controls - uncomment if required (+ include js in index)

	// little gallery for product reviews

	$(function () {

		// set gallery wrapper to 0
		// keep track of gallery position, multiply by pixel value to get new position

		var galleryWrapper = $('.product-reviews-wrapper-inner'),
			position = 0,
			len = 6,
			prevArrow = $('.product-reviews-controls .prev'),
			nextArrow = $('.product-reviews-controls .next');

		prevArrow.click(function () { moveWrapper('left'); });
		nextArrow.click(function () { moveWrapper('right'); });

		// Stop image dragging...
		galleryWrapper.find('img').mousedown(function(){ return false; });

		// Hammer JS

		galleryWrapper.hammer().on('swipe', function (e){

			if(e.gesture.direction === 'left') {
				moveWrapper('right');
			} else {
				moveWrapper('left');
			}

			return false;
		});

		// moveWrapper function

		function moveWrapper (dir) {
			if(dir === 'left') {
				if(position > 0) {
					position -= 1;
				}
			} else {
				if(position < len - 1) {
					position += 1;
				}
			}

			galleryWrapper.css('left', position * -222);

			switch (position) {
				case 0 :
					prevArrow.hide();
					nextArrow.show();
					break;
				case len - 1 :
					prevArrow.show();
					nextArrow.hide();
					break;
				default :
					prevArrow.show();
					nextArrow.show();
			}
		}
	});
});