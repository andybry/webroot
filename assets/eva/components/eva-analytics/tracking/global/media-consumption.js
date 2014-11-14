define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function ($, TrackingBase, InteractionData) {

    var eventNamespace = '.mediaconsumptiontracking';

    function MediaConsumptionTracking(trackingProvider, win) {

        if (!(this instanceof MediaConsumptionTracking)) {
            return new MediaConsumptionTracking(trackingProvider, win);
        }
        TrackingBase.call(this, trackingProvider, win);

        $($.proxy(this.setupTracking, this));

    }

    MediaConsumptionTracking.prototype = Object.create(TrackingBase.prototype);

    MediaConsumptionTracking.prototype.constructor = MediaConsumptionTracking;

    MediaConsumptionTracking.prototype.setupTracking = function () {

        $('body').on('click' + eventNamespace, 'a[href*=".pdf"], a[href*=".doc"], a[href*=".mp4"], a[href*=".mp3"], a[href*=".xls"], a[href*=".png"], a[href*=".jpeg"], a[href*=".jpg"], a[href*=".gif"]', $.proxy(function(e) {
            var $element = $(e.currentTarget),
                interactionData = new InteractionData('Link', 'download', $element.attr('href'));
            this.trackEvent(interactionData);
            this.followAnchor($element, this.win, e);
        }, this));

        $('body').on('click' + eventNamespace, 'a[href^="mailto:"]', $.proxy(function() {
            var interactionData = new InteractionData('Button', 'Email', this.win.document.location.pathname);
            this.trackEvent(interactionData);
        }, this));

        $('body').on('click' + eventNamespace, '[data-analytics*="print"]', $.proxy(function() {
            var interactionData = new InteractionData('Button', 'Print', this.win.document.location.pathname);
            this.trackEvent(interactionData);
        }, this));

        $('body').on('click' + eventNamespace, '.print-dialog', $.proxy(function() {
            var interactionData = new InteractionData('Offer Summary', 'Print', this.win.document.location.pathname);
            this.trackEvent(interactionData);
        }, this));

    }

    MediaConsumptionTracking.prototype.stopTracking = function() {

        $('body').off('click' + eventNamespace);

    }

    return MediaConsumptionTracking;

});