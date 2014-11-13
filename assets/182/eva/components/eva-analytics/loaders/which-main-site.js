require(
    [
        'eva-analytics/loaders/common',
        'eva-analytics/tracking/site-specific/which-main-site/product-filter',
        'eva-analytics/tracking/site-specific/which-main-site/sign-up-page'
    ],
    function (CommonLoader, ProductFilterTracking, SignUpPageTracking) {

        var trackingProvider = CommonLoader.trackingProvider;
        ProductFilterTracking(trackingProvider, window);
        SignUpPageTracking(trackingProvider, window);

    }
);