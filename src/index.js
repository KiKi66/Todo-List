const projects = document.getElementById("projects");
const taskList = document.getElementById("tasklist")

const projectBtn = document.querySelector("#projectBtn");
const newTsk = document.querySelector("#newTsk");
const cancelPjBtn = document.getElementById("cancelPJ");
const addPjBtn = document.getElementById("addPJ")
const cancelTsk = document.querySelector('#cancelTsk')
const addTsk = document.querySelector('#addTsk')




let projectList = ["Project10", "Project20"];
let projectTasks = {};

function clearProject(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function render() {
  clearProject(projects);
  projectList.forEach((p) => {
    let pElement = document.createElement("li");
    pElement.classList.add("project-name");
    pElement.innerText = p;
    
    pElement.addEventListener("click", function () {
      document.querySelectorAll(".project-name").forEach((el) => {
        el.classList.remove("highlight");
      });
      this.classList.toggle("highlight");
    });
    projects.appendChild(pElement)
  });
}

function newProject() {
  let projectName = document.getElementById("project-name").value;
  if (projectName != null || projectName != '') {
    projectList.push(projectName)
    projectTasks[projectName] = [];
    render()
  }
  document.getElementById("project-name").value = "";
}


function addTask() {
  let highlightedProject = document.getElementsByClassName('highlight')
  if (highlightedProject.length >0) {    
    let taskDescription = document.getElementById("task-description").value;
    let taskDate = document.getElementById("date-input").value;
    let task = { description: taskDescription, date: taskDate };
    projectTasks[highlightedProject[0].innerText].push(task)
    taskRender(taskDescription, taskDate, highlightedProject[0].innerText)
    document.getElementById("task-description").value = "";
    document.getElementById("date-input").value = "";
  } else {
    alert('Choose Project for the task first')
  }
}

function taskRender(taskDescription, taskDate, projectName) {

  if (!taskDate) {
    let today = new Date();
    taskDate =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();
  }

  let taskdetails = document.createElement("li");
  taskdetails.innerHTML = `
                    <input type="checkbox" name="" id="checkbox">
                    <p id="taskDetails">${taskDescription}</p>
                    <div id="dueDate" class="date">${taskDate}</div>
                    <i class="fa-solid fa-x" id="deleteIcon"></i>
                    `;
  taskdetails.querySelector('#deleteIcon').addEventListener('click', () => {
    let index = projectTasks[projectName].findIndex(task => task.description === taskDescription && task.date === taskDate)
    if (index > -1) {
      projectTasks[projectName].splice(index,1)
    }
    taskdetails.remove()
  })
  taskList.appendChild(taskdetails);
  addTaskToggle();

}

function addTaskToggle() {
const taskInput = document.getElementById("task-input");
  taskInput.classList.toggle('hide');
  newTsk.classList.toggle('move-up')

}

const addProjectToggle = () => {
  let addproject = document.querySelector(".add-project");
  addproject.classList.toggle("hide");
};

addPjBtn.addEventListener("click", newProject);
projectBtn.addEventListener("click", addProjectToggle);
cancelPjBtn.addEventListener("click", addProjectToggle);
newTsk.addEventListener("click", addTaskToggle);
cancelTsk.addEventListener("click", addTaskToggle);
addTsk.addEventListener("click", addTask)