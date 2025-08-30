// Déclaration des variables globales
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
let currentCategory = 'all';
const taskInput = document.getElementById('task-input');
const taskListContainer = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');
const themeToggle = document.getElementById('toggle-theme');
const secretGameBtn = document.getElementById('secret-game');
const gameContainer = document.getElementById('game');

// Fonction pour afficher les tâches
function displayTasks() {
  taskListContainer.innerHTML = '';
  
  let filteredTasks = taskList.filter(task => currentCategory === 'all' || task.category === currentCategory);

  filteredTasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.completed) {
      taskElement.classList.add('completed');
    }

    taskElement.innerHTML = `
      <span>${task.name}</span>
      <div>
        <button onclick="toggleTaskCompletion(${task.id})">✔️</button>
        <button onclick="deleteTask(${task.id})">❌</button>
      </div>
    `;

    taskListContainer.appendChild(taskElement);
  });
}

// Fonction pour ajouter une tâche
function addTask() {
  const taskName = taskInput.value.trim();
  if (taskName === '') return;

  const newTask = {
    id: Date.now(),
    name: taskName,
    completed: false,
    category: 'personal', // Catégorie par défaut
  };

  taskList.push(newTask);
  taskInput.value = ''; // Vide le champ d'entrée
  saveTasks();
  displayTasks();
}

// Fonction pour basculer la tâche entre terminée et non terminée
function toggleTaskCompletion(taskId) {
  const task = taskList.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    displayTasks();
  }
}

// Fonction pour supprimer une tâche
function deleteTask(taskId) {
  taskList = taskList.filter(task => task.id !== taskId);
  saveTasks();
  displayTasks();
}

// Fonction pour filtrer les tâches par catégorie
function filterTasks(category) {
  currentCategory = category;
  displayTasks();
}

// Fonction de sauvegarde des tâches dans le localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Fonction pour basculer entre le thème clair et sombre
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  saveTheme();
});

// Fonction pour sauvegarder le thème dans le localStorage
function saveTheme() {
  const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
}

// Charger le thème au démarrage
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
}

// Fonction pour afficher ou masquer le mini-jeu
function toggleGame() {
  if (navigator.onLine) return; // Si l'utilisateur est en ligne, ne pas afficher le jeu
  gameContainer.style.display = 'block';
}

// Vérifier si l'utilisateur est hors ligne et lancer le jeu si nécessaire
window.addEventListener('offline', toggleGame);

// Fonction pour démarrer le mini-jeu
function startGame() {
  alert('Jeu du dinosaure commencé !');
}

// Écouteurs d'événements
addTaskBtn.addEventListener('click', addTask);
secretGameBtn.addEventListener('click', () => {
  gameContainer.style.display = 'block';
});
document.getElementById('dino-game').addEventListener('click', startGame);

// Charger le thème et afficher les tâches au démarrage
window.onload = function() {
  loadTheme();
  displayTasks();
};
