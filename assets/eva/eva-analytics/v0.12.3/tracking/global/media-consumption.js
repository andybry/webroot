define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function ($, TrackingBase, InteractionData) {

    function MediaConsumptionTracking(trackingProvider) {

        if (!(this instanceof MediaConsumptionTracking)) {
            return new MediaConsumptionTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        $($.proxy(this.setupTracking, this));

    }

    MediaConsumptionTracking.prototype = Object.create(TrackingBase.prototype);

    MediaConsumptionTracking.prototype.constructor = MediaConsumptionTracking;

    MediaConsumptionTracking.prototype.setupTracking = function () {

        $('a[href*=".pdf"], a[href*=".doc"], a[href*=".mp4"], a[href*=".mp3"], a[href*=".xls"], a[href*=".png"], a[href*=".jpeg"], a[href*=".jpg"], a[href*=".gif"]').on('mousedown', $.proxy(function(e) {
            var interactionData = new InteractionData('Link', 'download', $(e.currentTarget).attr('href'));
            this.trackEvent(interactionData);
        }, this));

        $('a[href^="mailto:"]').on('click', $.proxy(function() {
            var interactionData = new InteractionData('Button', 'Email', document.location.pathname);
            this.trackEvent(interactionData);
        }, this));

        $('[data-analytics*="print"]').on('click', $.proxy(function() {
            var interactionData = new InteractionData('Button', 'Print', document.location.pathname);
            this.trackEvent(interactionData);
        }, this));

        $('.print-dialog').on('click', $.proxy(function() {
            var interactionData = new InteractionData('Offer Summary', 'Print', document.location.pathname);
            this.trackEvent(interactionData);
        }, this));

    }

    return MediaConsumptionTracking;

});