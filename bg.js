const body = document.querySelector("body");

const IMG_NUMBER = 2;

function paintImage(imgNumber){
    const image=new Image();
    image.src = `images/${imgNumber+1}.jpg`;
    image.classList.add('bgImage');
    body.prepend(image);
}

function getRandom(){
    const number = Math.floor(Math.random()*2);
    return number;
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}
init();