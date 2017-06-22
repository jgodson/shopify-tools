// List of all menu items
/* 
** name: Name of item in menu
** action: Name of script file to execute in ./actions/
** scope: URL to limit menu item to (regex)
** setting: Will only show menu item when setting matches value
** { name: name of setting, value: setting value to match }
*/
const MENU_ITEMS = [
  {
    name: "Toggle Title Bar",
    action: "title-toggle"
  },

  {
    name: "Toggle Side Bar",
    action: "sidebar-toggle"
  },

  {
    name: "Toggle Theme Warnings",
    action: "theme-warnings-toggle",
    scope: /.myshopify.(com|io)\/admin\/themes\/[0-9]*/
  }
]

// Helper functions
function generateOption(details) {
  let element = document.createElement("div");
  element.classList.add('menu-item');
  element.dataset.action = details.action;
  element.innerText = details.name;
  return element;
}