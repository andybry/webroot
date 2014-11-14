define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function($, TrackingBase, InteractionData) {

    var eventNamespace = '.polltracking';

    function PollTracking(trackingProvider, win) {

        if (!(this instanceof PollTracking)) {
            return new PollTracking(trackingProvider, win);
        }

        TrackingBase.call(this, trackingProvider, win);

    }

    PollTracking.prototype = Object.create(TrackingBase.prototype);

    PollTracking.prototype.constructor = PollTracking;

    PollTracking.prototype.stopTracking = function() {

        $('body').off('click' + eventNamespace);

    };

    PollTracking.prototype.trackPolls = function() {

        $('body').on('click' + eventNamespace, '.wp-polls-form input.submit', $.proxy(function() {
            var pollTitle = $('.wp-polls-form div.group legend').text(),
                polloffSets = $('.widget_polls-widget').offset(),
                interactionData = new InteractionData('Poll', pollTitle + ' (' + parseInt(polloffSets.top) + '/' + parseInt(polloffSets.left) + ')', $.trim($('[id*="poll-answer"]:checked').parent().text()));
            this.trackEvent(interactionData);
        }, this));

    };

    return PollTracking;

});