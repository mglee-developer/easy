
const form = document.querySelector('.js-greeting');
const input = form.querySelector('.name__input');
const greeting = document.querySelector('.greeting');
const hours = getTime();

const CURRENT_USER = 'currentUser';
const SHOWING_CLASS = 'showing';
const TRNASFORM_CLASS = 'transform';
const ACTIVE_CLASS = 'active';
const CLOCKCONTAINER_CN = 'user-container';

function saveName(text) {
    localStorage.setItem(CURRENT_USER, text);
}

function createName() {
    const text = input.value;
    writeName(text, hours);
    saveName(text);
}

function askForName() {
    form.classList.add(SHOWING_CLASS);
    input.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            createName();
            transform();
        }
    });
}

function transform() {
    const section = document.querySelector('.section');
    const clockContainer = document.querySelector('.clock-container');
    const taskContainer = document.querySelector('.task-container');

    section.classList.add(TRNASFORM_CLASS);
    clockContainer.className = `${CLOCKCONTAINER_CN}`;
    taskContainer.classList.add(ACTIVE_CLASS);
}

function writeName(user, hours) {
    form.classList.remove(SHOWING_CLASS);
    greeting.classList.add(SHOWING_CLASS);
    greeting.innerHTML = 
    `Good <span class="period">${hours >= 00 && hours < 12 ? 'morning' : `
    ${hours >= 12 && hours < 18 ? 'afternoon' : 'evening'}`}</span>,
        <span class="name">${user}</span>`;
}

function loadName() {
    const currentUser = localStorage.getItem(CURRENT_USER);

    if(currentUser === null) {
        // 저장된 이름이 없는 경우
        askForName();
    }else {
        // 저장된 이름이 있는 경우
        writeName(currentUser, hours);
        transform();
    }
}

function init() {
    // user 유무
    loadName();
}

init();