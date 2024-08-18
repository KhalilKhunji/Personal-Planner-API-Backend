const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post('/:taskId/notes', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if(!task) return res.status(404).json({error: 'Task not found'});
        task.notes.push(req.body);
        await task.save();
        const newNote = task.notes[task.notes.length - 1];
        res.status(201).json(newNote);
    } catch (error) {
        res.status(422).json(error);
    };
});

module.exports = router;