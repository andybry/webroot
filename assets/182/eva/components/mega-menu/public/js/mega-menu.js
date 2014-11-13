/* Mega-menu JS */

$(function () {

	var MegaMenu = {

		// init function
		touch : false,
		init : function () {

			// check if touch event exists (if is mobile device)
			MegaMenu.touch = 'ontouchstart' in document.documentElement;

			// on menu hover move to menu block
			$('.menu-item.submenu a').bind('mouseover click', MegaMenu.processMegaMenuInteraction);
			$('.menu-item.no-submenu a').mouseover(MegaMenu.resetMegaMenu);

			// body click event to close when click outside
			$('html').bind('click mouseover touchstart', MegaMenu.resetMegaMenu);
			$('.mega-menu').bind('click mouseover touchstart', function (e) { e.stopPropagation(); });
		},
		processMegaMenuInteraction : function (event) {
			
			// don't follow link
			event.stopPropagation();
			event.preventDefault();

			var self = event.currentTarget,
				ref = self.href,
				refHash = ref.slice(ref.indexOf('#')),
				activeMenuBlock = $(refHash),
				menuIsOpen = activeMenuBlock.hasClass('active');

			if ( (event.type === 'mouseover' && !MegaMenu.touch) || (event.type == 'click' && !menuIsOpen) ) {
				// show new menu item
				MegaMenu.showMegaMenuItem(event);
			} else if ( menuIsOpen && event.type == 'click' ) {
				// follow link
				window.open(event.currentTarget, '_self');
			}
		},
		showMegaMenuItem : function (event) {

			// take current nav link id and find associated mega-menu-block
			var self = event.currentTarget,
				ref = self.href,
				refHash = ref.slice(ref.indexOf('#'));

			var navLinks = $('.nav-links li'),
				menuBlocks = $('.mega-menu-block'),
				activeMenuBlock = $(refHash);

			// wipe active class off all nav links and mega-menu-blocks
			navLinks.removeClass('active');
			menuBlocks.removeClass('active');
			// add active class to this nav link
			var navLink = $(self);
			navLink.parent().addClass('active');
			activeMenuBlock.addClass('active');

			// // check active element and show it if it's not the current one.
			// $('.mega-menu-block:not(' + refHash + ')').hide();
			// $(refHash).show();
		},
		resetMegaMenu : function () {
			$('.active').removeClass('active');
			// $('.mega-menu-block').stop().hide();
		}
	}

	// init megamenu
	MegaMenu.init();
});