import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '500px',
});

const delayInput = document.querySelector('input[name= "delay"]');
const stepInput = document.querySelector('input[name= "step"]');
const amountInput = document.querySelector('input[name= "amount"]');
const submitBtn = document.querySelector('button[type = "submit"]');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

submitBtn.addEventListener('click', e => {
  e.preventDefault();
  let delay = Number(delayInput.value);
  let step = Number(stepInput.value);
  let amount = Number(amountInput.value);

  if (delay >= 0 && step >= 0 && amount >= 0) {
    for (let i = 1; i <= amount; i++) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });

      delay += step;
    }
  } else {
    Notiflix.Notify.failure(
      'Please enter positive numbers in each of the input fields'
    );
  }
});
