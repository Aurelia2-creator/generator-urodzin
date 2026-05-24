import './style.css';
import dayjs from 'dayjs';

const form = document.getElementById('birthdayForm');
const dialog = document.getElementById('resultDialog');
const dialogContent = document.getElementById('dialogContent');
const closeDialog = document.getElementById('closeDialog');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const day = parseInt(document.getElementById('day').value);
  const month = parseInt(document.getElementById('month').value) - 1;
  const year = parseInt(document.getElementById('year').value);

  const today = dayjs();
  const birthDate = dayjs(new Date(year, month, day));
  let nextBirthday = dayjs(new Date(today.year(), month, day));

  if (!birthDate.isValid() || birthDate.date() !== day) {
    alert("Wprowadzono niepoprawną datę!");
    return;
  }

  const daysPassed = today.diff(birthDate, 'day');
  const isBirthdayToday = today.date() === day && today.month() === month;

  if (isBirthdayToday) {
    alert("Wszystkiego najlepszego! 🎂🎉");
  }

  let htmlContent = `<p class="font-bold text-lg">Od Twoich narodzin minęło: ${daysPassed} dni.</p>`;

  if (!isBirthdayToday) {
    if (nextBirthday.isBefore(today, 'day')) {
      nextBirthday = nextBirthday.add(1, 'year');
    }
    const daysUntilBirthday = nextBirthday.diff(today, 'day');
    const weeksUntilBirthday = Math.ceil(daysUntilBirthday / 7);

    if (daysUntilBirthday <= 7) {
      htmlContent += `<p class="font-semibold text-amber-700">Masz urodziny w tym tygodniu!</p>`;
    } else {
      htmlContent += `<p>Do Twoich najbliższych urodzin pozostało: ${weeksUntilBirthday} tygodni.</p>`;
    }
  }

  dialogContent.innerHTML = htmlContent;
  dialog.showModal();
});

closeDialog.addEventListener('click', () => {
  dialog.close();
});
