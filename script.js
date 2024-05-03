const playButton = document.querySelector(".play");
const lapButton = document.querySelector(".lap");
const resetButton = document.querySelector(".reset");
const clearAllButton = document.querySelector(".lap-clear-button");
const second = document.querySelector(".sec");
const centiSecond = document.querySelector(".msec");
const minute = document.querySelector(".minute");
const lapList = document.querySelector(".laps");
const bg = document.querySelector(".outer-circle");


let isPlay = false;
let secCounter = 0;
let sec;
let centiCounter = 0;
let centiSec;
let minCounter = 0;
let min;
let isReset = false;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
    if (lapList.childElementCount > 0) {
        clearAllButton.classList.remove("hidden"); // Show Clear All button if there are laps
    } else {
        clearAllButton.classList.add("hidden"); // Hide Clear All button if there are no laps
    }
    second.innerText = '0 :';
}
const play = () => {
    if (!isPlay && !isReset) {
        playButton.innerHTML = 'Pause';
        bg.classList.add("animation-bg");
        min = setInterval(() => {
            if (secCounter === 59 && centiCounter === 99) {
                minCounter++;
                secCounter = 0;
                centiCounter = 0;
                minute.innerText = `${minCounter}:`;
                second.innerHTML = '&nbsp;0:';
                centiSecond.innerHTML = '0';
            } else if (secCounter === 59) {
                secCounter = 0;
                minute.innerText = `${++minCounter}:`;
                second.innerHTML = '&nbsp;0:';
            } else if (centiCounter === 99) {
                centiCounter = 0;
                second.innerHTML = `${++secCounter}:&nbsp;`;
            } else {
                second.innerHTML = `${secCounter}:&nbsp;`;
                centiSecond.innerHTML = `${++centiCounter}`;
            }
        }, 10);
        isPlay = true;
        isReset = true;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(min);
        isPlay = false;
        isReset = false;
        bg.classList.remove("animation-bg");

    }
    toggleButton();
}



const reset = () => {
    clearInterval(min);
    clearInterval(sec);
    clearInterval(centiSec);
    isPlay = false;
    isReset = false;
    minCounter = 0;
    secCounter = 0;
    centiCounter = 0;
    minute.innerHTML = '0:';
    second.innerHTML = '&nbsp; 0 :';
    centiSecond.innerHTML = '0';
    lapList.innerHTML = '';
    clearAllButton.classList.add("hidden"); // Hide Clear All button on reset
}

const lap = () => {
    const lapTime = document.createElement('li');
    lapTime.classList.add('lap-item');
    lapTime.innerHTML = `
        <span class="number">#${lapList.childElementCount + 1}</span>
        <span class="time-stamp">${minute.innerText} : ${second.innerText} : ${centiSecond.innerText}</span>
    `;
    lapList.appendChild(lapTime);
    toggleButton();
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearAllButton.addEventListener("click", () => {
    lapList.innerHTML = ''; // Clear lap items
    clearAllButton.classList.add("hidden"); // Hide Clear All button
});
