function findElementSibling(element, condition){
	result = element.nextElementSibling;
	while((condition(element) == false) && (element != null)) {
		result = result.nextElementSibling;
	}
	return result;
}

function toggleSynonims(synonimButton){
	condition = (element) => {
		return (
			(event.tagName == "DL") &&
			(event.firstChild.tagName == "DD") &&
			(event.firstChild.firstChild.className == "nyms synonym"
		); 
	}
	synonimDl = findElementSibling(synonimButton, condition);
	if(synonimDl == null){
		alert("Error. Couldn't find html object matching the given button.");
	}
	synonimDd = synonimDl.firstChild;
	synonimSpan = synonimDd.firstChild;
	synonimStyle = synonimSpan.getAttribute("style");
	if(synonimStyle == "display: none;"){
		synonimSpan.setAttribute("style", "");
	}
	else{
		synonimSpan.setAttribute("style", "display: none;");
	}
}

function addSynonimButtonFunction(synonimButton){
	synonimButton.addEventListener('click', toggleSynonims);
}
