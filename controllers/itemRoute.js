const express = require("express");
const router = express.Router();
const Task = require("../models/task");


router.post('/:taskId/items', async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId);
      task.items.push(req.body);
      await task.save();
  
      // Find the newly created List:
      const newList = task.items[task.items.length - 1];
  
      newList._doc.author = req.user;
  
      // Respond with the newList:
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).json(error);
    }
  });



  router.put('/:taskId/items/:itemId', async (req, res) => {
    try {

        // Looked for list post
        const task = await Task.findById(req.params.taskId);

        
        // Looked for specific comment on hoot post
        const list = task.items.id(req.params.itemId);

        if (!list) {
            return res.status(404).send("list not found!")
        }

        // Update list
        list.set(req.body)
        await task.save();
        res.status(200).json({ message: 'Ok!'})
    } catch(error) {
        res.status(500).json(error);
    }
  })

  router.delete("/:taskId/items/:itemId", async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId)
        

        task.items.remove({ _id: req.params.itemId })
        await task.save()
        res.status(200).json({ message : "list deleted"})
    } catch (error) {
        res.status(500).json(error)
    }
  })


module.exports = router;