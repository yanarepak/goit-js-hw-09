const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.setAttribute("disabled", "disabled");
let intervalId = null;

function changeBodyColor(){
    intervalId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
}

function stopChange(){
    clearInterval(intervalId);
    startBtn.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', changeBodyColor);
stopBtn.addEventListener('click', stopChange);