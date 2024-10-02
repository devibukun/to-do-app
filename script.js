const input = document.getElementById('input');
const addBtn = document.getElementById('addButton');
const taskList = document.getElementById('tasklist');
const deleteAll = document.getElementById('delete-all');
   

loadTask();

function addTask(){
      const task = input.value.trim();

      if(task){
        createTaskElement(task);

        input.value = '';
        saveTask();
      }else{
        alert('Please Insert a task');
      }
     
}

document.addEventListener('DOMContentLoaded', function (){
    addBtn.addEventListener('click', addTask);
    input.addEventListener('keydown', function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            addTask();
        }
      });
})



function createTaskElement(task){
    const listItem = document.createElement('li');
    listItem.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    deleteButton.addEventListener('click', function(){
        taskList.removeChild(listItem);
        saveTask();
    })
}+

function saveTask(){
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function(item){
        tasks.push(item.textContent.replace('Delete', '').trim());
    }); 
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTask(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(createTaskElement);
}
