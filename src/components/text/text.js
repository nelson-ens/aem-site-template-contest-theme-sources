document.addEventListener('DOMContentLoaded', function (event) {
  const textList = document.getElementsByClassName('text');
  const count = textList.length;

  for (let index = 0; index < count; index++) {
    if (textList[index].classList.contains('textWithIcon')) {
      const pList = textList[index].getElementsByTagName("p");
      if (pList.length) {
        const text = pList[0].innerHTML;
        pList[0].innerHTML = generateInnerHTML(text, "cmp-text_textWithIcon_icon", "cmp-text_textWithIcon_caption"); 
      }
    }
    if (textList[index].classList.contains('textHorizontalMenu')) {
      const liList = textList[index].getElementsByTagName("li");
      const listCount = liList.length;
      for (let listIndex = 0; listIndex < listCount; listIndex++) {
        const text = liList[listIndex].innerHTML;
        liList[listIndex].innerHTML = generateInnerHTML(text, "cmp-text_textHorizontalMenu_icon", "cmp-text_textHorizontalMenu_caption");

        // Click anchor when list is clicked.
      const aList = liList[listIndex].getElementsByTagName("a");
      if (aList.length) {
        liList[listIndex].onclick = function(){ aList[0].click(); }
      }
      }
    }
  }

  function generateInnerHTML(text, iconClass, textClass) {
    let innerText = "";

    // Check if there is an icon...
    const startIcon = text.indexOf("[[icon=");
    const endIcon = text.indexOf("]]", startIcon);
    let iconText = "";
    if (startIcon >= 0 && endIcon > startIcon) {
      iconText = text.substring(startIcon + 7, endIcon);
      innerText = text.substring(0, startIcon) + text.substring(endIcon + 2);
    }

    // Check if there is a goto...
    const startGoto = innerText.indexOf("[[goto=");
    const endGoto = innerText.indexOf("]]", startGoto);
    let gotoText = "";
    if (startGoto >= 0 && endGoto > startGoto) {
      gotoText = innerText.substring(startGoto + 7, endGoto);
      innerText = innerText.substring(0, startGoto) + innerText.substring(endGoto + 2);
    }

    innerText = (gotoText !== "" ? `<a href='${gotoText}'>${innerText}</>` : innerText);
    return (iconText !== "" 
      ? `<div class='${iconClass} cmp-text_icon_${iconText}'></div><div class='${textClass}'>${innerText}</div>`
      : innerText);
  }
});
