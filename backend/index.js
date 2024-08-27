const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true });

const TaskSchema = new mongoose.Schema({ name: String });
const Task = mongoose.model('Task', TaskSchema);

app.use(cors());
app.use(express.json());

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

app.listen(3000, () => console.log('Server running on port 3000'));
