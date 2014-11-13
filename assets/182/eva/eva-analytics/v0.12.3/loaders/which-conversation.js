define(
    [
        'eva-analytics/loaders/common',
        'eva-analytics/tracking/global/forum-activity',
        'eva-analytics/tracking/global/member-generated-content',
        'eva-analytics/tracking/site-specific/which-conversation/user-rating'
    ],
    function (CommonLoader, ForumActivityTracking, MemberGeneratedContentTracking, UserRatingTracking) {

        var trackingProvider = CommonLoader.trackingProvider;
        ForumActivityTracking(trackingProvider, universal_variable);
        MemberGeneratedContentTracking(trackingProvider, universal_variable);
        UserRatingTracking(trackingProvider);

    }
);