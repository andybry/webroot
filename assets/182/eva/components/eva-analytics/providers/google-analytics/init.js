define(
    [
        'eva-analytics/providers/google-analytics/provider',
        'eva-analytics/entities/interaction-data',
        'eva-analytics/entities/custom-variable',
        'eva-analytics/entities/ecommerce-transaction',
        'eva-analytics/entities/ecommerce-item',
        //'eva-analytics/entities/referring-search-engine',
        'eva-utils/js/query-string'
    ],
    function(
        GoogleAnalyticsProvider,
        InteractionData,
        CustomVariable,
        EcommerceTransaction,
        EcommerceItem,
        //ReferringSearchEngine,
        QueryString
    ) {

        'use strict';

        function init(universalVariable, doc) {

            window._gaq.push(['whichGAP._require', 'inpage_linkid', '//www.google-analytics.com/plugins/ga/inpage_linkid.js']);
            window._gaq.push(['whichGAP._setAccount', universalVariable.whichGAPUA]);
            window._gaq.push(['whichGAP._setDomainName', universalVariable.whichGAPDom]);
            window._gaq.push(['_setVisitorCookieTimeout', 31536000000]);

            var trackingProvider = new GoogleAnalyticsProvider(),
                customVariable,
                interactionData;

            if (!QueryString.containsKey('utm_source', doc.location.search) || !QueryString.containsKey('utm_campaign', doc.location.search) || !QueryString.containsKey('utm_medium', doc.location.search)) {

                var campaignName = null,
                    paramName = 'cid';

                if (QueryString.containsKey('CMP', doc.location.search)) {
                    paramName = 'CMP';
                } else if (QueryString.containsKey('cmp', doc.location.search)) {
                    paramName = 'cmp';
                } else if (QueryString.containsKey('CID', doc.location.search)) {
                    paramName = 'CID';
                }

                campaignName = QueryString.getValue(paramName, doc.location.search);

                if (campaignName !== null) {
                    var source = null,
                        medium = null,
                        campaigns = [
                            { name: '^video-', medium: 'referral', source: 'youtube_channel' },
                            { name: 'ocal_', medium: 'groupreferral', source: 'whichlocal' },
                            { name: 'ipadcom', medium: 'apps', source: 'app_ipad' },
                            { name: 'connectsurveyendpage', medium: 'mgc', source: 'connect_survey' },
                            { name: 'connectnewsletter', medium: 'mgc', source: 'connect_newsletter' },
                            { name: 'Connectwebsite', medium: 'mgc', source: 'connect_website' },
                            { name: 'convo_promo', medium: 'groupreferral', source: 'whichconversation' },
                            { name: 'RSS-', medium: 'rss', source: 'rss' },
                            { name: 'whichuniversity', medium: 'groupreferral', source: 'whichuniversity' },
                            { name: 'ACTIONFB|FACEBOOK', medium: 'social', source: 'facebook' },        
                            { name: 'GPLUS', medium: 'social', source: 'gplus' },
                            { name: 'ships_', medium: 'partnership', source: 'partnership' },
                            { name: 'Affs_', medium: 'affiliate', source: 'affiliate' },
                            { name: 'mails_', medium: 'email', source: 'email_prospect' },
                            { name: 'emmembers_', medium: 'email', source: 'newsletter_member' },
                            { name: 'em=campaign', medium: 'email', source: 'email_campaign' },
                            { name: 'Brand_|Display_|GDM_|w\\d{4}', medium: 'display', source: 'display' }
                        ],
                        campaignsCount = campaigns.length;

                    for (var x = 0; x < campaignsCount; x++) {
                        var campRr = new RegExp(campaigns[x].name, 'i');
                        if (campRr.test(campaignName)) {
                            source = campaigns[x].source;
                            medium = campaigns[x].medium;
                            break;
                        }
                    }
          
                    if (campaignName !== null) {
                        medium = medium || 'unknown';
                        source = source || doc.referrer || 'unknown';
                        window._gaq.push(['whichGAP._set', 'campaignParams', 'utm_source=' + source + '&utm_medium=' + medium + '&utm_campaign=' + campaignName]);
                    }
                }
            }

            // eliminate 'top sites' users
            if (universalVariable.visitXPurpose === 'preview') {
                customVariable = new CustomVariable(50, 'TopSitesPreview', true, 2);
                trackingProvider.setCustomVariable(customVariable);
                interactionData = new InteractionData('TopSites', 'Preview', undefined, undefined, true);
                trackingProvider.trackEvent(interactionData);
            }
            
            if (universalVariable.created_at !== undefined) {
                customVariable = new CustomVariable(20, 'created_at', universalVariable.created_at, 3);
                trackingProvider.setCustomVariable(customVariable);
            }
            
            if (universalVariable.updated_at !== undefined) {
                customVariable = new CustomVariable(21, 'updated_at', universalVariable.updated_at, 3);
                trackingProvider.setCustomVariable(customVariable);
            }
            
            if (universalVariable.PaidAccess !== undefined) {
                customVariable = new CustomVariable(22, 'FreePaid', universalVariable.PaidAccess, 3);
                trackingProvider.setCustomVariable(customVariable);
            }

            if (universalVariable.contentGroup !== undefined) {
                var groupSet = universalVariable.groupSet === undefined ? '1' : universalVariable.groupSet;
                window._gaq.push(['whichGAP._setPageGroup', groupSet, universalVariable.contentGroup]);
                customVariable = new CustomVariable(24, 'ContentGroup', universalVariable.contentGroup, 3);
                trackingProvider.setCustomVariable(customVariable);
            }
            
            if (universalVariable.contentType !== undefined) {
                window._gaq.push(['whichGAP._setPageGroup', '2', universalVariable.contentType]);
                customVariable = new CustomVariable(23, 'ContentType', universalVariable.contentType, 3);
                trackingProvider.setCustomVariable(customVariable);
            }

            if (universalVariable.transaction === undefined) {

                _vpv = function(vpv) {
                    if (doc.location.pathname && doc.location.href && /search/.test(doc.location.pathname) && /w=/.test(doc.location.href)) {
                        var separator = doc.location.href.split('?').length > 1 ? '?' : '#';
                        vpv = '/search?' + doc.location.href.split(separator)[1].split('&').join('&');
                    }     
                    trackingProvider.trackPageView(vpv);
                }

                _vpv(universalVariable.VirtualPageview);

            } else {

                _vpv = function(vpv) {
                    if (vpv === undefined || vpv === null) {
                        window._gaq.push(['whichGAP._set', 'page', doc.location.pathname]);
                        trackingProvider.trackPageView();
                    } else {
                        window._gaq.push(['whichGAP._set', 'page', vpv]);
                        trackingProvider.trackPageView(vpv);
                    }
                }

                _vpv(universalVariable.VirtualPageview);

                var transaction = new EcommerceTransaction(
                    universalVariable.transaction.order_id,
                    universalVariable.transaction.affiliation,
                    universalVariable.transaction.total,
                    universalVariable.transaction.tax,
                    universalVariable.transaction.shipping_cost,
                    universalVariable.transaction.delivery ? universalVariable.transaction.delivery.city : '',
                    universalVariable.transaction.delivery ? universalVariable.transaction.delivery.state : '',
                    universalVariable.transaction.delivery ? universalVariable.transaction.delivery.country : ''
                );
                trackingProvider.ecommerceAddTransaction(transaction);

                var i, item, lineItem, lineItemCount;
                for (i = 0, lineItemCount = universalVariable.transaction.line_items ? universalVariable.transaction.line_items.length : 0; i < lineItemCount; i += 1) {
                    lineItem = universalVariable.transaction.line_items[i];
                    item = new EcommerceItem(
                        universalVariable.transaction.order_id,
                        lineItem.product.SKU,
                        lineItem.product.name,
                        lineItem.product.category,
                        lineItem.product.price,
                        lineItem.quantity
                    );
                    trackingProvider.ecommerceAddItem(item);
                }

                window._gaq.push(['whichGAP._trackTrans']);

            }

            return trackingProvider;

        }

        return init;

    }
);
