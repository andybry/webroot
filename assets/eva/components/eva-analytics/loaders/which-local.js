require(
    [
        'eva-analytics/loaders/common',
        'eva-analytics/tracking/global/forum-activity',
        'eva-analytics/tracking/global/member-generated-content'
    ],
    function (CommonLoader, ForumActivityTracking, MemberGeneratedContentTracking) {

        var trackingProvider = CommonLoader.trackingProvider;

        var forumActivityTracking = ForumActivityTracking(trackingProvider, window);
        forumActivityTracking.processUniversalVariable();
        
        var memberGeneratedContentTracking = MemberGeneratedContentTracking(trackingProvider, window);
        memberGeneratedContentTracking.processUniversalVariable();

    }
);