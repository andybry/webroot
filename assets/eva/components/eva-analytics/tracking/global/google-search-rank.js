define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function($, TrackingBase, InteractionData) {

    function GoogleSearchRankTracking(trackingProvider, win) {

        if (!(this instanceof GoogleSearchRankTracking)) {
            return new GoogleSearchRankTracking(trackingProvider, win);
        }

        TrackingBase.call(this, trackingProvider, win);

    }

    GoogleSearchRankTracking.prototype = Object.create(TrackingBase.prototype);

    GoogleSearchRankTracking.prototype.constructor = GoogleSearchRankTracking;

    GoogleSearchRankTracking.prototype.trackReferrer = function() {

        var referrer = this.win.document.referrer,
            r,
            rank,
            kw,
            keyword,
            interactionData;

        if (referrer.length && /google\./i.test(referrer) && /cd=/i.test(referrer) && /q=/i.test(referrer)) {

            r = referrer.match(/cd=(.*?)&/);

            if (r === null || r.length < 2) {
                return;
            } 

            rank = parseInt(r[1]);
            kw = referrer.match(/q=(.*?)&/);

            if (kw.length > 1 && kw[1].length !== 0) {
                keyword  = decodeURI(kw[1]);
            } else {
                keyword = '(not provided)';
            }

            var interactionData = new InteractionData('RankTracker', keyword, this.win.document.location.pathname, rank, true);
            this.trackEvent(interactionData);

        }

    }

    return GoogleSearchRankTracking;

});