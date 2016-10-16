console.log("loaded reader.js v2");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var all = request.keywords;
    crawlForContent(document.body, all);
  });

function crawlForContent(node, keywords) {
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
        crawlForContent(child, keywords);
        child = next;
      }
      break;
    case 3: // Text node
        requestClassification(node, keywords);
        break;
    }
}

function requestClassification(textNode, keywords) {
  for(var j = 0; j < keywords.length; j++) {
    console.log(keywords[j]);
    var v = textNode.nodeValue;
    var re = new RegExp(keywords[j],"g");
    v = v.replace(re, "<a>AAAA</a>");
    textNode.nodeValue = v;
  }
}

