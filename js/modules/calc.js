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

export default calc;
