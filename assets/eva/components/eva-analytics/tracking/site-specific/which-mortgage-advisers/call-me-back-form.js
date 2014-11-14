var MortgageCallBack; // nasty global variable

define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function ($, TrackingBase, InteractionData) {

    'use strict';

    // TODO: These selectors are too tightly coupled the structure of the HTML.
    // We should use selectors that are only present for the sake of this tracking.
    var whatToExpectSelector = '#what-expect-link',
        callMeBackSelector = 'div#show-call-back.show-call-back button',
        checkNowSelector = 'button.table-call-back-button', // TODO: Ensure this works because nothing in the demo matches this selector.
        eventNamespace = '.CallMeBackFormTracking';

    // we will make this a singleton
    var current;

    function CallMeBackFormTracking(trackingProvider, win) {

        if (current) {
            return current;
        }
        
        if (!(this instanceof CallMeBackFormTracking)) {
            return new CallMeBackFormTracking(trackingProvider, win);
        }

        TrackingBase.call(this, trackingProvider, win);

        current = this;

    }

    CallMeBackFormTracking.prototype = Object.create(TrackingBase.prototype);

    CallMeBackFormTracking.prototype.constructor = CallMeBackFormTracking;

    CallMeBackFormTracking.prototype.bindTrackingEvents = function () {

        $(whatToExpectSelector).on('click' + eventNamespace, $.proxy(function() {
            var interactionData = new InteractionData();
            interactionData.category = 'What to expect';
            interactionData.action = 'Click';
            this.trackEvent(interactionData);
        }, this));

        $(checkNowSelector).on('click' + eventNamespace, $.proxy(function () {
            var interactionData = new InteractionData('Callback form', 'Lightbox');
            this.trackEvent(interactionData);
        }, this));

    }

    CallMeBackFormTracking.prototype.callMeBackForm_OnOpen = function () {

        var interactionData = new InteractionData('Callback form', 'Right');
        this.trackEvent(interactionData);
        $(callMeBackSelector)
            .off('click' + eventNamespace)
            .on('click' + eventNamespace, $.proxy(this.callMeBackForm_OnClose, this));

    }

    CallMeBackFormTracking.prototype.callMeBackForm_OnClose = function () {

        $(callMeBackSelector).on('click' + eventNamespace, $.proxy(this.callMeBackForm_OnOpen, this));
        
    }

    CallMeBackFormTracking.prototype.startTracking = function() {

        this.bindTrackingEvents();
        this.callMeBackForm_OnClose();

    }

    CallMeBackFormTracking.prototype.stopTracking = function() {

        this.unbindTrackingEvents();
        $(callMeBackSelector).off('click' + eventNamespace);

    }

    CallMeBackFormTracking.prototype.unbindTrackingEvents = function () {

        $(whatToExpectSelector).off('click' + eventNamespace);
        $(checkNowSelector).off('click' + eventNamespace);

    }

    MortgageCallBack = function() {

        var action,
            isLightboxOpen = $('.ui-dialog').is(':visible'),
            isContactUsPage = /^\/contact-us\//i.test(current.win.document.location.pathname),
            interactionData = new InteractionData('Callback completed'),
            label;

        if (isLightboxOpen) {
            action = 'Lightbox';
            label = $('#best-rates-types .on').text() + '-' + $('#callback-mortgage-type>:selected').text() + '-' + $('.ui-dialog-title').last().text();
         } else {
            action = isContactUsPage ? 'ContactUs' : 'Right';
            label = $('#callback-mortgage-type>:selected').text();
        }

        interactionData.action = action;
        interactionData.label = label;

        current.trackEvent(interactionData);

    }

    return CallMeBackFormTracking;

});