const clock = document.querySelector('.clock');
const clockTitle = document.querySelector('.clock__title');

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;

    return hours;
}

function init() {
    // 현재 시간 가져오기
    setInterval(getTime, 1000);
}

init();