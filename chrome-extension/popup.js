function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function clickAnalyze(e) {
  var responseTxt = httpGet("https://pier21.herokuapp.com/article?url=http://www.bbc.com/news/science-environment-37665529&disable_text=1");
  var response = JSON.parse(responseTxt);
  document.getElementById("score").innerHTML = response.relevancy;
  document.getElementById("feedback-id").innerHTML = response.id;
}

function feedback(isRelevant) {
  var feedbackId = document.getElementById("feedback-id");
  var responseTxt = httpGet("http://pier21.herokuapp.com/feedback?feedback=" +
      (isRelevant ? '1' : '0') + "&id=" + feedbackId.innerHTML);
}

function clickRelevant(e) {
  feedback(true);
}

function clickNotRelevant(e) {
  feedback(false);
}

document.addEventListener('DOMContentLoaded', function () {
  var buttonAnalyze = document.getElementById("analyze");
  buttonAnalyze.addEventListener('click', clickAnalyze);
  var buttonRelevant = document.getElementById("relevant");
  buttonRelevant.addEventListener('click', clickRelevant);
  var buttonNotRelevant = document.getElementById("not-relevant");
  buttonNotRelevant.addEventListener('click', clickNotRelevant);
});
