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

refs.button.setAttribute('disabled', 'true');
let isTimerRuning = false;

const options = {
    
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {   

        const convertSelectedDate = selectedDates[0].getTime();
        
        if (convertSelectedDate <= (new Date().getTime())){
            
            Notify.warning('Please choose a date in the future');  

            selectedDates[0] = new Date();
            return; 
        };

        refs.button.removeAttribute('disabled');
        refs.button.addEventListener('click', onBtnClick);

        function onBtnClick(){
            if(isTimerRuning) return;

            isTimerRuning = true;

            setInterval(() => {
                const currentDate = new Date();
                const convertCurrentDate = currentDate.getTime();
                const diference = convertSelectedDate - convertCurrentDate;

                refs.days.textContent = convertMs(diference).days;
                refs.hours.textContent = convertMs(diference).hours;
                refs.minutes.textContent = convertMs(diference).minutes;
                refs.seconds.textContent = convertMs(diference).seconds;
                
            }, 1000);
        };
    },
};

flatpickr('#datetime-picker', options);

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

