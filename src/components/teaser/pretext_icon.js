document.addEventListener('DOMContentLoaded', function (event) {
  const x = document.getElementsByClassName('teaser');
  const l = x.length;

  for (let i = 0; i < l; i++) {
    console.log(i, x.length);

    if (x[i].classList.contains("homeHeader") || x[i].classList.contains("contentHeader")) {
      const y = x[i].getElementsByClassName("cmp-teaser__pretitle");
      if (y.length) {
        const inner = y[0].innerHTML.toLocaleLowerCase();
        if (inner.startsWith("[[icon=") && inner.endsWith("]]") && inner.length > 9) {
          let path = inner.substr(7, inner.length - 9);
          y[0].innerHTML = `<img class="cmp-teaser__pretitle-icon" src="${path}" alt="${path}" />`
        }
      }
    } 
    // else if (x[i].classList.contains("boxedRightText")) {
    //   const y = x[i].getElementsByTagName("img");
    //   console.log(y.length, y);
    // }
  }
})
