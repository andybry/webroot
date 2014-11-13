define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/shims/object'], function(TrackingBase, InteractionData, CustomVariable) {

    'use strict';

    function MemberGeneratedContent(trackingProvider, win) {

        if (!(this instanceof MemberGeneratedContent)) {
            return new MemberGeneratedContent(trackingProvider, win);
        }

        TrackingBase.call(this, trackingProvider, win);

    }

    MemberGeneratedContent.prototype = Object.create(TrackingBase.prototype);

    MemberGeneratedContent.prototype.constructor = MemberGeneratedContent;

    MemberGeneratedContent.prototype.processUniversalVariable = function () {

        var customVariable,
            interactionData;

        if (this.win.universal_variable.MGC !== undefined && this.win.universal_variable.user_id !== undefined) {

            customVariable = new CustomVariable(2, 'user_id', this.win.universal_variable.user_id , 1);
            this.trackingProvider.setCustomVariable(customVariable);

            if (this.win.universal_variable.MGCType !== undefined && this.win.universal_variable.MGCLocation !== undefined && this.win.universal_variable.MGCRating !== undefined) {
                interactionData = new InteractionData('MGC - ' + this.win.universal_variable.MGCType, this.win.universal_variable.MGCLocation, this.win.universal_variable.MGC, this.win.universal_variable.MGCRating);
            } else {
                interactionData = new InteractionData('MGC', this.win.universal_variable.MGC);
            }
            interactionData.nonInteraction = true;
            
            this.trackEvent(interactionData);
        }

    }

    return MemberGeneratedContent;

});