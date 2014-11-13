define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/shims/object'], function (TrackingBase, InteractionData, CustomVariable) {

    'use strict';

    function NewTrialistTracking(trackingProvider, win) {

        if (!(this instanceof NewTrialistTracking)) {
            return new NewTrialistTracking(trackingProvider, win);
        }

        TrackingBase.call(this, trackingProvider, win);

        this.trackNewTrialist();

    }

    NewTrialistTracking.prototype = Object.create(TrackingBase.prototype);

    NewTrialistTracking.prototype.constructor = NewTrialistTracking;

    NewTrialistTracking.prototype.trackNewTrialist = function() {

        if (this.win.universal_variable.trialist !== undefined) {
            var customVariable = new CustomVariable(8, 'trialist', this.win.universal_variable.trialist, 1);
            this.trackingProvider.setCustomVariable(customVariable);
            var interactionData = new InteractionData('Trialist', 'True');
            this.trackEvent(interactionData);
        }

    };

    return NewTrialistTracking;

});