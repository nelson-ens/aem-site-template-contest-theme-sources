class CarouselWithThreeImages {
  constructor(carousel) {
    this.content;
    this.numOfImages;
    this.allImages;
    this.nextButton;
    this.prevButton;
    this.initCarousel(carousel);
  }

  showImage(index) {
    var img = this.allImages[index];
    if (img == null) return;
    img.style.display = 'flex';
  }

  hideImage(index) {
    var img = this.allImages[index];
    if (img == null) return;    
    img.style.display = 'none';
  }

  hideImages() {
    for (var i = 0; i < 3; i++) {
      this.hideImage(i);
    }
  }
  
  showImages() {
    for (var i = 0; i < 3; i++) {
      this.showImage(i);
    }
  }
  
  moveToEnd() {
    var firstImage = this.allImages[0];
    this.content.appendChild(firstImage, this.content.lastChild);
  }

  moveToFront() {
    var lastImage = this.allImages[this.numOfImages-1];
    this.content.insertBefore(lastImage, this.content.firstChild);
  }

  initCarousel(carousel) {
    if (!carousel) return;
    this.content = carousel.getElementsByClassName("cmp-carousel__content")[0];
    this.allImages = this.content.getElementsByClassName("cmp-carousel__item");
    this.numOfImages = this.allImages.length;
    
    var buttons = carousel.getElementsByClassName("cmp-carousel__action");
    buttons[0].onclick = () => this.moveImages('prev');
    buttons[1].onclick = () => this.moveImages('next');
    this.prevButton = buttons[0];
    this.nextButton = buttons[1];
    
    this.showImages();
  }

  
  moveImages(direction) {
    this.hideImages();
    if (direction === "next") {
      this.moveToEnd();
    } else {
      this.moveToFront();
    }
    this.showImages();
  }
}

var allCarousels = [];

function initThreeImageCarousels() {
  var carousels = document.getElementsByClassName("showThreeImages");
  for (var i = 0; i < carousels.length; i++) {
    allCarousels.push(new CarouselWithThreeImages(carousels[i]));
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  initThreeImageCarousels();
});
