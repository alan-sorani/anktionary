// add the css code for styling the anki buttons
console.log("content script sending message");
browser.runtime.sendMessage("add CSS");

//go over the language headers to add buttons next to each of them
const language_headers = document.getElementsByTagName("h2")

for (header of language_headers){
	if (header.innerHTML != "Contents" && header.innerHTML != "Navigation menu"){
		//create button for adding data to Anki
		const button_span = document.createElement("span")
		button_span.setAttribute("class", "mw-ankibutton")
		button_span.setAttribute("style", "padding-left:17px; display:inline-block;")
		const button = document.createElement("button")
		const button_text = document.createTextNode("Add to Anki")

		//append the button to the DOM node
		button_span.appendChild(button)
		button.appendChild(button_text)
		header.appendChild(button_span)
	}
}
