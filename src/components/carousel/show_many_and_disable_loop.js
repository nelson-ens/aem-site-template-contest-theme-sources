class Carousel {
  constructor(carousel, numToShow) {
    this.content;
    this.numToShow;
    this.numOfImages;
    this.allImages;
    this.current;
    this.nextButton;
    this.prevButton;
    this.disablePrev;
    this.disableNext;
    this.initCarousel(carousel, numToShow);
  }

  showImage(index) {
    var img = this.allImages[index];
    if (img == null) return;
    img.style.display = "flex";
    img.style["justify-content"] = "center";
  }

  hideImage(index) {
    var img = this.allImages[index];
    if (img == null) return;
    img.style.display = "none";
  }

  initImages() {
    for (
      var i = this.current;
      i < this.current + this.numToShow && i < this.numOfImages;
      i++
    ) {
      this.showImage(i);
    }
  }

  disableButton(button) {
    if (button === "next") {
      this.disableNext = true;
      this.nextButton.classList.add("cmp-carousel__action--disabled");
    } else {
      this.disablePrev = true;
      this.prevButton.classList.add("cmp-carousel__action--disabled");
    }
  }

  enableButton(button) {
    if (button === "next") {
      this.disableNext = false;
      this.nextButton.classList.remove("cmp-carousel__action--disabled");
    } else {
      this.disablePrev = false;
      this.prevButton.classList.remove("cmp-carousel__action--disabled");
    }
  }

  setCurrent(index) {
    if (index < 0) {
      this.current = 0;
    } else if (index > this.numOfImages - this.numToShow) {
      this.current = this.numOfImages - this.numToShow;
    } else {
      this.current = index;
    }
    if (this.current + this.numToShow === this.numOfImages && !this.disableNext)
      this.disableButton("next");
    else if (this.disableNext) this.enableButton("next");

    if (this.current === 0 && !this.disablePrev) this.disableButton("prev");
    else if (this.disablePrev) this.enableButton("prev");
  }

  updateActiveIndicator(index) {
    var activeIndicators = this.content.getElementsByClassName(
      "cmp-carousel__indicator--active"
    );
    for (let i = 0; i < activeIndicators.length; i++) {
      activeIndicators[i].classList.remove("cmp-carousel__indicator--active");
    }
    var indicator = this.content.getElementsByClassName(
      "cmp-carousel__indicator"
    )[index];
    indicator.classList.add("cmp-carousel__indicator--active");
  }

  moveImages(direction) {
    if (direction === "next") {
      this.hideImage(this.current);
      this.showImage(this.current + this.numToShow);
      this.setCurrent(this.current + 1);
    } else if (direction === "prev") {
      this.hideImage(this.current + this.numToShow - 1);
      this.showImage(this.current - 1);
      this.setCurrent(this.current - 1);
    }
  }

  initCarousel(carousel, numToShow) {
    if (!carousel) return;
    this.content = carousel.getElementsByClassName("cmp-carousel__content")[0];
    this.allImages = this.content.getElementsByClassName("cmp-carousel__item");
    this.numOfImages = this.allImages.length;
    this.numToShow = numToShow;

    var buttons = carousel.getElementsByClassName("cmp-carousel__action");
    buttons[0].onclick = null;
    buttons[1].onclick = null;
    buttons[0].onclick = () => {
      if (!this.disablePrev) this.moveImages("prev");
      this.updateActiveIndicator(this.current);
    };
    buttons[1].onclick = () => {
      if (!this.disableNext) this.moveImages("next");
      this.updateActiveIndicator(this.current);
    };
    this.prevButton = buttons[0];
    this.nextButton = buttons[1];

    this.setCurrent(0);
    this.initImages();
  }
}

function initCarousels() {
  var threeImageCarousels = document.getElementsByClassName(
    "carousel-showThreeImages"
  );
  var oneImageCarousels = document.getElementsByClassName(
    "carousel-showOneImage"
  );
  for (let i = 0; i < threeImageCarousels.length; i++) {
    new Carousel(threeImageCarousels[i], 3);
  }
  for (let i = 0; i < oneImageCarousels.length; i++) {
    new Carousel(oneImageCarousels[i], 1);
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  initCarousels();
});
