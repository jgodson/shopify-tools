var $sidebar = $('#AppFrameAside, #AppFrameNav');
var $mainFrame = $('#AppFrameMain');

$sidebar.animate({width:'toggle'}, {
  duration: 350,
  complete() {
    window.dispatchEvent(new Event('resize'));
  }
});
$mainFrame.toggleClass('shopify-tools-full-width');
