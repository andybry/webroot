define(
    [
        'eva-analytics/loaders/common',
        'eva-analytics/tracking/global/forum-activity',
        'eva-analytics/tracking/global/member-generated-content'
    ],
    function (CommonLoader, ForumActivityTracking, MemberGeneratedContentTracking) {

        var trackingProvider = CommonLoader.trackingProvider;
        ForumActivityTracking(trackingProvider, universal_variable);
        MemberGeneratedContentTracking(trackingProvider, universal_variable);

    }
);