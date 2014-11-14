(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.amdWeb = factory(root.b);
    }
}(this, function () {
  var Viewport = { };

  function getViewportDimensions(win) {

    var dimensions = { };

      if (win.innerWidth !== undefined) {
        dimensions.width = win.innerWidth;
        dimensions.height = win.innerHeight;
      } else if (win.document.documentElement !== undefined && win.document.documentElement.clientWidth !== undefined && win.document.documentElement.clientWidth !== 0) {
        dimensions.width = win.document.documentElement.clientWidth,
        dimensions.height = win.document.documentElement.clientHeight
      } else {
        dimensions.width = win.document.getElementsByTagName('body')[0].clientWidth;
        dimensions.height = win.document.getElementsByTagName('body')[0].clientHeight;
      }

    return dimensions;

  };

  Viewport.height = function(win) {

    return getViewportDimensions(win).height;

  };

  Viewport.width = function(win) {

    return getViewportDimensions(win).width;

  }

  return Viewport;

}));
