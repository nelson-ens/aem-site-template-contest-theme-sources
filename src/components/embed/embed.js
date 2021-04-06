document.addEventListener('DOMContentLoaded', function (event) {
  const embedList = document.getElementsByClassName('embed');
  const embedCount = embedList.length;

  for (let index = 0; index < embedCount; index++) {
    if (embedList[index].classList.contains('footerWithSearch')) {
      const inputList = embedList[index].getElementsByClassName('cmp-embed_footerwithsearch_input');
      if (inputList.length) {
        // Add placeholder text to search input.
        inputList[0].placeholder = "Search";
        // Focus on textbox if the div container is clicked.
        const contList = embedList[index].getElementsByClassName('cmp-embed_footerwithsearch_search');
        contList[0].onclick = function() { inputList[0].focus(); }
      }
    } 
  }
});
