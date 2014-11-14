require(
    [
        'eva-analytics/loaders/common',
        'eva-analytics/tracking/site-specific/which-campaigns/home-page'
    ], function (
        CommonLoader,
        CampaignsHomePageTracking) {

        var trackingProvider = CommonLoader.trackingProvider,
        	campaignsHomePageTracking = CampaignsHomePageTracking(trackingProvider, window);

        campaignsHomePageTracking.startTracking();

    }
);