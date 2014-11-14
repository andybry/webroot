define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/cookie', 'eva-utils/js/shims/object'], function(TrackingBase, InteractionData, Cookie) {

    'use strict';

    function TrackedEventCountTracking(trackingProvider, win) {

        if (!(this instanceof TrackedEventCountTracking)) {
            return new TrackedEventCountTracking(trackingProvider, win);
        }
        
        TrackingBase.call(this, trackingProvider, win);

    }

    TrackedEventCountTracking.prototype = Object.create(TrackingBase.prototype);

    TrackedEventCountTracking.prototype.constructor = TrackedEventCountTracking;

    TrackedEventCountTracking.prototype.logTrackedEventCount = function () {

        var br = new RegExp('\\d+\\.(\\d+)\\.\\d+\\.\\d+'),
            hits = Cookie.read('__utmb', this.win) !== null ? parseInt(Cookie.read('__utmb', this.win).match(br)[1], 10) : 0, 
            last = Cookie.read('ga_hits', this.win) !== null ? parseInt(Cookie.read('ga_hits', this.win), 10) : 0,
            lowerB = hits > 0 ? Math.floor(hits / 100) : 0,
            interactionData;

        if (hits - last >= 100) {
            Cookie.write('ga_hits', lowerB * 100, 365, '/', this.win);
            interactionData = new InteractionData('Hitcounter', 'hits', lowerB * 100, parseInt(lowerB * 100, 10), true);
            this.trackEvent(interactionData);
        }

    }

    return TrackedEventCountTracking;

});