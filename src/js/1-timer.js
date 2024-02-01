import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const myButtonEl = document.querySelector('button');
const timerEl = document.querySelector('.timer');
const daysSpan = timerEl.querySelector('.value[data-days]');
const hoursSpan = timerEl.querySelector('.value[data-hours]');
const minutesSpan = timerEl.querySelector('.value[data-minutes]');
const secondsSpan = timerEl.querySelector('.value[data-seconds]');

let userSelectedDate;
let countdownInterval;

myButtonEl.addEventListener('click', () => {
  userSelectedDate = new Date(instance.selectedDates[0]);

  const updateCountdown = () => {
    const now = new Date();
    const remainingTime = userSelectedDate - now;
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      onTick(0);
      updateButtonState();
    } else {
      onTick(remainingTime);
    }
  };
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});

function onTick(remainingTime) {
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  daysSpan.textContent = days;
  hoursSpan.textContent = hours;
  minutesSpan.textContent = minutes;
  secondsSpan.textContent = seconds;
}

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    updateButtonState();
    console.log(selectedDates[0]);
  },
};

function updateButtonState() {
  if (userSelectedDate < new Date()) {
    iziToast.error({
      position: 'topRight',
      message: 'Please choose a date in the future',
    });
    myButtonEl.disabled = true;
    myButtonEl.style.color = '#989898';
    myButtonEl.style.background = '#cfcfcf';
    myButtonEl.style.pointerEvents = 'none';
  } else {
    myButtonEl.disabled = false;
    myButtonEl.style.color = '';
    myButtonEl.style.background = '';
    myButtonEl.style.pointerEvents = '';
  }
}
const instance = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day)
    .toString()
    .padStart(2, '0');
  // Remaining hours
  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, '0');
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, '0');
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, '0');

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
