function recursify(func) {
	function recursiveFunc(...arguments){
		element = arguments[0];

		func(element);
		for (const child of element.children) {
			recursiveFunc(child);
		}
	}
	return recursiveFunc;
}


function findElementSibling(element, condition){
	result = element;
	while((condition(result) == false) && (result != null)) {
		result = result.nextElementSibling;
	}
	return result;
}


function toggleSynonyms(synonymSpan){
	condition = (element) => {
		return (
			(element != null) &&
			(element.tagName == "DL") &&
			(element.firstElementChild.tagName == "DD") &&
			(element.firstElementChild.firstElementChild.className == "nyms synonym")
		); 
	}

	synonymDl = findElementSibling(synonymSpan, condition);
	
	
	if(synonymDl == null){
		alert("Error. Couldn't find html object matching the given button.");
		return;
	}
	synonymDd = synonymDl.firstElementChild;
	synonymSpan = synonymDd.firstElementChild;
	
	synonymStyle = synonymSpan.getAttribute("style");
	if(synonymStyle == "display: none;"){
		synonymSpan.setAttribute("style", "");
	}
	else{
		synonymSpan.setAttribute("style", "display: none;");
	}
}

function toggleHypernyms(hypernymSpan){
	condition = (element) => {
		if(element == null){
			return false;
		}
		if(element.tagName != "DL"){
			return false;
		}
		child = element.children[1];
		if(child == null || child.tagName != "DD"){
			return false;
		}
		grandChild = child.firstElementChild;
		if(grandChild.className != "nyms hypernym")
		{
			return false;
		}
		return true;
	}

	hypernymDl = findElementSibling(hypernymSpan, condition);
	if(hypernymDl == null){
		alert("Error. Couldn't find html object matching the given button.");
		return;
	}
	hypernymDd = hypernymDl.children[1];
	hypernymSpan = hypernymDd.firstElementChild;
	hypernymStyle = hypernymSpan.getAttribute("style");
	if(hypernymStyle == "display: none;"){
		hypernymSpan.setAttribute("style", "");
	}
	else{
		hypernymSpan.setAttribute("style", "display: none;");
	}
}

function toggleQuotations(quotationSpan){
	quotationUl = findElementSibling(
		quotationSpan,
		(element) => {
			return element.tagName == "UL";
		}
	)
	if(quotationUl == null){
		alert("Error. Couldn't find html object matching the given button.");
		return;
	}
	quotationStyle = quotationUl.getAttribute("style");
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

function addSynonymToggleFunction(element){
	element.innerHTML = toggleArrow(element.innerHTML);
	synonymSpan = element.parentElement;
	toggleSynonyms(synonymSpan);
}

function addHypernymToggleFunction(element){
	element.innerHTML = toggleArrow(element.innerHTML);
	hypernymSpan = element.parentElement;
	toggleHypernyms(hypernymSpan);
}

function addQuotationToggleFunction(element){
	element.innerHTML = toggleArrow(element.innerHTML);
	quotationSpan = element.parentElement;
	toggleQuotations(quotationSpan);
}

function addSynonymToggleFunctions(){
	let matches = document.querySelectorAll(".nyms-toggle > a");
	for (match of matches) {
		if(match.innerHTML.slice(0,7) != "synonym"){
			continue;
		}
		match.setAttribute("onclick", "addSynonymToggleFunction(this)");
	}
}

function addHypernymToggleFunctions(){
	let matches = document.querySelectorAll(".nyms-toggle > a");
	for (match of matches) {
		if(match.innerHTML.slice(0,8) != "hypernym"){
			continue;
		}
		match.setAttribute("onclick", "addHypernymToggleFunction(this)");
	}
}

function addQuotationToggleFunctions(){
	let matches = document.querySelectorAll(".HQToggle > a");
	for (match of matches) {
		match.setAttribute("onclick", "addQuotationToggleFunction(this)");
	}
}

function addToggleFunctions(){
	addSynonymToggleFunctions();
	addHypernymToggleFunctions();
	addQuotationToggleFunctions();
}

addToggleFunctions();
