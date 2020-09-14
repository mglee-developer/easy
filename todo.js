const toDoInput = document.querySelector('.task__input');
const toDo = document.querySelector('.to-do');
const deleteBtn = document.querySelector('.item__delete');

const CURTODOS_LS = 'toDos';

const toDos = [];

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
            <button class="item__checkbox">
                <i class="far fa-check-circle"></i>
            </button>
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

        // item delete
        toDo.addEventListener('click', (e) => {
            const id = e.target.dataset.id;

            if(id == null) {
                return;
            }

            const toBeDelete = document.querySelector(`.list__item[data-id="${id}"]`);
            toBeDelete.remove();
            toDos.pop();

            saveToDo();
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