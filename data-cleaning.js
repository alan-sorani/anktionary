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

function exportSrcSet(element) {
	srcset = element.getAttribute("srcset");
	if(srcset == null){
		return;
	}
	sources = srcset.split(",");
	exportedSrcSet = "";
	for (source of sources){
		params = source.split(" ");
		// remove the fast element if it was the empty string following a comma
		if ( params[0] == "" ){
			params.shift();
		}
		// get the url and remove it from params
		url = params.shift();
		urlNew = exportUrl(url);
		exportedSrcSet += urlNew + " ";
		for (param of params) {
			exportedSrcSet += param + " "; 
		}
		exportedSrcSet += ", "
	}
	// remove ending comma
	indexLastComma = exportedSrcSet.length - 1
	exportedSrcSet = exportedSrcSet.substring(0, indexLastComma - 1);
	element.setAttribute("srcset", exportedSrcSet);
}

function cleanUrlSubtree(element) {
	exportSubtreeHref = recursify(exportHref);
	exportSubtreeSrc = recursify(exportSrc);
	exportSubtreeSrcSet = recursify(exportSrcSet);
	
	exportSubtreeHref(element);
	exportSubtreeSrc(element);
	exportSubtreeSrcSet(element);
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

function styleWikipediaDivs(element) {
	if(!element.classList.contains("sister-wikipedia")){
		return;
	}
	
	element.style.float = "right";
	element.style.removeProperty('background');
	// alternatively, set background to a color matching light/dark mode
	const interProjectSpan = element.querySelector(".interProject");
	interProjectSpan.remove();
}

function cleanWikipediaDivs(element) {
	styleWikipediaDivsRecursive = recursify(styleWikipediaDivs);
	styleWikipediaDivsRecursive(element);
}

function cleanDataSubtree(element){
	cleanUrlSubtree(element);
	cleanExcludedClassesSubtree(element);
	cleanWikipediaDivs(element);
}
