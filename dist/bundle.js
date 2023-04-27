/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/core/variables.js":
/*!******************************!*\
  !*** ./js/core/variables.js ***!
  \******************************/
/***/ ((module) => {

const deadline = "2023-08-03";

module.exports = {
  deadline,
};


/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
  const resultColories = document.querySelector(".calculating__result span");
  const sexLocalStorage = localStorage.getItem("sex");
  const ratioLocalStorage = localStorage.getItem("ratio");

  let ratio = ratioLocalStorage ? Number(ratioLocalStorage) : 1.55;
  let sex = sexLocalStorage ? sexLocalStorage : "male";
  let height, weight, age;

  function calcTotalCalories() {
    if (!height || !weight || !age) {
      resultColories.innerText = "___";
      return;
    }

    if (sex === "female") {
      resultColories.innerText = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    }

    if (sex === "male") {
      resultColories.innerText = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }
  calcTotalCalories();

  function getStaticInfo(
    selector,
    activeClass = "calculating__choose-item_active"
  ) {
    const elements = document.querySelectorAll(`${selector} div`);

    document.querySelector(selector).addEventListener("click", (event) => {
      if (event.target.getAttribute("data-ratio")) {
        ratio = Number(event.target.getAttribute("data-ratio"));
        localStorage.setItem("ratio", ratio);
      } else {
        sex = event.target.getAttribute("id");
        localStorage.setItem("sex", sex);
      }

      if (event.target.id !== "gender" && event.target.id !== "ratio") {
        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        event.target.classList.add(activeClass);
      }

      calcTotalCalories();
    });
  }
  getStaticInfo("#gender");
  getStaticInfo("#ratio");

  function initLocalSettings(
    selector,
    activeClass = "calculating__choose-item_active"
  ) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute("id") === sex) {
        elem.classList.add(activeClass);
      }

      if (Number(elem.getAttribute("data-ratio")) === ratio) {
        elem.classList.add(activeClass);
      }
    });
  }
  initLocalSettings("#gender div");
  initLocalSettings("#ratio div");

  function getDynamicInfo(selector) {
    const inputField = document.querySelector(selector);

    inputField.addEventListener("input", () => {
      if (inputField.value.match(/\D/g)) {
        inputField.style.boxShadow = "0px 4px 2px -2px #f00";
      } else if (!inputField.value) {
        inputField.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
      } else {
        inputField.style.boxShadow = "0 4px 2px -2px #54ed39";
      }
      switch (inputField.getAttribute("id")) {
        case "height":
          height = Number(inputField.value);
          break;
        case "weight":
          weight = Number(inputField.value);
          break;
        case "age":
          age = Number(inputField.value);
          break;
      }
      calcTotalCalories();
    });
  }
  getDynamicInfo("#height");
  getDynamicInfo("#weight");
  getDynamicInfo("#age");
}
module.exports = calc;


/***/ }),

/***/ "./js/modules/cardsMenu.js":
/*!*********************************!*\
  !*** ./js/modules/cardsMenu.js ***!
  \*********************************/
/***/ ((module) => {

function cardsMenu() {
  class MenuCart {
    constructor(src, alt, title, desc, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 40;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length) {
        this.classes.forEach((c) => element.classList.add(c));
      } else {
        this.element = "menu__item";
        element.classList.add(this.element);
      }

      element.innerHTML = `
				  <img src=${this.src} alt=${this.alt} />
				  <h3 class="menu__item-subtitle">${this.title}</h3>
				  <div class="menu__item-descr">${this.desc}</div>
				  <div class="menu__item-divider"></div>
				  <div class="menu__item-price">
					 <div class="menu__item-cost">Цена:</div>
					 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				  </div>
		  `;

      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
  };

  getResource("http://localhost:3000/menu").then((menu) => {
    menu.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCart(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });
}

module.exports = cardsMenu;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
  const forms = document.querySelectorAll("form");

  const message = {
    loading: "./img/form/spinner.svg",
    success: "Спасибо!Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((form) => {
    bindPostData(form);
  });

  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.setAttribute("src", message.loading);
      statusMessage.classList.add("status");
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
        })
        .catch((e) => {
          showThanksModal(message.failure);
          console.log(e);
        })
        .finally(() => {
          form.reset();
          statusMessage.remove();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>&times;</div>
      <div class="modal__title">${message}</div>
    </div>
    `;
    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }
}

module.exports = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal(){
	const modalTrigger = document.querySelectorAll("[data-modal]");
	const modal = document.querySelector(".modal");
 
	function openModal() {
	  modal.classList.add("show", "fade");
	  modal.classList.remove("hide");
	  document.body.style.overflow = "hidden";
	  clearInterval(modalTimerId);
	}
 
	function closeModal() {
	  modal.classList.add("hide");
	  modal.classList.remove("show", "fade");
	  document.body.style.overflow = "";
	}
 
	modalTrigger.forEach((btn) => {
	  btn.addEventListener("click", openModal);
	});
 
	modal.addEventListener("click", (e) => {
	  if (e.target === modal || e.target.getAttribute("data-close") === "") {
		 closeModal();
	  }
	});
	document.addEventListener("keyup", (e) => {
	  if (e.code === "Escape" && modal.classList.contains("show")) {
		 closeModal();
	  }
	});
 
	const modalTimerId = setTimeout(openModal, 50_000);
 
	function showModalByScroll() {
	  const scrolledToButton =
		 window.scrollY + document.documentElement.clientHeight >=
		 document.documentElement.scrollHeight - 1;
 
	  if (scrolledToButton) {
		 openModal();
		 window.removeEventListener("scroll", showModalByScroll);
	  }
	}
 
	window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/productTabs.js":
/*!***********************************!*\
  !*** ./js/modules/productTabs.js ***!
  \***********************************/
/***/ ((module) => {

function productTabs(){
	const tabsParent = document.querySelector(".tabheader__items");
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

module.exports = productTabs;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { changeEndTimePromotion } = __webpack_require__(/*! ../utils */ "./js/utils/index.js");

function timer(deadline) {
  const endTimePromotion = document.querySelector(".promotion__end");
  changeEndTimePromotion(deadline, endTimePromotion);

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (24 * 3600 * 1000));
      hours = Math.floor((t / (3600 * 1000)) % 24);
      minutes = Math.floor((t / 60 / 1000) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function setZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const time = getTimeRemaining(endtime);

      days.innerHTML = setZero(time.days);
      hours.innerHTML = setZero(time.hours);
      minutes.innerHTML = setZero(time.minutes);
      seconds.innerHTML = setZero(time.seconds);

      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);
}

module.exports = timer;


/***/ }),

/***/ "./js/utils/index.js":
/*!***************************!*\
  !*** ./js/utils/index.js ***!
  \***************************/
/***/ ((module) => {

function deleteNotDigit(string) {
  return Number(string.replace(/\D/g, ""));
}

function changeEndTimePromotion(deadline, selector) {
  const deadlineDate = new Date(deadline);
  const endMonth = deadlineDate.getMonth();
  const endDate = deadlineDate.getDate();
  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Ноября",
    "Декабря",
  ];

  console.log(endDate);

  const correctTime = endDate < 10 ? `0${endDate}` : endDate;
  selector.innerText = `${correctTime} ${months[endMonth]}`;
}

module.exports = {
  deleteNotDigit,
  changeEndTimePromotion,
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener("DOMContentLoaded", () => {
  const productTabs = __webpack_require__(/*! ./modules/productTabs */ "./js/modules/productTabs.js");
  const cardsMenu = __webpack_require__(/*! ./modules/cardsMenu */ "./js/modules/cardsMenu.js");
  const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
  const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
  const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
  const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
  const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

  const { deadline } = __webpack_require__(/*! ./core/variables */ "./js/core/variables.js");
  const { deleteNotDigit } = __webpack_require__(/*! ./utils */ "./js/utils/index.js");

  // Tabs
  productTabs();

  // Timer
  timer(deadline);

  // Modal
  modal();

  // Use classes for cards
  cardsMenu();

  // Form
  forms();

  // Slider
  slider(deleteNotDigit);

  // Calc
  calc();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map