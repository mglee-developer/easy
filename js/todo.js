const toDoInput = document.querySelector('.task__input');
const toDo = document.querySelector('.to-do');
const done = document.querySelector('.done');

const CURTODOS_LS = 'toDos';
const DONE_LS = 'finished';

let toDos = [];
let dones = [];

// 아이템 이동(done or todo)
function moveItem(e) {
    const id = e.target.id;
    const checkedList = e.target.parentNode.parentNode.parentNode;

    if(id == null) {
        return;
    }

    if(checkedList.className === 'to-do') {
        const toBeMove = document.querySelector(`.list__item[data-id="${id}"]`);
        toBeMove.remove();
        done.appendChild(toBeMove);

        // done list로 이동
        const finished = toDos.filter((list) => {
            return list.id === parseInt(toBeMove.dataset.id);
        });
        // console.log(finished);
        dones.push(...finished);
        saveDone();

        // to do list에서 제거
        const stayed = toDos.filter((list) => {
            return list.id !== parseInt(toBeMove.dataset.id);
        });
        toDos = stayed;
        saveToDo();
    }else {
        const toBeBack = document.querySelector(`.list__item[data-id="${id}"]`);
        console.log(toBeBack);
        toBeBack.remove();
        toDo.appendChild(toBeBack);
    
        // to do list add
        const notFinished = dones.filter((list) => {
            return list.id === parseInt(toBeBack.dataset.id);
        });
        toDos.push(...notFinished);
        saveToDo();
    
        // done list remove
        const stayed = dones.filter((list) => {
            return list.id !== parseInt(toBeBack.dataset.id);
        });
        dones = stayed;
        saveDone();
    }
}

// 아이템 삭제
function deleteItem(e) {
    const id = e.target.dataset.id;
    const checkedList = e.target.parentNode.parentNode.parentNode;

    if(id == null) {
        return;
    }

    if(checkedList.className === 'to-do') {
        const toBeDelete = document.querySelector(`.list__item[data-id="${id}"]`);
        toBeDelete.remove();
        const cleanTodo = toDos.filter(toDo => {
            return toDo.id !== parseInt(toBeDelete.dataset.id);
        });
        toDos = cleanTodo;
    
        saveToDo();
    }else {
        const toBeDoneDel = document.querySelector(`.list__item[data-id="${id}"]`);
        toBeDoneDel.remove();
        const cleanDone = dones.filter((list) => {
            return list.id !== parseInt(toBeDoneDel.dataset.id);
        });
        dones = cleanDone;

        saveDone();
    }
}

// 스토리지에 저장
function saveDone() {
    localStorage.setItem(DONE_LS, JSON.stringify(dones));
}

function saveToDo() {
    localStorage.setItem(CURTODOS_LS, JSON.stringify(toDos));
}

// 해야할 일 작성
function wrtieToDo(text) {
    const toDoList = document.createElement('li');
    const id = toDos.length * 2;
    toDoList.setAttribute('class', 'list__item');
    toDoList.setAttribute('data-id', id);

    const toDoItem = document.createElement('div');
    toDoItem.setAttribute('class', 'item__div');

    const checkBtn =document.createElement('input');
    checkBtn.setAttribute('type', 'checkbox');
    checkBtn.setAttribute('class', 'item__checkbox');
    checkBtn.setAttribute('id', id);

    const listLabel = document.createElement('label');
    listLabel.setAttribute('class', 'item__customCheck');
    listLabel.setAttribute('for', id);

    const listSpan = document.createElement('span');
    listSpan.innerText = `${text}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item__delete');
    deleteBtn.innerHTML = `<i class="fas fa-minus-circle" data-id=${id}></i>`;

    toDoList.appendChild(toDoItem);
    toDoItem.appendChild(checkBtn);
    toDoItem.appendChild(listLabel);
    toDoItem.appendChild(listSpan);
    toDoList.appendChild(deleteBtn);

    toDo.appendChild(toDoList);

    // delte item
    deleteBtn.addEventListener('click', deleteItem);
    // move item
    checkBtn.addEventListener('click', moveItem);

    toDoObj = {
        id: id,
        text: text
    }

    toDos.push(toDoObj);

    saveToDo();
}

// 해야할 일 새로 입력
function createTodo() {
    const currentValue = toDoInput.value;
    wrtieToDo(currentValue);
    toDoInput.value = '';
    toDoInput.focus();
}

function loadToDo() {
    const currentToDo = localStorage.getItem(CURTODOS_LS);

    if(currentToDo !== null) {
        const parseTodos = JSON.parse(currentToDo);
        parseTodos.forEach((parseTodo) => {
            // toDoList 작성
            wrtieToDo(parseTodo.text);
        });
    }
}

function init() {
    loadToDo();
    toDoInput.addEventListener('keypress', e => {
        // e.preventDefault();
        if(e.key === 'Enter') {
            createTodo();
        }
    });
}

init();