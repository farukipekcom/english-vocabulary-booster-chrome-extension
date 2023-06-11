const style = document.createElement(`style`);
style.innerHTML = `
  p:has(.englishVocabularyBoosterCard){
    display: inline-block !important;
  }
  .englishVocabularyBoosterCard {
    display:inline-block !important;
    position: relative !important;
    cursor: pointer !important;
    font-weight: 600 !important;
  }
  .englishVocabularyBoosterCard::after {
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
    z-index: 0 !important;
  }
  .englishVocabularyBoosterCard:hover::after{
    background-color: #bc9f16cc !important;
  }
  .englishVocabularyBoosterCard:hover > .englishVocabularyBoosterCardInner {
    display: flex !important;
  }
  .englishVocabularyBoosterCardInner{
    font-family: sans-serif !important;
    display:none !important;
    flex-direction:column !important;
    justify-content: center !important;
    gap:12px !important;
    min-width: 160px !important;
    width: 200px !important;
    max-width:260px !important;
    padding: 16px 16px !important;
    background: white !important;
    position: absolute !important;
    left:50% !important;
    z-index: 999999999 !important;
    -webkit-transform: translateX(-50%) !important;
    -ms-transform: translateX(-50%) !important;
    transform: translateX(-50%) !important;
    border:1px solid #bbbbbb !important;
    cursor: default !important;
    border-radius: 8px !important;
  }
  .englishVocabularyBoosterCardInnerHeading{
    display:flex !important;
  }
  .englishVocabularyBoosterCardInnerHeadingDivider{
    width: 4px !important;
    height: 68px !important;
    border-radius: 4px !important;
    background-color:#101828 !important;
  }
  .englishVocabularyBoosterCardInnerHeadingText{
    display:flex !important;
    flex-direction: column !important;
    gap:4px !important;
    margin-left: 8px !important;
  }
  .englishVocabularyBoosterCardInnerHeadingTextTitle:nth-child(3){
    margin-top: 4px !important;
  }
  .englishVocabularyBoosterCardInnerHeadingTextTitle{
    color:#737373 !important;
    font-family: Inter !important;
    font-weight: 500 !important;
    font-size:10px !important;
    line-height:1 !important;
  }
  .englishVocabularyBoosterCardInnerHeadingTextMeaning{
    color: #000 !important;
    font-family: Inter !important;
    font-weight:500 !important;
    font-size: 16px !important;
    line-height:1 !important;
  }
  .englishVocabularyBoosterCardInnerDivider{
    height:1px !important;
    width:100% !important;
    background-color: #D9D9D9 !important;
  }
  .englishVocabularyBoosterCardInnerBody{
    display:flex !important;
    flex-direction:column !important;
    gap: 8px !important;
  }
  .englishVocabularyBoosterCardInnerBodyItem{
    display:flex !important;
    align-items:center !important;
  }
  .englishVocabularyBoosterCardInnerBodyItemTitle{
    color: #737373 !important;
    font-family: Inter !important;
    font-style:italic !important;
    line-height: 1 !important;
    font-weight: 500 !important;
    font-size:12px !important;
    width: 58px !important;
  }
  .englishVocabularyBoosterCardInnerBodyItemMeaning{
    color: #000000 !important;
    font-family: Inter !important;
    line-height: 1 !important;
    font-weight: 500 !important;
    font-size:13px !important;
  }
  .englishVocabularyBoosterCardInnerFooter{
    font-family: Inter !important;
    font-size: 10px !important;
    font-weight: 500 !important;
    color:#A2A2A2 !important;
    width:100% !important;
    text-align:right !important;
    line-height: 1 !important;
  }
`;
var head = document.getElementsByTagName("HEAD")[0];
head.appendChild(style);
chrome.storage.local.get(["data"], (result) => {
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
      console.log("Searched word: ", obj[i].word);
      if (obj[i].word === undefined) {
        break;
      }
      if (customElement.indexOf(obj[i]?.word) === -1 ? false : true) {
        console.log("Found: ", customElement);
        count = count + 1;
        allElements[x].innerHTML = allElements[x].innerHTML.replace(
          " " + obj[i].word + " ",
          " " +
            `<div class="englishVocabularyBoosterCard">
            ${obj[i].word}
            <div class="englishVocabularyBoosterCardInner">
              <div class="englishVocabularyBoosterCardInnerHeading">
                <div class="englishVocabularyBoosterCardInnerHeadingDivider"></div>
                <div class="englishVocabularyBoosterCardInnerHeadingText">
                  <div class="englishVocabularyBoosterCardInnerHeadingTextTitle">ENGLISH</div>
                  <div class="englishVocabularyBoosterCardInnerHeadingTextMeaning">${obj[i].word}</div>
                  <div class="englishVocabularyBoosterCardInnerHeadingTextTitle">TURKISH</div>
                  <div class="englishVocabularyBoosterCardInnerHeadingTextMeaning">${obj[i].meaning}</div>
                </div>
              </div>
              ${
                obj[i].noun || obj[i].verb || obj[i].adjective || obj[i].adverb
                  ? `
                  <div class="englishVocabularyBoosterCardInnerDivider"></div>
                  <div class="englishVocabularyBoosterCardInnerBody">` +
                    `${
                      obj[i].verb &&
                      `<div class="englishVocabularyBoosterCardInnerBodyItem">
                      <div class="englishVocabularyBoosterCardInnerBodyItemTitle">verb</div>
                      <div class="englishVocabularyBoosterCardInnerBodyItemMeaning">${obj[i].verb}</div>
                    </div>`
                    }` +
                    `${
                      obj[i].noun &&
                      `<div class="englishVocabularyBoosterCardInnerBodyItem">
                      <div class="englishVocabularyBoosterCardInnerBodyItemTitle">noun</div>
                      <div class="englishVocabularyBoosterCardInnerBodyItemMeaning">${obj[i].noun}</div>
                    </div>`
                    }` +
                    `${
                      obj[i].adjective &&
                      `<div class="englishVocabularyBoosterCardInnerBodyItem">
                      <div class="englishVocabularyBoosterCardInnerBodyItemTitle">adjective</div>
                      <div class="englishVocabularyBoosterCardInnerBodyItemMeaning">${obj[i].adjective}</div>
                    </div>`
                    }` +
                    `${
                      obj[i].adverb &&
                      `<div class="englishVocabularyBoosterCardInnerBodyItem">
                      <div class="englishVocabularyBoosterCardInnerBodyItemTitle">adverb</div>
                      <div class="englishVocabularyBoosterCardInnerBodyItemMeaning">${obj[i].adverb}</div>
                    </div>`
                    }` +
                    `</div>`
                  : ""
              }   
              <div class="englishVocabularyBoosterCardInnerFooter">EXTENSION OPTIONS</div></div></div>` +
            " "
        );
      }
    }
  }
}
