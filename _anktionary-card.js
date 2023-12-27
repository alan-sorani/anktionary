//global variables
const contractedListRows = 3;
const isMobileDevice = (navigator.userAgent.indexOf("Mobile") > 0);
const termListColumns = isMobileDevice ? 1 : 2;

function findElementSibling(element, condition){
	var result = element;
	while((condition(result) == false) && (result != null)) {
		result = result.nextElementSibling;
	}
	return result;
}

function setTermListColumns(numColumns){
	if(numColumns == 1){
		return;
	}
	const termLists = document.querySelectorAll(".term-list > ul");
	for (const termList of termLists){
		termList.style.setProperty("columns",termListColumns);
		termList.style.setProperty("-webkit-columns",termListColumns);
		termList.style.setProperty("-moz-columns",termListColumns);
	}
}

function toggleSynonyms(synonymSpan){
	const condition = (element) => {
		return (
			(element != null) &&
			(element.tagName == "DL") &&
			(element.firstElementChild.tagName == "DD") &&
			(element.firstElementChild.firstElementChild.className == "nyms synonym")
		); 
	}

	const synonymDl = findElementSibling(synonymSpan, condition);
	
	
	if(synonymDl == null){
		alert("Error. Couldn't find html object matching the given button.");
		return;
	}
	
	const synonymDd = synonymDl.firstElementChild;
	synonymSpan = synonymDd.firstElementChild;
	const synonymStyle = synonymSpan.getAttribute("style");
	
	if(synonymStyle == "display: none;"){
		synonymSpan.setAttribute("style", "");
	}
	else{
		synonymSpan.setAttribute("style", "display: none;");
	}
}

function toggleHypernyms(hypernymSpan){
	const condition = (element) => {
		if(element == null){
			return false;
		}
		if(element.tagName != "DL"){
			return false;
		}
		const child = element.children[1];
		if(child == null || child.tagName != "DD"){
			return false;
		}
		const grandChild = child.firstElementChild;
		if(grandChild.className != "nyms hypernym")
		{
			return false;
		}
		return true;
	}

	const hypernymDl = findElementSibling(hypernymSpan, condition);
	
	if(hypernymDl == null){
		alert("Error. Couldn't find html object matching the given button.");
		return;
	}
	const hypernymDd = hypernymDl.children[1];
	hypernymSpan = hypernymDd.firstElementChild;
	const hypernymStyle = hypernymSpan.getAttribute("style");
	if(hypernymStyle == "display: none;"){
		hypernymSpan.setAttribute("style", "");
	}
	else{
		hypernymSpan.setAttribute("style", "display: none;");
	}
}

function toggleQuotations(quotationSpan){
	const quotationUl = findElementSibling(
		quotationSpan,
		(element) => {
			return element.tagName == "UL";
		}
	)
	if(quotationUl == null){
		alert("Error. Couldn't find html object matching the given button.");
		return;
	}
	const quotationStyle = quotationUl.getAttribute("style");
	if(quotationStyle == "display: none;"){
		quotationUl.setAttribute("style", "display: block");
	}
	else{
		quotationUl.setAttribute("style", "display: none;");
	}
}

function toggleTermListElement(element){
	if(element.getAttribute("style") != "display: none;"){
		element.setAttribute("style", "display: none;");
		return;
	}
	element.setAttribute("style", "");
}

function toggleTermList(termListSpan){
	const termListDiv = termListSpan.parentElement.previousElementSibling;
	const termListUl = termListDiv.firstElementChild;
	const listItems = termListUl.children;
	const numItems = listItems.length;
	const columnLength = Math.floor(numItems / termListColumns);
	
	for (const index in listItems) {
		if(index % columnLength >= contractedListRows){
			toggleTermListElement(listItems[index]);
		}
	}
}

function toggleArrow(string){
	if(string.includes("▼")){
		return string.replace("▼", "▲");
	}
	else{
		return string.replace("▲", "▼");
	}
}

function toggleText(string){
	if(string.includes("more")){
		return string.replace("more", "less");
	}
	else{
		return string.replace("less", "more");
	}
}

function handleSynonymToggle(e){
	var target = e.target;
	while (target.tagName != "A" && target.parentNode != null) {
		target = target.parentNode;
	}
	if (target.tagName != "A") {
		alert("Error handling button press. Couldn't find element \
		containing the button.")
		return;
	}
	
	target.innerHTML = toggleArrow(target.innerHTML);
	const synonymSpan = target.parentElement;
	toggleSynonyms(synonymSpan);
}

function handleHypernymToggle(e){
	var target = e.target;
	while (target.tagName != "A" && target.parentNode != null) {
		target = target.parentNode;
	}
	if (target.tagName != "A") {
		alert("Error handling button press. Couldn't find element \
		containing the button.")
		return;
	}

	target.innerHTML = toggleArrow(target.innerHTML);
	const hypernymSpan = target.parentElement;
	toggleHypernyms(hypernymSpan);
}

function handleQuotationToggle(e){
	var target = e.target;
	while (target.tagName != "A" && target.parentNode != null) {
		target = target.parentNode;
	}
	if (target.tagName != "A") {
		alert("Error handling button press. Couldn't find element \
		containing the button.")
		return;
	}

	target.innerHTML = toggleArrow(target.innerHTML);
	const quotationSpan = target.parentElement;
	toggleQuotations(quotationSpan);
}

function handleTermListToggle(e){
	var target = e.target;
	while (target.tagName != "A" && target.parentNode != null) {
		target = target.parentNode;
	}
	if (target.tagName != "A") {
		alert("Error handling button press. Couldn't find element \
		containing the button.")
		return;
	}

	target.innerHTML = toggleText(toggleArrow(target.innerHTML));
	const termListSpan = target.parentElement;
	toggleTermList(termListSpan);
}

function addSynonymToggleFunctions(){
	let matches = document.querySelectorAll(".nyms-toggle > a");
	for (const match of matches) {
		if(match.innerHTML.slice(0,7) != "synonym"){
			continue;
		}
		match.addEventListener("click", handleSynonymToggle);
	}
}

function addHypernymToggleFunctions(){
	let matches = document.querySelectorAll(".nyms-toggle > a");
	for (const match of matches) {
		if(match.innerHTML.slice(0,8) != "hypernym"){
			continue;
		}
		match.addEventListener("click", handleHypernymToggle);
	}
}

function addQuotationToggleFunctions(){
	let matches = document.querySelectorAll(".HQToggle > a");
	for (const match of matches) {
		match.addEventListener("click", handleQuotationToggle);
	}
}

function addTermListToggleFunctions(){
	let matches = document.querySelectorAll(".list-switcher-element > .NavToggle > a");
	for (const match of matches) {
		match.addEventListener("click", handleTermListToggle);
		match.click();
	}
}

function addToggleFunctions(){
	addSynonymToggleFunctions();
	addHypernymToggleFunctions();
	addQuotationToggleFunctions();
	addTermListToggleFunctions();
}

setTermListColumns(termListColumns);
addToggleFunctions();

