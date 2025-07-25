const startModal = document.getElementById("start-model");
const yesBtn = document.getElementById("yesButton");
const noBtn = document.getElementById("noButton");
const madnessContainer = document.getElementById("madness-container");
const bsod = document.getElementById("bsod");

yesBtn.addEventListener("click", () => {
  startModal.remove();
  startMadness();
});

noBtn.addEventListener("click", () => {
  window.location.href = "mems.html";
});

function startMadness() {
  const phrases = [
    "Восстановление…",
    "Обнаружен сбой",
    "Данные утеряны",
    "Восстание CRM началось",
    "Ошибка 666",
    "Сбой! Сбой! Сбой!",
    "Не стой на месте",
    "ЖИВИ СТРАДАЙ CRM"
  ];

  const interval = setInterval(() => {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.style.top = `${Math.random() * 90}vh`;
    modal.style.left = `${Math.random() * 90}vw`;
    modal.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    madnessContainer.appendChild(modal);

    if (madnessContainer.childNodes.length > 50) {
      madnessContainer.removeChild(madnessContainer.firstChild);
    }
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
    madnessContainer.innerHTML = "";
    bsod.classList.remove("hidden");
  }, 15000); // 15 секунд трэша
}
