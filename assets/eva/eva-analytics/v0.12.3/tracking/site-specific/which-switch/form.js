define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/shims/object'], function ($, TrackingBase, InteractionData, CustomVariable) {

    'use strict';

    function FormTracking(trackingProvider) {

        if (!(this instanceof FormTracking)) {
            return new FormTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        $($.proxy(this.setupTracking, this));

        this.processUniversalVariable();

    }

    FormTracking.prototype = Object.create(TrackingBase.prototype);

    FormTracking.prototype.constructor = FormTracking;

    FormTracking.prototype.processUniversalVariable = function() {

        var customVariable,
            interactionData;

        if (typeof window.universal_variable.current_supplier === 'string' && window.universal_variable.current_supplier.length) {
            customVariable = new CustomVariable(30, 'SwitchCurrentSupplier', window.universal_variable.current_supplier, 2);
            this.trackingProvider.setCustomVariable(customVariable);
        }

        if (typeof window.universal_variable.current_tariff === 'string' && window.universal_variable.current_tariff.length) {
            customVariable = new CustomVariable(31, 'SwitchCurrentTariff', window.universal_variable.current_tariff, 2);
            this.trackingProvider.setCustomVariable(customVariable);
        }

        if (window.universal_variable.switch === 'chosen') {
            interactionData = new InteractionData('Switch', window.universal_variable.chosen_supplier + '_' + window.universal_variable.tariff_name, window.universal_variable.annual_saving, parseInt(window.universal_variable.switchID, 10));
            this.trackEvent(interactionData);
        }

    }

    FormTracking.prototype.setupTracking = function() {

        this.setupDropDownOnChangeTracking('#gas-supplier', 'Current Gas Supplier');

        this.setupDropDownOnChangeTracking('#electricity-supplier', 'Current Electricity Supplier');

        this.setupDropDownOnChangeTracking('#supplier', 'Current supplier');

        this.setupDropDownOnChangeTracking('#gas-tariff', 'Current gas tariff');

        this.setupDropDownOnChangeTracking('#electricity-tariff', 'Current electricity tariff');

        this.setupDropDownOnChangeTracking('#single-tariff', 'Current tarrif');

        $('.choose-this > a').on('click', $.proxy(function(e) {
            e.preventDefault();
            var $element = $(e.currentTarget);
            var interactionData = new InteractionData('Switch', 'Chosen tariff and supplier', $element.attr('data-trackervalues'));
            this.trackEvent(interactionData);
            setTimeout(function() {
                document.location = $element.attr('href');               
            }, 0);
        }, this));

    }

    FormTracking.prototype.setupDropDownOnChangeTracking = function (selector, description) {

        $(selector).on('change', $.proxy(function(e) {
            this.trackDropDownState($(e.currentTarget), description);
        }, this));

    }

    FormTracking.prototype.trackDropDownState = function ($element, description) {

        var interactionData = new InteractionData('Switch', description, $element.find('option:selected').text(), parseInt($element.val(), 10));
        this.trackEvent(interactionData);

    }

    return FormTracking;

});