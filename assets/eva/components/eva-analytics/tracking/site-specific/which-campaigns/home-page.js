var EvaAnalyticsSupporterSignUpCallback;

define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/shims/object'], function($, TrackingBase, InteractionData, CustomVariable) {

	var current,
		eventNamespace = '.homepagetracking';

	function HomePage(trackingProvider, win) {

		// ensure the constructor has been called with 'new'
		if (!(this instanceof HomePage)) {
			return new HomePage(trackingProvider, win);
		}

		// inheritance
		TrackingBase.call(this, trackingProvider, win);

		// reference to current (needed for global callback function)
		current = this;

		// show more click count
		this.showMoreClickCount = 0;

	}

	HomePage.prototype = Object.create(TrackingBase.prototype);

	HomePage.prototype.constructor = HomePage;

	HomePage.prototype.campaignFilterOnClick = function (e) {

		this.trackEvent(this.getCampaignFilterInteractionData($(e.target)));

	}

	HomePage.prototype.getCampaignFilterClickEventName = function() {

		return 'click' + eventNamespace;

	}

	HomePage.prototype.getCampaignFiltersContainerElement = function() {

		return $('.home-tabs');

	}

	HomePage.prototype.getCampaignFilterInteractionData = function($campaignFilterElement) {

		var campaignName = $.trim($campaignFilterElement.text()),
			sanitisedCampaignName = campaignName || '(unknown)';
		return new InteractionData('Homepage', 'campaign filter', sanitisedCampaignName);

	}

	HomePage.prototype.getShowMoreClickEventName = function() {

		return 'click' + eventNamespace;

	}

	HomePage.prototype.getShowMoreElement = function() {

		return $('#show-more-teasers');

	}

	HomePage.prototype.getShowMoreInteractionData = function() {

		return new InteractionData('Homepage', 'show more', this.showMoreClickCount.toString());

	}

	HomePage.prototype.getSupporterFormLinkElement = function() {

		return $('.bannerWrapper .bannerDescription .signup');

	}

	HomePage.prototype.getSupporterFormLinkEventName = function() {

		return 'click' + eventNamespace;

	}

	HomePage.prototype.getSupporterFormLinkInteractionData = function () {

		return new InteractionData('Become a supporter', 'click to view form');

	}

	HomePage.prototype.getSupporterFormSubmitCustomVariable = function() {

		return new CustomVariable(11, 'Supporter', 'True', 1);

	}

	HomePage.prototype.getSupporterFormSubmitInteractionData = function() {

		return new InteractionData('Become a supporter', 'Sign up');

	}

	HomePage.prototype.incrementShowMoreClickCount = function() {

		this.showMoreClickCount++;
		
	}

	HomePage.prototype.showMoreButtonOnClick = function() {

		this.incrementShowMoreClickCount();
		this.trackEvent(this.getShowMoreInteractionData());

	}

	HomePage.prototype.startTracking = function() {

		this.startTrackingCampaignFilterClicks();
		this.startTrackingShowMoreButtonClicks();
		this.startTrackingSupporterFormLink();

	}

	HomePage.prototype.stopTracking = function() {

		this.stopTrackingCampaignFilterClicks();
		this.stopTrackingShowMoreButtonClicks();
		this.stopTrackingSupporterFormLink();

	}

	HomePage.prototype.startTrackingCampaignFilterClicks = function() {

		this.getCampaignFiltersContainerElement().on(this.getCampaignFilterClickEventName(), '.category a', $.proxy(this.campaignFilterOnClick, this));

	}

	HomePage.prototype.startTrackingShowMoreButtonClicks = function() {

		this.getShowMoreElement().on(this.getShowMoreClickEventName(), $.proxy(this.showMoreButtonOnClick, this));

	}

	HomePage.prototype.startTrackingSupporterFormLink = function() {

		this.getSupporterFormLinkElement().on(this.getSupporterFormLinkEventName(), $.proxy(this.supporterFormLinkOnClick, this));

	}

	HomePage.prototype.stopTrackingCampaignFilterClicks = function() {

		this.getCampaignFiltersContainerElement().off(this.getCampaignFilterClickEventName());

	}

	HomePage.prototype.stopTrackingShowMoreButtonClicks = function() {

		this.getShowMoreElement().off(this.getCampaignFilterClickEventName());

	}

	HomePage.prototype.stopTrackingSupporterFormLink = function() {

		this.getSupporterFormLinkElement().off(this.getSupporterFormLinkEventName());

	}

	HomePage.prototype.supporterFormLinkOnClick = function() {

		this.trackEvent(this.getSupporterFormLinkInteractionData());

	}

	EvaAnalyticsSupporterSignUpCallback = function() {

		current.trackingProvider.setCustomVariable(current.getSupporterFormSubmitCustomVariable());
		current.trackEvent(current.getSupporterFormSubmitInteractionData());

	}

	return HomePage;

});