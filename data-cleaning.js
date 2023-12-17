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

function exportUrl(url) {
	// convert inner wiktionary URL to global URL
	if(url.startsWith("//")){
		return "https:" + url;
	}
	if(url.startsWith("/")){
		pageUrl = window.location.href;
		pageUrlPrefix = pageUrl.substring(0, pageUrl.indexOf("."));
		return pageUrlPrefix + ".wiktionary.org" + url;	
	}
	return url;
}

function exportHref(element) {
	url = element.getAttribute("href");
	if(url == null){
		return;
	}
	exportedUrl = exportUrl(url);
	element.setAttribute("href", exportedUrl);
}

function exportSrc(element) {
	url = element.getAttribute("src");
	if(url == null){
		return;
	}
	exportedUrl = exportUrl(url);
	element.setAttribute("src", exportedUrl);
}

function cleanUrlSubtree(element) {
	exportSubtreeHref = recursify(exportHref);
	exportSubtreeSrc = recursify(exportSrc);
	
	exportSubtreeHref(element);
	exportSubtreeSrc(element);
}

function removeEmptyElement(element) {
	elementClass = element.className;
	if(elementClass == "mw-empty-elt") {
		element.remove();
	}
}

function cleanEmptyElementsSubtree(element) {
	removeEmptyElements = recursify(removeEmptyElement);
	removeEmptyElements(element);
}

function cleanDataSubtree(element){
	cleanUrlSubtree(element);
	cleanEmptyElementsSubtree(element);
}

function catify(element){
	element.className = "CAT";
}

function recursifyTest(element){
	func = recursify(catify);
	func(element);
}
