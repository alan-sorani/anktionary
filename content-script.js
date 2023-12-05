/*
If the click was on a link, send a message to the background page.
The message contains the link's URL.
*/
function notifyExtension(e) {
  console.log("content script sending message");
  browser.runtime.sendMessage({"text": "Hello World!"});
}

/*
Add notifyExtension() as a listener to click events.
*/
window.addEventListener("click", notifyExtension);
