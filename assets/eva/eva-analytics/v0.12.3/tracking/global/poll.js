define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function($, TrackingBase, InteractionData) {

    function PollTracking(trackingProvider) {

        if (!(this instanceof PollTracking)) {
            return new PollTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        this.trackPolls();

    }

    PollTracking.prototype = Object.create(TrackingBase.prototype);

    PollTracking.prototype.constructor = PollTracking;

    PollTracking.prototype.trackPolls = function() {
        $($.proxy(function() {
            if ($('.wp-polls-form div.group').length) {
                $('.wp-polls-form input.submit').on('click', $.proxy(function() {        
                    var pollTitle = $('.wp-polls-form div.group legend').text(),
                        polloffSets = $('.widget_polls-widget').offset(),
                        interactionData = new InteractionData('Poll', pollTitle + ' (' + parseInt(polloffSets.top) + '/' + parseInt(polloffSets.left) + ')', $.trim($('[id*="poll-answer"]:checked').parent().text()));
                    this.trackEvent(interactionData);
                }, this));
            }    
        }, this));
    };

    return PollTracking;

});