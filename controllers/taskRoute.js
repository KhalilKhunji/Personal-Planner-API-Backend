const express = require("express");
const router = express.Router();
const Task = require("../models/task");


router.post("/", async (req, res) => {
    try {
        req.body.user = req.user._id
        const task = await Task.create(req.body);
        task._doc.user = req.user;
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id })
        .populate("user")
        .sort({ createdAt: "desc" });
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/:taskId", async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId)
        .populate("user");
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put("/:taskId", async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if(task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Not Authorized" });
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
        updatedTask._doc.user = req.user;
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete("/:taskId", async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if(!task.user.equals(req.user._id)) {
            return res.status(403).json({ error: "Not Authorized" });
        }
        const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;