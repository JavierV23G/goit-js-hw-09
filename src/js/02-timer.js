import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
    width: '500px',
    fontSize: '25px',
    position: 'center-top',
    closeButton: false,
});

const inputTimePicker = document.querySelector('#datetime-picker');
const startTimeBtn = document.querySelector('button[data-start]');
let days = document.querySelector('span[data-days]');
let hours = document.querySelector('span[data-hours]');
let minutes = document.querySelector('span[data-minutes]');
let seconds = document.querySelector('span[data-seconds]');
let actualDate = new Date().getTime();

let futureDate;
let dateInMilliseconds;

startTimeBtn.disabled = true;
inputTimePicker.disabled = false;

flatpickr(inputTimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    futureDate = selectedDates[0].getTime();
    dateInMilliseconds = calculateTime(actualDate, futureDate);

    if (dateInMilliseconds < 0) {
        Notiflix.Notify.failure('Please choose a date in the future');
    } else {
        startTimeBtn.disabled = false;
    }
    },
});

function calculateTime(actualDate, futureDate) {
    let deltaDate = futureDate - actualDate;
    return deltaDate;
}

function convertMs(ms) {

    const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


    const days = addLeadingZero(Math.floor(ms / day));

    const hours = addLeadingZero(Math.floor((ms % day) / hour));

    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

    const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function printElementDate(date) {
    days.textContent = date.days;
    hours.textContent = date.hours;
    minutes.textContent = date.minutes;
    seconds.textContent = date.seconds;
}

function timeStart() {
    inputTimePicker.disabled = true;
    startTimeBtn.disabled = true;

    if (dateInMilliseconds > 0) {
    let millisecondsReference = 1000;
    const timeInterval = setInterval(() => {
        dateInMilliseconds = dateInMilliseconds -= millisecondsReference;
        if (dateInMilliseconds <= 0) {
        clearInterval(timeInterval);
        dateInMilliseconds = 0;
        startTimeBtn.disabled = false;
        inputTimePicker.disabled = false;
        }
        let dateObject = convertMs(dateInMilliseconds);
        printElementDate(dateObject);
    }, millisecondsReference);
    }
}

startTimeBtn.addEventListener('click', timeStart);