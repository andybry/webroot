define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-utils/js/shims/object'], function($, TrackingBase) {

    'use strict';

    function MortgageCalculatorTracking(trackingProvider, win) {

        if (!(this instanceof MortgageCalculatorTracking)) {
            return new MortgageCalculatorTracking(trackingProvider, win);
        }

        TrackingBase.call(this, trackingProvider, win);

        $($.proxy(this.bindTrackingEvents, this));

    }

    MortgageCalculatorTracking.prototype = Object.create(TrackingBase.prototype);

    MortgageCalculatorTracking.prototype.constructor = MortgageCalculatorTracking;

    MortgageCalculatorTracking.prototype.bindTrackingEvents = function() {
        var calculateAction = function() {
            var separator = /\/$/.test(this.win.document.location.pathname) ? '' : '/';
            _vpv(this.win.document.location.pathname + separator + 'calculate');
        };
        $('body').on('click', 'input.calculate', $.proxy(calculateAction, this));
    }

    return MortgageCalculatorTracking;

});