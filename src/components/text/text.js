document.addEventListener('DOMContentLoaded', function (event) {
  const textList = document.getElementsByClassName('textWithIcon');
  const count = textList.length;

  for (let index = 0; index < count; index++) {
    const pList = textList[index].getElementsByTagName("p");
    if (pList.length) {
      const text = pList[0].innerHTML;
      let start = text.indexOf("[[icon=");
      let end = text.indexOf("]]");
      if (start >= 0 && end > start) {
        // If innerHTML signifies that an icon is wanted, divide content into icon div and content div.
        const iconLoc = text.substring(start + 7, end);
        const innerText = text.substr(end + 2);
        pList[0].innerHTML = `<div class='cmp-text_textWithIcon_icon' style='background-image:url("${iconLoc}");'></div>`
          + `<div class='cmp-text_textWithIcon_caption'>${innerText}</div>`;
      }  
    }
  }
});
