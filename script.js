let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const lapTimes = document.getElementById('lapTimes');

document.getElementById('startBtn').addEventListener('click', startStopwatch);
document.getElementById('pauseBtn').addEventListener('click', pauseStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);
document.getElementById('lapBtn').addEventListener('click', recordLap);

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateDisplay, 10); // Update every 10 milliseconds
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(intervalId);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCounter = 1;
    display.textContent = '00:00:00.000';
    lapTimes.innerHTML = ''; // Clear all lap times
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapTimes.appendChild(li);
        lapCounter++;
    }
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const milliseconds = ms % 1000;
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(num, size = 2) {
    let s = '000' + num;
    return s.substr(s.length - size);
}
