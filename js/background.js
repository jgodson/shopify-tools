function runScript(name) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.executeScript(tabs[0].id, {file: `/js/actions/${name}.js`});
  });
}

const ACTIONS = {
  titleBarToggle() {
    runScript('title-toggle');
  },
  sidebarToggle() {
    runScript('sidebar-toggle');
  }
}

// Key events handler
chrome.commands.onCommand.addListener((command) => {
  if (typeof ACTIONS[command] === 'function') {
    ACTIONS[command]();
  } else {
    alert(`No action available for ${command}`)
  }
});

// Extension events handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (typeof ACTIONS[request.action] === 'function') {
    ACTIONS[request.action]();
  } else {
    alert(`No action available for ${action}`)
  }
});