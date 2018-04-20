// Key events handler
chrome.commands.onCommand.addListener((command) => {
  try {
    getActiveTab((tab) => {
      runScript(command, tab);
    });
  } catch (error) {
    alert(`No action available for ${command}`);
  }
});

// Extension click events handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'goToOptions':
      chrome.runtime.openOptionsPage();
      break;
    default:
      try {
        getActiveTab((tab) => {
          runScript(request.action, tab);
        });
      } catch (error) {
        alert(`No action available for ${request.action}`);
      }
  }
});

// Navigation events handler
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    loadOptionalScripts(tab);
  }
});

// Helper functions
function getActiveTab(cb) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    cb(tabs[0]);
  });
}

function runScript(name, tab) {
  chrome.tabs.executeScript(tab.id, {file: `/js/actions/${name}.js`});
}

function loadOptionalScripts(tab) {
  // Valid URL's to apply optional scripts to. Key is the name of the script file
  const VALID_URLS = {
    ChangeSidebarColor: /.myshopify.(com|io)\/admin/i,
    ShowThemeInfo: /.myshopify.(com|io)\/admin\/themes/i
  }

  chrome.storage.sync.get({
    // Defaults when options aren't explicitly set
    ChangeSidebarColor: true,
    ShowThemeInfo: true
  }, (items) => {
    Object.keys(items).forEach((item) => {
      if (items[item] && VALID_URLS[item] && VALID_URLS[item].test(tab.url)) {
        runScript(item, tab);
      }
    });
  });
}