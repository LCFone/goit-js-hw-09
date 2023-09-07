// імпорт бібліотеки flatpickr
import flatpickr from 'flatpickr';
// імпорт стилів для flatpickr
import 'flatpickr/dist/flatpickr.min.css';
// імпорт бібліотеки Notiflix для повідомлень
import Notiflix from 'notiflix/build/notiflix-notify-aio';

// оголошення об'єкта refs
const refs = {
// поле вибору дати і часу
  inputText: document.querySelector('#datetime-picker'),
// кнопка
  btn: document.querySelector('button'),
// вивід днів
  spanDay: document.querySelector('span[data-days]'),
// вивід годин
  spanHour: document.querySelector('span[data-hours]'),
// вивід хвилин
  spanMinute: document.querySelector('span[data-minutes]'),
// вивід секунд
  spanSecond: document.querySelector('span[data-seconds]'),
};

// налаштування бібліотеки flatpickr
const options = {
  enableTime: true, // дозволити вибір часу
  time_24hr: true, // відображати час у 24-годинному форматі
  defaultDate: new Date(), // встановити поточну дату і час за замовчуванням
  minuteIncrement: 1, // інтервал для хвилин
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() < 0) {
      // перевірка, чи вибрана дата в минулому
      return Notiflix.Notify.failure('Please choose a date in the future'); // повідомлення про помилку
    } else {
      refs.btn.disabled = false; // розблокувати кнопку, якщо вибрана дата в майбутньому
    }
  },
};

// ініціалізація flatpickr на полі вибору дати і часу
const date = flatpickr(refs.inputText, options);

// об'єкт для таймера
const timer = {
  intervalId: null, // ідентифікатор інтервалу
  isActive: false, // прапорець для визначення активності таймера

  start() {
    if (this.isActive) {
      return; // якщо таймер уже активний, вийти з функції
    }
    this.isActive = true; // встановити таймер як активний
    this.intervalId = setInterval(() => {
      // функція, що виконується кожну секунду
      const userInputDate = date.selectedDates[0]; // вибрана користувачем дата і час
      const currentTime = new Date(); // поточна дата і час
      const timeOff = userInputDate - currentTime; // різниця між вибраною датою і поточним часом
      const time = convertMs(timeOff); // перетворення мілісекунд у об'єкт з часом
      updateInterfaceTimer(time); // оновлення інтерфейсу таймера
      if (
        time.days === 0 &&
        time.hours === 0 &&
        time.minutes === 0 &&
        time.seconds === 0
      ) {
        this.stop(); // зупинка таймера, якщо час закінчився
      }
    }, 1000); // інтервал оновлення - кожну секунду
  },

  stop() {
    clearInterval(this.intervalId); // зупинити інтервал
    this.isActive = false; // встановити таймер як неактивний
    refs.btn.disabled = true; // заблокувати кнопку
  },
};

// додавання обробника події на кнопку
refs.btn.addEventListener('click', () => {
  timer.start(); // запустити таймер при кліку на кнопку
});

// функція для перетворення мілісекунд у об'єкт з часом
function convertMs(ms) {
  // кількість мілісекунд у одиницях часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // обчислення кількості днів, годин, хвилин і секунд
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

// функція для додавання ведучих нулів до числа
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// функція для оновлення інтерфейсу таймера
function updateInterfaceTimer({ days, hours, minutes, seconds }) {
  refs.spanDay.textContent = `${addLeadingZero(days)}`;
  refs.spanHour.textContent = `${addLeadingZero(hours)}`;
  refs.spanMinute.textContent = `${addLeadingZero(minutes)}`;
  refs.spanSecond.textContent = `${addLeadingZero(seconds)}`;
}
// посилання на нову кнопку "Reset" за її id
const resetBtn = document.getElementById('reset-btn');

// обробник події для кліку на кнопку "Reset"
resetBtn.addEventListener('click', () => {
  //скидання таймера
  timer.stop();
  
  // оновлення таймера почточне значення
 updateInterfaceTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
const currentDate = new Date();
  date.setDate(currentDate);  

  // розблокування "Start"
  refs.btn.disabled = false;

  
});
