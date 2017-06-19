// Insert styles
var CSS = `
  .shopify-tools-theme-info {
    font-size: 1.2rem;
    font-style: italic;
    color: #81878d;
  }
`
if ($('.shopify-tools-css').length === 0) {
  $('head').append('<style class="shopify-tools-css">');
}

$('.shopify-tools-css')[0].sheet.insertRule(CSS, 0);

// Regex to use to find theme id in url
var THEME_ID_REGEX = new RegExp(/\/([0-9]*)\//);

// Make sure theme info is not already displayed
if ($('.shopify-tools-theme-info').length === 0) {
  // Get theme information
  $.get(`${document.origin}/admin/themes.json`)
    .always((response) => {
      // In this case, we don't have a status if the request was successful
      if (response.status) {
        console.error(`There was a problem getting theme info.
          Reponse came back with ${response.status} - ${response.statusText}`
        );
        return;
      }

      var themeInfo = response.themes;
      var $themes = $('.published-theme, .unpublished-themes');
      
      for (let index = 0; index < $themes.length; index++) {
        let $currentTheme = $($themes[index]);
        currentId = null; 
        if ($currentTheme.hasClass('published-theme')) {
          let url = ($currentTheme.find('[href*="/editor"]').attr('href'));
          currentId = THEME_ID_REGEX.exec(url)[1];
        } else {
          currentId = $currentTheme.attr('id').replace('theme_', "");
        }
        let currentInfo = matchThemeInfo(currentId, themeInfo);
        let $target = $currentTheme.find('[class*="theme-title"]').parent();
        $target.append(generateThemeInfoHTML(currentInfo));
      }
    });
}

// Helper function
function generateThemeInfoHTML(info) {
  return `
    <br/>
    <div class="shopify-tools-theme-info">
      <p>Theme ID: ${info.id}</p>
      <p>Last updated ${moment(info.updated_at).fromNow()}</p>
    </div>
  `;
}

function matchThemeInfo(themeId, themeInfo) {
  for (let index = 0; index < themeInfo.length; index++) {
    // Comparing a number to a string so using == instead of === here
    if (themeInfo[index].id == themeId) {
      return themeInfo[index];
    }
  }
  return undefined;
}