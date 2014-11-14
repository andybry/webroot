define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/query-string', 'eva-utils/js/shims/object'], function($, TrackingBase, InteractionData, QueryString) {

    var interactionDataValues = {
        category: 'InternalCampaign',
        label: 'Click',
        nonInteraction: false
    };

    function InternalCampaignTracking(trackingProvider) {

        if (!(this instanceof InternalCampaignTracking)) {
            return new InternalCampaignTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        $($.proxy(this.setupTracking, this));

        this.performOnLoadTracking();

    }

    InternalCampaignTracking.prototype = Object.create(TrackingBase.prototype);

    InternalCampaignTracking.prototype.constructor = InternalCampaignTracking;

    InternalCampaignTracking.prototype.performOnLoadTracking = function() {

        function getInteractionDataForQueryString(queryString) {

            var interactionData;

            if (QueryString.containsKey('intcmp', queryString)) {
                interactionData = new InteractionData(interactionDataValues.category, QueryString.getValue('intcmp', queryString), document.referrer, undefined, true);
            }

            return interactionData;

        }

        var interactionData = getInteractionDataForQueryString(document.location.search) || getInteractionDataForQueryString(document.location.hash);

        if (interactionData) {
            this.trackEvent(interactionData);
        }

    }

    InternalCampaignTracking.prototype.setupTracking = function () {

        $('a[href*="adtech"]:not(.not-trackable)').on('click', $.proxy(function(e) {
            e.preventDefault();

            var $this = $(e.currentTarget),
                href = $this.attr('href'),
                splitlink = href.split(';'),
                offsets = $this.parent().offset(),
                interactionData = new InteractionData(interactionDataValues.category, interactionDataValues.label, splitlink[splitlink.length - 1].substr(5), offsets.top, interactionDataValues.nonInteraction);

            this.trackEvent(interactionData);

            setTimeout(function() {
                document.location = href;
            }, 250);
        }, this));

        $('div#homepage_articles div.article-title a, a.newsboard_link').on('click', $.proxy(function(e) {
            e.preventDefault();

            var $this = $(e.currentTarget),
                href = $this.attr('href'),
                interactionData = new InteractionData(interactionDataValues.category, interactionDataValues.label, $this.text(), 0, interactionDataValues.nonInteraction);

            this.trackEvent(interactionData);

            setTimeout(function() {
                document.location = href;
            }, 250);
        }, this));

    }

    return InternalCampaignTracking;

});