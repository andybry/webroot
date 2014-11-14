define(function() {
    
    'use strict';

    function InteractionData(category, action, label, value, nonInteraction) {
        if (!(this instanceof InteractionData)) {
            return new InteractionData();
        } 

        this.category = category || '';
        this.action = action || '';
        this.label = label || undefined;
        this.value = value || undefined; // integer only for Google Analytics provider
        this.nonInteraction = nonInteraction || false;
    }

    return InteractionData;
    
});