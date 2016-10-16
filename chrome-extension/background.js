console.log("loaded Background");
chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected");
  port.onMessage.addListener(function(msg) {
    console.log("background.js message recieved " + msg);
    chrome.tabs.query({active : true, currentWindow: true}, function (tabs) {
      port.postMessage(tabs[0].url);
    });
  });
});
