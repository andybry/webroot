var EvaAnalytics = EvaAnalytics || {};

define(['eva-analytics/loaders/default-tracking-provider', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data'], function(DefaultTrackingProvider, TrackingBase, InteractionData) {

	var tracking = TrackingBase(DefaultTrackingProvider.trackingProvider, window || { });

	EvaAnalytics.trackEvent = function(category, action, label, value, nonInteraction) {

		var interactionData = new InteractionData(category, action, label, value, nonInteraction);
		tracking.trackEvent(interactionData);

	}

});