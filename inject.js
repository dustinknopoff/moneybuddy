document.addEventListener("DOMContentLoaded", () => {
  execute();
});

var loc = document.getElementsByClassName("nav-right");
console.log(loc[0].innerHTML);
loc[0].innerHTML = "    <div class=\"header\" style=\"background-color: #6fcf97;color:white;font-family:\"Helvetica Neue\"; height:50px;>" +
    "<h6 style=\"padding-left:10px;\">Money Buddy</h6>" +
    "</div>" +
    "<div id=\"pricing\" style=\"display:flex;flex-direction:column;padding:10px;color:white;justify-content:center;\">" +
    "Enter a maximum price: $" +
  "<input type=\"text\" id=\"max\">" +
  "<button id=\"submit\" style=\"width:60px;\">Enter</button>"+
    "</div>";

document.getElementById("nav-belt").style.height = '60px';
document.getElementById("max").addEventListener("keyup", setValue);
document.getElementById("submit").addEventListener("click", execute);

function setValue() {
  max = document.getElementById("max").value;
  console.log(max);
  localStorage["maxValue"] = max;
  //window.location.reload();
}

function execute() {
  const lis = document.getElementsByTagName("LI");
  var bool = false;
  //max = localStorage["maxValue"];
  max = localStorage["maxValue"];
  console.log(lis.innerHTML);
  Array.from(lis).forEach(li => {
    const nums = li.getElementsByClassName("sx-price-whole");
    Array.from(nums).forEach(num => {
      console.log(num);
      res = num.innerText.replace(/^[, ]+|[, ]+$|[, ]+/g, "").trim();
      console.log(res);
      if (parseFloat(res) >= parseFloat(max)) {
        li.innerHTML =
          '<div class="injected">' +
          "<div><h1>You Can't Afford This!</h1></div></div>";
      }
      bool = true;
    });
    if (!bool) {
      const othernums = li.getElementsByClassName("a-size-medium");
      Array.from(othernums).forEach(num => {
        var re = new RegExp(/[0-9,.]+/g);
        re.exec(num.innerText).forEach(n => {
          if (parseFloat(n) > parseFloat(max)) {
            li.innerHTML =
              '<div class="injected">' +
              "<div><h1>You Can't Afford This!</h1></div></div>";
          }
        });
      });
    }
  });
  var loc = document.getElementsByClassName("nav-right");
  loc[0].innerHTML = "";
  document.getElementById("nav-belt").style.height = '39px';
}