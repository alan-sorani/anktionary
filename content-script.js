/*
If the click was on a link, send a message to the background page.
The message contains the link's URL.
*/
function notifyExtension(e) {
  const language_headers = document.getElementsByTagName("h2")
  
  for (header of language_headers){
    if (header.innerHTML != "Contents" && header.innerHTML != "Navigation menu"){
      //create button for adding data to Anki
      const button_span = document.createElement("span")
      button_span.setAttribute("class", "mw-ankibutton")
      button_span.setAttribute("style", "padding-left:17px; display:inline-block;")
      const button = document.createElement("button")
      const button_text = document.createTextNode("Add to Anki")
      button_span.appendChild(button)
      button.appendChild(button_text)
      
      header
      .appendChild(button_span)
    }
  }

  console.log("content script sending message");
  browser.runtime.sendMessage({"url": output});
}

/*
Add notifyExtension() as a listener to click events.
*/
window.addEventListener("click", notifyExtension);
