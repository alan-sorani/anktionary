/*
Log that we received the message.
Then display a notification. The notification contains the URL,
which we read from the message.
*/
function add_css(message) {

  console.log("background script received message");

  // Create an error in case insertCSS fails
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  // Insert CSS for custom buttons
  let insertingCSS = browser.tabs.insertCSS({file: "anki-buttons.css"});
  insertingCSS.then(null,onError);
}

/*
Assign `notify()` as a listener to messages from the content script.
*/
browser.runtime.onMessage.addListener(add_css);
