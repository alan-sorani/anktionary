function getEntryData(header) {
	let entryData = "";
	htmlElement = header.nextElementSibling;
	while(htmlElement != null && htmlElement.tagName != "H2"){
		cleanDataSubtree(htmlElement);
		entryData += htmlElement.outerHTML;
		htmlElement = htmlElement.nextElementSibling;
		entryData += "\n\n";
	}
	return entryData;
}

function addEntry(header) {
	entryData = getEntryData(header);
	navigator.clipboard.writeText(entryData);
	alert("Entry copied to clipboard.");
}

function removeEntry() {
	alert("Entry removed from Anki");
}

function handleButtonClick(e) {
	let target = e.target;
	while (target.className != "mw-ankibutton" && target.parentNode != null) {
		target = target.parentNode;
	}
	if (target.className != "mw-ankibutton") {
		alert("Error handling button press. Couldn't find span \
		containing the button.")
		return;
	}
	if (target.firstChild.className = "ankibutton add") {
		addEntry(target.parentNode);
		return;
	}
	if (target.firstChild.className = "ankibutton remove") {
		removeEntry(target.parentNode);
		return;
	}
	alert("Error handling button press: button class name \
	doesn't match any of the possible options.");
}

function addAnkiButtons() {
	const language_headers = document.getElementsByTagName("H2");

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
		button.addEventListener('click', handleButtonClick);
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

function matchUrl(url) {
	regex = new RegExp("^https:\/\/.+\.wiktionary\.org\/wiki\/[^:\/]+$")
 	return regex.test(url)
}

// Get the URL of the active tab
pageUrl = window.location.href;
if (matchUrl(pageUrl)) {
	addAnkiButtons()
}
