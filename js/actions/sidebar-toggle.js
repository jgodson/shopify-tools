var $sidebar = $('#AppFrameAside');
var $mainFrame = $('#AppFrameMain');

$sidebar.animate({width:'toggle'}, 350);
$mainFrame.toggleClass('shopify-tools-full-width');