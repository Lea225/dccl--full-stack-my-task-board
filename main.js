document.addEventListener('DOMContentLoaded', () => {
    const taskDetails = document.getElementById('task-details');
    const overlay = document.getElementById('overlay');
    const closeDetails = document.querySelector('.icon-close');
    const taskForm = document.getElementById('task-form');
    const taskContainer = document.getElementById('task-container');
    const addTask = document.querySelector('.add-div');
    const saveButton = document.querySelector('.save-btn');
    const deleteButton = document.querySelector('.delete-btn');
    let currentTask = null; // Pour suivre la tâche actuellement sélectionnée
    let selectedIconSrc = ''; // Pour suivre l'icône sélectionnée
    let selectedStatusIconSrc = ''; // Pour suivre l'icône de statut sélectionnée
  
    const showTaskDetails = () => {
      if (overlay) overlay.style.display = 'block';
      taskDetails.style.display = 'block';
    };
  
    const hideTaskDetails = () => {
      if (overlay) overlay.style.display = 'none';
      taskDetails.style.display = 'none';
    };
  
    const selectTask = (task) => {
      document.querySelectorAll('.task').forEach(t => t.classList.remove('selected'));
      task.classList.add('selected');
      currentTask = task; // Met à jour la tâche actuellement sélectionnée
      document.getElementById('task-name').value = task.querySelector('h2').innerText;
      document.getElementById('task-description').value = task.querySelector('.task-description') ? task.querySelector('.task-description').innerText : '';
      selectedIconSrc = task.querySelector('.icon').src; // Met à jour l'icône actuellement sélectionnée
      showTaskDetails();
    };
  
    const selectStatus = (status, icon) => {
      document.querySelectorAll('.status-progress, .status-completed, .status-wontdo').forEach(s => s.classList.remove('selected'));
      status.classList.add('selected');
      selectedStatusIconSrc = icon.src; // Met à jour l'icône de statut sélectionnée
    };
  
    const selectIcon = (icon) => {
      document.querySelectorAll('.icons img').forEach(img => img.classList.remove('selected'));
      icon.classList.add('selected');
      selectedIconSrc = icon.src; // Met à jour l'icône sélectionnée
    };
  
    const setTaskBackground = (task, taskName) => {
        // Supprimer les classes existantes
        task.classList.remove('progress', 'completed', 'wontdo', 'todo');
    
        // Convertir le nom de la tâche en minuscules pour une comparaison insensible à la casse
        const taskNameLower = taskName.toLowerCase();
    
        // Déterminer la classe de fond et la couleur de l'icône de statut
        if (taskNameLower.includes('completed')) {
            task.classList.add('completed');
            task.querySelector('.last-icon').style.backgroundColor = 'var(--accent-dark)';
        } else if (taskNameLower.includes('progress')) {
            task.classList.add('progress');
            task.querySelector('.last-icon').style.backgroundColor = 'var(--secondary-dark)';
        } else if (taskNameLower.includes('wontdo') || taskNameLower.includes('won’t do')) {
            task.classList.add('wontdo');
            task.querySelector('.last-icon').style.backgroundColor = 'var(--neutral-dark)';
        } else {
            task.classList.add('todo');
            task.querySelector('.last-icon').style.backgroundColor = ''; // Réinitialiser la couleur si nécessaire
        }
    };    
    
    document.querySelectorAll('.task').forEach(task => {
      task.addEventListener('click', () => selectTask(task));
    });
  
    document.querySelectorAll('.status-progress').forEach(status => {
      const icon = status.querySelector('.icon');
      status.addEventListener('click', () => selectStatus(status, icon));
    });
  
    document.querySelectorAll('.status-completed').forEach(status => {
      const icon = status.querySelector('.icon');
      status.addEventListener('click', () => selectStatus(status, icon));
    });
  
    document.querySelectorAll('.status-wontdo').forEach(status => {
      const icon = status.querySelector('.icon');
      status.addEventListener('click', () => selectStatus(status, icon));
    });
  
    document.querySelectorAll('.icons img').forEach(icon => {
      icon.addEventListener('click', () => selectIcon(icon));
    });
  
    if (closeDetails) closeDetails.addEventListener('click', hideTaskDetails);
    if (overlay) overlay.addEventListener('click', hideTaskDetails);
  
    if (addTask) addTask.addEventListener('click', () => {
      document.getElementById('task-name').value = '';
      document.getElementById('task-description').value = '';
      currentTask = null; // Réinitialise la tâche actuellement sélectionnée
      showTaskDetails();
    });
  
    if (saveButton) saveButton.addEventListener('click', () => {
        const taskName = document.getElementById('task-name').value;
        const taskDescription = document.getElementById('task-description').value;
    
        if (currentTask) {
            // Mettre à jour la tâche existante
            currentTask.querySelector('h2').innerText = taskName;
            
            // Met à jour l'icône de la tâche uniquement si une nouvelle icône est sélectionnée
            const currentIcon = currentTask.querySelector('.icon');
            if (selectedIconSrc) {
                currentIcon.src = selectedIconSrc; // Met à jour l'icône de la tâche
            }
            
            setTaskBackground(currentTask, taskName);
    
            // Met à jour la description de la tâche
            if (currentTask.querySelector('.task-description')) {
                currentTask.querySelector('.task-description').innerText = taskDescription;
            } else {
                const descElement = document.createElement('p');
                descElement.classList.add('task-description');
                descElement.innerText = taskDescription;
                currentTask.querySelector('div').appendChild(descElement);
            }
            
            // Met à jour l'icône de statut seulement si une nouvelle icône de statut est sélectionnée
            const currentStatusIcon = currentTask.querySelector('.last-icon');
            if (selectedStatusIconSrc) {
                currentStatusIcon.src = selectedStatusIconSrc;
            }
            
        } else {
            // Ajouter une nouvelle tâche
            const newTask = document.createElement('div');
            newTask.classList.add('task');
            newTask.innerHTML = `
                <img class="icon" src="${selectedIconSrc || 'default-icon-src.png'}" alt="icon">
                <div>
                    <h2>${taskName}</h2>  
                    <p class="task-description">${taskDescription}</p>
                </div>
                <img class="last-icon" src="${selectedStatusIconSrc || 'default-status-icon-src.png'}" alt="status-icon">
            `;
            setTaskBackground(newTask, taskName);
            newTask.addEventListener('click', () => selectTask(newTask));
            taskContainer.insertBefore(newTask, addTask);
        }
    
        hideTaskDetails();
    });
    
  
    if (deleteButton) deleteButton.addEventListener('click', () => {
      if (currentTask) {
        currentTask.remove();
        hideTaskDetails();
      }
    });
  });
  