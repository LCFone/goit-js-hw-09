// оголошую об'єкт refs, який містить посилання на HTML-елементи
const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
  };
  
  // змінні для керування станом функціональності
  let disable = false; // перевірка активності копки "Start"
  let intervalId = null; // ідентифікатор інтервалу для зміни кольору
  
  // додаю обробників подій на кнопки
  refs.btnStart.addEventListener('click', onBtnOn);
  refs.btnStop.addEventListener('click', onBtnOff);
  
  // функція для обробки кліку на кнопку "Start"
  function onBtnOn() {
    if (disable) {
      // якщо кнопка вже активована, вийти з функції
      return;
    }
  
    // заблокувати кнопку "Start"
    refs.btnStart.disabled = true;
  
    // встановлюю disable в true, щоб запобігти множинним клікам
    disable = true;
    intervalId = setInterval(() => {
      // зміна кольору фону
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
  
  // функція для обробки кліку на кнопку "Stop"
  function onBtnOff() {
    // зупинити інтервал
    clearInterval(intervalId);
  
    // встановити disable в false, щоб дозволити знову клікати на "Start"
    disable = false;
  
    // розблокувати кнопку "Start"
    refs.btnStart.disabled = false;
  }
  
  // функція для генерації випадкового шестнадцяткового кольору
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  