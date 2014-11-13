define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function(TrackingBase, InteractionData) {

	var eventNameSpace = '.productfiltertracking',
		changeEventName = 'change' + eventNameSpace,
		clickEventName = 'click' + eventNameSpace;

	function ProductFilter(trackingProvider, win) {

		if (!(this instanceof ProductFilter)) {
			return new ProductFilter(trackingProvider, win);
		}

		TrackingBase.call(this, trackingProvider, win);

        $($.proxy(this.bindTrackingEvents, this));

	}

	ProductFilter.prototype = Object.create(TrackingBase.prototype);

	ProductFilter.prototype.constructor = ProductFilter;

	ProductFilter.prototype.bindTrackingEvents = function() {

		$('body form')
			.on(clickEventName, '.filters-wrapper .button', $.proxy(this.goButton_OnClick, this))
			.on(clickEventName, 'a[class^="range-"],a[class^="choice-"]', $.proxy(function(e) {
				var interactionData = new InteractionData('Product Filter', getActionForEvent(), $(e.currentTarget).attr('class') + '-' + $.trim($(e.currentTarget).text()));
				this.trackEvent(interactionData);
				this.followAnchor($(e.currentTarget), this.win, e);
			}, this));

	}

	ProductFilter.prototype.goButton_OnClick = function(e) {

		var $button = $(e.currentTarget),
			interactionData,
			label = '';
		$button.closest('fieldset').find('input[id^="filter-"]:checked').each(function() {
			label += (label.length ? ', ' : '') + $.trim($('label[for="' + $(this).attr('id') + '"]').text());
		});
		$button.closest('fieldset').find('input[id^="range-"]').each(function() {
			var $this = $(this),
				val = $.trim($this.val());
			if (val.length) {
				label += (label.length ? ', ' : '') + (/-low$/.test($this.attr('id')) ? 'low' : 'high') + '-' + val;
			}
		});
		interactionData = new InteractionData('Product Filter', getActionForEvent(), label);
		this.trackEvent(interactionData);

	}

	ProductFilter.prototype.stopTracking = function() {

		$('body').off(changeEventName + ' ' + clickEventName);

	}

	function getActionForEvent() {

		return $('#filter-tabs > ul > li.on').text();

	}

	return ProductFilter;

});