class CarouselWithThreeImages {
  constructor(carousel) {
    this.numOfImages;
    this.left;
    this.right;
    this.allImages;
    this.insertImages(carousel);
  }

  getImageData(index) {
    return this.allImages[index].getElementsByClassName("cmp-image")[0].dataset;
  }

  createInsertedImage(imgURL, text) {
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

  insertImages(carousel) {
    if (!carousel) return;
    var content = carousel.getElementsByClassName("cmp-carousel__content")[0];
    var images = content.getElementsByClassName("cmp-carousel__item");
    this.numOfImages = images.length;
    this.left = this.numOfImages - 1;
    this.right = 1;
    this.allImages = images;

    var leftData = this.getImageData(this.left);
    var rightData = this.getImageData(this.right);

    var leftImage = this.createInsertedImage(leftData.asset, leftData.title);
    var rightImage = this.createInsertedImage(rightData.asset, rightData.title);

    content.insertBefore(leftImage, content.firstChild);
    content.insertBefore(rightImage, content.lastChild);
  }

  updateImage(position, newIndex) {
    var imgPosition = position === "left" ? 0 : 1;
    var insertedImages = document.getElementsByClassName("inserted-image");
    var image = insertedImages[imgPosition].getElementsByTagName("img")[0];
    var caption = insertedImages[imgPosition].getElementsByTagName("span")[0];
    var data = this.getImageData(newIndex);

    image.src = data.asset;
    caption.textContent = data.title;
  }

  moveImages(direction) {
    if (direction === "next") {
      this.left = this.left + 1 >= this.numOfImages ? 0 : this.left + 1;
      this.right = this.right + 1 >= this.numOfImages ? 0 : this.right + 1;
    } else {
      this.left = this.left - 1 < 0 ? this.numOfImages - 1 : this.left - 1;
      this.right = this.right - 1 < 0 ? this.numOfImages - 1 : this.right - 1;
    }
    this.updateImage("left", this.left);
    this.updateImage("right", this.right);
  }
}

var allCarousels = [];

function initThreeImageCarousels() {
  var carousels = document.getElementsByClassName("showThreeImages");
  for (var i = 0; i < carousels.length; i++) {
    allCarousels.push(new CarouselWithThreeImages(carousels[i]));
  }
}

window.addEventListener("click", function (event) {
  for (var i = 0; i < allCarousels.length; i++) {
    carousel = allCarousels[i];
    if (!carousel) return;
    var buttons = document.getElementsByClassName("cmp-carousel__action");
    var prev = buttons[0];
    var next = buttons[1];

    if (prev.contains(event.target)) {
      carousel.moveImages("prev");
    } else if (next.contains(event.target)) {
      carousel.moveImages("next");
    } else return;
  }
});

window.onload = initThreeImageCarousels;
