const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const startModal = document.querySelector(".start-modal");
const bsod = document.getElementById("bsod");

const modalTexts = [
  "CRM восстает из мертвых…",
  "Кэш очищается… или нет?",
  "Ошибка доступа к базе данных.",
  "Сессия устарела. Обновите реальность.",
  "Переподключение к аду…",
  "Добро пожаловать в 2004.",
  "Вы не должны были это нажимать.",
  "Процессоры перегрелись от стыда.",
  "Загрузка воспоминаний…",
  "Удаление данных — отмена отмены отмены."
];

yesBtn.addEventListener("click", () => {
  startModal.classList.add("hidden");

  let interval = setInterval(() => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.top = Math.random() * 80 + "%";
    modal.style.left = Math.random() * 80 + "%";
    modal.textContent =
      modalTexts[Math.floor(Math.random() * modalTexts.length)];
    document.body.appendChild(modal);
    setTimeout(() => modal.remove(), 5000);
  }, 500);

  setTimeout(() => {
    clearInterval(interval);
    document.querySelectorAll(".modal").forEach((m) => m.remove());
    bsod.classList.remove("hidden");
  }, 15000);
});

noBtn.addEventListener("click", () => {
  window.location.href = "mems.html";
});
