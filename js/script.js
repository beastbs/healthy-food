import {
  calc,
  cardsMenu,
  forms,
  modal,
  productTabs,
  slider,
  timer,
} from "./modules";

import { deadline } from "./core/variables";
import { deleteNotDigit, openModal } from "./utils";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(openModal, 50_000, ".modal");

  productTabs(".tabheader__item", ".tabcontent", ".tabheader__items");
  timer(".timer", deadline);
  modal("[data-modal]", ".modal", modalTimerId);
  cardsMenu();
  forms("form", modalTimerId);
  calc();
  slider({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
    totalCounter: "#total",
    currentCounter: "#current",
    deleteNotDigit,
  });
});
