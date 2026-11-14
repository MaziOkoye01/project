function sendMail() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{1,11}$/;

  if (name === "" || email === "" || message === "" || subject === "" || phone === "") {
    alert("Please fill in all required fields.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid phone number (digits only, up to 11 numbers).");
    return;
  }

  var params = { name, email, message, subject, phone };

  const serviceID = "service_o5co6bs";
  const templateID = "template_1f3uz4q";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("subject").value = "";

      alert("Your message was sent successfully!");
      console.log(res);
    })
    .catch((err) => {
      alert("Failed to send message. Please try again.");
      console.log(err);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 11);
    });
  }
});



/*--------------------------------------*/
const tasks = JSON.parse(localStorage.getItem("academicTasks")) || [
    {
        id: 1,
        name: "Study MTH101 Functions and Domains",
        priority: "High",
        completed: false
    },
    {
        id: 2,
        name: "Review Software Engineering notes",
        priority: "Medium",
        completed: false
    }
];

const events = JSON.parse(localStorage.getItem("academicEvents")) || [
    {
        id: 1,
        name: "MTH101 Study Session",
        date: "2026-10-10"
    },
    {
        id: 2,
        name: "Programming Assignment",
        date: "2026-10-15"
    }
];

let currentFilter = "all";


const taskForm27 = document.getElementById("taskForm27");
const taskInput27 = document.getElementById("taskInput27");
const taskPriority27 = document.getElementById("taskPriority27");
const taskList27 = document.getElementById("taskList27");

const eventForm27 = document.getElementById("eventForm27");
const eventName27 = document.getElementById("eventName27");
const eventDate27 = document.getElementById("eventDate27");
const eventList27 = document.getElementById("eventList27");

const totalTasks27 = document.getElementById("totalTasks27");
const completedTasks27 = document.getElementById("completedTasks27");
const totalEvents27 = document.getElementById("totalEvents27");

const progressText27 = document.getElementById("progressText27");
const progressFill27 = document.getElementById("progressFill27");

const filters27 = document.querySelectorAll(".filter27");


function saveTasks() {
    localStorage.setItem("academicTasks", JSON.stringify(tasks));
}


function saveEvents() {
    localStorage.setItem("academicEvents", JSON.stringify(events));
}


function displayTasks() {
    taskList27.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        taskList27.innerHTML = `
            <div class="empty27">
                No tasks found.
            </div>
        `;
        return;
    }

    filteredTasks.forEach(task => {

        const taskItem27 = document.createElement("div");
        taskItem27.className = "task-item27";

        taskItem27.innerHTML = `
            <div class="task-content27">

                <input
                    type="checkbox"
                    class="task-check27"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <div>
                    <div class="task-name27 ${task.completed ? "completed27" : ""}">
                        ${task.name}
                    </div>

                    <span class="task-priority27 ${task.priority.toLowerCase()}27">
                        ${task.priority} Priority
                    </span>
                </div>

            </div>

            <button
                class="delete-btn27"
                onclick="deleteTask(${task.id})"
                type="button"
                title="Delete task"
            >
                <i data-lucide="trash-2"></i>
            </button>
        `;

        taskList27.appendChild(taskItem27);
    });

    lucide.createIcons();
}


function addTask(name, priority) {

    const newTask = {
        id: Date.now(),
        name: name,
        priority: priority,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();
    updateStatistics();
}


function toggleTask(id) {

    const task = tasks.find(task => task.id === id);

    if (task) {
        task.completed = !task.completed;
    }

    saveTasks();
    displayTasks();
    updateStatistics();
}


function deleteTask(id) {

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    }

    saveTasks();
    displayTasks();
    updateStatistics();
}


function displayEvents() {

    eventList27.innerHTML = "";

    if (events.length === 0) {

        eventList27.innerHTML = `
            <div class="empty27">
                No academic events added yet.
            </div>
        `;

        return;
    }

    const sortedEvents = [...events].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    sortedEvents.forEach(event => {

        const eventItem27 = document.createElement("div");
        eventItem27.className = "event-item27";

        eventItem27.innerHTML = `
            <div class="event-date27">
                <i data-lucide="calendar-days"></i>
                <span>${formatDate(event.date)}</span>
            </div>

            <div class="event-details27">
                <strong>${event.name}</strong>
            </div>

            <button
                class="delete-btn27"
                onclick="deleteEvent(${event.id})"
                type="button"
                title="Delete event"
            >
                <i data-lucide="trash-2"></i>
            </button>
        `;

        eventList27.appendChild(eventItem27);
    });

    lucide.createIcons();
}


function formatDate(dateString) {

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}


function addEvent(name, date) {

    const newEvent = {
        id: Date.now(),
        name: name,
        date: date
    };

    events.push(newEvent);

    saveEvents();
    displayEvents();
    updateStatistics();
}


function deleteEvent(id) {

    const eventIndex = events.findIndex(event => event.id === id);

    if (eventIndex !== -1) {
        events.splice(eventIndex, 1);
    }

    saveEvents();
    displayEvents();
    updateStatistics();
}


function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const eventsTotal = events.length;

    totalTasks27.textContent = total;
    completedTasks27.textContent = completed;
    totalEvents27.textContent = eventsTotal;

    let progress = 0;

    if (total > 0) {
        progress = Math.round((completed / total) * 100);
    }

    progressText27.textContent = `${progress}%`;
    progressFill27.style.width = `${progress}%`;
}


taskForm27.addEventListener("submit", function (event) {

    event.preventDefault();

    const taskName = taskInput27.value.trim();
    const priority = taskPriority27.value;

    if (taskName === "") {
        return;
    }

    addTask(taskName, priority);

    taskInput27.value = "";
    taskPriority27.value = "Medium";
});


taskList27.addEventListener("click", function (event) {

    const deleteButton = event.target.closest(".delete-btn27");

    if (deleteButton) {
        return;
    }
});


filters27.forEach(filter => {

    filter.addEventListener("click", function () {

        filters27.forEach(button => {
            button.classList.remove("active");
        });

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        displayTasks();
    });
});


eventForm27.addEventListener("submit", function (event) {

    event.preventDefault();

    const eventName = eventName27.value.trim();
    const eventDate = eventDate27.value;

    if (eventName === "" || eventDate === "") {
        return;
    }

    addEvent(eventName, eventDate);

    eventName27.value = "";
    eventDate27.value = "";
});


eventList27.addEventListener("click", function (event) {

    const deleteButton = event.target.closest(".delete-btn27");

    if (deleteButton) {
        return;
    }
});


function initializePlanner() {

    displayTasks();
    displayEvents();
    updateStatistics();

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}


initializePlanner();