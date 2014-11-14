var _validationErrors;

define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function($, TrackingBase, InteractionData) {

    'use strict';

    var current;

    function ValidationErrorTracking(trackingProvider) {

        if (current) {
            return current;
        }

        if (!(this instanceof ValidationErrorTracking)) {
            return new ValidationErrorTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        current = this;

    }

    ValidationErrorTracking.prototype = Object.create(TrackingBase.prototype);

    ValidationErrorTracking.prototype.constructor = ValidationErrorTracking;

    _validationErrors = function(classNameOverride) {

        var $invalidFields, invalidFieldIdentifiers, i, invalidFieldsCount;

        $invalidFields = $('.' + (classNameOverride || 'validationError'));
        invalidFieldsCount = $invalidFields.length;

        if (invalidFieldsCount === 0) {
            return;
        }

        invalidFieldIdentifiers = [];
        for (i = 0; i < invalidFieldsCount; i++) {
            invalidFieldIdentifiers.push(current.getFieldIdentifier($invalidFields.eq(i)));
        }

        var trackingData = new InteractionData();
        trackingData.category = 'ValidationError';
        trackingData.action = invalidFieldIdentifiers.join(' ');
        trackingData.label = 'Error';
        trackingData.value = invalidFieldsCount;
        trackingData.nonInteraction = true;
        current.trackEvent(trackingData);

    }

    return ValidationErrorTracking;

});