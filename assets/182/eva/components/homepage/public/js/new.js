define(['jquery', 'cookie-monster/lib/monster'], function( $, monster ) {

  $(function(){
    // Check for sso_auth cookie
    var sso_auth = monster.get("sso_auth");

    // If sso_auth cookie doesn't exist or is set to 0, show the survey
    if (sso_auth == 0 || sso_auth == null) {
      $('.hp-msg-old, .hp-msg-new').removeClass('off');
    }

    // Add click to close button on survey link
    $(".revert-close").click(function(){
      $(".hp-msg-new").addClass('off');
    });

  });

});
