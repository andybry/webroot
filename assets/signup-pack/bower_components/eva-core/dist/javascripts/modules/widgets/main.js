//=require jquery
var WHICH = WHICH || {};
/*
 * The overall goal of the 'widgets' module is to provide a way for DOM elements
 * to trigger blocks of JavaScript code. The blocks of code are divided up into
 * jQuery plugins (widgets) and are triggered by adding data attributes to the
 * corresponding DOM elements
 * 
 * CONTENTS:
 *
 *  function createWidget - create jQuery plugins
 *  widget widgetLoader   - create the widgetLoader plugin that runs the other 
 *                          plugins
 */


/*
 * Create a jQuery plugin to encapsulate functionality that
 * is to be applied to a set of DOM elements.
 *
 * This is an abstraction of the standard jQuery plugin pattern
 * See: http://learn.jquery.com/plugins/
 *
 */
WHICH.createWidget = function (name, fn) {
  $.fn[name] = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    return this.each(function () {
      fn.apply($(this), args);
    });
  };
};

/*
 * Create the widgetLoader jQuery plugin
 *
 * This plugin goes through the selected DOM elements looking for
 * child elements that contain the data-widget attribute.
 * 
 * For each of the elements that are marked with the attribute it runs the jQuery plugins
 * that are found by splitting the space separated list of plugins against each of those elements
 * passing in any data attributes it finds
 *
 * It then marks the corresponding elements as having been initialised (so that they
 * aren't reinitialised on repeat runs of the widget loader)
 *
 * It can be run on containers after DOM insertion to initialise widgets on those elements
 *
 * Example:
 * 
 *   <div class="example__parent">
 *     <div class="example__child1" data-widget="widget1 widget2 widget3"></div>
 *     <div class="example__child2" data-widget="widget3"></div>
 *   </div>
 *
 *   <script>
 *     $('.example__parent').widgetLoader();
 *   </script>
 *
 *   This example would run the jQuery plugins as follows:
 *     $('.example__child1').widget1(dataAttributes);
 *     $('.example__child1').widget2(dataAttributes);
 *     $('.example__child1').widget3(dataAttributes);
 *     $('.example__child2').widget3(dataAttributes);
 *
 */
WHICH.createWidget('widgetLoader', function () {
  var rootElement = $(this),
    dataAttributes = rootElement.data(),
    widgetName = rootElement.data('widget');

  if (typeof  widgetName !== 'undefined' && !rootElement.data('widget-initialised')) {
    $.each(widgetName.split(' '), function () {
      if ($.trim(this).length > 0) {
        if (typeof rootElement[this] === 'function') {
          rootElement[this](dataAttributes);
        }
      }
    });
    rootElement.data('widget-initialised', true);
  }
  rootElement.find('[data-widget]').each(function () {
    $(this).widgetLoader();
  });
});

