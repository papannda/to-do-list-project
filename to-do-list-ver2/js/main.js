'use strict';



document.addEventListener("DOMContentLoaded",()=>{
    loadTasks();

});

const lang = document.querySelector('html').lang;

if(lang === 'ja') {
    document.querySelector('option[value="index.html"]').selected = true;
    
} else if(lang === 'en') {
    document.querySelector('option[value="index-en.html"]').selected = true;   
    
    
} 
document.getElementById('lang').onchange = function() {
    location.href = document.getElementById('lang').value;
}


const todoList = document.getElementById('to-do-list');

const addBtn= document.getElementById('add-btn');



addBtn.addEventListener('click',() =>{

    const textInput = document.getElementById('text-input');
    const dateInput = document.getElementById('date-input');
    const priority = document.getElementById('priority');
    
    const text = textInput.value.trim();
    const deadline =dateInput.value;
    const pro =priority.value;

    if (text ==='' || deadline ===''){
    
        return;}
    
    addTask(text,deadline,pro);

    dateInput.value ='';
    textInput.value ='';
    priority.value='普' 

});

let tasks =[];

function addTask(text,deadline,pro){
    tasks.push({text,deadline,pro, completed: false});
    

    savelocalstorage();
    update();
}


function update(){
    
    todoList.innerHTML="";
    tasks.forEach((t, index)=>{
        console.log(index);
        const taskLi = document.createElement("li");
        taskLi.className="task";

        const textSpan = document.createElement("span");
        
        textSpan.className= t.completed ? "completed" : "none";
        textSpan.textContent= t.text;
        const deadlineSpan =document.createElement("span");
        deadlineSpan.className= t.completed ? "completed" : "none";
        deadlineSpan.textContent=t.deadline;

        const proSpan =document.createElement("span");
        proSpan.className= t.completed ? "completed" : "none";
        proSpan.textContent=t.pro;
        
        
        const completeButton = document.createElement('button');

        completeButton.classList.add('complete-button');

        completeButton.textContent= t.completed ? "undo":"complete";
    
    
        

        completeButton.addEventListener('click',e =>
            togglecomplete(index)
            
        );

            const deleteButton = document.createElement('button');

            deleteButton.textContent="Delete";
        
            deleteButton.type ='button';
        
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click',() => deletetask(index));

        taskLi.appendChild(textSpan);
        taskLi.appendChild(deadlineSpan);
        taskLi.appendChild(proSpan);
        taskLi.appendChild(completeButton);
        taskLi.appendChild(deleteButton);
        todoList.appendChild(taskLi);
        
    });
}

    
function deletetask(index){
    tasks.splice(index, 1);
    savelocalstorage();
    update();
}

function togglecomplete(index){
    tasks[index].completed=!
    tasks[index].completed;
    savelocalstorage();
    update();
}
function loadTasks(){
    const storedtasks=localStorage.getItem("tasks");
    if(storedtasks){
        tasks = JSON.parse(storedtasks);
        update();
    }
}

function savelocalstorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


