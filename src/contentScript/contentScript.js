const style = document.createElement(`style`);
style.innerHTML = `
  p:has(.chromeCard){
    display: inline-block !important;
  }
  .chromeCard {
    display:inline-block !important;
    position: relative !important;
    cursor: pointer !important;
    font-weight: 600 !important;
  }
  .chromeCard::after {
    content: " " !important;
    position: absolute !important;
    width:100% !important;
    height:5px !important;
    background: #f3d02ecc !important;
    bottom:1px !important;
    left:50% !important;
    -webkit-transform: translateX(-50%) !important;
    -ms-transform: translateX(-50%) !important;
    transform: translateX(-50%) !important;
    z-index: -1 !important;
  }
  .chromeCard:hover::after{
    background-color: #bc9f16cc !important;
  }
  .chromeCard:hover > .chromeCardInner {
    display: flex !important;
  }
  .chromeCardInner{
    display:none !important;
    flex-direction:column !important;
    justify-content: center !important;
    min-width: 160px !important;
    width: 180px !important;
    max-width:260px !important;
    padding: 8px 16px !important;
    background: white !important;
    position: absolute !important;
    left:50% !important;
    z-index: 999999999 !important;
    -webkit-transform: translateX(-50%) !important;
    -ms-transform: translateX(-50%) !important;
    transform: translateX(-50%) !important;
    border:1px solid #bbbbbb !important;
  }
  .chromeMeaningHero {
    display:flex !important;
    flex-direction:column !important;
    font-style:normal !important;
    margin-bottom: 8px !important;
    .chromeMeaningHeroItem {
      color: black !important;
      font-size: 12px !important;
      line-height: 1.5 !important;
    }
    .chromeMeaningHeroItemTitle {
      color:#636363 !important;
      font-size: 11px !important;
      font-weight: 600 !important;
      margin-top: 8px !important;
      font-family: sans-serif !important;
    }
    .chromeMeaningHeroItemValue {
      color:black !important;
      font-size: 16px !important;
      font-weight:400 !important;
      margin-left: 8px !important;
      font-family: sans-serif !important;
    }
  }
  .chromeMeaningList{
    display:flex !important;
    flex-direction:column !important;
    border-top: 1px solid #e6e6e6 !important;
    padding-top:8px !important;
    font-style:normal !important;
      .chromeMeaningListItem {
        font-family: sans-serif !important;
        font-size: 14px !important;
        font-weight: 400 !important; 
        line-height: 1.5 !important;
        color: #252525 !important;
        display:flex !important;
        align-items: center !important;
      }
      .chromeMeaningListItemTitle{
        font-size: 12px !important;
        font-weight: 500 !important;
        color: #636363 !important;
        min-width:64px !important;
        font-family: sans-serif !important;
      }
      .chromeMeaningListItemMeaning{
        font-size: 14px !important;
        font-weight: 400 !important;
        color: #252525 !important;
        min-width:64px !important;
        font-family: sans-serif !important;
      }
  }
`;
var head = document.getElementsByTagName("HEAD")[0];
head.appendChild(style);
chrome.storage.sync.get(["data"], (result) => {
  replaceWord(result.data);
});
function replaceWord(obj) {
  console.log("Get all words", obj);
  let count = 0;
  var allElements = document.querySelectorAll("h1, h2, h3, h4, h5, p, header,nav, footer, caption, span, td");
  for (let i = 0; i < 100; i++) {
    for (var x = 0; x < allElements.length; x++) {
      let tempElement = allElements[x].innerHTML.toLowerCase().split(".").join(" ");
      let customElement = tempElement.toString().split(" ");
      console.log("Searched word: ", obj[i].keyword);
      if (obj[i].keyword === undefined) {
        break;
      }
      if (customElement.indexOf(obj[i]?.keyword) === -1 ? false : true) {
        console.log("Found: ", customElement);
        count = count + 1;
        allElements[x].innerHTML = allElements[x].innerHTML.replace(
          obj[i].keyword,
          `<div class="chromeCard">${
            obj[i].keyword
          }<div class="chromeCardInner"><div class="chromeMeaningHero"><span class="chromeMeaningHeroItem chromeMeaningHeroItemTitle">ENGLISH</span><span class="chromeMeaningHeroItem chromeMeaningHeroItemValue">${
            obj[i].keyword
          }</span><span class="chromeMeaningHeroItem chromeMeaningHeroItemTitle">TURKISH</span><span class="chromeMeaningHeroItem chromeMeaningHeroItemValue">${
            obj[i].replace
          }</span></div>${
            obj[i].noun || obj[i].verb || obj[i].adjective || obj[i].adverb
              ? `<div class="chromeMeaningList">` +
                `${
                  obj[i].noun &&
                  `<div class="chromeMeaningListItem"><div class='chromeMeaningListItemTitle'>noun:</div><div class='chromeMeaningListItemMeaning'>${obj[i].noun}</div></div>`
                }` +
                `${
                  obj[i].verb &&
                  `<div class="chromeMeaningListItem"><div class='chromeMeaningListItemTitle'>verb:</div><div class='chromeMeaningListItemMeaning'>${obj[i].verb}</div></div>`
                }` +
                `${
                  obj[i].adjective &&
                  `<div class="chromeMeaningListItem"><div class='chromeMeaningListItemTitle'>adjective:</div><div class='chromeMeaningListItemMeaning'>${obj[i].adjective}</div></div>`
                }` +
                `${
                  obj[i].adverb &&
                  `<div class="chromeMeaningListItem"><div class='chromeMeaningListItemTitle'>adverb:</div><div class='chromeMeaningListItemMeaning'>${obj[i].adverb}</div></div>`
                }</div>`
              : ""
          }</div></div>`
        );
      }
    }
  }
}
