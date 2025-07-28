const inputBox= document.getElementById("input-box")
const listContainer= document.getElementById("list-container")

function addTask(){
    if(inputBox.value=== ''){
        alert("Tienes que escribir una tarea!");
    }else{
        let li= document.createElement("li");
        li.innerHTML= inputBox.value;
        listContainer.appendChild(li);
        let span= document.createElement("span");
        span.innerHTML="\u00d7"; // icono de la x
        li.appendChild(span);
    }
    inputBox.value="";
    saveData();
}
// Detectar tecla Enter
inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.tagName=="SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

// queremos que se guarden las tareas
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);

}

function showTask(){
    listContainer.innerHTML= localStorage.getItem("data");
}

showTask();