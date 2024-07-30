let startTime, updatedTime, difference, tInterval, running = false, lapCount = 0;
let hours = 0, minutes = 0, seconds = 0;

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((difference / (1000 * 60)) % 60);
    seconds = Math.floor((difference / 1000) % 60);

    display.innerHTML = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function pauseTimer() {
    running = false;
    clearInterval(tInterval);
}

function resetTimer() {
    running = false;
    clearInterval(tInterval);
    hours = minutes = seconds = 0;
    display.innerHTML = "00:00:00";
    lapList.innerHTML = ''; // Clear lap list
    lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}
