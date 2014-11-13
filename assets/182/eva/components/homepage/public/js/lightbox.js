define(['jquery','lightbox_me'], function($, lightbox_me){
	$(function() {
		// Video block link - loads lightbox
		$('.video-block').click(function(e) {
			e.preventDefault();

			var wWidth = $(window).width(),
				cols = (wWidth >= 1260) ? 18 : (wWidth > 840) ? 12 : 9;

			
			if(cols >= 12) { // if 12 and 18 cols run lightbox
				$('.video-player').lightbox_me({
					centered: true,
					overlayCSS: {background: 'black', opacity: .7},
					onClose: function () {
						// Reset youtube video
						$('.video-player iframe').attr('src', function (i,val) { return val; });
					}
				});
			} else { // else if 9 show in full screen
				window.open(this.href, 'which-video-player');
			}
		});

		// Close video button
		$('.video-player .close-btn').click(function() {
			$('.video-player').trigger('close');
		});
	});
});