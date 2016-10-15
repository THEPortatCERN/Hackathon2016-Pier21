function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function click(e) {
  var responseTxt = httpGet("https://pier21.herokuapp.com/article?url=http://www.bbc.com/news/science-environment-37665529&disable_text=1");
    var response = eval('(' + responseTxt + ')')
  document.getElementById("score").innerHTML = response["relevancy"]
}

document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById("analyze");
  button.addEventListener('click', click);
});
