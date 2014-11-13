define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function (TrackingBase, InteractionData) {

    function SignupReferralTracking(trackingProvider, win) {
        
        if (!(this instanceof SignupReferralTracking)) {
            return new SignupReferralTracking(trackingProvider, win);
        }

        TrackingBase.call(this, trackingProvider, win);

    }

    SignupReferralTracking.prototype = Object.create(TrackingBase.prototype);

    SignupReferralTracking.prototype.constructor = SignupReferralTracking;

    SignupReferralTracking.prototype.trackSignUpReferral = function () {

        if (this.win.document.referrer                                      //document.referrer is set
            && this.win.document.referrer.indexOf("/signup") === -1         // referrer is not signup page
            && this.win.document.location.href.indexOf('/signup') !== -1) { // current page is signup
            
            var interactionData = new InteractionData('Last referring page', 'Signup Referral', this.win.document.referrer, 0, true);
            this.trackEvent(interactionData);
        }

    };

    return SignupReferralTracking;

});