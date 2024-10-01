let userName = "User 1";
let entry_copied_msg = browser.i18n.getMessage("entryCopied")

function handle_messages(message, sender, sendResponse){
	if(message.type == "get userName"){
		sendResponse({result: userName});
	}
	if(message.type == "get entry_copied_msg"){
		sendResponse({result: entry_copied_msg})
	}
}

browser.runtime.onMessage.addListener(handle_messages);
