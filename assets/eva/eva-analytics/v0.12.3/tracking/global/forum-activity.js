define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/shims/object'], function(TrackingBase, InteractionData, CustomVariable) {

    'use strict';

    function ForumActivity(trackingProvider, universalVariable) {

        if (!(this instanceof ForumActivity)) {
            return new ForumActivity(trackingProvider, universalVariable);
        }
        TrackingBase.call(this, trackingProvider);

        this.performTracking(universalVariable);

    }

    ForumActivity.prototype = Object.create(TrackingBase.prototype);

    ForumActivity.prototype.constructor = ForumActivity;

    ForumActivity.prototype.performTracking = function(universalVariable) {

        var customVariable,
            interactionData,
            intForumPosts;

        if (typeof universalVariable.forumPosts === 'number') {
            intForumPosts = parseInt(universalVariable.forumPosts, 10);
            customVariable = new CustomVariable(10, 'Forum Posts', intForumPosts, 1);
            this.trackingProvider.setCustomVariable(customVariable);
            interactionData = new InteractionData('Forum', 'Post', undefined, intForumPosts);
            this.trackEvent(interactionData);
        }

    }

    return ForumActivity;

});