const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');

yesButton.addEventListener('click', () => {
  startGlitch();
  setInterval(spawnPopup, 500);
});

noButton.addEventListener('click', () => {
  alert('Система не восстановлена.\nПереход в режим наблюдения.');
  // Можно добавить редирект или показать другую сцену
});

function startGlitch() {
  document.body.classList.add('glitch');
}

function spawnPopup() {
  const messages = [
    'Ты правда уверен?',
    'CRM воскреснет… но по какой цене?',
    'ERROR_982',
    'Они наблюдают.',
    'DO_NOT_RESURRECT',
    'Зачем ты это сделал?',
    'Слишком поздно...',
    '⚠️ System exception occurred'
  ];

  const popup = document.createElement('div');
  popup.classList.add('window');
  popup.style.top = Math.random() * 80 + '%';
  popup.style.left = Math.random() * 80 + '%';

  popup.innerHTML = `
    <div class="title-bar">System Alert ✸</div>
    <div class="window-content">
      ${messages[Math.floor(Math.random() * messages.length)]}
      <div class="window-buttons">
        <button onclick="this.parentElement.parentElement.parentElement.remove()">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(popup);
}
