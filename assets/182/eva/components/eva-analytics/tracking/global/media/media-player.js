/*
 *
 * This is no where near finished.
 *
 */


define(['eva-analytics/tracking/tracking-base', 'eva-utils/js/shims/object'], function(TrackingBase) {
    
    function MediaPlayerTracking(trackingProvider) {

        if (!(this instanceof MediaPlayerTracking)) {
            return new MediaPlayerTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

    }

    MediaPlayerTracking.prototype = Object.create(TrackingBase.prototype);

    MediaPlayerTracking.prototype.constructor = MediaPlayerTracking;

    return MediaPlayerTracking;

});