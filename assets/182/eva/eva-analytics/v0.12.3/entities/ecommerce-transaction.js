define(function() {

    'use strict';

    function EcommerceTransaction(transactionId, affiliation, total, tax, shipping, city, state, country) {

        if (!(this instanceof EcommerceTransaction)) {
            return new EcommerceTransaction();
        }

        this.transactionId = transactionId || '';
        this.affiliation = affiliation || '';
        this.total = total || '';
        this.tax = tax || '';
        this.shipping = shipping || '';
        this.city = city || '';
        this.state = state || '';
        this.country = country || '';

    }

    return EcommerceTransaction;

});