var CampaignActionSubmitCallback;

define(['jquery'], function($) {

    /*
     * Click out tracking
     */

    var onTrackedClicked = function(e) {

        var $element = $(e.currentTarget),
            href = $element.attr('href'),
            category = '',
            action = '',
            label = href,
            value = null,
            newWindow = false,
            linkTypeRr = new RegExp('linkType-([a-zA-Z]+)'),
            linkVRr = new RegExp('linkV-([\\d+\\.]+)'),
            mediaDomains = ['bbc.c', '60mile.co.uk', 'absoluteradio.co.uk', 'and.co.uk', 'bloomberg.net', 'blueyonder.co.uk', 'bskyb.com', 'dailymail.co.uk', 'dailystar.co.uk', 'economist.com', 'express.co.uk', 'fav-house.com', 'foresightnews.co.uk', 'ft.com', 'guardian.co.uk', 'harvey-jones.com', 'heraldandtimes.co.uk', 'highcourt.demon.co.uk', 'huffingtonpost.com', 'incisivemedia.com', 'independent.co.uk', 'insleymedia.com', 'inspiredmoney.co.uk', 'itn.co.uk', 'itv.com', 'lbc.co.uk', 'lockleyassociates.co.uk', 'mailonsunday.co.uk', 'mirror.co.uk', 'observer.co.uk', 'pa.press.net', 'people.co.uk', 'politicshome.com', 'pressassociation.com', 'scotsman.com', 'siftmedia.co.uk', 'standard.co.uk', 'sundayherald.com', 'sundaymirror.co.uk', 'sundaytimes.co.uk', 'sunday-times.co.uk', 'telegraph.co.uk', 'theherald.co.uk', 'the-sun.co.uk', 'thetimes.co.uk', 'thomsonreuters.com', 'tinyworld.co.uk', 'yourmoney.freeserve.co.uk'],
            mediaDomainsCount = mediaDomains.length;

        // if the link is not on the same domain as this website and is not an adtech link
        if (!new RegExp(document.domain, 'i').test(href) && !/adtech/i.test(href)) {
            var linkType = '',
                linkValue = 0,
                newWindow = false,
                linkParts = href.split('/'),
                linkDomainParts = [],
                linkDomain,
                dataTrackerValues = $element.attr('data-trackervalues');
                
            if (linkParts.length >= 3) {
                linkDomainParts = linkParts[2].split(':'),
                linkDomain = linkDomainParts[0];
            } else {
                linkDomain = document.domain;
                linkType = 'Which exit';
            }

            if (dataTrackerValues !== undefined) {
                linkType = dataTrackerValues.match(linkTypeRr)[1];
                linkValue = linkVRr.test(dataTrackerValues) ? parseInt(dataTrackerValues.match(linkVRr)[1]) : 0;
            }

            if ($element.attr('target') !== undefined || (dataTrackerValues !== undefined && /NewTab/.test(dataTrackerValues))) {
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
                    label = href.match(internalCampaignRegex)[1];
                }
                linkType = 'Which exit';
            }
        
            if (linkType === '') {
                linkType = 'Exit';
            }

            category = linkType;
            action = 'Clickout';
            value = linkValue;

        } else if (/adtech/i.test(href)) { // else if it is an adtech link

            var splitlink = href.split(';');
            category = 'InternalCampaign';
            action = 'Click';
            label = splitlink[splitlink.length - 1].substr(5);
            value = $element.parent().offset().top;

        } else if (/intcmp/i.test(href) && !/^http/i.test(href)) { // else if it is an internal campaign

            category = 'InternalCampaign';
            action = 'Click';
            label = href.split('intcmp=')[1];
            value = $element.parent().offset().top;

        }

        //extract values from the element
        var values = extractValues($element.data('trackervalues'));

        if (values['category'] !== undefined) {
            category = values['category'];
        }
        if (values['action'] !== undefined) {
            action = values['action'];
        }
        if (values['opt-label'] !== undefined) {
            label = values['opt-label'];
        }
        if (values['opt-value'] !== undefined) {
            value = values['opt-value'];
        }

        // validate value
        var intValue = parseInt(value, 10);
        value = null;
        if (!isNaN(intValue) && intValue >= 0) {
            value = intValue;
        }

        // send off the event tracking
        var _gaq = window._gaq || [];
        _gaq.push(['whichGAP._trackEvent', category, action, label, value]);

        // give the event tracking a little bit of time to work and then follow the link
        e.preventDefault();
        if (newWindow) {
            window.open(href);
        } else {
            setTimeout(function() {
                document.location = href;
            }, 100);
        }

    };

    function bindOnClickEvent() {
        $('body').on('mousedown', 'a.is-trackable', onTrackedClicked);
    }

    function extractValues(valueString) {
        var values = {};
        if (typeof valueString === 'string') {
            var pairs = valueString.split(',');
            $.each(pairs, function(index, pair) {
                pairs[index] = $.trim(pair);
                var key = $.trim(pair.split('=')[0]);
                var value = $.trim(pair.split('=')[1]);
                values[key] = value;
            });
        }
        return values;
    }

    if ($('body').length) {
        bindOnClickEvent();
    } else {
        $(bindOnClickEvent);
    }

    /*
     * Form submit tracking
     */

    CampaignActionSubmitCallback = function() {

        var label = $.trim($('.titleWrapper h1 span').text()) || '(not set)';
        _gaq.push(['whichGAP._trackEvent', 'Campaign action', 'Submit pledge', label, 0, false]);

    }

    /*
     * Timeline accordion
     */

    $(function() {

        $('.timelineWrapper').on('click', '.show-more,.moar', function(e) {

            var $this = $(this),
                action = $this.text() || '(not set)',
                label = 0,
                isExpanding = $(this).hasClass('moar') || action === $this.attr('data-show-text');

            $this.closest('.wWrapper').prevAll('.wWrapper').each(function () {
                label += $(this).find('.wWrapper:visible').length || 1;
            });

            label += $this.closest('.wWrapper').find('.wWrapper:visible').length || 1;

            if (isExpanding) {
                _gaq.push(['whichGAP._trackEvent', 'Show more', action, label, 0, false]);
            }

        });

    });

    /*
     * Media consumption
     */

    (function() {
        if ($) {
            $(function() {
                $('body').on('click', 'a[href$=".pdf"]', function(e) {
                    var $this = $(this),
                        href = $this.attr('href');
                    _gaq.push(['whichGAP._trackEvent', 'Link', 'download', href, 0, false]);
                    e.preventDefault();
                    if ($this.attr('target') === undefined) {
                        setTimeout(function() {
                            document.location = href;
                        }, 100);
                    } else {
                        window.open(href);
                    }
                });
            });
        }
    })();

    /*
     * Filter clicks
     */

    (function() {
        if ($) {
            $(function() {
                $('.campaigns-timeline-body .filters').on('click', '.filterMenu li a,.reset', function(e) {

                    var $this = $(this),
                        href = $this.attr('href'),
                        action = $this.text() || '(not set)',
                        label = $.trim($('.titleWrapper h1 span').text()) || '(not set)';

                    _gaq.push(['whichGAP._trackEvent', 'Progress filter', action, label, 0, false]);

                    if ($this.attr('target') === undefined) {
                        e.preventDefault();
                        setTimeout(function() {
                            document.location = href;
                        }, 100);
                    }

                });
            });
        }
    })();

    /*
     * Form interaction tracking
     */

    (function() {
        if ($) {
            $(function() {
                $('.is-form-trackable input,.is-form-trackable select,.is-form-trackable textarea').add($('input.is-trackable,select.is-trackable,textarea.is-trackable')).on('focus', function() {
                    var $field = $(this),
                        category = 'Form usage',
                        action = document.location.pathname,
                        label = $field.attr('id') || $field.attr('name') || '(not set)',
                        value = 0,
                        nonInteraction = true;
                    _gaq.push(['whichGAP._trackEvent', category, action, label, value, nonInteraction]);
                });
            });
        }
    })();

});