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
