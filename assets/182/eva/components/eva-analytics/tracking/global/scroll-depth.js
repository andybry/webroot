define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-analytics/entities/custom-variable', 'eva-utils/js/viewport', 'eva-utils/js/shims/date', 'eva-utils/js/shims/object', 'eva-utils/js/jquery-plugins/throttle-debounce'], function($, TrackingBase, InteractionData, CustomVariable, Viewport) {

    'use strict';

    var defaultReaderScannerValue = 93,
        eventNamespace = '.scrolldepthtracking',
        scrollEventThrottleDelay = 100,
        trackedContentAreaSelector;

    function ScrollDepthTracking(trackingProvider, win) {

        // avoid problems if not called as a contructor
        if (!(this instanceof ScrollDepthTracking)) {
            return new ScrollDepthTracking(trackingProvider, win);
        }

        // inheritance
        TrackingBase.call(this, trackingProvider, win);

    }

    ScrollDepthTracking.prototype = Object.create(TrackingBase.prototype);

    ScrollDepthTracking.prototype.constructor = ScrollDepthTracking;

    ScrollDepthTracking.prototype.bindScrollEvent = function () {
        $(this.win).on('scroll' + eventNamespace, $.proxy($.throttle(scrollEventThrottleDelay, this.processCurrentCheckpoint), this));
    };

    ScrollDepthTracking.prototype.checkpointsConfiguration = [
        {
            'isScrollPositionBeyondCheckpoint': function () {
                return this.getWindowScrollPosition() > this.getTrackedContentArea().offset().top;
            },
            'loggingConfiguration': {
                'eventName': 'StartReading',
                'eventValue': function () {
                    return parseInt((this.checkpoints[0].reachedTimestamp - this.initialisationTimestamp) / 1000, 10);
                }
            }
        },
        {
            'isScrollPositionBeyondCheckpoint': function () {
                return this.getWindowScrollPosition() + this.getWindowHeight() >= this.getTrackedContentArea().offset().top + this.getTrackedContentArea().outerHeight();
            },
            'loggingConfiguration': {
                'eventName': 'ContentBottom',
                'eventValue': function () {
                    return parseInt((this.checkpoints[1].reachedTimestamp - this.checkpoints[0].reachedTimestamp) / 1000, 10);
                }
            },
            'onCheckpointReached': function() {
                var customVariable = new CustomVariable();
                customVariable.slot = 9;
                customVariable.name = 'ReaderType';
                customVariable.value = parseInt((this.checkpoints[1].reachedTimestamp - this.checkpoints[0].reachedTimestamp) / 1000, 10) < this.getReaderScannerValue() ? 'Scanner' : 'Reader';
                customVariable.scope = 2;
                this.trackingProvider.setCustomVariable(customVariable);
            }
        },
        {
            'isScrollPositionBeyondCheckpoint': function () {
                return this.getWindowScrollPosition() + this.getWindowHeight() >= this.getDocumentHeight();
            },
            'loggingConfiguration': {
                'eventName': 'PageBottom',
                'eventValue': function () {
                    return parseInt((this.checkpoints[2].reachedTimestamp - this.checkpoints[0].reachedTimestamp) / 1000, 10);
                }
            }
        }
    ];

    ScrollDepthTracking.prototype.getCurrentCheckpoint = function () {
        return this.currentCheckpointIndex < this.checkpoints.length ? this.checkpoints[this.currentCheckpointIndex] : null;
    };

    ScrollDepthTracking.prototype.getDocumentHeight = function() {
        return $(this.win.document).height();
    }

    ScrollDepthTracking.prototype.getReaderScannerValue = function() {
        var readerScannerValue = defaultReaderScannerValue;
        if (this.win.universal_variable !== undefined && this.win.universal_variable.readerscanner !== undefined) {
            readerScannerValue = parseInt(this.win.universal_variable.readerscanner, 10) || defaultReaderScannerValue;
        }
        return readerScannerValue;
    };

    ScrollDepthTracking.prototype.getTrackedContentArea = function() {
        return $(trackedContentAreaSelector).first();
    };

    ScrollDepthTracking.prototype.getWindowHeight = function() {
        return $(this.win).height();
    };

    ScrollDepthTracking.prototype.getWindowScrollPosition = function() {
        return $(this.win).scrollTop();
    };

    ScrollDepthTracking.prototype.isPageLongerThanViewport = function() {
        return this.getDocumentHeight() > Viewport.height(this.win);
    };

    ScrollDepthTracking.prototype.isTrackedContentAreaPresent = function() {
        return this.getTrackedContentArea().length > 0;
    };

    ScrollDepthTracking.prototype.isTrackingEnabledForCurrentPage = function() {
        return this.win.universal_variable.supercontenttracker !== false;
    };

    ScrollDepthTracking.prototype.logEvent = function(action, value) {
        var interactionData = new InteractionData('Reading', action, undefined, value);
        this.trackEvent(interactionData);
    };

    ScrollDepthTracking.prototype.onCheckpointReached = function() {
        var currentCheckpoint, checkpointSpecificOnReachedHandler, eventName, eventValue;
        // grab the checkpoint
        currentCheckpoint = this.checkpoints[this.currentCheckpointIndex];
        // timestamp
        currentCheckpoint.reachedTimestamp = Date.now();
        // run any on checkpoint reached code for this checkpoint
        checkpointSpecificOnReachedHandler = currentCheckpoint.checkpointConfiguration.onCheckpointReached;
        if (typeof checkpointSpecificOnReachedHandler === 'function') {
            $.proxy(checkpointSpecificOnReachedHandler, this)();
        }
        // perform any logging
        eventName = currentCheckpoint.checkpointConfiguration.loggingConfiguration.eventName;
        eventValue = typeof currentCheckpoint.checkpointConfiguration.loggingConfiguration.eventValue === 'function' ? $.proxy(currentCheckpoint.checkpointConfiguration.loggingConfiguration.eventValue, this)() : currentCheckpoint.loggingConfiguration.eventValue;
        this.logEvent(eventName, eventValue);
        // update the checkpoint index
        this.currentCheckpointIndex += 1;
        // move to the next checkpoint
        this.processCurrentCheckpoint();
    };

    ScrollDepthTracking.prototype.processCurrentCheckpoint = function() {
        // check if there are still some checkpoints to process
        if (this.currentCheckpointIndex >= this.checkpoints.length) {
            this.unbindScrollEvent();
            return;
        }
        // check if the current checkpoint has been reached
        if ($.proxy(this.getCurrentCheckpoint().checkpointConfiguration.isScrollPositionBeyondCheckpoint, this)()) {
            this.onCheckpointReached();
        }
    };

    ScrollDepthTracking.prototype.startTracking = function() {

        var i,
            checkpointCount,
            checkpointConfiguration;

        // initialisation
        trackedContentAreaSelector =
            typeof this.win.universal_variable.superContentTrackerSelector === 'string' && this.win.universal_variable.superContentTrackerSelector.length
                ? this.win.universal_variable.superContentTrackerSelector
                : '.page-main-content-tracked';
        if (this.isTrackingEnabledForCurrentPage() && this.isTrackedContentAreaPresent() && this.isPageLongerThanViewport()) {
            this.currentCheckpointIndex = 0;
            this.initialisationTimestamp = Date.now();
            this.checkpoints = [];
            checkpointCount = this.checkpointsConfiguration.length;
            for (i = 0; i < checkpointCount; i += 1) {
                checkpointConfiguration = this.checkpointsConfiguration[i];
                this.checkpoints.push({
                    checkpointConfiguration: checkpointConfiguration,
                    reachedTimestamp: undefined
                });
            }
            this.bindScrollEvent();
            this.processCurrentCheckpoint();
        }
    };

    ScrollDepthTracking.prototype.stopTracking = function() {

        this.unbindScrollEvent();

    };

    ScrollDepthTracking.prototype.unbindScrollEvent = function() {

        $(this.win).off('scroll' + eventNamespace);
        
    };

    return ScrollDepthTracking;

});