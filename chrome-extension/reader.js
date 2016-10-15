addJSInjectedButton();

function addJSInjectedButton() {
  var text = document.createTextNode("You've been JS injected");
  var btn = document.createElement("BUTTON")
  btn.onclick = function () {
    window.location='https://github.com/THEPortatCERN/Hackathon2016-Pier21';
  };
  btn.appendChild(text);
  document.body.appendChild(btn);
}
