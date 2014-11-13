define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function(TrackingBase, InteractionData) {

    'use strict';

    function TrackedEventCountTracking(trackingProvider) {

        if (!(this instanceof TrackedEventCountTracking)) {
            return new TrackedEventCountTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        this.logTrackedEventCount();
    }

    TrackedEventCountTracking.prototype = Object.create(TrackingBase.prototype);

    TrackedEventCountTracking.prototype.constructor = TrackedEventCountTracking;

    TrackedEventCountTracking.prototype.logTrackedEventCount = function () {

        var br = new RegExp('\\d+\\.(\\d+)\\.\\d+\\.\\d+'),
            hits = HCreadCookie('__utmb') !== null ? parseInt(HCreadCookie('__utmb').match(br)[1], 10) : 0, 
            last = HCreadCookie('ga_hits') !== null ? parseInt(HCreadCookie('ga_hits'), 10) : 0,
            lowerB = hits > 0 ? Math.floor(hits / 100) : 0,
            upperB = hits > 0 ? Math.ceil(hits / 100) : 0,
            interactionData;

        if (hits - last >= 100) {
            HCcreateCookie('ga_hits', lowerB * 100, 365);
            interactionData = new InteractionData('Hitcounter', 'hits', lowerB * 100, parseInt(lowerB * 100, 10), true);
            this.trackEvent(interactionData);
        }

    }

    function HCreadCookie(name) {
        var nameEQ = name + '=',
            ca = document.cookie.split(';'),
            caCount = ca.length,
            i = 0,
            c;
        for (; i < caCount; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
    
    function HCcreateCookie(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();
        } else {
            expires = '';
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }

    return TrackedEventCountTracking;

});