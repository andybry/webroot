define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/shims/object'], function ($, TrackingBase, InteractionData, CustomVariable) {

    'use strict';

    var chooseThisButtonSelector = '.choose-this > a',
        eventNamespace = '.switchformtracking';

    function FormTracking(trackingProvider, win) {

        if (!(this instanceof FormTracking)) {
            return new FormTracking(trackingProvider, win);
        }

        TrackingBase.call(this, trackingProvider, win);

        $($.proxy(this.setupTracking, this));

        this.processUniversalVariable();

    }

    FormTracking.prototype = Object.create(TrackingBase.prototype);

    FormTracking.prototype.constructor = FormTracking;

    FormTracking.prototype.processUniversalVariable = function() {

        var customVariable,
            interactionData;

        if (typeof this.win.universal_variable.currentSupplier === 'string' && this.win.universal_variable.currentSupplier.length) {
            customVariable = new CustomVariable(30, 'SwitchCurrentSupplier', this.win.universal_variable.currentSupplier, 2);
            this.trackingProvider.setCustomVariable(customVariable);
        }

        if (typeof this.win.universal_variable.currentTariff === 'string' && this.win.universal_variable.currentTariff.length) {
            customVariable = new CustomVariable(31, 'SwitchCurrentTariff', this.win.universal_variable.currentTariff, 2);
            this.trackingProvider.setCustomVariable(customVariable);
        }

        if (typeof this.win.universal_variable.currentGasSupplier === 'string' && this.win.universal_variable.currentGasSupplier.length) {
            customVariable = new CustomVariable(32, 'SwitchCurrentGasSupplier', this.win.universal_variable.currentGasSupplier, 2);
            this.trackingProvider.setCustomVariable(customVariable);
        }

        if (typeof this.win.universal_variable.currentGasTariff === 'string' && this.win.universal_variable.currentGasTariff.length) {
            customVariable = new CustomVariable(33, 'SwitchCurrentGasTariff', this.win.universal_variable.currentGasTariff, 2);
            this.trackingProvider.setCustomVariable(customVariable);
        }

        if (typeof this.win.universal_variable.currentElectricitySupplier === 'string' && this.win.universal_variable.currentElectricitySupplier.length) {
            customVariable = new CustomVariable(34, 'SwitchCurrentElectricitySupplier', this.win.universal_variable.currentElectricitySupplier, 2);
            this.trackingProvider.setCustomVariable(customVariable);
        }

        if (typeof this.win.universal_variable.currentElectricityTariff === 'string' && this.win.universal_variable.currentElectricityTariff.length) {
            customVariable = new CustomVariable(35, 'SwitchCurrentElectricityTariff', this.win.universal_variable.currentElectricityTariff, 2);
            this.trackingProvider.setCustomVariable(customVariable);
        }

        if (this.win.universal_variable['switch'] === 'chosen') {
            interactionData = new InteractionData('Switch', this.win.universal_variable.chosen_supplier + '_' + this.win.universal_variable.tariff_name, this.win.universal_variable.annual_saving, parseInt(this.win.universal_variable.switchID, 10), true);
            this.trackEvent(interactionData);
        }

    }

    FormTracking.prototype.setupTracking = function() {

        $('body').on('click' + eventNamespace, chooseThisButtonSelector, $.proxy(function(e) {
            var $element = $(e.currentTarget),
                interactionData = new InteractionData('Switch', 'Chosen supplier and tariff', $element.attr('data-trackervalues'));
            this.trackEvent(interactionData);
            this.followAnchor($element, this.win, e);
        }, this));

    }

    FormTracking.prototype.stopTracking = function() {

        $('body').off('click' + eventNamespace);

    }

    return FormTracking;

});