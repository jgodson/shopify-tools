document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (evt) => {
    if (event.target.classList.contains('menu-option')) {
      let action = evt.target.dataset.action;
      chrome.runtime.sendMessage({action}, (response) => {
        this.close();
      });
    }
  });
});
