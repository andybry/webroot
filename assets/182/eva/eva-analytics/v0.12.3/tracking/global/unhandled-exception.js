define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function (TrackingBase, InteractionData){

    function UnhandledExceptionTracking(trackingProvider) {
        if (!(this instanceof UnhandledExceptionTracking)) {
            return new UnhandledExceptionTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        this.existingWindowOnError = window.onerror;

        window.onerror = $.proxy(this.logError, this);
    }

    UnhandledExceptionTracking.prototype = Object.create(TrackingBase.prototype);

    UnhandledExceptionTracking.prototype.constructor = UnhandledExceptionTracking;

    UnhandledExceptionTracking.prototype.logError = function(errorMessage, url, lineNumber) {
        if (errorMessage !== undefined) {
            var trackingData = new InteractionData();
            trackingData.category = 'Exception';
            trackingData.action = 'Application';
            trackingData.label = '[' + url + ' (' + lineNumber + ')] ' + errorMessage;
            trackingData.nonInteraction = true;
            this.trackEvent(trackingData);
        }
        if (typeof this.existingWindowOnError === 'function') {
            return this.existingWindowOnError(errorMessage, url, lineNumber);
        } else {
            return false;
        }
    };

    return UnhandledExceptionTracking;

}); 