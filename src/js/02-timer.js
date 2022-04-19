import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const options = {
    
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    console.log(selectedDates[0]);
    },
};
const refs = {
    // input: document.querySelector('#datetime-picker')
}

flatpickr('#datetime-picker', options);

let a = flatpickr.currentYear
