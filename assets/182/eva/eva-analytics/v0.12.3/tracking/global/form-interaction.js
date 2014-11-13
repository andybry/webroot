define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function($, TrackingBase, InteractionData) {
    
    'use strict';

    var trackableFormSelector = '.is-form-trackable',
        trackableFieldSelector = '.is-trackable';

    function FormInteractionTracking(trackingProvider) {

        if (!(this instanceof FormInteractionTracking)) {
            return new FormInteractionTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        $($.proxy(this.bindFormTrackingEvents, this));
    }

    FormInteractionTracking.prototype = Object.create(TrackingBase.prototype);

    FormInteractionTracking.prototype.constructor = FormInteractionTracking;

    FormInteractionTracking.prototype.bindFormTrackingEvents = function() {
        var $trackedForms = this.getTrackableForms(),
            $formFields = $();

        // form fields within tracked forms
        $trackedForms.each($.proxy(function(index, element) {
            var $form = $(element);
            $formFields = $formFields.add(this.getTrackableFormFields($form));
        }, this));

        // form fields with explicit tracking
        $formFields = $formFields.add($(trackableFieldSelector));

        // bind the focus event
        $formFields.on('focus', $.proxy(this.formField_OnFocus, this));
    }

    FormInteractionTracking.prototype.formField_OnFocus = function(e) {
        this.handleFormFieldEvent($(e.target));
    }

    FormInteractionTracking.prototype.getTrackableFormFields = function($form) {
        return $form.find('button,input,select,textarea');
    }

    FormInteractionTracking.prototype.getTrackableForms = function() {
        return $(trackableFormSelector);
    }

    FormInteractionTracking.prototype.getTrackingDataForFormField = function($element) {
        // get the form field name
        var data = new InteractionData(),
            formFieldIdentifier = this.getFieldIdentifier($element);
        data.category = 'Form usage';
        data.action = document.location.pathname;
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