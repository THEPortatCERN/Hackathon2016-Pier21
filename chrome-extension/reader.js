addJSInjectedButton();

function crawlForContent(node) {
  if (!node) {
    return;
  }
  if (node.tagName &&
      (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea')) {
    return;
  }
  if (node.classList && node.classList.contains('ace_editor')) {
    return;
  }

  var child, next;
  switch (node.nodeType) {
      case 1:  // Element
      case 9:  // Document
      case 11: // Document fragment
          child = node.firstChild;
          while (child) {
              next = child.nextSibling;
              crawlForContent(child);
              child = next;
          }
          break;

      case 3: // Text node
          requestClassification(node);
          break;
    }
}

function requestClassification(textNode) {
  var v = textNode.nodeValue;
  v = v.replace(/ola/g, "AAAA");
  textNode.nodeValue = v;
}

function addJSInjectedButton() {
  var text = document.createTextNode("Inject JS");
  var btn = document.createElement("BUTTON")
  btn.onclick = function () {
    crawlForContent(document.body);
    alert('Done');
  };
  btn.appendChild(text);
  document.body.appendChild(btn);
}
