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

function removeExcludedClasses(element) {
	elementClass = element.className;
	exludedClasses = ["mw-empty-elt", "mw-editsection"];
	if(exludedClasses.includes(elementClass)) {
		element.remove();
	}
}

function cleanExcludedClassesSubtree(element) {
	removeExcludedClassesRecursive = recursify(removeExcludedClasses);
	removeExcludedClassesRecursive(element);
}

function cleanDataSubtree(element){
	cleanUrlSubtree(element);
	cleanExcludedClassesSubtree(element);
}
