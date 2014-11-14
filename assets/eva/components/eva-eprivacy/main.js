define(['jquery', 'cookie-monster/lib/monster'], function( $, monster ) {

  var ePrivacy = {
    init : function( options ){

      var settings = { days : 30 }

      $.extend( settings, options || {} )

      $('html').addClass('js');

      if( monster.get('eprivacy_accepted') !== 'yes' ) {
        // Show the banner
        $('#eprivacy').slideDown();
      }

      $('#eprivacy-submit').click( function(event) {
        event.preventDefault();
        $('#eprivacy').slideUp();
        monster.set('eprivacy_accepted', 'yes', settings.days);
      });

      if($('#eprivacyclose').length) {
        $('#eprivacyclose').click(function(){
          $('#eprivacy').slideUp();
        });
      } 

    }
  }

  return ePrivacy;

});
