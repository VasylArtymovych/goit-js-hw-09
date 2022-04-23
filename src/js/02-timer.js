import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    button: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
};

refs.button.addEventListener('click', onBtnClick);

refs.button.setAttribute('disabled', 'true');
let isTimerRuning = false;
let timerId = null;
let userSelectedDate = null;

// options for instance (date-view):
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {   
    
        if (selectedDates[0].getTime() <= Date.now()){
            Notify.warning('Please choose a date in the future');  
            return; 
        };
        
        userSelectedDate = selectedDates[0];
        refs.button.removeAttribute('disabled');
    },
    onOpen(){

        clearInterval(timerId);
        isTimerRuning = false;
        refs.button.setAttribute('disabled', 'true');

        refs.days.textContent = '00';
        refs.hours.textContent = '00';
        refs.minutes.textContent = '00';
        refs.seconds.textContent = '00';
        
    }
};
//makes instance for date-view: 
flatpickr('#datetime-picker', options);

function onBtnClick(){
    if(isTimerRuning) return;
    
    isTimerRuning = true;

    timerId = setInterval(() => {
        let currentDate = Date.now();
        let convertUserSelectedDate = userSelectedDate.getTime();
        let diference = convertUserSelectedDate - currentDate;

        refs.days.textContent = convertMs(diference).days;
        refs.hours.textContent = convertMs(diference).hours;
        refs.minutes.textContent = convertMs(diference).minutes;
        refs.seconds.textContent = convertMs(diference).seconds;
        
    }, 1000);
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value){
    return String(value).padStart(2, '0');
};

//Shown(log) messsage view options:
Notify.init({
    width: '280px',
    position: 'center-top',
    distance: '25px',
    timeout: 3000,
    cssAnimationStyle: 'zoom',
    warning: {
        background: 'rgba(255, 72, 0, 0.945)',
        textColor: '#fff',
        notiflixIconColor: 'rgba(0,0,0,0.4)',
    },
});

