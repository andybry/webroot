//=require jquery
var WHICH = WHICH || {};

/*
 * The event aggregator is a singleton allowing event callbacks
 * to be registered and triggered from a single location.
 *
 * Its purpose is decoupling handler code from the point
 * that it is triggered. This means that neither the handler
 * nor the trigger need to know about each other (they only 
 * need to know about the event name and the data format)
 *
 */
WHICH.eventAggregator = {

  /*
   * Register a callback for an event
   *
   * evtName - The name of the event to register for
   * callback - The handler for the event. This can have two parameters
   *              the (jQuery) event and the and the data. The jQuery event
   *              should not be relied upon because we don't want to couple
   *              to jQuery
   */
  on: function (evtName, callback) {
    $(document).on(evtName, callback);
  },
  /*
   * Trigger the event
   *
   *  evtName - the name of the event to trigger
   *  data - the data to be passed to the second argument of the callback
   *         registered with the on event above
   *
   */
  trigger: function (evtName, data) {
    $(document).trigger(evtName, data);
  }
};
