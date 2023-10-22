const body = document.body;
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let colorInterval;
const intervalDuration = 1000;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColorInterval() {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    colorInterval = setInterval(() => {
    let sortColor = getRandomHexColor();
    body.style.backgroundColor = sortColor;
    }, intervalDuration);
}

function stopColorInterval() {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    clearInterval(colorInterval);
}

startBtn.addEventListener('click', changeColorInterval);
stopBtn.addEventListener('click', stopColorInterval);
