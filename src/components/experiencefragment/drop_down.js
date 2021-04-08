function hideDropDown() {
  var navGroup = document.getElementsByClassName(
    "cmp-languagenavigation__group"
  )[0];
  if (navGroup.style.visibility === "hidden" || !navGroup.style.visibility) {
    return;
  }
  navGroup.style.visibility = "hidden";
  navGroup.style.opacity = "0";
  navGroup.style.transition = "none";
  document.getElementsByClassName("cmp-languagenavigation")[0].style[
    "border-color"
  ] = null;
  document.getElementsByClassName("downArrow")[0].classList.toggle("upArrow");
}

function showDropDown() {
  var navGroup = document.getElementsByClassName(
    "cmp-languagenavigation__group"
  )[0];
  navGroup.style.visibility = "visible";
  navGroup.style.opacity = "1";
  navGroup.style.transition = "0.5s";
  document.getElementsByClassName("cmp-languagenavigation")[0].style[
    "border-color"
  ] = "#46a740";
  document.getElementsByClassName("downArrow")[0].classList.toggle("upArrow");
}

function toggleDropDown() {
  var navGroup = document.getElementsByClassName(
    "cmp-languagenavigation__group"
  )[0];
  if (navGroup.style.visibility === "hidden" || !navGroup.style.visibility) {
    showDropDown();
  } else {
    hideDropDown();
  }
}

// Close the dropdown menu if the user clicks outside of it
// Toggle otherwise
window.onclick = function (event) {
  var languageNav = document.getElementsByClassName(
    "cmp-languagenavigation"
  )[0];
  if (!event.target != languageNav && !languageNav.contains(event.target)) {
    hideDropDown();
  } else {
    toggleDropDown();
  }
};

// Insert arrow icon as a div instead of with :after
// This way we can toggle it here using JS
document.addEventListener("DOMContentLoaded", function (event) {
  var targetElement = document.getElementsByClassName(
    "cmp-languagenavigation"
  )[0];
  if (typeof targetElement === "undefined") return;
  var div = document.createElement("div");
  div.setAttribute("class", "downArrow");
  targetElement.insertBefore(div, targetElement.firstChild);
});
