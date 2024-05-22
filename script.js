let startTime, updatedTime, difference;
let timerInterval;
let running = false;
let laps = [];

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - (difference || 0);
        timerInterval = setInterval(updateTime, 1000);
        running = true;
    }
}

function updateTime() {
    updatedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let date = new Date(time);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}

function pauseStopwatch() {
    if (running) {
        clearInterval(timerInterval);
        difference = Date.now() - startTime;
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    startTime = null;
    updatedTime = null;
    difference = null;
    running = false;
    timeDisplay.textContent = '00:00:00';
    laps = [];
    lapsList.innerHTML = '';
}

function recordLap() {
    if (running) {
        laps.push(updatedTime);
        let lapItem = document.createElement('li');
        lapItem.textContent = formatTime(updatedTime);
        lapsList.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
