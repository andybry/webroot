define(function() {

    'use strict';

    function TrackingBase(trackingProvider, win) {
        if (!(this instanceof TrackingBase)) {
            return new TrackingBase(trackingProvider, win);
        }
        this.trackingProvider = trackingProvider;
        this.checkProviderSpecified();
        this.win = win;
        this.checkWindowSpecified();
    };

    TrackingBase.prototype.checkProviderSpecified = function() {
        if (this.trackingProvider === undefined) {
            throw 'You need to specify a tracking provider';
        }
    }

    TrackingBase.prototype.checkWindowSpecified = function() {
        if (this.win === undefined) {
            throw 'You need to specify the window object';
        }
    }

    TrackingBase.prototype.followAnchor = function($anchor, win, event) {

        var dataTrackerValues,
            openInNewWindow,
            targetAttribute,
            url;

        if (!$anchor.hasClass('do-not-redirect')) {

            targetAttribute = $anchor.attr('target');
            dataTrackerValues = $anchor.attr('data-trackervalues');
            openInNewWindow = targetAttribute !== undefined || (dataTrackerValues !== undefined && /NewTab/.test(dataTrackerValues));
            url = $anchor.attr('href');

            // if the link should open in a new window/tab
            if (openInNewWindow) {

                // if the link won't open in a new window/tab (natively)
                if (targetAttribute === undefined) {

                    // open it in a new window
                    win.open(url);

                }

            } else { // link will be opened in current window/tab

                // stop the default link behaviour from occurring
                if (event && event.preventDefault) {
                    event.preventDefault();
                }

                // navigate to the link after a brief pause
                setTimeout(function() {
                    win.document.location = url;               
                }, 100);

            }

        }

    }

    TrackingBase.prototype.getFieldIdentifier = function($field) {
        return $field.attr('id') || $field.attr('name');
    }

    TrackingBase.prototype.trackEvent = function(data) {
        if (this.trackingProvider !== undefined && typeof this.trackingProvider.trackEvent === 'function') {
            this.trackingProvider.trackEvent(data);
        }
    }

    return TrackingBase;
});