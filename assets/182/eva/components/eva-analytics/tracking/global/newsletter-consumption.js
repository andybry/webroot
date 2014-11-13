define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/cookie', 'eva-utils/js/query-string', 'eva-utils/js/shims/object'], function(TrackingBase, InteractionData, CustomVariable, Cookie, QueryString) {

    var cookieName = 'whichnewsletters';

    function NewsletterConsumptionTracking(trackingProvider, win) {

        if (!(this instanceof NewsletterConsumptionTracking)) {
            return new NewsletterConsumptionTracking(trackingProvider, win);
        }
        TrackingBase.call(this, trackingProvider, win);

        this.performTracking();

    }

    NewsletterConsumptionTracking.prototype = Object.create(TrackingBase.prototype);

    NewsletterConsumptionTracking.prototype.constructor = NewsletterConsumptionTracking;

    NewsletterConsumptionTracking.prototype.performTracking = function() {

        var allNewsletters,
            cookieValue,
            customVariable,
            interactionData,
            campaignName = QueryString.getValue('utm_campaign'),
            isFromNewsletter = QueryString.getValue('utm_medium') === 'email';

        if (campaignName && campaignName.length && isFromNewsletter) {

            allNewsletters = '';
            cookieValue = Cookie.read(cookieName);

            if (cookieValue === null || !new RegExp(campaignName).test(cookieValue)) {
                allNewsletters = cookieValue === null ? campaignName : cookieValue + ',' + campaignName;
                customVariable = new CustomVariable(6, 'NewsletterConsumer', allNewsletters , 1);
                this.trackingProvider.setCustomVariable(customVariable);
                interactionData = new InteractionData('NewsletterConsumed', campaignName, '', 0 , true);
                this.trackEvent(interactionData);
                Cookie.write(cookieName, allNewsletters, 365, '/');
            }

        }

    }

    return NewsletterConsumptionTracking;

});