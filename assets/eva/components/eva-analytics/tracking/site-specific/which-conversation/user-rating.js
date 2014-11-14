define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function(TrackingBase, InteractionData) {

    function UserRating(trackingProvider, win) {

        if (!(this instanceof UserRating)) {
            return new UserRating(trackingProvider, win);
        }
        
        TrackingBase.call(this, trackingProvider, win);

        $($.proxy(this.bindTrackingEvents, this));

    }

    UserRating.prototype = Object.create(TrackingBase.prototype);

    UserRating.prototype.constructor = UserRating;

    UserRating.prototype.bindTrackingEvents = function() {

        $('.gdthumb').on('click', $.proxy(function(e) {
            var interactionData = new InteractionData('Article Rated');
            if (/up/.test($(e.target).attr('id'))) {
                interactionData.action = 'Up';
                interactionData.value = 1;
            } else {
                interactionData.action = 'Down';
                interactionData.value = -1;
            }
            this.trackEvent(interactionData);
        }, this));

    }

    return UserRating;

});