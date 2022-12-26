import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnStart.setAttribute("disabled", "disabled");

const options = {
    enableTime: true,  //Вмикає засіб вибору часу
    time_24hr: true,   //Відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено.
    defaultDate: new Date(), //?????
    minuteIncrement: 1,   // Регулює крок для введення хвилин (включно з прокручуванням)
    onClose(selectedDates) {   // цей метод з якоїсь бібліотеки?
      console.log(selectedDates[0]);
    },
};

flatpickr('#datetime-picker', options);

let intervalId = null;

