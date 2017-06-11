var $titleBar = $('.ui-title-bar-container');
if ($titleBar.is(':visible')) {
  $titleBar.slideUp();

  setTimeout(()=> {
    window.dispatchEvent(new Event('resize'));
  }, 300);
} else {
  $titleBar.slideDown();
  
  setTimeout(()=> {
    window.dispatchEvent(new Event('resize'));
  }, 300);
}
