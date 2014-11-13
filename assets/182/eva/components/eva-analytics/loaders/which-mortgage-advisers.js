require(
    [
        'eva-analytics/loaders/common',
        'eva-analytics/tracking/site-specific/which-mortgage-advisers/call-me-back-form',
        'eva-analytics/tracking/site-specific/which-mortgage-advisers/mortgage-calculator'
    ], function (
        CommonLoader,
        CallMeBackFormTracking,
        MortgageCalculatorTracking) {

        var trackingProvider = CommonLoader.trackingProvider;

        var callMeBackFormTracking = CallMeBackFormTracking(trackingProvider, window);
        callMeBackFormTracking.startTracking();

        MortgageCalculatorTracking(trackingProvider, window);

    }
);