define(
    [
        'eva-analytics/loaders/common',
        'eva-analytics/tracking/site-specific/which-switch/form'
    ], function (
        CommonLoader,
        FormTracking) {

        var trackingProvider = CommonLoader.trackingProvider;
        FormTracking(trackingProvider);

    }
);