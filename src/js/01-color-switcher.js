
const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]')
};

const TIME_DELAY = 1000;
let timerId = null;

refs.stopBtn.setAttribute('disabled', 'true');
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick(){

    timerId = setInterval(setBgrColor, TIME_DELAY);
    refs.startBtn.setAttribute('disabled', 'true');
    refs.stopBtn.removeAttribute('disabled')
};

function onStopBtnClick(){

    clearInterval(timerId);
    refs.startBtn.removeAttribute('disabled')
    refs.stopBtn.setAttribute('disabled', 'true');
};


function setBgrColor(){

    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
};

function getRandomHexColor() {
    
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};