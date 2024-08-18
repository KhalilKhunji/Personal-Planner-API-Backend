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



module.exports = router;