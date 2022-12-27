import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker')

btnStart.setAttribute("disabled", "disabled");

const options = {
  enableTime: true,  //Вмикає засіб вибору часу
  time_24hr: true,   //Відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено.
  defaultDate: new Date(), //?????
  minuteIncrement: 1,   // Регулює крок для введення хвилин (включно з прокручуванням)
  onClose(selectedDates) { 
  if(selectedDates[0]<= Date.now()){
    Notiflix.Notify.failure('Please choose a date in the future');
  }else{
    btnStart.removeAttribute('disabled') 
    inputEl.disabled = true;
  }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function currentDay(value) {
  return String(value).padStart(2, "0");
};

const fp = flatpickr('#datetime-picker', options);

const timer = {
  start() {
      timer.intervalId = setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = fp.selectedDates[0] - currentTime;
          if(deltaTime < 0){
            btnStart.disabled = true;
          }
          const {days, hours, minutes, seconds} = convertMs(deltaTime);
          
          daysEl.textContent = currentDay(days);
          hoursEl.textContent = currentDay(hours);
          minutesEl.textContent = currentDay(minutes);
          secondsEl.textContent = currentDay(seconds);

          if (deltaTime < 1000) {
            clearInterval(timer.intervalId);
          }
      }, 1000);
  }
}

btnStart.addEventListener('click', () => {
  timer.start();
});
