function createTask(title){
  let completed = false;
  const getCompleted = () => completed;
  const toggleCompleted = () =>{
    completed = !completed;
  };
  return { title, getCompleted, toggleCompleted}
}

const task1 = createTask('dishes');

const ToDoList = (function(){
  let tasks = [];

  function addTask(title){
    const task = createTask(title);
    tasks.push(task);
  }

  function removeTask(index){
    tasks.splice(index, 1);
  }

  function toggleTaskCompleted(index){
    if(tasks[index]){
      tasks[index].toggleCompleted();
    }
  }

  function getTasks(){
    return tasks;
  }

  return {
    addTask,
    removeTask,
    toggleTaskCompleted,
    getTasks,
  };
})();

const DOMHandler = (function(){
  const taskContainer = document.querySelector('.task-list-container');

  function renderTasks(tasks){
    taskContainer.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.textContent = `${task.title}`;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = `✕`;
      removeBtn.addEventListener('click', () => {
        ToDoList.removeTask(index);
        renderTasks(ToDoList.getTasks());
      })

      taskItem.appendChild(removeBtn);
      taskContainer.appendChild(taskItem);
    });
  }
  return {renderTasks};
})();

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('.add-task-btn');
  const titleInput = document.querySelector('#task-title');
  
  addButton.addEventListener('click', () => {
    const title = titleInput.value.trim();
    if(title){
      ToDoList.addTask(title);
      titleInput.value = '';
      DOMHandler.renderTasks(ToDoList.getTasks());
    } else {
      alert('Please enter a title.')
    }
  });
})

