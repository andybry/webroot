var addthis_config;

define(function () {

    function SocialTracking() {

        if (!(this instanceof SocialTracking)) {
            return new SocialTracking();
        }

        if (window.universal_variable.Social === 'true') {
            addthis_config = {
                data_ga_property: window.universal_variable.whichGAPUA,
                data_ga_social : true,
                data_track_addressbar :true
            };
        }        
    }

    return SocialTracking;

});