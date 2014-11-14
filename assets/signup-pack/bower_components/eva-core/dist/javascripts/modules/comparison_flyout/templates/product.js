var WHICH = WHICH || {};
/*
 * Renders the HTML for the product in the comparison flyout. This is
 * designed to go in the js-comparison-flyout__product container
 *
 * data - 
 *   href:         the link to the product
 *   thumbnailSrc: URL of the image thumbnail that represents the product
 *   manufacturer: name of the manufacturer
 *   model:        name of the model
 *
 */
WHICH.comparisonFlyout__productTemplate = function(data) {
  return '<button ' + 
           'data-widget="comparisonFlyout__removeProductWidget" ' + 
           'class="comparison-flyout__remove-product" ' +
         '></button>' + 
  '<a href="' + data.href + '" class="comparison-flyout__product-link">' + 
    '<div class="comparison-flyout__thumb-container">' + 
      '<img ' + 
        'class="comparison-flyout__thumb-image"' +
        'alt=""' +
        'src="' + data.thumbnailSrc + '"' +
      '>' +
    '</div>' +
    '<div class="comparison-flyout__name">' +
      '<div class="comparison-flyout__manufacturer">' + data.manufacturer + '</div>' +
      '<div class="comparison-flyout__model">' + data.model + '</div>' +
    '</div>' +
  '</a>';
};

