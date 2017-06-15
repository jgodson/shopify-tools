var $warningsBar = $('.file-errors-and-warnings');

$warningsBar.animate({height:'toggle'}, {
  duration: 350,
  complete() {
    window.dispatchEvent(new Event('resize'));
  }
});
