const toDoForm=document.querySelector(".js-toDoForm"),
    toDoInput=toDoForm.querySelector("input"),
    toDoList=document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";   
const CLICKED_CLASS="clicked";
let CURRENT_CLICKED="unclicked";


let toDos = [];

function clickCheckbox(event){
    const checkbox=event.target;
    const span=checkbox.parentNode;
    const sibling= span.nextSibling;    
    if(CURRENT_CLICKED==="clicked"){
        span.innerHTML=`<i class="far fa-square"></i>`
        sibling.classList.toggle(CLICKED_CLASS);
        CURRENT_CLICKED="unclicked";
    }else{
        span.innerHTML=`<i class="far fa-check-square"></i>`
        sibling.classList.toggle(CLICKED_CLASS);
        CURRENT_CLICKED="clicked";
    }
   
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos=cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li= document.createElement("li");
    const checkbox = document.createElement("span");
    checkbox.addEventListener("click",clickCheckbox);
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length+1;
    checkbox.innerHTML = `<i class="far fa-square"></i>`
    delBtn.innerText="✖";
    span.innerText = text;
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function something(toDo){
    paintToDo(toDo.text);
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(something);
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);

}
init();