define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/shims/object'], function (TrackingBase, InteractionData, CustomVariable) {

    'use strict';

    var eventNamespace = '.loginstatustracking';

    function LoginStatusTracking(trackingProvider, win) {
        
        if (!(this instanceof LoginStatusTracking)) {
            return new LoginStatusTracking(trackingProvider, win);
        }
        
        TrackingBase.call(this, trackingProvider, win);

    }

    LoginStatusTracking.prototype = Object.create(TrackingBase.prototype);

    LoginStatusTracking.prototype.constructor = LoginStatusTracking;

    LoginStatusTracking.prototype.getLogoffUiElements = function () {

        return $('#om-logout-tn');

    }

    LoginStatusTracking.prototype.logoffOnClick = function(e) {

        var customVariable,
            interactionData;

        customVariable = new CustomVariable(1, 'Login', 'LoggedOut', 2);
        this.trackingProvider.setCustomVariable(customVariable);

        interactionData = getLoginLogoffInteractionData(getMemberProfile(this.win.universal_variable.memberProfile));
        interactionData.category = 'Logout';
        this.trackEvent(interactionData);

        if (e.target.tagName === 'A') {
            this.followAnchor($(e.target), this.win, e);
        }

    }

    LoginStatusTracking.prototype.startTracking = function() {

        this.startLogoffTracking();

    }

    LoginStatusTracking.prototype.startLogoffTracking = function() {

        this.getLogoffUiElements().on('click' + eventNamespace, $.proxy(this.logoffOnClick, this));

    }

    LoginStatusTracking.prototype.stopTracking = function() {

        this.stopLogoffTracking();

    }

    LoginStatusTracking.prototype.stopLogoffTracking = function() {

        this.getLogoffUiElements().off('click' + eventNamespace);

    }

    LoginStatusTracking.prototype.processUniversalVariable = function () {

        var customVariable,
            customVariableLoginValue,
            interactionData,
            memberProfile;

        if (this.win.universal_variable.memberProfile !== undefined) {

            switch (this.win.universal_variable.loginStatus) {
                case 'JustLoggedIn':
                    customVariableLoginValue = 'LoggedIn';
                    break;
                case 'Lapsed':
                    customVariableLoginValue = 'Lapsed';
                    break;
            }

            if (customVariableLoginValue) {
                customVariable = new CustomVariable(1, 'Login', customVariableLoginValue, 2);
                this.trackingProvider.setCustomVariable(customVariable);
            }

            if (this.win.universal_variable.loginStatus === 'JustLoggedIn') {

                memberProfile = getMemberProfile(this.win.universal_variable.memberProfile);

                customVariable = new CustomVariable(2, 'user_id', memberProfile.userId, 1);
                this.trackingProvider.setCustomVariable(customVariable);
                customVariable = new CustomVariable(3, 'AccountAge', memberProfile.accountAge, 1);
                this.trackingProvider.setCustomVariable(customVariable);
                customVariable = new CustomVariable(4, 'Months', memberProfile.months, 1);
                this.trackingProvider.setCustomVariable(customVariable);
                customVariable = new CustomVariable(5, 'OnlineOffline', memberProfile.onlineOffline, 1);
                this.trackingProvider.setCustomVariable(customVariable);

                interactionData = getLoginLogoffInteractionData(memberProfile);
                interactionData.category = 'Login';
                this.trackEvent(interactionData);

            }

        }

    };

    // returns an interaction data object with the properties common to login and logoff tracking populated.
    // you will still need to populate the category
    function getLoginLogoffInteractionData(memberProfile) {

        return new InteractionData(undefined, 'Active-' + memberProfile.accountAge + '-' + memberProfile.onlineOffline, memberProfile.months);

    }

    function getMemberProfile(memberProfileString) {

        var userIdMatch = memberProfileString.match(new RegExp('\\w+-(.*)-(?:\\d+|\\(not set\\))-(?:\\d+|\\(not set\\))')),
            accountAgeMatch = memberProfileString.match(new RegExp('\\w+-.*-(?:\\d+|\\(not set\\))-(\\d+|\\(not set\\))')),
            monthsMatch = memberProfileString.match(new RegExp('\\w+-.*-(\\d+|\\(not set\\))-(?:\\d+|\\(not set\\))')),
            onlineOfflineMatch = memberProfileString.match(new RegExp('(\\w+)-.*-(?:\\d+|\\(not set\\))-(?:\\d+|\\(not set\\))'));
        var userId = userIdMatch && userIdMatch.length > 1 ? userIdMatch[1] : '(not set)',
            accountAge = accountAgeMatch && accountAgeMatch.length > 1 ? accountAgeMatch[1] : '(not set)',
            months = monthsMatch && monthsMatch.length > 1 ? monthsMatch[1] : '(not set)',
            onlineOffline = onlineOfflineMatch&& onlineOfflineMatch.length > 1 ? onlineOfflineMatch[1] : 'member';

        return { userId: userId, accountAge: accountAge, months: months, onlineOffline: onlineOffline };

    }

    return LoginStatusTracking;

});