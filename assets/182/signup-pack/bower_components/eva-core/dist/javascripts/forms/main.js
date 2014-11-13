(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define(['jquery', 'h5f'], factory);
  } else {
      root.forms = factory(root.jQuery, root.H5F);
  }
}(this, function ($, h5f) {

	  window.document.documentElement.className += ' eva-js-enabled';
    return function(elForms) {
        // Define the classes that are triggered on input
        // valid, invalid, and required events
        for (var i = 0, len = elForms.length; i < len; ++i) {
            h5f.setup(elForms[i], {
                validClass: "valid",
                invalidClass: "invalid",
                requiredClass: "required"
            });
        }

        var $input_elements = $('input, textarea');
        $input_elements.focus(function() {
            $(this).parent().find('.hint').show();
        });

        $input_elements.blur(function() {
            $(this).parent().find('.hint').hide();
        });
    };
}));
