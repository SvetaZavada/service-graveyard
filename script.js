const container = document.getElementById("modal-container");

// Тексты для рандомизации
const modalData = [
  { title: "Восстановление CRM", message: "Вы действительно хотите восстановить CRM?" },
  { title: "CRM.exe", message: "Файл повреждён. Восстановить?" },
  { title: "CRM ПРОСЫПАЕТСЯ", message: "Вы уверены, что хотите это сделать?" },
  { title: "DO_NOT_RESURRECT", message: "Вы разбудили древнее зло. Продолжить?" }
];

// Создание модалки
function createModal(x, y) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const { title, message } = modalData[Math.floor(Math.random() * modalData.length)];

  modal.innerHTML = `
    <div class="modal-header">${title}</div>
    <div class="modal-content">
      <p>${message}</p>
      <div class="modal-buttons">
        <button>Да</button>
        <button>Нет</button>
      </div>
    </div>
  `;

  modal.style.left = `${x}px`;
  modal.style.top = `${y}px`;

  container.appendChild(modal);
}

// Рандомная генерация модалок по экрану
function spawnModals() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  for (let i = 0; i < 15; i++) {
    const x = Math.random() * (width - 320);
    const y = Math.random() * (height - 160);
    createModal(x, y);
  }
}

spawnModals();
