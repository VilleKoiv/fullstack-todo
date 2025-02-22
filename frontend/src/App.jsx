import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Hae tehtävät backendistä
  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Lisää uusi tehtävä
  const addTask = () => {
    if (newTask.trim() === '') return; // Vältetään tyhjiä tehtäviä

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: newTask }),
    })
      .then(response => response.json())
      .then(data => {
        setTasks(prevTasks => [...prevTasks, data]);
        setNewTask('');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  // Poista tehtävä
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        // Päivitetään listaa poistamalla tehtävä
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="App">
      <h1>Todo- Lista</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Lisää uusi tehtävä"
      />
      <button onClick={addTask}>Lisää</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.task}
            <button onClick={() => deleteTask(task.id)}>Poista</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
