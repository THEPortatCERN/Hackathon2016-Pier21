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
              crawlForContent(child);
              child = next;
          }
          break;

      case 3: // Text node
          requestClassification(node, keywords);
          break;
    }
}

function requestClassification(textNode, keywords) {
  
        var keyword = keywords.keywords;
        for(var j = 0; j < keyword.length; j++)
        {
            var v = textNode.nodeValue;
            v = v.replace("/"+v+"/g", "<span style='background-color:yellow'>"+v+"</span>");
            textNode.nodeValue = v;
        }
      
}

