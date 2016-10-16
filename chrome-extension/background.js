console.log("loaded Background");
chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected");
  port.onMessage.addListener(function(msg) {
    console.log("background.js message recieved " + msg);
    if (msg == "request-current-URL") {
      chrome.tabs.query({active : true, currentWindow: true}, function (tabs) {
        port.postMessage(tabs[0].url);
      });
    } else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {keywords: msg}, function(response) {
          chrome.extension.getBackgroundPage().console.log("all cool");
        });
      });
    }
  });
});
