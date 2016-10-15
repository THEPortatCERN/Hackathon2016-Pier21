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
  // TODO: highlight the clicked button.
}

function clickRelevant(e) {
  feedback(true);
}

function clickNotRelevant(e) {
  feedback(false);
}

document.addEventListener('DOMContentLoaded', function () {
  // TODO: when issuing a new request to the page, update the value of Yes/No
  // if there was a previous Feedback.
  var buttonRelevant = document.getElementById("relevant");
  buttonRelevant.addEventListener('click', clickRelevant);
  var buttonNotRelevant = document.getElementById("not-relevant");
  buttonNotRelevant.addEventListener('click', clickNotRelevant);
  httpGetAsync("https://pier21.herokuapp.com/article?url=http://www.bbc.com/news/science-environment-37665529&disable_text=1");
});
