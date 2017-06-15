// Insert styles
var CSS = `
  .shopify-tools-theme-info {
    font-size: 1.2rem;
    font-style: italic;
    color: #81878d;
  }
`
if (!document.querySelector('.shopify-tools-css')) {
  $('head').append('<style class="shopify-tools-css">');
}

$('.shopify-tools-css')[0].sheet.insertRule(CSS, 0);

// Get theme information
$.get(`${document.origin}/admin/themes.json`)
  .always((response) => {
    // In this case, we don't have a status if the request was successful
    if (response.status) {
      console.error(`There was a problem getting theme info. Reponse came back with ${response.status} - ${response.statusText}`);
      return;
    }
    var themeInfo = response.themes;
    var themes = $('.published-theme-title, .unpublished-theme-title');
    for (let index = 0; index < themes.length; index++) {
      $(themes[index]).parent().append(generateThemeInfoHTML(themeInfo[index]));
    }
  });

// Helper function
function generateThemeInfoHTML(info) {
  return `
  <div class="shopify-tools-theme-info">
    <p>Theme ID: ${info.id}</p>
    <p>Last updated ${moment(info.updated_at).fromNow()}</p>
  </div>
  `;
}