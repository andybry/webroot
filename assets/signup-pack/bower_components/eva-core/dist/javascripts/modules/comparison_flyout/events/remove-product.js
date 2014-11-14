var WHICH = WHICH || {};

/*
 * Trigger an event requesting the removal of a product from the 
 * comparison flyout
 *
 */
WHICH.comparisonFlyout__RemoveProductEvent = function(data) {
  WHICH.eventAggregator.trigger('comparison-flyout__remove-product-event', {
    category: 'tv',
    model: data.model,
    manufacturer: data.manufacturer,
    $container: data.$container
  });
};
