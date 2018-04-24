window.onload = execute();

var loc = document.getElementsByClassName("nav-right");
loc[0].innerHTML =
  '    <div class="header" style="background-color: #89b14e;color:white;font-family:\'Futura Medium\';width:200px; display:flex;flex-direction:row;justify-content:space-between;">' +
  '<h2 style="padding-left:10px;">Money Buddy</h2>' +
  '<img src=\"https://res.cloudinary.com/dknopoff/image/upload/v1523995211/favicon.png\" style=\"width:40px;height:30px;padding-left:10px;\"/>'+
    "</div>" +
    "<div id=\"pricing\" style=\"display:flex;flex-direction:column;color:white;justify-content:center;width:200px;font-family:\'Futura Medium\'\">" +
  "<input type=\"text\" style=\"border-radius:4px;border-style:none;\" id=\"max\" placeholder=\"Enter a maximum price: $\">" +
  "<button id=\"submit\" style=\"width:60px;font-family:\'Futura Medium\';margin-left:auto;margin-right:auto;margin-top:3px;\">Enter</button>"+
    "</div>";

document.getElementById("nav-belt").style.height = '60px';
document.getElementById("max").addEventListener("keyup", setValue);
document.getElementById("submit").addEventListener("click", execute);

function setValue() {
  max = document.getElementById("max").value;
  localStorage["maxValue"] = max;
  //window.location.reload();
}

function execute() {
  const lis = document.getElementsByTagName("LI");
  var bool = false;
  //max = localStorage["maxValue"];
  max = localStorage["maxValue"];
  Array.from(lis).forEach(li => {
    const nums = li.getElementsByClassName("sx-price-whole");
    Array.from(nums).forEach(num => {
      res = num.innerText.replace(/^[, ]+|[, ]+$|[, ]+/g, "").trim();
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
