const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title required" });
  }

  const newTask = { id: id++, title, completed: false };
  tasks.push(newTask);

  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).send("Not found");

  task.completed = !task.completed;
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.send("Deleted");
});

app.listen(3000, () => console.log("Server running"));