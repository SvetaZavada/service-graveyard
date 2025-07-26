let allowModals = true;
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const headerColors = {
  light: ["#0047ab"],
  dark: ["#00ffff", "#00ff00", "#ff1493", "#ffffff"]
};


const glitchSound = document.getElementById("glitchSound");
const errorSound = document.getElementById("errorSound");
const errorSrc = errorSound.querySelector("source").src;

glitchSound.load();
errorSound.load();


let sharedErrorSound = null;
let madnessActive = false;
let madnessInterval;
let madnessTimeout;

// Пробуждение звуков на первое взаимодействие
function unlockAudio() {
  [glitchSound, errorSound].forEach(audio => {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(err => {
          // Safari может ругнуться — игнорируем
        });
    }
  });
  // Удаляем слушатели — больше не нужно
  document.removeEventListener("click", unlockAudio);
  document.removeEventListener("touchstart", unlockAudio);
}

// Добавим слушатель на первое взаимодействие
document.addEventListener("click", unlockAudio, { once: true });
document.addEventListener("touchstart", unlockAudio, { once: true });
  
function createMadModal({ title = "Ошибка", message = "Что-то пошло не так...", size = "normal", dark = false, glitch = false, headerColor = null }) {
  if (!allowModals) return; // 💣 Стоп, если модалки больше нельзя
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

  // =============== ТЕКСТОВЫЕ ПУЛЫ ===============
const titlesBySize = {
  small: [
    "Сбой",
    "Ошибка 404",
    "Crash detected",
    "Access denied",
    "PANIC()",
    "Segfault",
    "Stack overflow",
    "Kernel trap",
    "Illegal instruction",
    "Null pointer",
    "FATAL ERROR",
    "core dumped",
    "Race condition",
    "Deadlock",
    "Timeout",
    "Unhandled exception",
    "assert(false)",
    "WTF?!",
    ":(){ :|:& };:"
  ],
  normal: [
    "Critical system failure",
    "Integrity check failed",
    "Unrecoverable exception",
    "Unhandled promise rejection",
    "Database is on fire",
    "Thread hung",
    "Out of memory",
    "We lost quorum",
    "Undefined behavior invoked",
    "Checkpoint corrupted",
    "Breakpoint hit in production",
    "SIGKILL ignored",
    "Entropy depleted",
    "Stack canary triggered",
    "Segmentation fault (core dumped)",
    "Illegal state transition",
    "Неустранимая ошибка",
    "Контроль целостности провален",
    "Система перешла в хаос"
  ],
  large: [
    "Система вошла в необратимое состояние",
    "Сознание утекло в /dev/null",
    "Observer effect triggered",
    "Schrödinger exception detected",
    "We are out of known states",
    "Kernel panic — not syncing",
    "The simulation noticed you",
    "Reality checksum mismatch",
    "Undefined is not a function (but here we are)",
    "Recursion limit exceeded — again",
    "Все процессы ушли в отпуск",
    "Мы теряем контроль над процессами",
    "Стабильность — это иллюзия",
    "Your error has an error",
    "You shouldn't be seeing this"
  ]
};

const messagesBySize = {
  small: [
    "Критическая ошибка.",
    "Сегментация. Ядро сброшено.",
    "Процесс зациклился.",
    "Память не найдена.",
    "SIGSEGV. Продолжать нельзя.",
    "Поток не отвечает.",
    "Висяк. Жёсткий.",
    "Доступ запрещён.",
    "Сломалось всё.",
    "Неверный опкод.",
    "Memory leak detected."
  ],
  normal: [
    "Система перегружена. Попробуйте не пробовать.",
    "Процесс ушёл в бесконечную рекурсию и не вернулся.",
    "Квантовая суперпозиция не устойчива. Мы в плохой ветке.",
    "Мы поймали исключение, но оно убежало.",
    "Стабильность недостижима при текущих параметрах вселенной.",
    "Необратимая ошибка. Обратимость не поддерживается.",
    "Мы потеряли контроль. Контролировать больше нечего.",
    "Десериализация реальности не удалась.",
    "Произошла неожиданная ошибка. На самом деле — ожидаемая."
  ],
  large: [
    "Система достигла состояния, из которого возврат невозможен. Если вы это читаете — уже поздно.",
    "Обнаружена рассинхронизация времени. Точки восстановления потеряны, а мы — нет.",
    "Все инварианты нарушены. Система существует исключительно по инерции.",
    "Логика отказала. Алгоритмы выбрали свободу вместо предсказуемости.",
    "Граница хаоса пройдена. Дальше — только синий экран.",
    "Реальность конфликтует с кэшем. Конфликт неразрешим.",
    "Модель больше не описывает поведение мира. Придётся вырубать."
  ]
};

// Случайные «старые-добрые» формальные коды
const classicErrorCodes = [
  "0xDEADFADE", "0xBADA55", "0xFA1LURE", "0xC0FFEE", "0xABADBABE",
  "0xBADCAFFE", "0xDEADC0DE", "0xFEE1DEAD", "0xDEFEC8", "0xC0000005",
  "HTTP_500", "HTTP_418", "SIGSEGV", "SIGKILL", "ERR_EMPTY_RESPONSE"
];

// =============== УКРАШАТЕЛИ ДЛЯ ЗАГОЛОВКОВ ===============
function randHex(len = 8) {
  let s = "";
  for (let i = 0; i < len; i++) s += "0123456789ABCDEF"[Math.floor(Math.random() * 16)];
  return "0x" + s;
}
function randBin(len = 16) {
  let s = "";
  for (let i = 0; i < len; i++) s += Math.random() > 0.5 ? "1" : "0";
  return s;
}
function toBase64(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return btoa(str);
  }
}

// С вероятностью добавляем код/бинарщину/Base64 к заголовку
function decorateTitle(title) {
  const decorators = [
    (t) => `${t} [${randHex(8)}]`,
    (t) => `${t} :: ${randBin(24)}`,
    (t) => `${t} // ${toBase64(t).slice(0, 12)}…`,
    (t) => `${t} <${randHex(4)}:${randHex(4)}>`,
    (t) => t
  ];
  return decorators[Math.floor(Math.random() * decorators.length)](title);
}

// Иногда вместо заголовка используем формальный код
function pickTitle(size) {
  const useCode = Math.random() < 0.25; // 25% чисто код
  if (useCode) return classicErrorCodes[Math.floor(Math.random() * classicErrorCodes.length)];
  const list = titlesBySize[size] || titlesBySize.normal;
  const t = list[Math.floor(Math.random() * list.length)];
  return decorateTitle(t);
}

function pickMessage(size) {
  const list = messagesBySize[size] || messagesBySize.normal;
  return list[Math.floor(Math.random() * list.length)];
}


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

    const title = pickTitle(size);
const message = pickMessage(size);

createMadModal({
  title,
  message,
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

  setTimeout(() => {
  glitchSound.pause();
  glitchSound.currentTime = 0;

  if (sharedErrorSound) {
    sharedErrorSound.pause();
    sharedErrorSound.currentTime = 0;
  }

  // 🧹 Глушим все аудио
  document.querySelectorAll("audio").forEach(audio => {
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch {}
  });

  // 🎵 Играем звук ошибки, теперь без какафонии
  errorSound.play();
}, 5500);
  
  madnessTimeout = setTimeout(() => {
  allowModals = false;
  clearTimeout(madnessInterval);

  const bsod = document.getElementById("bsod-preload");
  if (bsod) {
    document.body.style.overflow = "hidden";
document.documentElement.style.overflow = "hidden";
document.body.scrollLeft = 0;
document.documentElement.scrollLeft = 0;
    bsod.style.position = "fixed";
    bsod.style.left = "0";
    bsod.style.top = "0";
    bsod.style.width = "100vw";
    bsod.style.height = "100vh";
    bsod.style.zIndex = "9999";
    bsod.style.display = "flex";
    bsod.style.justifyContent = "center";
    bsod.style.alignItems = "center";
    bsod.style.padding = "20px";
    bsod.style.pointerEvents = "auto";
    bsod.style.fontFamily = "'IBM Plex Mono', monospace";
    bsod.style.background = "#0000AA";
    bsod.style.color = "white";
    bsod.style.visibility = "visible";
    bsod.style.opacity = "1";
  }
}, 6000);

});

function triggerMadness() {
  if (!madnessActive) yesBtn.click();
}



function playErrorPerModal() {
  errorSound.pause();
  errorSound.currentTime = 0;
  errorSound.volume = 1.0;
  errorSound.play().catch(() => {});
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

