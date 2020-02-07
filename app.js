document.getElementById('formTask').addEventListener('submit', saveTask); // Listen to the submit event and set saveTask function as a callback

function saveTask(e) {

    e.preventDefault(); // Avoid refreshing the website

    let title = document.getElementById('title').value; // Get the input value
    let description = document.getElementById('description').value;

    const task = {
        title, // title: title
        description
    }

    if(localStorage.getItem('tasks') === null){
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Use JSON.stringify to convert an object to string
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    document.getElementById('formTask').reset(); // Reset the form value

    getTasks();
}

function getTasks() {

    if(localStorage.getItem('tasks') !== null) {
        var tasks = JSON.parse(localStorage.getItem('tasks')); // Use JSON.parse to convert a string to object
    } else {
        return 
    }    

    let tasksView = document.getElementById('task');

    tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        tasksView.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <p>${tasks[i].title} - ${tasks[i].description}</p>
                    <a class="btn btn-danger" onclick="deleteTasks('${tasks[i].title}')">Delete</a>
                </div>
            </div>
        `
    }

}

function deleteTasks(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for (let i = 0; i < tasks.length; i++) {

        if(tasks[i].title == title) {
            tasks.splice(i, 1); // Remove it from the array
        };        
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    getTasks();
}

getTasks();