const yesBtn = document.getElementById("yesBtn");
const glitchSound = document.getElementById("glitchSound");
const errorSound = document.getElementById("errorSound");
const errorSrc = errorSound.querySelector("source").src;

let madnessActive = false;
let madnessInterval;
let madnessTimeout;

yesBtn.addEventListener("click", () => {
  if (madnessActive) return;

  madnessActive = true;
  glitchSound.play();
  glitchSound.volume = 0.35;

   // 🚨 ЗАМЕНА: хаотичный спавн модалок (от 1 до 7), с рандомной задержкой
  function spawnModalsRandomly() {
    if (!madnessActive) return;

    const howMany = Math.floor(Math.random() * 7) + 1; // от 1 до 7

    for (let i = 0; i < howMany; i++) {
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
