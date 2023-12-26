function findElementSibling(element, condition){
	var result = element;
	while((condition(result) == false) && (result != null)) {
		result = result.nextElementSibling;
	}
	return result;
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


function toggleArrow(string){
	if(string.slice(-1) == "▼"){
		return string.replace(/.$/, "▲");
	}
	else{
		return string.replace(/.$/, "▼");
	}
}

function addSynonymToggleFunction(e){
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

function addHypernymToggleFunction(e){
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

function addQuotationToggleFunction(e){
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

function addSynonymToggleFunctions(){
	let matches = document.querySelectorAll(".nyms-toggle > a");
	for (const match of matches) {
		if(match.innerHTML.slice(0,7) != "synonym"){
			continue;
		}
		match.addEventListener("click", addSynonymToggleFunction);
	}
}

function addHypernymToggleFunctions(){
	let matches = document.querySelectorAll(".nyms-toggle > a");
	for (const match of matches) {
		if(match.innerHTML.slice(0,8) != "hypernym"){
			continue;
		}
		match.addEventListener("click", addHypernymToggleFunction);
	}
}

function addQuotationToggleFunctions(){
	let matches = document.querySelectorAll(".HQToggle > a");
	for (const match of matches) {
		match.addEventListener("click", addQuotationToggleFunction);
	}
}

function addToggleFunctions(){
	addSynonymToggleFunctions();
	addHypernymToggleFunctions();
	addQuotationToggleFunctions();
}

addToggleFunctions();
