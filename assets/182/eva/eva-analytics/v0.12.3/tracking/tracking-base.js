define(function() {
    'use strict';

    function TrackingBase(trackingProvider) {
        if (!(this instanceof TrackingBase)) {
            return new TrackingBase(trackingProvider);
        }
        this.trackingProvider = trackingProvider;
        this.checkProviderSpecified();
    };

    TrackingBase.prototype.checkProviderSpecified = function() {
        if (this.trackingProvider === undefined) {
            throw 'You need to specify a tracking provider';
        }
    }

    TrackingBase.prototype.getFieldIdentifier = function($field) {
        return $field.attr('id') || $field.attr('name');
    }

    TrackingBase.prototype.trackEvent = function(data) {
        if (this.trackingProvider !== undefined && typeof this.trackingProvider.trackEvent === 'function') {
            this.trackingProvider.trackEvent(data);
        }
    }

    return TrackingBase;
});