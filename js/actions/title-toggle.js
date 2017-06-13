var $titleBar = $('.ui-title-bar-container');

$titleBar.animate({height:'toggle'}, {
  duration: 350,
  complete() {
    window.dispatchEvent(new Event('resize'));
  }
});
