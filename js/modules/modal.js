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