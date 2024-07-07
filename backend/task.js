const express = require('express');

const authMiddleware = require('./authMiddleware');
const Task = require('./models/Task');

const router = express.Router();

// Create task
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = new Task({ title, description, status, createdBy: req.user._id });
    await newTask.save();
    res.status(201).json({ task: newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task by ID
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description, status }, { new: true });
    res.status(200).json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete task by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
