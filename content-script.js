function addEntry() {

	navigator.clipboard.writeText("Entry data");
	alert("Entry copied to clipboard");	
	
}

function removeEntry() {

	alert("Entry removed from Anki");

}

function addAnkiButtons() {
	const language_headers = document.getElementsByTagName("h2");

	for (header of language_headers){
		if (
			header.innerHTML == "Contents" ||
			header.innerHTML == "Navigation menu"
		)
		{
			continue; 
		}
		
		//create a button
		const button_span = document.createElement("span");
		button_span.setAttribute("class", "mw-ankibutton");
		const button = document.createElement("button");
		button.setAttribute("class", "ankibutton add");
		button.addEventListener('click', addEntry);
		const innerSpan = document.createElement("span");
		const nbsp = String.fromCharCode(160);
		const button_text = document.createTextNode(nbsp);

		//append the button to the DOM node
		button_span.appendChild(button);
		button.appendChild(innerSpan);
		innerSpan.appendChild(button_text);
		header.appendChild(button_span);
	}
}

function matchURL(url) {
	regex = new RegExp("^https:\/\/.+\.wiktionary\.org\/[^:]+$")
 	return regex.test(url)
}

// Get the URL of the active tab
url = window.location.href;
if (matchURL(url)) {
	addAnkiButtons()
}
