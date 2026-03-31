// ============================================
//  script.js — typing test logic
// ============================================

// ── State ──
let currentSentence = '';
let startTime       = null;
let timerInterval   = null;
let totalErrors     = 0;
let hasStarted      = false;

// ── Elements ──
const screenIdle    = document.getElementById('screen-idle');
const screenTyping  = document.getElementById('screen-typing');
const screenResult  = document.getElementById('screen-result');
const previewText   = document.getElementById('preview-text');
const sentenceDisp  = document.getElementById('sentence-display');
const inputBox      = document.getElementById('input-box');
const btnStart      = document.getElementById('btn-start');
const btnRetry      = document.getElementById('btn-retry');
const liveWpm       = document.getElementById('live-wpm');
const liveTime      = document.getElementById('live-time');
const liveAcc       = document.getElementById('live-acc');
const liveErrors    = document.getElementById('live-errors');
const progressFill  = document.getElementById('progress-fill');
const resultWpm     = document.getElementById('result-wpm');
const resultAcc     = document.getElementById('result-acc');
const resultTime    = document.getElementById('result-time');
const resultErrors  = document.getElementById('result-errors');
const resultBadge   = document.getElementById('result-badge');

// ── Init ──
function init() {
  currentSentence = getRandomSentence();
  previewText.textContent = currentSentence;
}

// ── Show screen ──
function showScreen(name) {
  screenIdle.classList.remove('show');
  screenTyping.classList.remove('show');
  screenResult.classList.remove('show');
  document.getElementById('screen-' + name).classList.add('show');
}

// ── Start test ──
function startTest() {
  currentSentence = getRandomSentence();
  totalErrors     = 0;
  hasStarted      = false;
  startTime       = null;

  inputBox.value  = '';
  liveWpm.textContent  = '0';
  liveTime.textContent = '0s';
  liveAcc.textContent  = '100%';
  if (liveErrors) liveErrors.textContent = '0';
  progressFill.style.width = '0%';

  renderSentence('');
  showScreen('typing');
  inputBox.focus();
}

// ── Render sentence with colored chars ──
function renderSentence(typed) {
  let html = '';
  for (let i = 0; i < currentSentence.length; i++) {
    const ch = currentSentence[i] === ' ' ? '&nbsp;' : currentSentence[i];
    if (i < typed.length) {
      if (typed[i] === currentSentence[i]) {
        html += `<span class="char-correct">${ch}</span>`;
      } else {
        html += `<span class="char-wrong">${ch}</span>`;
      }
    } else if (i === typed.length) {
      html += `<span class="char-pending char-cursor">${ch}</span>`;
    } else {
      html += `<span class="char-pending">${ch}</span>`;
    }
  }
  sentenceDisp.innerHTML = html;
}

// ── Calculate WPM ──
function calcWPM(typed, elapsedSec) {
  if (elapsedSec < 1) return 0;
  const words = typed.trim().split(/\s+/).filter(w => w.length > 0).length;
  return Math.round((words / elapsedSec) * 60);
}

// ── Calculate accuracy ──
function calcAccuracy(typed) {
  if (typed.length === 0) return 100;
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentSentence[i]) correct++;
  }
  return Math.round((correct / typed.length) * 100);
}

// ── Count errors ──
function countErrors(typed) {
  let errors = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] !== currentSentence[i]) errors++;
  }
  return errors;
}

// ── Result badge ──
function getBadge(wpm) {
  if (wpm >= 80) return '"you type like a machine."';
  if (wpm >= 60) return '"faster than most humans."';
  if (wpm >= 40) return '"decent. keep going."';
  if (wpm >= 20) return '"room to grow. a lot of it."';
  return '"was the keyboard plugged in?"';
}

// ── Show result ──
function showResult(typed) {
  clearInterval(timerInterval);

  const elapsed = (Date.now() - startTime) / 1000;
  const wpm     = calcWPM(typed, elapsed);
  const acc     = calcAccuracy(typed);
  const errors  = countErrors(typed);

  resultWpm.textContent    = wpm;
  resultAcc.textContent    = acc + '%';
  resultTime.textContent   = elapsed.toFixed(1) + 's';
  resultErrors.textContent = errors;
  resultBadge.textContent  = getBadge(wpm);

  showScreen('result');
}

// ── Input handler ──
inputBox.addEventListener('input', () => {
  const typed = inputBox.value;

  // Start timer on first keystroke
  if (!hasStarted && typed.length > 0) {
    hasStarted = true;
    startTime  = Date.now();

    timerInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      liveTime.textContent = Math.floor(elapsed) + 's';
      liveWpm.textContent  = calcWPM(inputBox.value, elapsed);
      liveAcc.textContent  = calcAccuracy(inputBox.value) + '%';
      if (liveErrors) liveErrors.textContent = countErrors(inputBox.value);
    }, 500);
  }

  renderSentence(typed);

  // Update progress bar
  const progress = Math.min((typed.length / currentSentence.length) * 100, 100);
  progressFill.style.width = progress + '%';

  // Update live accuracy
  liveAcc.textContent = calcAccuracy(typed) + '%';

  // Check if done
  if (typed.length >= currentSentence.length) {
    showResult(typed);
  }
});

// ── Prevent pasting ──
inputBox.addEventListener('paste', e => e.preventDefault());

// ── Buttons ──
btnStart.addEventListener('click', startTest);
btnRetry.addEventListener('click', () => {
  showScreen('idle');
  init();
});

// ── Space bar on idle screen ──
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && screenIdle.classList.contains('show')) {
    e.preventDefault();
    startTest();
  }
});

// ── Boot ──
init();
