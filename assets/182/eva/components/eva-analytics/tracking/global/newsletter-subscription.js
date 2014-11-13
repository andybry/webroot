define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/cookie', 'eva-utils/js/shims/object'], function($, TrackingBase, InteractionData, CustomVariable, Cookie) {
    
    var cookieName = 'whichnewssubs',
        newsletterCheckboxSelector = '#receive_news',
        registrationFormSelector = '#register form';

    function NewsletterSubscriptionTracking(trackingProvider, win) {

        if (!(this instanceof NewsletterSubscriptionTracking)) {
            return new NewsletterSubscriptionTracking(trackingProvider, win);
        }
        TrackingBase.call(this, trackingProvider, win);

        $($.proxy(this.setupTracking, this));

        if (this.isOnEmailRegistrationThankYouPage()) {
            this.performTracking();
        }

    }

    NewsletterSubscriptionTracking.prototype = Object.create(TrackingBase.prototype);

    NewsletterSubscriptionTracking.prototype.constructor = NewsletterSubscriptionTracking;

    NewsletterSubscriptionTracking.prototype.isOnEmailRegistrationThankYouPage = function() {

        return /thank-you\/technology-email-registration/i.test(document.location.href);

    }

    NewsletterSubscriptionTracking.prototype.performTracking = function() {

        var allNewsletters = '',
            cookieValue = Cookie.read(cookieName),
            currentUrl = document.location.pathname,
            customVariable,
            interactionData;

        if (cookieValue === null || !new RegExp(currentUrl, 'i').test(cookieValue)) {
            allNewsletters = cookieValue === null ? currentUrl : cookieValue + ',' + currentUrl;
            customVariable = new CustomVariable(7, 'NewsletterSubscriber', allNewsletters , 1);
            this.trackingProvider.setCustomVariable(customVariable);
            interactionData = new InteractionData('NewsletterSubscribed', currentUrl, '', 0, true);
            this.trackEvent(interactionData);
            Cookie.write(cookieName, allNewsletters, 365, '/');
        }

    }

    NewsletterSubscriptionTracking.prototype.setupTracking = function() {

        // when the registration form is submitted
        $(registrationFormSelector).on('submit', $.proxy(function (e) {
            // check if the email newsletter is checked
            if ($(newsletterCheckboxSelector).is(':checked')) {
                // if it is, do the tracking
                this.performTracking();
                // stop the default action
                e.preventDefault();
                // give the tracking a chance to work
                setTimeout(function() {
                    $(registrationFormSelector).get(0).submit();
                }, 0);
            }
        }, this));

    }

    return NewsletterSubscriptionTracking;

});