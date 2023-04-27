function slider(deleteNotDigit) {
  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next");

  const sliderContainer = document.querySelector(".offer__slider");
  const slidesWrapper = document.querySelector(".offer__slider-wrapper");
  const slidesField = document.querySelector(".offer__slider-inner");
  const widthSliderWrapper = window.getComputedStyle(slidesWrapper).width;

  const total = document.querySelector("#total"),
    current = document.querySelector("#current");

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all linear";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => (slide.style.width = widthSliderWrapper));

  const countSlidesIndex = (index) => {
    if (index > slides.length) {
      slideIndex = 1;
    }
    if (index < 1) {
      slideIndex = slides.length;
    }
  };

  const showSlides = (index) => {
    countSlidesIndex(index);

    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  };
  showSlides(slideIndex);

  sliderContainer.style.position = "relative";

  const carouselIndicators = document.createElement("ol");
  carouselIndicators.className = "carousel-indicators";
  sliderContainer.append(carouselIndicators);

  const dots = [];

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.classList.add("dot");
    dot.setAttribute("data-slide-to", i + 1);

    if (i === 0) {
      dot.classList.add("dot-active");
    }

    carouselIndicators.append(dot);
    dots.push(dot);
  }

  const addActiveSlideDot = () => {
    dots.forEach((dot) => dot.classList.remove("dot-active"));
    dots[slideIndex - 1].classList.add("dot-active");
  };

  function deleteNotDigit(string) {
    return Number(string.replace(/\D/g, ""));
  }

  next.addEventListener("click", () => {
    if (offset === deleteNotDigit(widthSliderWrapper) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigit(widthSliderWrapper);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    showSlides((slideIndex += 1));
    addActiveSlideDot();
  });

  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = deleteNotDigit(widthSliderWrapper) * (slides.length - 1);
    } else {
      offset = offset - deleteNotDigit(widthSliderWrapper);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    showSlides((slideIndex -= 1));
    addActiveSlideDot();
  });

  carouselIndicators.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("dot")) {
      const slideTo = Number(target.getAttribute("data-slide-to"));
      slideIndex = slideTo;
      offset = deleteNotDigit(widthSliderWrapper) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      showSlides(slideIndex);
      addActiveSlideDot();
    }
  });
}
module.exports = slider;
