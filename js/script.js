window.addEventListener("DOMContentLoaded", () => {
  const productTabs = require("./modules/productTabs");
  const cardsMenu = require("./modules/cardsMenu");
  const timer = require("./modules/timer");
  const modal = require("./modules/modal");
  const forms = require("./modules/forms");
  const slider = require("./modules/slider");
  const calc = require("./modules/calc");

  const { deadline } = require("./core/variables");
  const { deleteNotDigit } = require("./utils");

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
