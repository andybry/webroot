require(
    [
        'eva-analytics/loaders/common',
        'eva-analytics/tracking/global/forum-activity',
        'eva-analytics/tracking/global/member-generated-content',
        'eva-analytics/tracking/site-specific/which-conversation/user-rating'
    ],
    function (CommonLoader, ForumActivityTracking, MemberGeneratedContentTracking, UserRatingTracking) {

        var trackingProvider = CommonLoader.trackingProvider;

        var forumActivityTracking = ForumActivityTracking(trackingProvider, window);
        forumActivityTracking.processUniversalVariable();

        var memberGeneratedContentTracking = MemberGeneratedContentTracking(trackingProvider, window);
        memberGeneratedContentTracking.processUniversalVariable();

        UserRatingTracking(trackingProvider, window);

    }
);