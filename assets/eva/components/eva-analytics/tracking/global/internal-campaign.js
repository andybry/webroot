define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/query-string', 'eva-utils/js/shims/object'], function($, TrackingBase, InteractionData, QueryString) {

    var eventNameSpace= '.internalcampaigntracking',
        clickEventName= 'click'+eventNameSpace;

    var interactionDataValues = {
        category: 'InternalCampaign',
        label: 'Click',
        nonInteraction: false
    };

    function InternalCampaignTracking(trackingProvider, win) {

        if (!(this instanceof InternalCampaignTracking)) {
            return new InternalCampaignTracking(trackingProvider, win);
        }

        TrackingBase.call(this, trackingProvider, win);

        $($.proxy(this.setupTracking, this));

        this.performOnLoadTracking();

    }

    InternalCampaignTracking.prototype = Object.create(TrackingBase.prototype);

    InternalCampaignTracking.prototype.constructor = InternalCampaignTracking;

    InternalCampaignTracking.prototype.handleRedirect = function (e) {

        this.followAnchor($(e.currentTarget), this.win, e);

    }

    InternalCampaignTracking.prototype.performOnLoadTracking = function() {

        function getInteractionDataForQueryString(queryString) {

            var interactionData;

            if (QueryString.containsKey('intcmp', queryString)) {
                interactionData = new InteractionData(interactionDataValues.category, QueryString.getValue('intcmp', queryString), document.referrer, undefined, true);
            }

            return interactionData;

        }

        var interactionData = getInteractionDataForQueryString(this.win.document.location.search) || getInteractionDataForQueryString(this.win.document.location.hash);

        if (interactionData) {
            this.trackEvent(interactionData);
        }

    };

    InternalCampaignTracking.prototype.setupTracking = function () {

        $('body').on(clickEventName, 'a[href*="adtech"]:not(.not-trackable)', $.proxy(function(e) {

            var $this = $(e.currentTarget),
                splitlink = $this.attr('href').split(';'),
                interactionData = new InteractionData(interactionDataValues.category, interactionDataValues.label, splitlink[splitlink.length - 1].substr(5), $this.parent().offset().top, interactionDataValues.nonInteraction);
            this.trackEvent(interactionData);
            this.handleRedirect(e);
            
        }, this));

        $('body').on(clickEventName, 'div#homepage_articles div.article-title a, a.newsboard_link', $.proxy(function(e) {

            var interactionData = new InteractionData(interactionDataValues.category, interactionDataValues.label, $(e.currentTarget).text(), 0, interactionDataValues.nonInteraction);
            this.trackEvent(interactionData);
            this.handleRedirect(e);

        }, this));

    };

    InternalCampaignTracking.prototype.stopTracking = function(){
        $('body').off(clickEventName);
    }

    return InternalCampaignTracking;

});