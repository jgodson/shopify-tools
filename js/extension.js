const ACTIONS = {
  titleBarToggle() {
    chrome.tabs.executeScript(null, {file: "/js/code_editor.js"});
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function(evt) {
    if (event.target.classList.contains('menu-option')) {
      let action = evt.target.dataset.action;
      if (typeof ACTIONS[action] === 'function') {
        ACTIONS[action](evt);
      } else {
        alert(`No action available for ${action}`)
      }
      window.close();
    }
  });
});
