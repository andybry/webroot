$(function(){
  if($('.hp-msg-old, .hp-msg-new').length ){
    $('.hp-msg-old, .hp-msg-new').removeClass('off');
  }

  /* Old homepage functionality */

  $('#oldnewswitch').click(function(){
    monster.set('homepage_version', 'new', '30');
    location.reload();
  });

  /* New homepage functionality */

  $('#oldnewrevert').click(function(e){
    e.stopPropagation();
    monster.remove('homepage_version');
    // Load up lightbox ('thanks for trying the new homepage' box)
    $('.hp-msg-trying').lightbox_me({
      centered: true,
      overlayCSS: {background: 'black', opacity: .7}
    });
  });

  if(!monster.get('hide_revert')) {
    $('.hp-msg-new, .hp-msg-old').removeClass('off');
  }

  $('.revert-close').click(function(){
    $('.hp-msg-new, .hp-msg-old').slideUp();
    monster.set('hide_revert', true);
  })

  // Lighbox only functionality
/*
  $('#old-hp-btn').click(function () {
    monster.remove('homepage_version');
    closeLightbox();
    window.location.href="/";
  });

  $('#new-hp-btn').click(function () {
    monster.set('homepage_version', 'new', '30');
    closeLightbox();
  });

  $('.hp-msg-trying .close-btn').click(function () {
    closeLightbox();
  });

  function closeLightbox () {
    $('.hp-msg-trying').trigger('close');
  }
*/
});
