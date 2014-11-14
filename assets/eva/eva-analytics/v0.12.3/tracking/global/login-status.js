define(['eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/shims/object'], function (TrackingBase, InteractionData, CustomVariable) {

    function LoginStatusTracking(trackingProvider) {

        if (!(this instanceof LoginStatusTracking)) {
            return new LoginStatusTracking(trackingProvider);
        }
        TrackingBase.call(this, trackingProvider);

        this.trackLoginStatus();

    }

    LoginStatusTracking.prototype = Object.create(TrackingBase.prototype);

    LoginStatusTracking.prototype.constructor = LoginStatusTracking;

    LoginStatusTracking.prototype.trackLoginStatus = function () {

        if (window.universal_variable.Login !== undefined) {
            var login = window.universal_variable.Login,
                customVariable,
                interactionData;

            if (login === 'Lapsed') {

                customVariable = new CustomVariable(2, 'user_id', 'Lapsed', 2);
                this.trackingProvider.setCustomVariable(customVariable);
                interactionData = new InteractionData('Login', 'Lapsed', null, null, true);
                this.trackingProvider.trackEvent(interactionData);

            } else {

                // parse the login value

                var userIdMatch = login.match(new RegExp('\\w+-(.*)-\\d+-\\d+')),
                    accountAgeMatch = login.match(new RegExp('\\w+-.*-\\d+-(\\d+)')),
                    monthsMatch = login.match(new RegExp('\\w+-.*-(\\d+)-\\d+')),
                    onlineOfflineMatch = login.match(new RegExp('(\\w+)-.*-\\d+-\\d+'));

                var userId = userIdMatch.length > 1 ? userIdMatch[1] : '(not set)',
                    accountAge = accountAgeMatch.length > 1 ? accountAgeMatch[1] : '(not set)',
                    months = monthsMatch.length > 1 ? monthsMatch[1] : '(not set)',
                    onlineOffline = onlineOfflineMatch.length > 1 ? onlineOfflineMatch[1] : 'member';

                customVariable = new CustomVariable(1, 'Login', 'True', 1);
                this.trackingProvider.setCustomVariable(customVariable);
                customVariable = new CustomVariable(2, 'user_id', userId, 1);
                this.trackingProvider.setCustomVariable(customVariable);
                customVariable = new CustomVariable(3, 'AccountAge', accountAge, 1);
                this.trackingProvider.setCustomVariable(customVariable);
                customVariable = new CustomVariable(4, 'Months', months, 1);
                this.trackingProvider.setCustomVariable(customVariable);
                customVariable = new CustomVariable(5, 'OnlineOffline', onlineOffline, 1);
                this.trackingProvider.setCustomVariable(customVariable);
                interactionData = new InteractionData('Login', 'Active-' + accountAge + '-' + onlineOffline, months, parseInt(months, 10));
                this.trackEvent(interactionData);

            }
        }

    }

    return LoginStatusTracking;

});