const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");


const glitchSound = document.getElementById("glitchSound");
const errorSound = document.getElementById("errorSound");
const errorSrc = errorSound.querySelector("source").src;

let madnessActive = false;
let madnessInterval;
let madnessTimeout;

noBtn.addEventListener("click", () => {
  window.location.href = "mems.html";
});

yesBtn.addEventListener("click", () => {
  if (madnessActive) return;

  madnessActive = true;
  glitchSound.play();
  glitchSound.volume = 0.35;

   // 🚨 ЗАМЕНА: хаотичный спавн модалок (от 1 до 7), с рандомной задержкой
  function spawnModalsRandomly() {
    if (!madnessActive) return;

    const howMany = Math.floor(Math.random() * 10) + 3; // от 3 до 10

    for (let i = 0; i < howMany; i++) {
      const modal = document.createElement("div");
      modal.classList.add("modal");

// Размер
const sizes = ["small", "normal", "large"];
const size = sizes[Math.floor(Math.random() * sizes.length)];
modal.classList.add(size);

// Тема
const themes = ["light", "dark"];
const theme = themes[Math.floor(Math.random() * themes.length)];
modal.classList.add(theme);

// Цвет шапки (по теме)
const headerColors = {
  light: ["#0047ab", "#008080"],
  dark: ["#ff69b4", "#9370DB", "#00CED1"]
};
const headerColor = headerColors[theme][Math.floor(Math.random() * headerColors[theme].length)];

// Рандомный код ошибки
const errorCodes = ["0xDEADFADE", "0xBADA55", "0xFA1LURE", "0xC0FFEE", "0xABADBABE", "0xBADCAFFE"];
const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];


      modal.style.top = Math.random() * 120 - 10 + "%";
      modal.style.left = Math.random() * 120 - 10 + "%";
      modal.style.zIndex = 100 + Math.floor(Math.random() * 1000);

      modal.innerHTML = `
  <div class="modal-header">
    <span class="modal-title">${errorCode}</span>
  </div>
  ${
    size === "small"
      ? `<p class="modal-text">Критическая ошибка</p>`
      : `
        <p class="modal-text">Система перегружена!</p>
        <button onclick="triggerMadness()">Да</button>
        <button>Нет</button>
      `
  }
`;

      document.body.appendChild(modal);
      playErrorPerModal();

      // Удаляем модалку через 7 секунд
      setTimeout(() => {
        if (modal.parentNode) modal.remove();
      }, 7000);
    }

    // Следующий вызов через случайное время (от 100 до 600 мс)
    const nextDelay = Math.random() * 500 + 100;
    madnessInterval = setTimeout(spawnModalsRandomly, nextDelay);
  }

  // Стартуем хаос
  spawnModalsRandomly();

  // Останавливаем через 15 сек, запускаем BSOD (но пока закомментирован)
  madnessTimeout = setTimeout(() => {
    clearInterval(madnessInterval);
    glitchSound.pause();
    glitchSound.currentTime = 0;
    errorSound.play();
    document.getElementById("start-modal")?.remove(); 

    document.getElementById("bsod").classList.remove("hidden"); // включаем позже
  }, 8000);
});

function triggerMadness() {
  if (!madnessActive) yesBtn.click();
}

function playErrorPerModal() {
  const a = new Audio(errorSrc);
  a.volume = 1.0;   // не оглохнуть
  a.play().catch(() => {}); // на всякий случай, чтобы не падало в мобайле
}
