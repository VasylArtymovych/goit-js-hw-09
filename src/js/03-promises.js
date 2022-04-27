import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef =  document.querySelector('.form');

formRef.addEventListener('submit', onSubmitClick);

// submit handler
function onSubmitClick(evt){
  evt.preventDefault();

  const {elements:{delay, step, amount}} = evt.currentTarget;

  const amountPromises = Number(amount.value);
  const stepOfDelay = Number(step.value);
  let promiseDelay = Number(delay.value);
  let position = 1;

  for (let i = 1; i <= amountPromises; i+=1){

  createPromise(position, promiseDelay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  position += 1;
  promiseDelay += stepOfDelay;
  };
  
  evt.currentTarget.reset();
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay);
  });
};

// Notify package options:
Notify.init({
  width: '300px',
  timeout: 6000,
});
