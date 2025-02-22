const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Simuloitu tietokanta
let tasks = [
  { id: 1, task: 'Tehtävä 1' },
  { id: 2, task: 'Tehtävä 2' },
];

// Hae kaikki tehtävät
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Lisää uusi tehtävä
app.post('/tasks', (req, res) => {
  const newTask = req.body.task;
  const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  const task = { id: newId, task: newTask };
  tasks.push(task);
  res.status(201).json(task);
});

// Poista tehtävä
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId); // Poistetaan tehtävä

  res.status(200).json({ message: `Task with id ${taskId} deleted` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
