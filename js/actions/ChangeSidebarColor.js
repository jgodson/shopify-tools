// Insert styles
var CSS = `
  #AppFrameAside, #AppFrameNav nav { background: white; }
`
if (!document.querySelector('.shopify-tools-css')) {
  $('head').append('<style class="shopify-tools-css">');
  $('.shopify-tools-css')[0].sheet.insertRule(CSS, 0);
}
