const { changeEndTimePromotion } = require("../utils");

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
