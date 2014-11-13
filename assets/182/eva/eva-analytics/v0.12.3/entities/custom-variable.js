define(function() {
    
    'use strict';

    function CustomVariable(slot, name, value, scope) {

        if (!(this instanceof CustomVariable)) {
            return new CustomVariable(slot, name, value, scope);
        } 

        this.slot = slot || undefined;
        this.name = name || '';
        this.value = value || '';
        this.scope = scope || undefined;
        
    }

    return CustomVariable;
    
});