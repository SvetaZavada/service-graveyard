const yesBtn = document.getElementById("yesBtn");
const glitchSound = document.getElementById("glitchSound");
const errorSound = document.getElementById("errorSound");

let madnessActive = false;
let madnessInterval;
let madnessTimeout;

yesBtn.addEventListener("click", () => {
  if (madnessActive) return;

  madnessActive = true;
  glitchSound.play();

  // Запускаем массовый спавн модалок
  madnessInterval = setInterval(() => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    if (Math.random() < 0.5) modal.classList.add("glitchy");

    modal.style.top = Math.random() * 80 + "%";
    modal.style.left = Math.random() * 80 + "%";
    modal.style.zIndex = 100 + Math.floor(Math.random() * 1000);

    modal.innerHTML = `
      <p>Система перегружена!</p>
      <button onclick="triggerMadness()">Да</button>
      <button>Нет</button>
    `;

    document.body.appendChild(modal);

    // Удаляем модалку после 7 секунд, если она не на виду
    setTimeout(() => {
      if (modal.parentNode) modal.remove();
    }, 7000);
  }, 600);

  // Останавливаем через 15 сек, запускаем BSOD (но пока закомментирован)
  madnessTimeout = setTimeout(() => {
    clearInterval(madnessInterval);
    glitchSound.pause();
    glitchSound.currentTime = 0;
    errorSound.play();

    // document.getElementById("bsod").classList.remove("hidden"); // включаем позже
  }, 15000);
});

function triggerMadness() {
  if (!madnessActive) yesBtn.click();
}
