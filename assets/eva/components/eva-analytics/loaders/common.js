define(
    [
        'jquery',
        'eva-analytics/providers/google-analytics/init',
        'eva-analytics/tracking/global/form-interaction',
        'eva-analytics/tracking/global/scroll-depth',
        'eva-analytics/tracking/global/validation-error',
        'eva-analytics/tracking/global/unhandled-exception',
        'eva-analytics/tracking/global/signup-referral',
        'eva-analytics/tracking/global/new-trialist',
        'eva-analytics/tracking/global/login-status',
        'eva-analytics/tracking/global/click-out',
        'eva-analytics/tracking/global/internal-campaign',
        'eva-analytics/tracking/global/google-search-rank',
        'eva-analytics/tracking/global/tracked-event-count',
        'eva-analytics/tracking/global/social',
        'eva-analytics/tracking/global/poll',
        'eva-analytics/tracking/global/media-consumption',
        'eva-analytics/tracking/global/newsletter-subscription',
        'eva-analytics/tracking/global/newsletter-consumption',
        'eva-analytics/tracking/global/generic'
    ], function(
        $,
        TrackingProviderInit,
        FormInteractionTracking,
        ScrollDepthTracking,
        ValidationErrorTracking,
        UnhandledExceptionTracking,
        SignupReferralTracking,
        NewTrialistTracking,
        LoginStatusTracking,
        ClickOutTracking,
        InternalCampaignTracking,
        GoogleSearchRankTracking,
        TrackedEventCountTracking,
        SocialTracking,
        PollTracking,
        MediaConsumptionTracking,
        NewsletterSubscriptionTracking,
        NewsletterConsumptionTracking
    ) {

        var trackingProvider = TrackingProviderInit(window.universal_variable, document);
        FormInteractionTracking(trackingProvider, window);

        var scrollDepthTracking = ScrollDepthTracking(trackingProvider, window);
        scrollDepthTracking.startTracking();

        ValidationErrorTracking(trackingProvider, window);

        var unhandledExceptionTracking = UnhandledExceptionTracking(trackingProvider, window);
        unhandledExceptionTracking.startTracking();
        
        var signupReferralTracking = SignupReferralTracking(trackingProvider, window);
        signupReferralTracking.trackSignUpReferral();

        var loginStatusTracking = LoginStatusTracking(trackingProvider, window);
        $($.proxy(loginStatusTracking.startTracking, loginStatusTracking));
        loginStatusTracking.processUniversalVariable();

        NewTrialistTracking(trackingProvider, window);

        ClickOutTracking(trackingProvider, window);
        InternalCampaignTracking(trackingProvider, window);

        var googleSearchRankTracking = GoogleSearchRankTracking(trackingProvider, window);
        googleSearchRankTracking.trackReferrer();

        var trackedEventCountTracking = TrackedEventCountTracking(trackingProvider, window);
        trackedEventCountTracking.logTrackedEventCount();

        SocialTracking();

        var pollTracking = PollTracking(trackingProvider, window);
        $($.proxy(pollTracking.trackPolls, pollTracking));

        MediaConsumptionTracking(trackingProvider, window);
        NewsletterSubscriptionTracking(trackingProvider, window);
        NewsletterConsumptionTracking(trackingProvider, window);

        return { trackingProvider: trackingProvider };

    }
);