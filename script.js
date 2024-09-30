let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let intervalId;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 100);
    startStopBtn.textContent = 'Stop';
    isRunning = true;
  } else {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    startStopBtn.textContent = 'Start';
    isRunning = false;
  }
}

function reset() {
  clearInterval(intervalId);
  elapsedTime = 0;
  display.textContent = '00:00:00';
  startStopBtn.textContent = 'Start';
  isRunning = false;
  laps = [];
  updateLaps();
}

function lap() {
  if (isRunning) {
    laps.push(formatTime(elapsedTime));
    updateLaps();
  }
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  const ms = Math.floor((time % 1000) / 100);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
  return unit < 10 ? '0' + unit : unit;
}

function updateLaps() {
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
