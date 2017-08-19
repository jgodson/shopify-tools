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
      var $themes = $('.published-theme, .themes-list__row[id]');
      
      for (let index = 0; index < $themes.length; index++) {
        let $currentTheme = $($themes[index]);
        let currentId = null; 
        let $target = null;
        if ($currentTheme.hasClass('published-theme')) {
          let url = ($currentTheme.find('[href*="/editor"]').attr('href'));
          currentId = THEME_ID_REGEX.exec(url)[1];
          $target = $currentTheme.find('.ui-heading').parent();
        } else {
          currentId = $currentTheme.attr('id').replace('theme_', "");
          $target = $currentTheme.find('.themes-list__theme-title').parent();
        }
        let currentInfo = matchThemeInfo(currentId, themeInfo);
        $target.append(generateThemeInfoHTML(currentInfo));

        // If theme is processsing, watch for when it finishes
        if (currentInfo.processing) {
          watchTheme(currentInfo);
        }
      }
    });
}

// Helper function
function generateThemeInfoHTML(info) {
  return `
    <div class="shopify-tools-theme-info">
      <p>Theme ID: ${info.id}</p>
      <p>Last updated ${moment(info.updated_at).fromNow()}</p>
    </div>
  `;
}

// Watch a processing theme and append theme info when it finishes
function watchTheme(themeInfo) {
  const selector = `#theme_${themeInfo.id}`;
  let $target = $(selector);
  const mutationTarget = $target.parent()[0];

  const observer = new MutationObserver((mutations) => {
    const targetId = selector.replace('#', '');
    if (mutations[0].addedNodes.length > 0 && mutations[0].addedNodes[0].id === targetId) {
      observer.disconnect();
      $target = $(selector).find('.themes-list__theme-title').parent();
      $target.append(generateThemeInfoHTML(themeInfo));
    }
  });

  observer.observe(mutationTarget, {childList: true});
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