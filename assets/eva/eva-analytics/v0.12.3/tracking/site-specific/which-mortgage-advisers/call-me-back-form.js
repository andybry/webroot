var MortgageCallBack; // nasty global variable

define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function ($, TrackingBase, InteractionData) {

    'use strict';

    // TODO: These selectors are too tightly coupled the structure of the HTML.
    // We should use selectors that are only present for the sake of this tracking.
    var whatToExpectSelector = '#what-expect-link',
        callMeBackSelector = 'div#show-call-back.show-call-back button',
        checkNowSelector = 'button.table-call-back-button'; // TODO: Ensure this works because nothing in the demo matches this selector.

    // we will make this a singleton
    var current;

    function CallMeBackFormTracking(trackingProvider) {

        if (current) {
            return current;
        }
        
        if (!(this instanceof CallMeBackFormTracking)) {
            return new CallMeBackFormTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        $($.proxy(this.bindTrackingEvents, this));

        this.callMeBackForm_OnClose();

        current = this;

    }

    CallMeBackFormTracking.prototype = Object.create(TrackingBase.prototype);

    CallMeBackFormTracking.prototype.constructor = CallMeBackFormTracking;

    CallMeBackFormTracking.prototype.bindTrackingEvents = function () {

        $(whatToExpectSelector).on('click', $.proxy(function() {
            var interactionData = new InteractionData();
            interactionData.category = 'What to expect';
            interactionData.action = 'Click';
            interactionData.nonInteraction = true;
            this.trackEvent(interactionData);
        }, this));

        $(checkNowSelector).on('click', $.proxy(function () {
            var interactionData = new InteractionData('Callback form', 'Lightbox');
            this.trackEvent(interactionData);
        }, this));

    }

    CallMeBackFormTracking.prototype.callMeBackForm_OnOpen = function () {

        var interactionData = new InteractionData('Callback form', 'Right');
        this.trackEvent(interactionData);
        $(callMeBackSelector)
            .off('click.CallMeBackFormTracking')
            .on('click.CallMeBackFormTracking', $.proxy(this.callMeBackForm_OnClose, this));

    }

    CallMeBackFormTracking.prototype.callMeBackForm_OnClose = function () {

        $(callMeBackSelector).on('click.CallMeBackFormTracking', $.proxy(this.callMeBackForm_OnOpen, this));
        
    }

    MortgageCallBack = function() {

        var action,
            isLightboxOpen = $('.ui-dialog').is(':visible'),
            isContactUsPage = /^\/contact-us\//i.test(document.location.pathname),
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