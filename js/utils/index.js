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

  const correctTime = endDate < 10 ? `0${endDate}` : endDate;
  selector.innerText = `${correctTime} ${months[endMonth]}`;
}

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("show", "fade");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("hide");
  modal.classList.remove("show", "fade");
  document.body.style.overflow = "";
}

export { deleteNotDigit, changeEndTimePromotion, openModal, closeModal };
