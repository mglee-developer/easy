const toDoInput = document.querySelector('.task__input');
const toDo = document.querySelector('.to-do');

const CURTODOS_LS = 'toDos';

let toDos = [];

function moveTodo() {
    console.log('click');
}

function deleteTodo(e) {
    const id = e.target.dataset.id;

    if(id == null) {
        return;
    }

    const toBeDelete = document.querySelector(`.list__item[data-id="${id}"]`);
    console.log(toBeDelete);
    toBeDelete.remove();
    const cleanTodo = toDos.filter(toDo => {
        return toDo.id !== parseInt(toBeDelete.dataset.id);
    });
    console.log(cleanTodo);
    toDos = cleanTodo;

    saveToDo();
}

function saveToDo() {
    localStorage.setItem(CURTODOS_LS, JSON.stringify(toDos));
}

function wrtieToDo(currentToDo) {
    const li = document.createElement('li');
    const id = toDos.length + 1;
    li.setAttribute('class', 'list__item');
    li.setAttribute('data-id', id);
    li.innerHTML = `
        <p class="item__detail">
            <input type="checkbox" class="item__checkbox" id="${id}" />
            <label for="${id}" class="item__customCheck"></label>
            <span>${currentToDo}</span>
        </p>
        <button class="item__delete">
            <i class="fas fa-minus-circle" data-id=${id}></i>
        </button>
    `;

    toDo.appendChild(li);

    toDoList = {
        id: id,
        text: currentToDo
    }

    toDos.push(toDoList);

    saveToDo();

    // item delete
    toDo.addEventListener('click', deleteTodo);

    // item check
    const checkBtn = document.querySelector('.item__checkbox');
    checkBtn.addEventListener('click', moveTodo);
}

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
        parseTodos.forEach(parseTodo => {
            // toDoList 작성
            wrtieToDo(parseTodo.text);
        });
    }
}

function init() {
    loadToDo();
    toDoInput.addEventListener('keypress', e => {
        if(e.key === 'Enter') {
            createTodo();
        }
    });
}

init();