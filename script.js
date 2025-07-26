const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const headerColors = {
  light: ["#0047ab"],
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
if (glitch) {
  applyRandomGlitch(clone); // это сразу добавляет .glitchy и один из рандомных классов
}
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
if (titleEl && glitch) {
  titleEl.innerHTML = `<span class="glitchy-rgb">${title}</span>`;
} else if (titleEl) {
  titleEl.textContent = title;
}

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
  glitchSound.volume = 0.25;

   // 🚨 ЗАМЕНА: хаотичный спавн модалок (от 1 до 7), с рандомной задержкой
  function spawnModalsRandomly() {
  if (!madnessActive) return;

  const howMany = Math.floor(Math.random() * 20) + 7; // от 3 до 10

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
  glitch: Math.random() < 0.5,
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

    document.getElementById("start-modal")?.remove(); 

const bsod = document.getElementById("bsod-preload");
bsod.style.position = "fixed";
bsod.style.top = "0";
bsod.style.left = "0";
bsod.style.width = "100vw";
bsod.style.height = "100vh";
bsod.style.zIndex = "9999";
bsod.style.opacity = "1";
bsod.style.display = "flex";
bsod.style.justifyContent = "center";
bsod.style.alignItems = "center";
bsod.style.padding = "20px";
bsod.style.pointerEvents = "auto";
bsod.style.fontFamily = "'IBM Plex Mono', monospace";
  }, 6000);
});

function triggerMadness() {
  if (!madnessActive) yesBtn.click();
}

function playErrorPerModal() {
  const a = new Audio(errorSrc);
  a.volume = 1.0;   // не оглохнуть
  a.play().catch(() => {}); // на всякий случай, чтобы не падало в мобайле
}

function applyRandomGlitch(modal) {
  const glitchClasses = ['glitchy-1', 'glitchy-2', 'glitchy-3', 'glitchy-rgb'];
  const randomClass = glitchClasses[Math.floor(Math.random() * glitchClasses.length)];

  modal.classList.add('glitchy', randomClass);

  // ✨ Добавляем RGB-глитч отдельно на заголовок
  if (randomClass === 'glitchy-rgb') {
    const header = modal.querySelector('.modal-header');
    if (header) {
      header.classList.add('glitchy-rgb');
    }
  }
}

