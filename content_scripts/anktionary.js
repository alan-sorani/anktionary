// Find all the h2 elements in the web-page
languages = getElementsByTagName("h2");

browser.notifications.create({
  type: "basic",
  iconUrl: browser.extension.getURL("icons/anktionary.jpeg"),
  "TITLE",
  message: "CONTENT",
});

/*
for (const language in languages) {
	var button = document.createElement("button");
	button.appendChild(document.createTextNode("Click Me!"));
	language.appendChild(button)
}
*/
