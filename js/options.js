// Saves options to chrome.storage.sync.
function saveOptions() {
  const ChangeSidebarColor = document.getElementById('ChangeSidebarColor').checked;
  const ShowThemeInfo = document.getElementById('ShowThemeInfo').checked;
  chrome.storage.sync.set({
    ChangeSidebarColor,
    ShowThemeInfo
  }, function() {
    // Update status to let user know options were saved.
    const status = document.getElementById('Status');
    const statusText = status.querySelector('.status-text');
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
