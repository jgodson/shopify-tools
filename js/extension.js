document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (evt) => {
    if (event.target.classList.contains('menu-item')) {
      let action = evt.target.dataset.action;
      chrome.runtime.sendMessage({action}, (response) => {
        this.close();
      });
    }
  });
});

// Add the menu options
Promise.all([getTabURL(), loadOptions()])
  .then(([tabURL, settings]) => {
    for (item of MENU_ITEMS) {
      let settingName = null;
      let settingValue = null;
      if (item.setting) {
        settingName = item.setting.name;
        settingValue = item.setting.value;
        // Skip item if it has a setting and value does not match
        if (settings[settingName] !== undefined && settings[settingName] !== settingValue) {
          continue;
        }
      }
      // Skip item if the scope doesn't match the tab url
      if (item.scope && !item.scope.test(tabURL)) {
        continue;
      }
      addOption(generateOption(item));
    }
  });

// Helper functions
function addOption(menuItem) {
  document.querySelector('#MenuItems').appendChild(menuItem);
}

function getTabURL() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({windowType: "normal", highlighted: true}, (tabs) => {
      resolve(tabs[0].url);
    });
  });
}

// Restore saved settings from storage
function loadOptions() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get({
      // Defaults when options aren't explicitly set
      ShowThemeInfo: true
    }, (items) => {
      resolve(items);
    });
  });
}