define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function (TrackingBase, InteractionData) {

    function SignupReferralTracking(trackingProvider) {

        if (!(this instanceof SignupReferralTracking)) {
            return new SignupReferralTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        this.trackSignUpReferral();

    }

    SignupReferralTracking.prototype = Object.create(TrackingBase.prototype);

    SignupReferralTracking.prototype.constructor = SignupReferralTracking;

    SignupReferralTracking.prototype.trackSignUpReferral = function () {

        if (document.location.href.indexOf('/signup') !== -1) {
            var interactionData = new InteractionData('Last referring page', 'Signup Referral', document.referrer, 0, true);
            this.trackEvent(interactionData);
        }

    }

    return SignupReferralTracking;

});