//=require jquery
//=require modules/event_aggregator/main
var WHICH = WHICH || {};

//=require templates/product
//=require events/remove-product

WHICH.createWidget('comparisonFlyout__removeProductWidget', function(data) {
  var $this = this,
      $container = $this.parent(),
      model = $container.find('.comparison-flyout__model').text(),
      manufacturer = $container.find('.comparison-flyout__manufacturer').text();
  $this.click(function() {
    new WHICH.comparisonFlyout__RemoveProductEvent({
      category: 'tv',
      model: model,
      manufacturer: manufacturer,
      $container: $container
    });
  });
});

WHICH.createWidget('comparisonFlyout__toggleWidget', function() {
  var $this = this,
      $comparisonFlyout = $this.parents('.js-comparison-flyout__container');
  $this.click(function() {
    WHICH.eventAggregator.trigger('comparison-flyout__toggle-event', {
      $comparisonFlyout: $comparisonFlyout,
      $toggleButton: $this
    });
  });
});

WHICH.eventAggregator.on('comparison-flyout__toggle-event', function(event, data) {
  var $comparisonFlyout = data.$comparisonFlyout,
      $toggleButton = data.$toggleButton,
      isOpen = $comparisonFlyout.hasClass('comparison-flyout__container--open');
  if(isOpen) {
    $comparisonFlyout
      .addClass('comparison-flyout__container--closed')
      .removeClass('comparison-flyout__container--open');
    $toggleButton
      .addClass('comparison-flyout__toggle--closed')
      .removeClass('comparison-flyout__toggle--open');
  } else {
    $comparisonFlyout
      .addClass('comparison-flyout__container--open')
      .removeClass('comparison-flyout__container--closed');
    $toggleButton
      .addClass('comparison-flyout__toggle--open')
      .removeClass('comparison-flyout__toggle--closed');
  }
});

WHICH.eventAggregator.on('comparison-flyout__remove-product-event', function(event, data) {
  var $comparisonFlyout = $('.js-comparison-flyout__container'),
      countController = new WHICH.comparisonFlyout__CountController($comparisonFlyout),
      model = data.model,
      manufacturer = data.manufacturer,
      $container = 
        data.$container || 
        $comparisonFlyout
         .find('.js-comparison-flyout__product-container')
         .filter(function(index, element) {
           var $element = $(element), 
               elementManufacturer = $element.find('.comparison-flyout__manufacturer').text(),
               elementModel = $element.find('.comparison-flyout__model').text(),
               isMatch = (elementManufacturer === manufacturer && elementModel === model);
           return isMatch;
         });
  $container
    .addClass('comparison-flyout__product-placeholder--tv')
    .removeClass('comparison-flyout__product')
    .empty();
    countController.decrement();
    if(countController.getCount() === 0) {
      $comparisonFlyout
        .removeClass('comparison-flyout__container--open')
        .removeClass('comparison-flyout__container--closed')
        .addClass('comparison-flyout__container--hidden');
    }
});

WHICH.createWidget('comparisonFlyout__removeAllWidget', function(data) {
  var $this = this,
    $comparisonFlyout = $this.parents('.js-comparison-flyout__container');
    $this.click(function() {
      $comparisonFlyout.find('.comparison-flyout__remove-product').click();
    });
});

/*
 * Updates the count of the comparison flyout
 */
WHICH.comparisonFlyout__CountController = function($comparisonFlyout) {
  this.$count = $comparisonFlyout.find('.js-comparison-flyout__count');
};
WHICH.comparisonFlyout__CountController.prototype.getCount = function() {
  return Number(this.$count.text());
};
WHICH.comparisonFlyout__CountController.prototype.increment = function() {
  var currentCount = Number(this.$count.text());
  this.$count.text(++currentCount);
};
WHICH.comparisonFlyout__CountController.prototype.decrement = function() {
  var currentCount = Number(this.$count.text());
  this.$count.text(--currentCount);
};

/*
 * Updates the products in the comparison flyout
 */
WHICH.comparisonFlyout__ProductController = function($comparisonFlyout) {
  this.$comparisonFlyout = $comparisonFlyout;
};
WHICH.comparisonFlyout__ProductController.prototype.$getNextEmptyContainer = function() {
  return $firstEmptyProductContainer = this.$comparisonFlyout
          .find('.js-comparison-flyout__product-container:empty')
          .first();
};
WHICH.comparisonFlyout__ProductController.prototype.addProduct = function(data) {
  var $nextEmptyContainer = this.$getNextEmptyContainer(),
      renderedProductTemplate = WHICH.comparisonFlyout__productTemplate(data),
      hasContainerAvailable = ($nextEmptyContainer.length > 0);
  if(hasContainerAvailable) {
    $nextEmptyContainer
      .addClass('comparison-flyout__product')
      .removeClass('comparison-flyout__product-placeholder--tv')
      .append(renderedProductTemplate);
  }
  return hasContainerAvailable;
};

/*
 * Updates the state of the flyout container: open, closed, hidden
 */
WHICH.comparisonFlyout__FlyoutController = function($comparisonFlyout) {
  this.$comparisonFlyout = $comparisonFlyout;
};
WHICH.comparisonFlyout__FlyoutController.prototype.isHidden = function() {
  return this.$comparisonFlyout.hasClass('comparison-flyout__container--hidden');
};
WHICH.comparisonFlyout__FlyoutController.prototype.openIfHidden = function() {
  if(this.isHidden()) {
    this.$comparisonFlyout.removeClass('comparison-flyout__container--hidden')
      .addClass('comparison-flyout__container--open');
  }
};

// Scenario - Add product event handler
WHICH.eventAggregator.on('comparison-flyout__add-product-event', function(event, data) {
  var $comparisonFlyout = $('.js-comparison-flyout__container'),
      countController = new WHICH.comparisonFlyout__CountController($comparisonFlyout),
      productController = new WHICH.comparisonFlyout__ProductController($comparisonFlyout),
      flyoutController = new WHICH.comparisonFlyout__FlyoutController($comparisonFlyout),
      productAdded;
  // add the product
  productAdded = productController.addProduct(data);
  if(productAdded) {
    // increase the count
    countController.increment();
    // open the flyout if it is currently hidden
    flyoutController.openIfHidden();
    // send a success event
    WHICH.eventAggregator.trigger('comparison-flyout__add-product-success-event', {
      $target: data.$source
    });
    // run widgets
    $comparisonFlyout.widgetLoader();
  } else {
    // send a failure event
    WHICH.eventAggregator.trigger('comparison-flyout__add-product-failure-event', {
      $target: data.$source
    });
  }
});

$('.js-comparison-flyout__container').widgetLoader();
