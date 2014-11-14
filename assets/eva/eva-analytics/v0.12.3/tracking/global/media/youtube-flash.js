/*
 *
 * This hasn't been implemented yet. The code still requires a lot of refactoring.
 * When you uncomment the code replace /*i; with i; in videoIdRegEx.
 *
 */


define(['jquery', 'eva-analytics/tracking/global/media/media-player', 'eva-utils/js/shims/object'], function($, MediaPlayerTracking, InteractionData) {

    function YouTubeFlashTracking(trackingProvider) {

        if (!(this instanceof YouTubeFlashTracking)) {
            return new YouTubeFlashTracking(trackingProvider);
        }
        MediaPlayerTracking.call(this, trackingProvider);

        this.videoTrackers = {};
        this.initTracking();

    }

    YouTubeFlashTracking.prototype = Object.create(MediaPlayerTracking.prototype);

    YouTubeFlashTracking.prototype.constructor = YouTubeFlashTracking;

    /*function isYouTubeIFrameOnPage() {
        return $('iframe[src*="youtube.com/"]').length !== 0;
    }

    YouTubeFlashTracking.prototype.initTracking = function() {

        // if there are any youtube iframes on the page, don't initialise this tracking
        if (isYouTubeIFrameOnPage()) {
            return;
        }

        vdtrkr = new function() {
            this.trkrs = {};
            this._trackVideo = function (action, video, val1, val2) {
                var self = vdtrkr;
                switch (action) {
                    case 'playing':
                        if (val1 !== undefined && val2 !== undefined) {
                            _gaq.push(['whichGAP._trackEvent', 'Video', 'Playing - ' + val1 + '% ', video, parseInt(val2, 10)]);
                        } else {
                            _gaq.push(['whichGAP._trackEvent', 'Video', 'Playing - ' + val1 + '% ', video]);
                        }
                        break;
                    case 'error':
                        _gaq.push(['whichGAP._trackEvent', 'Video', 'Error - ' + val1, video]);
                        break;
                    default:
                    if (val1 !== undefined) {
                        _gaq.push(['whichGAP._trackEvent', 'Video', action, video, parseInt(val1, 10)]);
                    } else {
                        _gaq.push(['whichGAP._trackEvent', 'Video', action, video]);
                    }
                }
             };
                
            this.processActions = function(thePlayer) {
                var self = vdtrkr;
                $.each(thePlayer.actions, function() {
                    self._trackVideo(thePlayer.actions[0].actionname, thePlayer.videoTitle, thePlayer.actions[0].mainval, thePlayer.actions[0].percent);
                    thePlayer.lastAction = thePlayer.actions.shift();
                });
            };
        }

        var getVideoTitle = function(thePlayer) {
            var videoIdRegEx = /.*v=(.*).*//*i;
            var videoUrl = thePlayer.getVideoUrl();
            var videoIdMatch = videoUrl.match(videoIdRegEx);
            var videoId = videoIdMatch && videoIdMatch.length > 1 ? videoIdMatch[1] : null;
            if (videoId) {
                $.ajax({
                    url: 'https://gdata.youtube.com/feeds/api/videos/' + videoId + '?alt=json',
                    type: 'GET',
                    dataType: 'jsonp',
                    success: function(root) {
                        console.log(this);
                        vdtrkr.trkrs[thePlayer.id].videoTitle = root.entry.title['$t'];
                        vdtrkr.trkrs[thePlayer.id].videoDuration = document.getElementById(thePlayer.id).getDuration();
                    }
                });                
            } else {
                throw 'Could not get ID for video.';
            }
        }

        function VideoTracker(id) {

            this.element = document.getElementById(id);
            this.playerId = id;
            this.videoTitle = '';
            this.actions = [];
            this.lastAction = '';
            this.lastPosition = 0;
            this.lastBucket = -1;
            this.pausedAt = 0;
            this.duration = 0;

        }

        VideoTracker.prototype.error = function (errCode) {
            this.actions.push({ actionname: 'Error', mainval: errCode });
            if (this.videoTitle.length) {
                vdtrkr.processActions(this);
            }
        }

        VideoTracker.prototype.stateChange = function(newState) {

            var action_name = newState,
                action_value = 0,
                playerPos = parseInt(this.element.getCurrentTime(), 10),
                playerPercent = parseInt(playerPos / this.element.getDuration() * 100);

            switch (newState) {
                case -1:
                    action_name = "notstarted";
                    break;
                case 0:
                    action_name = "ended";
                    action_value = playerPercent;
                    break;
                case 1:
                    action_name = "playing";
                    break;
                case 2:
                    action_name = "paused";
                    action_value = playerPercent;
                    break;
                case 3:
                    action_name = "buffering";
                    break;
                case 5:
                    action_name = "cued";
                    break;
            }

            if (mainval !== undefined) {
                this.actions.push({ actionname: action_name, mainval: action_value });
            } else {
                this.actions.push({ actionname: action_name });
            }

            if (this.videoTitle.length) {                    
                vdtrkr.processActions(this);
            }

        }


        _Playing = function() {
            var self = vdtrkr,
                portions = [0, 25, 50, 75, 100];
                
            $.each(this.videoTrackers, function(i, trkr) {
                var lower_bucket = 0,
                    upper_bucket = 0,
                    duration = 0;     
                
                if (trkr.duration === 0) {
                    duration = document.getElementById(trkr.playerId).getDuration();
                    if (duration > 0) {
                        trkr.duration = duration;
                    }
                }
                        
                if (document.getElementById(trkr.playerId).getPlayerState() === 1) {
                    playerPos = parseInt(document.getElementById(trkr.playerId).getCurrentTime(), 10);                    
                    playerPercent = (playerPos / trkr.videoDuration) * 100;
                    
                    if (playerPos < this.lastPosition - 1) {
                        trkr.actions.push({ actionname: 'rewind' })
                    }
                    if (playerPos > this.lastPosition + 1) {
                        trkr.actions.push({ actionname: 'fast-forward' })
                    }
                    
                    for (var p = 0, pMax = portions.length - 1; p < pMax; p++) {
                        lower_bucket = playerPercent === portions[p] || playerPercent > portions[p] && playerPercent < portions[p + 1] ? portions[p] : lower_bucket;
                        upper_bucket = playerPercent === portions[p] || playerPercent > portions[p] && playerPercent < portions[p + 1] ? portions[p + 1] : upper_bucket;
                    }
                                        
                    if (lower_bucket !== trkr.lastBucket) {
                        trkr.actions.push({ actionname: 'playing', mainval: lower_bucket + '-' + upper_bucket, optvalue: playerPos, percent: playerPercent });
                        trkr.lastBucket = lower_bucket;                            
                    }                         
                    trkr.lastPosition = playerPos;
                    if (this.videoTitle.length) {
                        vdtrkr.processActions(this);
                    }
                }             
            });
        }

        window.onYouTubePlayerReady = $.proxy(function(playerId) {
            var ytplayer = document.getElementById(playerId);
            this.videoTrackers[playerId] = new VideoTracker(playerId);
            getVideoTitle(ytplayer);
            
            $(ytplayer)
                .on('statechange', $.proxy(function(newState) {
                    console.log('statechange');
                    console.log(newState);
                    //this.videoTrackers[playerId].stateChange(newState);
                }, this))
                .on('error', $.proxy(function(errCode) {
                    console.log('error');
                    console.lgog(newState);
                    //this.videoTrackers[playerId].error(errCode);
                }, this));

            eval(playerId + 'stateChange = function(newState) { vdtrkr.trkrs[\'' + playerId + '\'].stateChange(newState); }');
            eval(playerId + 'Error = function (newState) { vdtrkr.trkrs[\'' + playerId + '\'].Error(errCode); }');

            ytplayer.addEventListener('onStateChange', playerId + 'stateChange');
            ytplayer.addEventListener('onError', playerId + 'Error');
                
            if (playersTracker === undefined && !$.isEmptyObject(this.videoTrackers)) {        
                playersTracker = setInterval('_Playing()', 500);
            }
        }, this);
    }*/

    return YouTubeFlashTracking;

});