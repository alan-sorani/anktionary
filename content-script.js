function matchURL(url) {
  regex = new RegExp("^https:\/\/.+\.wiktionary\.org\/[^:]+$")
  return regex.test(url)
}

// Get the URL of the active tab
url = window.location.href;
if (matchURL(url)) {

  // Add the css code for styling the anki buttons
  console.log("content script sending message");
  browser.runtime.sendMessage("add CSS");

  // Go over the language headers to add buttons next to each of them
  const language_headers = document.getElementsByTagName("h2");

  for (header of language_headers){
    if (header.innerHTML != "Contents" && header.innerHTML != "Navigation menu"){
      // Create button for adding data to Anki
      
      /*
      const outerButtonSpan = document.createElement("span");
      outerButtonSpan.setAttribute("style", "padding-left:17px; display:inline-block;");
      const button = document.createElement("button")
      button.setAttribute(class, "mw-ankibutton add");
      const innerButtonSpan = document.createElement("span");
      const buttonText = document.createTextNode("&nbsp");
      
      // Append the button to the DOM node
      
      outerButtonSpan.appendChild(button);
      button.appendChild(innerButtonSpan);
      innerButtonSpan.appendChild(buttonText);
      header.appendChild(outerButtonSpan);
      */
      
      // doesn't seem to work with CSS
      const button_span = document.createElement("span");
      button_span.setAttribute("class", "mw-ankibutton");
      const button = document.createElement("button");
      button.setAttribute("class", "ankibutton");
      const innerSpan = document.createElement("span");
      const button_text = document.createTextNode(" ");

      //append the button to the DOM node
      button_span.appendChild(button);
      button.appendChild(innerSpan);
      innerSpan.appendChild(button_text);
      header.appendChild(button_span);
    }
  }
}
