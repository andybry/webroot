define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/shims/object'], function(TrackingBase, InteractionData, CustomVariable) {

    'use strict';

    function MemberGeneratedContent(trackingProvider, universalVariable) {

        if (!(this instanceof MemberGeneratedContent)) {
            return new MemberGeneratedContent(trackingProvider, universalVariable);
        }
        TrackingBase.call(this, trackingProvider);

        this.performTracking(universalVariable);

    }

    MemberGeneratedContent.prototype = Object.create(TrackingBase.prototype);

    MemberGeneratedContent.prototype.constructor = MemberGeneratedContent;

    MemberGeneratedContent.prototype.performTracking = function (universalVariable) {

        var customVariable,
            interactionData;

        if (universalVariable.MGC !== undefined && universalVariable.user_id !== undefined) {
            customVariable = new CustomVariable(2, 'user_id', universalVariable.user_id , 1);
            this.trackingProvider.setCustomVariable(customVariable);
            interactionData = new InteractionData('MGC', universalVariable.MGC, undefined, 0);
            this.trackEvent(interactionData);
        }

    }

    return MemberGeneratedContent;

});