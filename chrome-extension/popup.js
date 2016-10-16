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
        if (response.feedback == "1") {
          relevantButtonSelected();
        } else if (response.feedback == "0") {
          notRelevantButtonSelected();
        }
        // TODO: the response will include a list of keyboards, we should highlight those in the current page.
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

function relevantButtonSelected() {
  document.getElementById("relevant").style.backgroundColor = "#449d44";
  document.getElementById("not-relevant").style.backgroundColor = "#D18D77";
}

function notRelevantButtonSelected() {
  document.getElementById("relevant").style.backgroundColor = "#97C997";
  document.getElementById("not-relevant").style.backgroundColor = "#c9302c";
}

function clickRelevant(e) {
  feedback(true);
  relevantButtonSelected();
}

function clickNotRelevant(e) {
  feedback(false);
  notRelevantButtonSelected();
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
    httpGetAsync("https://pier21.herokuapp.com/article?disable_text=1&url=" + msg);
});
