define(
    [
        'eva-analytics/loaders/common',
        'eva-analytics/tracking/site-specific/which-main-site/sign-up-page'
    ],
    function (CommonLoader, SignUpPageTracking) {

        var trackingProvider = CommonLoader.trackingProvider;
        SignUpPageTracking(trackingProvider);

    }
);