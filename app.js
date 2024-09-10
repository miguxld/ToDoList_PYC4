document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const input = document.querySelector("#task-input");
    const template = document.querySelector("template");
    const taskContainer = document.querySelector("#task-container");
  
    // Cargar tareas desde Local Storage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => {
        const templateContent = template.content.cloneNode(true);
        const taskText = templateContent.querySelector(".task-text");
        const completeCheck = templateContent.querySelector("input[name='complete']");
        const anchorCheck = templateContent.querySelector("input[name='anchor']");
        
        taskText.innerText = task.text;
        completeCheck.checked = task.complete;
        anchorCheck.checked = task.important;
        
        if (completeCheck.checked) {
          templateContent.querySelector('li').classList.add("complete");
        }
        
        if (anchorCheck.checked) {
          templateContent.querySelector('li').classList.add("important");
        }
        
        taskContainer.appendChild(templateContent);
      });
    }
  
    // Guardar tareas en Local Storage
    function saveTasks() {
      const tasks = [];
      taskContainer.querySelectorAll('li').forEach(taskItem => {
        const taskText = taskItem.querySelector(".task-text").innerText;
        const completeCheck = taskItem.querySelector("input[name='complete']").checked;
        const anchorCheck = taskItem.querySelector("input[name='anchor']").checked;
        tasks.push({ text: taskText, complete: completeCheck, important: anchorCheck });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const templateContent = template.content.cloneNode(true);
      const taskText = templateContent.querySelector(".task-text");
  
      taskText.innerText = input.value;
      taskContainer.appendChild(templateContent);
      input.value = "";
  
      
      saveTasks();
    });
  
    //manejar checkbox
    taskContainer.addEventListener("change", (e) => {
      const target = e.target;
      
      if (target.matches("input[name='complete']")) {
        const taskItem = target.closest('li');
        if (target.checked) {
          taskItem.classList.add("complete");
        } else {
          taskItem.classList.remove("complete");
        }
      }
  
      if (target.matches("input[name='anchor']")) {
        const taskItem = target.closest('li');
        if (target.checked) {
          taskItem.classList.add("important");
        } else {
          taskItem.classList.remove("important");
        }
      }
      
      
      saveTasks();
    });
  
    // Delete
    taskContainer.addEventListener("click", (e) => {
      const target = e.target;
  
      if (target.matches(".delete-task img")) {
        const taskItem = target.closest('li');
        taskItem.remove();
        saveTasks();
      }
    });
  
    // Delete all
    document.querySelector("#deleteAll").addEventListener("click", () => {
      taskContainer.innerHTML = "";
      saveTasks();
    });
  
    loadTasks();
  });
  