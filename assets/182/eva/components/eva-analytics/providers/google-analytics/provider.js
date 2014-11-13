var _vpv;

define(['eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable'], function (InteractionData, CustomVariable) {

    'use strict';

    var isDev = /\.local$/.test(location.hostname);

    function GoogleAnalyticsProvider() {
        if (!(this instanceof GoogleAnalyticsProvider)) {
            return new GoogleAnalyticsProvider();
        }
    }

    GoogleAnalyticsProvider.prototype.ecommerceAddItem = function (itemData) {
        window._gaq.push([
            'whichGAP._addItem',
            itemData.transactionId.toString ? itemData.transactionId.toString() : undefined,
            itemData.sku.toString ? itemData.sku.toString() : undefined,
            itemData.name.toString ? itemData.name.toString() : undefined,
            itemData.category.toString ? itemData.category.toString() : undefined,
            itemData.price.toString ? itemData.price.toString() : undefined,
            itemData.quantity.toString ? itemData.quantity.toString() : undefined
        ]);
        if (isDev) {
            console.log('Tracking ecommerce transaction item. Transaction ID: ' + itemData.transactionId + ', SKU: ' + itemData.sku + ', Name: ' + itemData.name + ', Category: ' + itemData.category + ', Price: ' + itemData.price + ', Quantity: ' + itemData.quantity);
        }
    }

    GoogleAnalyticsProvider.prototype.ecommerceAddTransaction = function (transactionData) {
        window._gaq.push([
            'whichGAP._addTrans',
            transactionData.transactionId.toString ? transactionData.transactionId.toString() : undefined,
            transactionData.affiliation.toString ? transactionData.affiliation.toString() : undefined,
            transactionData.total.toString ? transactionData.total.toString() : undefined,
            transactionData.tax.toString ? transactionData.tax.toString() : undefined,
            transactionData.shipping.toString ? transactionData.shipping.toString() : undefined,
            transactionData.city.toString ? transactionData.city.toString() : undefined,
            transactionData.state.toString ? transactionData.state.toString() : undefined,
            transactionData.country.toString ? transactionData.country.toString() : undefined
        ]);
        if (isDev) {
            console.log('Tracking ecommerce transaction. Transaction ID: ' + transactionData.transactionId + ', Affiliation: ' + transactionData.affiliation + ', Total: ' + transactionData.total + ', Tax: ' + transactionData.tax + ', Shipping: ' + transactionData.shipping + ', City: ' + transactionData.city + ', State: ' + transactionData.state + ', Country: ' + transactionData.country);
        }
    }

    GoogleAnalyticsProvider.prototype.ecommerceTrackTransaction = function () {
        window._gaq.push(['whichGAP._trackTrans']);
        if (isDev) {
            console.log('Transaction tracked.');
        }
    }

    GoogleAnalyticsProvider.prototype.setCustomVariable = function (customVariable) {
        // cleanse input
        var parsedSlot = parseInt(customVariable.slot, 10);
        if (isNaN(parsedSlot) || parsedSlot < 1 || parsedSlot > 50) {
            console.warn('Attempted to set a custom variable with an invalid slot (' + parsedSlot + ')');
        }
        var sanitisedSlot = parsedSlot;
        var parsedScope = parseInt(customVariable.scope, 10);
        if (customVariable.scope !== undefined && customVariable.scope !== null && (isNaN(parsedScope) || parsedScope < 1 || parsedScope > 3)) {
            throw 'Attemped to set a custom variable with an invalid scope (' + parsedScope + ')';
        }
        var sanitisedScope = (parsedScope === 1 || parsedScope === 2) ? parsedScope : 3;
        // tell google about it
        window._gaq.push(['whichGAP._setCustomVar', sanitisedSlot, customVariable.name, customVariable.value, sanitisedScope]);
        // debug info
        if (isDev) {
            console.log('Set custom variable: ' + sanitisedSlot + ' | ' + customVariable.name + ' | ' + customVariable.value + ' | ' + sanitisedScope);
        }
    }

    GoogleAnalyticsProvider.prototype.trackEvent = function(interactionData) {
        
        // cleanse input
        var parsedValue = parseInt(interactionData.value, 10),
            sanitisedValue = isNaN(parsedValue) ? 0 : parsedValue,
            sanitisedLabel;
        if (interactionData.label === undefined || interactionData.label === null) {
            sanitisedLabel = '';
        } else if (typeof interactionData.label === 'string') {
            sanitisedLabel = interactionData.label;
        } else {
            sanitisedLabel = interactionData.label.toString();
        }

        // tell google about it
        window._gaq.push(['whichGAP._trackEvent', interactionData.category, interactionData.action, sanitisedLabel, sanitisedValue, interactionData.nonInteraction]);

        // debug info
        if (isDev) {
            console.log('Track event: ' + interactionData.category + ' | ' + interactionData.action + ' | ' + sanitisedLabel + ' | ' + sanitisedValue + ' | ' + interactionData.nonInteraction);
        }

    }

    GoogleAnalyticsProvider.prototype.trackPageView = function (url) {
        var trackerObjectMethodName = 'whichGAP._trackPageview';
        if (typeof url === 'string' && url.length) {
            window._gaq.push([trackerObjectMethodName, url]);
            if (isDev) {
                console.log('Tracking virtual page view. Url: ' + url);
            }
        } else {
            window._gaq.push([trackerObjectMethodName]);
            if (isDev) {
                console.log('Tracking virtual page view. No URL specified.');
            }
        }
    };

    return GoogleAnalyticsProvider;

});
