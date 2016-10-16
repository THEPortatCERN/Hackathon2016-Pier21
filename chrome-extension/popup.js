function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function httpGetAsync(theUrl) {
  var request = new XMLHttpRequest();
  request.open( "GET", theUrl, true); // true = synchronous request
  request.onload = function (e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        var response = JSON.parse(request.responseText);
        document.getElementById("score").innerHTML = "Score: " + response.relevancy;
        document.getElementById("feedback-id").innerHTML = response.id;
        document.getElementById("relevant").disabled = false;
        document.getElementById("not-relevant").disabled = false;
        // TODO: the response will include a list of keyboards, we should highlight those in the current page.

        //document.getElementById("score").innerHTML = 'chrome.tabs.getSelected()';
      } else {
        console.error(request.statusText);
      }
    }
  };
  request.onerror = function (e) {
    console.error(request.statusText);
  };
  request.send(null);
}

function feedback(isRelevant) {
  var feedbackId = document.getElementById("feedback-id");
  if (!feedbackId) {
    return;
  }
  var responseTxt = httpGet("http://pier21.herokuapp.com/feedback?feedback=" +
      (isRelevant ? '1' : '0') + "&id=" + feedbackId.innerHTML);
}

function clickRelevant(e) {
  feedback(true);
  document.getElementById("not-relevant").disabled = true;
}

function clickNotRelevant(e) {
  feedback(false);
  document.getElementById("relevant").disabled = true;
}

document.addEventListener('DOMContentLoaded', function () {
  var buttonRelevant = document.getElementById("relevant");
  buttonRelevant.addEventListener('click', clickRelevant);
  var buttonNotRelevant = document.getElementById("not-relevant");
  buttonNotRelevant.addEventListener('click', clickNotRelevant);
});

var port = chrome.extension.connect({
  name: "Sample Communication"
});
port.postMessage("request-current-URL");
port.onMessage.addListener(function(msg) {
    chrome.extension.getBackgroundPage().console.log("Sending request to server for: " + msg);

    // TODO: when issuing a new request to the page, update the value of Yes/No
    // if there was a previous Feedback.
    httpGetAsync("https://pier21.herokuapp.com/article?disable_text=1&url=" + msg);

});
