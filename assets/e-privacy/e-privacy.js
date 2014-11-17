(function (Cookies) {

  var ePrivacy = {
    init : function( options ){

      var settings = { days : 30 }

      $.extend( settings, options || {} )

      $('html').addClass('js');

      if( Cookies.get('eprivacy_accepted') !== 'yes' ) {
        // Show the banner
        $('body').prepend($('.eprivacy.banner'));
        $('.eprivacy.banner').slideDown();
      }

      $('#eprivacy-submit').click( function(event) {
        event.preventDefault();
        $('.eprivacy.banner').slideUp();
        Cookies.set('eprivacy_accepted', 'yes', settings.days);
      });

      if($('#eprivacyclose').length) {
        $('#eprivacyclose').click(function(){
          $('.eprivacy.banner').slideUp();
        });
      }
    }
  }

  window.ePrivacy = ePrivacy;

})(Cookies);
