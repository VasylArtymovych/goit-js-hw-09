import { Notify } from 'notiflix/build/notiflix-notify-aio';


const formRef =  document.querySelector('.form');

formRef.addEventListener('submit', onSubmitClick);

function onSubmitClick(evt){
  evt.preventDefault();

  const elements = evt.currentTarget.elements;
  const amount = Number(elements.amount.value);
  const step = Number(elements.step.value);
  let delay = Number(elements.delay.value);
  let position = 1;

  for (let i = 1; i <= amount; i+=1){

  createPromise(position, delay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  position += 1;
  delay += step;
  };
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

Notify.init({
  width: '300px',
  timeout: 6000,
});
