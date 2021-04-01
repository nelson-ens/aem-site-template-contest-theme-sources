var numOfImages;
var left;
var right;
var allImages;

function createInsertedImage(imgURL, text) {
  var container = document.createElement("div");
  var image = document.createElement("img");
  var caption = document.createElement("span");
  image.src = imgURL;
  caption.textContent = text;
  container.setAttribute("class", "inserted-image");
  container.appendChild(image);
  container.appendChild(caption);
  return container;
}

function getImageData(index) {
  return allImages[index].getElementsByClassName("cmp-image")[0].dataset;
}

function updateImage(position, newIndex) {
  var imgPosition = position === "left" ? 0 : 1;
  var insertedImages = document.getElementsByClassName("inserted-image");
  var image = insertedImages[imgPosition].getElementsByTagName("img")[0];
  var caption = insertedImages[imgPosition].getElementsByTagName("span")[0];
  var data = getImageData(newIndex);

  image.src = data.asset;
  caption.textContent = data.title;
}

function moveImages(direction) {
  if (direction === "next") {
    left = left + 1 >= numOfImages ? 0 : left + 1;
    right = right + 1 >= numOfImages ? 0 : right + 1;
  } else {
    left = left - 1 < 0 ? numOfImages - 1 : left - 1;
    right = right - 1 < 0 ? numOfImages - 1 : right - 1;
  }
  updateImage("left", left);
  updateImage("right", right);
}

function insertImages() {
  var carousel = document.getElementsByClassName("showThreeImages")[0];
  if (!carousel) return;
  var content = carousel.getElementsByClassName("cmp-carousel__content")[0];
  var images = content.getElementsByClassName("cmp-carousel__item");

  var carousel = document.getElementsByClassName("showOneImage")[0];
  numOfImages = images.length;
  left = numOfImages - 1;
  right = 1;
  allImages = images;

  var leftData = getImageData(left);
  var rightData = getImageData(right);

  var leftImage = createInsertedImage(leftData.asset, leftData.title);
  var rightImage = createInsertedImage(rightData.asset, rightData.title);

  content.insertBefore(leftImage, content.firstChild);
  content.insertBefore(rightImage, content.lastChild);
}

window.addEventListener("click", function (event) {
  var carousel = document.getElementsByClassName("showThreeImages")[0];
  if (!carousel) return;
  var buttons = document.getElementsByClassName("cmp-carousel__action");
  var prev = buttons[0];
  var next = buttons[1];

  if (prev.contains(event.target)) {
    moveImages("prev");
  } else if (next.contains(event.target)) {
    moveImages("next");
  } else return;
});

window.onload = insertImages;
