(function($){
  $(document).ready(function() {
    $('#helpArrow').remove();
    forms([$('form')[0]]);

    var $btn = $('#sign-up-lower .btn-prev');
    if ($btn.length) {
        var formatPrevButton = function() {
            if (window.innerWidth < 560) {
                $btn.text('<');
            } else {
                $btn.text('Previous Step');
            }
        };

        $(window).on('resize', formatPrevButton);
        formatPrevButton();
    }

  });
}(jQuery));
