chrome.runtime.onInstalled.addListener(function() {
  localStorage["maxValue"] = 50;
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: "www.amazon.com" }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
  ]);
});
