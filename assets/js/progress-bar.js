$().ready(function () {
  const progress = $('.progress-bar-value');
  $(window).scroll(function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progress.width(`${(winScroll / height) * 100}%`);
  });
});
