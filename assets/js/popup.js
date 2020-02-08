$().ready(function () {
  $('#home-screen-button-subscribe').on('click', function() {
    $('.popup-subscribe-form').removeClass('off').addClass('on');
  });

  $('.popup-subscribe-form .close').on('click', function() {
    $('.popup-subscribe-form').removeClass('on').addClass('off');
  })
});
