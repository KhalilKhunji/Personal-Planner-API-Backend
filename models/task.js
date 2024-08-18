const mongoose = require('mongoose');

const listSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        isComplete: {
            type: Boolean,
            default: false
        },
        dueDate: {
            type: Date,
            required: true
        },
        priority: {
            type: String,
            required: true,
            enum: ["Low", "Medium", "High"]
        }
    }, { timestamps: true }
);

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }, { timestamps: true }
);

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: [listSchema],
        notes: [noteSchema]
    },
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;