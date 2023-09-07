// імпорт необхідного класу Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// створюю об'єкт refs для збереження посилань на DOM-елементи
const refs = {
  form: document.querySelector('.form'), // знаходжу'form'
};

// функція createPromise створює об'єкт Promise з випадковим рішенням
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // викликаю resolve, якщо умова виконана
      } else {
        reject({ position, delay }); // викликаю reject, якщо умова не виконана
      }
    }, delay);
  });
}

// додаю обробник події submit на форму
refs.form.addEventListener('submit', onFormClick);

// функція onFormClick викликається при натисканні на кнопку submit форми
function onFormClick(e) {
  e.preventDefault(); // вимикаю дії браузера

  // деструктуризація елементів форми з об'єкта події
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  const amountNum = Number(amount.value); // конвертую значення поля amount в число
  const stepNum = Number(step.value); // конвертую значення поля step в число
  let delayNum = Number(delay.value); // конвертую значення поля delay в число

  // запускаю цикл для створення та обробки об'єктів Promise
  for (let i = 1; i <= amountNum; i += 1) {
    createPromise(i, delayNum)
      .then(({ position, delay }) => {
        // виводжу повідомлення про успішно виконаний Promise
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // виводжу повідомлення про відхилення Promise
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayNum += stepNum; // збільшую значення затримки для наступного Promise
  }
}
