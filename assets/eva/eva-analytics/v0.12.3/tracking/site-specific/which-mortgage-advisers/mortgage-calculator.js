define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-utils/js/shims/object'], function($, TrackingBase) {

    'use strict';

    function MortgageCalculatorTracking(trackingProvider) {
        if (!(this instanceof MortgageCalculatorTracking)) {
            return new MortgageCalculatorTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        $($.proxy(this.bindTrackingEvents, this));
    }

    MortgageCalculatorTracking.prototype = Object.create(TrackingBase.prototype);

    MortgageCalculatorTracking.prototype.constructor = MortgageCalculatorTracking;

    MortgageCalculatorTracking.prototype.bindTrackingEvents = function() {
        $('input.calculate').click(function() {
            var separator = /\/$/.test(location.pathname) ? '' : '/';
            _vpv(location.pathname + separator + 'calculate');
        });
    }

    return MortgageCalculatorTracking;

});