const express = require("express");
const router = express.Router();
const Task = require("../models/task");


router.post('/:taskId/items', async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId);
      if(!task) return res.status(404).json({error: 'Task not found'});
      task.items.push(req.body);
      await task.save();
      const newItem = task.items[task.items.length - 1];
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json(error);
    };
});



router.put('/:taskId/items/:itemId', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        const list = task.items.id(req.params.listId);
        if (!list) {
          return res.status(404).send("list not found!")
        };
        list.set(req.body);
        await task.save();
        res.status(200).json({ message: 'Ok!'})
    } catch(error) {
      res.status(500).json(error);
    }
});

router.delete("/:taskId/items/:itemId", async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId)
        task.items.remove({ _id: req.params.listId })
        await task.save()
        res.status(200).json({ message : "list deleted"})
    } catch (error) {
        res.status(500).json(error)
    };
});


module.exports = router;