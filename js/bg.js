const body = document.querySelector('body');

const IMAGE_CNT = 8;

function paintImage(imageNum) {
    const image = new Image();
    image.src = `images/${imageNum + 1}.jpg`;
    image.classList.add('body__bg');
    body.prepend(image);
}

function genNumber() {
    const number = Math.floor(Math.random() * IMAGE_CNT);
    return number;
}

function init() {
    const randomNumebr = genNumber();
    paintImage(randomNumebr);
}

init();