define(['eva-analytics/tracking/tracking-base', 'eva-utils/js/shims/object'], function(TrackingBase) {

    function SignUpPage(trackingProvider) {

        if (!(this instanceof SignUpPage)) {
            return new SignUpPage(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        $($.proxy(this.bindTrackingEvents, this));

    }


    SignUpPage.prototype = Object.create(TrackingBase.prototype);

    SignUpPage.prototype.constructor = SignUpPage;

    SignUpPage.prototype.bindTrackingEvents = function() {

        $('a[href="#offerSummary"]').on('click', $.proxy(function () {
            _vpv('/offer-summary');
        }, this));

    }
    return SignUpPage;

});