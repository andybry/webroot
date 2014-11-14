define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function($, TrackingBase, InteractionData) {
    
    'use strict';

    var formFieldSelectors = ['button','input','select','textarea'],
        trackableFieldSelector = '.is-trackable',
        trackableFormSelector = '.is-form-trackable';


    function FormInteractionTracking(trackingProvider, win) {

        if (!(this instanceof FormInteractionTracking)) {
            return new FormInteractionTracking(trackingProvider, win);
        }

        TrackingBase.call(this, trackingProvider, win);

        $($.proxy(this.bindFormTrackingEvents, this));
    }

    FormInteractionTracking.prototype = Object.create(TrackingBase.prototype);

    FormInteractionTracking.prototype.constructor = FormInteractionTracking;

    FormInteractionTracking.prototype.bindFormTrackingEvents = function() {
        var formFieldSelector = '',
            formFieldSelectorsCount = formFieldSelectors.length;

        for (var i = 0; i < formFieldSelectorsCount; i++) {
            // inside a tracked form
            formFieldSelector += (formFieldSelector.length ? ',' : '') +  trackableFormSelector + ' ' + formFieldSelectors[i];
            // independently trackable
            formFieldSelector += ',' + formFieldSelectors[i] + trackableFieldSelector;
        }

        // bind events
        $('body')
            .on('blur', formFieldSelector, $.proxy(this.formField_OnBlur, this))
            .on('click', formFieldSelector, $.proxy(this.formField_OnClick, this))
            .on('focus', formFieldSelector, $.proxy(this.formField_OnFocus, this));
    }

    FormInteractionTracking.prototype.formField_OnBlur = function(e) {
        $(e.currentTarget).removeAttr('data-hasfocus');
    }

    FormInteractionTracking.prototype.formField_OnClick = function(e) {
        var $formField = $(e.currentTarget);
        // if the field already has focus, do not track this interaction as it will create a duplicate event
        if ($formField.attr('data-hasfocus') === 'true') {
            return;
        }
        this.handleFormFieldEvent($formField);
    }

    FormInteractionTracking.prototype.formField_OnFocus = function(e) {
        var $formField = $(e.currentTarget);
        $formField.attr('data-hasfocus', 'true');
        this.handleFormFieldEvent($formField);
    }

    FormInteractionTracking.prototype.getTrackingDataForFormField = function($element) {
        // get the form field name
        var data = new InteractionData(),
            formFieldIdentifier = this.getFieldIdentifier($element);
        data.category = 'Form usage';
        data.action = this.win.document.location.pathname;
        if (typeof formFieldIdentifier === 'string') {
            data.label = formFieldIdentifier;
        }
        data.nonInteraction = true;
        return data;
    }

    FormInteractionTracking.prototype.handleFormFieldEvent = function ($formField) {
        var trackingData = this.getTrackingDataForFormField($formField);
        this.trackEvent(trackingData);
    }

    return FormInteractionTracking;

});