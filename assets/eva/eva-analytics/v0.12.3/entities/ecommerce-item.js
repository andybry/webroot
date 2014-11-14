define(function() {

    'use strict';

    function EcommerceItem(transactionId, sku, name, category, price, quantity) {

        if (!(this instanceof EcommerceItem)) {
            return new EcommerceItem();
        }

        this.transactionId = transactionId || '';
        this.sku = sku || '';
        this.name = name || '';
        this.category = category || '';
        this.price = price || '';
        this.quantity = quantity || '';

    }

    return EcommerceItem;

});