define(['jquery', 'eva-analytics/tracking/tracking-base', 'eva-analytics/entities/interaction-data', 'eva-utils/js/shims/object'], function ($, TrackingBase, InteractionData) {

    var linkTypeRr = new RegExp('linkType-([a-zA-Z]+)'),
        linkVRr = new RegExp('linkV-([\\d+\\.]+)'),
        mediaDomains = ['bbc.c', '60mile.co.uk', 'absoluteradio.co.uk', 'and.co.uk', 'bloomberg.net', 'blueyonder.co.uk', 'bskyb.com', 'dailymail.co.uk', 'dailystar.co.uk', 'economist.com', 'express.co.uk', 'fav-house.com', 'foresightnews.co.uk', 'ft.com', 'guardian.co.uk', 'harvey-jones.com', 'heraldandtimes.co.uk', 'highcourt.demon.co.uk', 'huffingtonpost.com', 'incisivemedia.com', 'independent.co.uk', 'insleymedia.com', 'inspiredmoney.co.uk', 'itn.co.uk', 'itv.com', 'lbc.co.uk', 'lockleyassociates.co.uk', 'mailonsunday.co.uk', 'mirror.co.uk', 'observer.co.uk', 'pa.press.net', 'people.co.uk', 'politicshome.com', 'pressassociation.com', 'scotsman.com', 'siftmedia.co.uk', 'standard.co.uk', 'sundayherald.com', 'sundaymirror.co.uk', 'sundaytimes.co.uk', 'sunday-times.co.uk', 'telegraph.co.uk', 'theherald.co.uk', 'the-sun.co.uk', 'thetimes.co.uk', 'thomsonreuters.com', 'tinyworld.co.uk', 'yourmoney.freeserve.co.uk'],
        mediaDomainsCount = mediaDomains.length;

    function ClickOutTracking(trackingProvider, win) {

        if (!(this instanceof ClickOutTracking)) {
            return new ClickOutTracking(trackingProvider, win);
        }
        TrackingBase.call(this, trackingProvider);

        this.win = win;

        $($.proxy(this.setupTracking, this));

    }

    ClickOutTracking.prototype = Object.create(TrackingBase.prototype);

    ClickOutTracking.prototype.constructor = ClickOutTracking;

    ClickOutTracking.prototype.setupTracking = function() {

        $('a.is-trackable, a[href^="http"]').on('click', $.proxy(function(e) {
            var $this = $(e.currentTarget),
                href = $this.attr('href');

            // check that we found an href on the anchor
            if (!href) {
                return;
            }

            // ensure the anchor is not flagged as 'not-trackable' and that not on the current domain (bad test for this) and that it isn't an adtech link (bad test for this too)
            if (!$this.hasClass('not-trackable') && !new RegExp(this.win.document.domain, 'i').test(href) && !/adtech/i.test(href)) {

                e.preventDefault();
                
                var linkType = '',
                    linkValue = 0,
                    newWindow = false,
                    linkParts = href.split('/'),
                    linkDomain,
                    linkDomainRegex = /^https?:\/\/([^/:]*)/i,
                    dataTrackerValues = $this.attr('data-trackervalues');
                    
                if (linkDomainRegex.test(href)) {
                    linkDomain = href.match(linkDomainRegex)[1];
                } else {
                    linkDomain = this.win.document.domain;
                    linkType = 'Which exit';
                }

                if (dataTrackerValues !== undefined) {
                    linkType = dataTrackerValues.match(linkTypeRr)[1];
                    linkValue = linkVRr.test(dataTrackerValues) ? parseInt(dataTrackerValues.match(linkVRr)[1]) : 0;
                }

                if ($this.attr('target') !== undefined || (dataTrackerValues !== undefined && /NewTab/.test(dataTrackerValues))) {
                    newWindow = true;  
                }

                if (linkType === '' && (/pricerunner/i.test(linkDomain) || /linktracker/i.test(linkDomain))) {
                    linkType = 'Retailer exit';
                }
            
                if (linkType === '') {
                    for (var d = 0; d < mediaDomainsCount; d++) {
                        if (new RegExp(mediaDomains[d], 'i').test(linkDomain)) {
                            linkType = 'Media exit';
                            break;
                        }
                    }
                }

                if (linkType === '' && (/which/i.test(linkDomain) || /thegoodfoodguide/i.test(linkDomain))) {
                    var internalCampaignRegex = new RegExp(/intcmp=(.+)/);
                    if (internalCampaignRegex.test(href)) {
                        linkDomain = href.match(internalCampaignRegex)[1];
                    }
                    linkType = 'Which exit';
                }
            
                if (linkType === '') {
                    linkType = 'Exit';
                }

                var interactionData = new InteractionData('Clickout - ' + linkType, linkDomain, href, linkValue);
                this.trackEvent(interactionData);
                    
                if (newWindow) {
                    this.win.open(href);
                } else {
                    setTimeout($.proxy(function() {
                        this.win.document.location = href;               
                    }, this), 250);
                }
            }
        }, this));

    }

    return ClickOutTracking;
});