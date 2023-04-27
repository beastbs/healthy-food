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
