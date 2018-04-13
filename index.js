var max;
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("max").addEventListener("keyup", call);
});
var call = new Promise((resolve, reject) => {
  if (localStorage["maxValue"] === undefined) {
    reject("Maximum value is invalid.");
  } else {
    resolve(localStorage["maxValue"]);
    setValue();
  }
}).then((val) => {
  console.log(val);
  execute(val);
});

function setValue() {
  max = document.getElementById("max").value;
 // max = 25;
  console.log(max);
  // chrome.storage.local.set({ "maxValue": max }, function() {
  //   console.log("Maximum price " + max + " saved.");
  // });
  localStorage["maxValue"] = max;
}

function execute(val) {
  const lis = document.getElementsByTagName("li");
  var bool = false;
  //max = localStorage["maxValue"];
  max = val;
  console.log(max);
  Array.from(lis).forEach(li => {
    const nums = li.getElementsByClassName("sx-price-whole");
    Array.from(nums).forEach(num => {
      if (parseFloat(num.innerText) > parseFloat(max)) {
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
}  