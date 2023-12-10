/*
Log that we received the message.
Then add the CSS for Anki buttons to the CSS of the active tab
*/
function addCSS(message) {

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
Assign `addCSS()` as a listener to messages from the content script.
*/
browser.runtime.onMessage.addListener(addCSS);
