// Saves options to chrome.storage.sync.
function saveOptions() {
  let ChangeSidebarColor = document.getElementById('ChangeSidebarColor').checked;
  chrome.storage.sync.set({
    ChangeSidebarColor,
    ShowThemeInfo
  }, function() {
    // Update status to let user know options were saved.
    let status = document.getElementById('Status');
    let statusText = status.querySelector('.status-text');
    status.classList.add('shown');
    statusText.textContent = 'Changes Saved!';
    setTimeout(function() {
      status.classList.remove('shown');
      statusText.textContent = '';
    }, 3000);
  });
}

// Restore saved settings from storage
function loadOptions() {
  chrome.storage.sync.get({
    // Defaults when options aren't explicitly set
    ChangeSidebarColor: true,
    ShowThemeInfo: true
  }, function(items) {
    document.getElementById('ChangeSidebarColor').checked = items.ChangeSidebarColor;
    document.getElementById('ShowThemeInfo').checked = items.ShowThemeInfo;
  });
}

document.getElementById('Save').addEventListener('click', saveOptions);
document.addEventListener('DOMContentLoaded', loadOptions);
