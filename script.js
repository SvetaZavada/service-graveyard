const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const headerColors = {
  light: ["#0047ab", "#008080", "#6a5acd", "#2f4f4f"],
  dark: ["#00ffff", "#00ff00", "#ff1493", "#ffffff"]
};

const glitchSound = document.getElementById("glitchSound");
const errorSound = document.getElementById("errorSound");
const errorSrc = errorSound.querySelector("source").src;

let madnessActive = false;
let madnessInterval;
let madnessTimeout;

function createMadModal({ title = "Ошибка", message = "Что-то пошло не так...", size = "normal", dark = false, glitch = false, headerColor = null }) {
  const original = document.getElementById("start-modal");
  const clone = original.cloneNode(true);

  clone.classList.remove("start-model", "light", "dark", "small", "normal", "large");
  clone.classList.add(size, dark ? "dark" : "light");
  if (glitch) clone.classList.add("glitchy");

  clone.style.top = Math.random() * 120 - 10 + "%";
  clone.style.left = Math.random() * 120 - 10 + "%";
  clone.style.zIndex = 100 + Math.floor(Math.random() * 1000);

  // Цвет шапки
  const headerEl = clone.querySelector(".modal-header");
  if (headerColor && headerEl) {
    headerEl.style.backgroundColor = headerColor;
  }

  // Заголовок и крестик — без фона
  const titleWrap = clone.querySelector(".modal-title-wrap");
  const closeBtn = clone.querySelector(".modal-close");
 

  const titleEl = clone.querySelector(".modal-title");
  if (titleEl) titleEl.textContent = title;

  const messageEl = clone.querySelector(".modal-content p");
  if (messageEl) messageEl.textContent = message;

  const yes = clone.querySelector("button#yesBtn");
  const no = clone.querySelector("button#noBtn");
  if (yes) yes.onclick = triggerMadness;
  if (no) no.onclick = () => {};

  document.body.appendChild(clone);
  setTimeout(() => clone.remove(), 7000);

  playErrorPerModal();
}

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
    // Размер
    const sizes = ["small", "normal", "large"];
    const size = sizes[Math.floor(Math.random() * sizes.length)];

    // Тема
    const themes = ["light", "dark"];
    const theme = themes[Math.floor(Math.random() * themes.length)];

    const headerColor = headerColors[theme][Math.floor(Math.random() * headerColors[theme].length)];

    // Рандомный код ошибки
    const errorCodes = ["0xDEADFADE", "0xBADA55", "0xFA1LURE", "0xC0FFEE", "0xABADBABE", "0xBADCAFFE"];
    const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];

    createMadModal({
  title: errorCode,
  message: size === "small" ? "Критическая ошибка" : "Система перегружена!",
  size,
  dark: theme === "dark",
  glitch: Math.random() < 0.3,
  headerColor
});

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
