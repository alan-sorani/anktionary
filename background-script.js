/*
Log that we received the message.
Then display a notification. The notification contains the URL,
which we read from the message.
*/
function notify(message) {
  console.log("background script received message");
  let title = browser.i18n.getMessage("notificationTitle");
  let content = browser.i18n.getMessage("notificationContent", message.text);
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("icons/anktionary-48.jpeg"),
    "title": title,
    "message": content
  });
}

/*
Assign `notify()` as a listener to messages from the content script.
*/
browser.runtime.onMessage.addListener(notify);
