function writeDone(text) {
    const doneList = document.createElement('li');
    const id = (dones.length * 2) + 1;
    doneList.setAttribute('class', 'list__item');
    doneList.setAttribute('data-id', id);

    const doneItem = document.createElement('div');
    doneItem.setAttribute('class', 'item__div');

    const backBtn = document.createElement('input');
    backBtn.setAttribute('type', 'checkbox');
    backBtn.setAttribute('class', 'item__checkbox');
    backBtn.setAttribute('checked', 'checked');
    backBtn.setAttribute('id', id);

    const doneLabel = document.createElement('label');
    doneLabel.setAttribute('class', 'item__customCheck');
    doneLabel.setAttribute('for', id);

    const doneSpan = document.createElement('span');
    doneSpan.innerText = `${text}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item__delete');
    deleteBtn.innerHTML = `<i class="fas fa-minus-circle" data-id=${id}></i>`;

    doneList.appendChild(doneItem);
    doneItem.appendChild(backBtn);
    doneItem.appendChild(doneLabel);
    doneItem.appendChild(doneSpan);
    doneList.appendChild(deleteBtn);

    done.appendChild(doneList);

    // back item
    backBtn.addEventListener('click', moveItem);

    doneObj = {
        id: id,
        text: text
    }

    dones.push(doneObj);

    saveDone();
}

function loadDone() {
    const currentDone = localStorage.getItem(DONE_LS);
    if(currentDone !== null) {
        const parseDones = JSON.parse(currentDone);
        parseDones.forEach((parseDone) => {
            // done list 작성
            writeDone(parseDone.text);
        });
    }
}

function init() {
    loadDone();
}

init();