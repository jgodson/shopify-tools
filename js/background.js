const ACTIONS = {
  titleBarToggle() {
    runScript('title-toggle');
  },

  sidebarToggle() {
    runScript('sidebar-toggle');
  },

  goToOptions() {
    chrome.runtime.openOptionsPage();
  }
}

// Valid URL's to apply optional scripts to. Key is the name of the script file
const VALID_URLS = {
  ChangeSidebarColor: /.myshopify.com\/admin/i,
  ShowThemeInfo: /.myshopify.com\/admin\/themes/i
}

// Key events handler
chrome.commands.onCommand.addListener((command) => {
  if (typeof ACTIONS[command] === 'function') {
    ACTIONS[command]();
  } else {
    alert(`No action available for ${command}`)
  }
});

// Extension click events handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (typeof ACTIONS[request.action] === 'function') {
    ACTIONS[request.action]();
  } else {
    alert(`No action available for ${action}`)
  }
});

// Navigation events handler
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete' && tab.active) {
    loadOptionalScripts(tab);
  }
})

// Helper functions
function runScript(name) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    console.log(tabs);
    chrome.tabs.executeScript(tabs[0].id, {file: `/js/actions/${name}.js`});
  });
}

function loadOptionalScripts(tab) {
  chrome.storage.sync.get({
    // Defaults when options aren't explicitly set
    ChangeSidebarColor: true,
    ShowThemeInfo: true
  }, function(items) {
    Object.keys(items).forEach(function(item) {
      if (items[item] && VALID_URLS[item].test(tab.url)) {
        runScript(item);
      }
    });
  });
}