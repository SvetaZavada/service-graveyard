const ui = document.getElementById('ui');
const bsod = document.getElementById('bsod');

// ========= ТЕКСТЫ =========
const TOASTS = [
  'Ты правда нажал «Да»?',
  'Последний, кто это делал, больше не пишет код.',
  'Система предупреждала.',
  'Legacy стучится в лог.',
  'Abort while you can.',
  'Это не покрыто SLA.',
  'DO_NOT_RESURRECT',
];

const ERRORS = [
  'UnhandledException: ResurrectionAttemptException',
  '500 Internal Afterlife Error',
  'NotRespondingException: service.Legacy.Restore()',
  'return 410; // Gone',
  'while(true) { Suffer(); }',
  'NullReferenceException: hope == null',
  'DNS_PROBE_FINISHED_NXDOMAIN',
  'throw new NotRespondingException();',
  'Segmentation fault (core dumped)',
  'Служба Legacy не отвечает',
];

const STACK = `at CRM.Service.Restore() in Legacy.cs:line 666
at Necromancy.Controller.TryRestore() in Ritual.cs:line 13
at Hope.Run() in main.cs:line 0`;

const CONSOLE_LINES = [
  '> init restore --force',
  '> checking backups...',
  '> backups corrupted',
  '> init restore --force --force',
  '> WARNING: recursion detected',
  '> repairing hope.dll ... failed',
  '> killing legacy process ... failed',
  '> try/catch ... catch failed',
  '> rollback ... failed',
  '> roll-forward ... failed',
  '> throwing hands...',
];

// ========= УТИЛИТЫ =========
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========= СТАРТОВОЕ ОКНО =========
createWindow({
  title: 'Восстановление CRM',
  body: 'Вы действительно хотите восстановить CRM?',
  buttons: [
    { text: 'Да', class: 'btn-yes', onClick: startHell },
    { text: 'Нет', class: 'btn-no', onClick: () => alert('Мудро. CRM остаётся под землёй.') },
  ],
  center: true,
  shake: false
});

// ========= АДСКИЙ РЕЖИМ =========
function startHell() {
  startGlitchCursor();
  randomBodyShakes();
  spawnToasts();
  spawnErrors();
  spawnProgress();
  spawnConsole();
  spawnStacktraces();
  spawnForms();
  randomBSOD();
}

// ========= РАЗНЫЕ ТИПЫ ОКОН =========

function createWindow(opts = {}) {
  const {
    title = 'System',
    body = '',
    buttons = [],
    center = false,
    klass = '',
    shake = true,
  } = opts;

  const w = document.createElement('div');
  w.className = 'win ' + klass;
  if (!shake) w.style.animation = 'none';

  const titleEl = document.createElement('div');
  titleEl.className = 'win__title';
  titleEl.textContent = title;

  const bodyEl = document.createElement('div');
  bodyEl.className = 'win__body';

  if (typeof body === 'string') {
    bodyEl.innerHTML = `<p>${body}</p>`;
  } else {
    bodyEl.appendChild(body);
  }

  const footerEl = document.createElement('div');
  footerEl.className = 'win__footer';

  if (buttons.length) {
    buttons.forEach(b => {
      const btn = document.createElement('button');
      btn.textContent = b.text;
      if (b.class) btn.classList.add(b.class);
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (b.onClick) b.onClick(w);
      });
      footerEl.appendChild(btn);
    });
  } else {
    const ok = document.createElement('button');
    ok.textContent = 'OK';
    ok.addEventListener('click', () => w.remove());
    footerEl.appendChild(ok);
  }

  w.appendChild(titleEl);
  w.appendChild(bodyEl);
  w.appendChild(footerEl);
  ui.appendChild(w);

  positionWindow(w, center);
  return w;
}

function positionWindow(el, center = false) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = el.offsetWidth;
  const h = el.offsetHeight;

  if (center) {
    el.style.left = `${(vw - w) / 2}px`;
    el.style.top  = `${(vh - h) / 2}px`;
  } else {
    el.style.left = `${rand(0, vw - w)}px`;
    el.style.top  = `${rand(0, vh - h)}px`;
  }
}

/* ---- TOASTS ---- */
function spawnToasts() {
  setInterval(() => {
    const t = document.createElement('div');
    t.className = 'win win--toast';
    t.style.top = `${rand(10, window.innerHeight - 40)}px`;
    t.style.left = `${rand(10, window.innerWidth - 200)}px`;
    t.textContent = pick(TOASTS);
    ui.appendChild(t);
    setTimeout(() => t.remove(), 5000);
  }, 500);
}

/* ---- ERRORS ---- */
function spawnErrors() {
  const MAX = 180;
  setInterval(() => {
    const modals = document.querySelectorAll('.win--error');
    if (modals.length > MAX) modals[0].remove();

    createWindow({
      title: pick(['System Error', 'Legacy Alert', 'CRM.exe', 'Kernel Panic']),
      body: pick(ERRORS),
      klass: 'win--error',
    });
  }, 180);
}

/* ---- PROGRESS ---- */
function spawnProgress() {
  setInterval(() => {
    const wrap = document.createElement('div');
    wrap.className = 'bar-wrap';
    const bar = document.createElement('div');
    bar.className = 'bar';
    wrap.appendChild(bar);

    const body = document.createElement('div');
    body.innerHTML = `<p>Восстановление… (это никогда не закончится)</p>`;
    body.appendChild(wrap);

    const w = createWindow({
      title: 'Restore.exe',
      body,
      klass: 'win--progress',
    });

    let p = 0;
    const int = setInterval(() => {
      p += rand(1, 7);
      if (p > 99) p = 99; // досадно :)
      bar.style.width = p + '%';
    }, 120);
    setTimeout(() => { clearInterval(int); }, 10000);
  }, 2500);
}

/* ---- CONSOLE ---- */
function spawnConsole() {
  const body = document.createElement('div');
  body.className = 'console';
  body.innerHTML = CONSOLE_LINES.join('\n');
  const w = createWindow({
    title: 'legacy.log',
    body: body,
    klass: 'win--console',
  });

  setInterval(() => {
    body.innerHTML += '\n' + pick(CONSOLE_LINES);
    body.scrollTop = body.scrollHeight;
  }, 700);
}

/* ---- STACKTRACE ---- */
function spawnStacktraces() {
  setInterval(() => {
    const pre = document.createElement('pre');
    pre.className = 'stack';
    pre.textContent = STACK;

    createWindow({
      title: 'Exception',
      body: `throw new NotRespondingException();`,
      klass: 'win--stack',
      buttons: [{ text: 'OK', onClick: (w)=>w.remove() }]
    }).querySelector('.win__body').appendChild(pre);
  }, 4000);
}

/* ---- FORMS ---- */
function spawnForms() {
  setInterval(() => {
    const form = document.createElement('div');
    form.innerHTML = `
      <p>Подтвердите, что вы осознаёте последствия:</p>
      <label><input type="checkbox"> Я готов страдать</label><br>
      <label><input type="checkbox"> Я видел логи</label><br>
      <label><input type="checkbox"> Я понимаю слово «legacy»</label>
    `;
    createWindow({
      title: 'Подтверждение',
      body: form,
      klass: 'win--warning',
      buttons: [{ text: 'Подтвердить', onClick: (w)=>w.remove() }]
    });
  }, 6000);
}

/* ---- BSOD ---- */
function randomBSOD() {
  setTimeout(() => {
    if (Math.random() < 0.35) {
      bsod.hidden = false;
      document.addEventListener('keydown', hideBSODOnce, { once: true });
      document.addEventListener('click',  hideBSODOnce, { once: true });
    }
  }, rand(6000, 15000));
}
function hideBSODOnce() {
  bsod.hidden = true;
}

/* ---- ГЛЮЧНЫЙ КУРСОР ---- */
function startGlitchCursor() {
  const c1 = document.getElementById('cursor1');
  const c2 = document.getElementById('cursor2');
  let x = window.innerWidth/2, y = window.innerHeight/2;

  document.body.style.cursor = 'none'; // отключаем системный

  window.addEventListener('mousemove', (e) => {
    x = e.clientX; y = e.clientY;
  });

  setInterval(() => {
    c1.style.left = (x + rand(-6, 6)) + 'px';
    c1.style.top  = (y + rand(-6, 6)) + 'px';
    c2.style.left = (x + rand(-12, 12)) + 'px';
    c2.style.top  = (y + rand(-12, 12)) + 'px';
  }, 16);
}

/* ---- Random body shakes ---- */
function randomBodyShakes() {
  setInterval(() => {
    if (Math.random() < 0.3) {
      document.body.style.transform = 'translate(2px, -2px)';
      setTimeout(()=> document.body.style.transform = '', 180);
    }
  }, 800);
}
