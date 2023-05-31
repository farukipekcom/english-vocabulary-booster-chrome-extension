chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "English Vocabulary Booster",
    title: 'Save for: "%s" on English Vocabulary Booster',
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  let baseURL = `chrome-extension://hnhofehcajeoakfpedjpajlmfkepmhen/options.html#/mywords/?word=${info.selectionText}#modalopen`;
  chrome.tabs.create({url: baseURL});
});
