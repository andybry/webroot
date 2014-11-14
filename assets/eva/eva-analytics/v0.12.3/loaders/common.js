define(
    [
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
        'eva-analytics/tracking/global/newsletter-consumption'
    ], function(
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
        NewsletterConsumptionTracking,
        GoogleAnalyticsProviderInit
    ) {

        var trackingProvider = TrackingProviderInit(window.universal_variable, document.location, document.referrer);
        FormInteractionTracking(trackingProvider);
        ScrollDepthTracking(trackingProvider);
        ValidationErrorTracking(trackingProvider);
        UnhandledExceptionTracking(trackingProvider);
        SignupReferralTracking(trackingProvider);
        NewTrialistTracking(trackingProvider);
        LoginStatusTracking(trackingProvider);
        ClickOutTracking(trackingProvider, window);
        InternalCampaignTracking(trackingProvider);
        GoogleSearchRankTracking(trackingProvider);
        TrackedEventCountTracking(trackingProvider);
        SocialTracking();
        PollTracking(trackingProvider);
        MediaConsumptionTracking(trackingProvider);
        NewsletterSubscriptionTracking(trackingProvider);
        NewsletterConsumptionTracking(trackingProvider);

        return { trackingProvider: trackingProvider };

    }
);