define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/shims/object'], function(TrackingBase, InteractionData, CustomVariable) {

    'use strict';

    function ForumActivity(trackingProvider, win) {

        if (!(this instanceof ForumActivity)) {
            return new ForumActivity(trackingProvider, win);
        }

        TrackingBase.call(this, trackingProvider, win);

    }

    ForumActivity.prototype = Object.create(TrackingBase.prototype);

    ForumActivity.prototype.constructor = ForumActivity;

    ForumActivity.prototype.processUniversalVariable = function() {

        var customVariable,
            interactionData,
            intForumPosts;

        if (typeof this.win.universal_variable.forumPosts === 'number') {
            intForumPosts = parseInt(this.win.universal_variable.forumPosts, 10);
            customVariable = new CustomVariable(10, 'Forum Posts', intForumPosts, 1);
            this.trackingProvider.setCustomVariable(customVariable);
            interactionData = new InteractionData('Forum', 'Post', undefined, intForumPosts, true);
            this.trackEvent(interactionData);
        }

    }

    return ForumActivity;

});