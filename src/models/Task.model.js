const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a task title'],
        trim: true
    },
    // Updated to support both legacy string and new ObjectId reference
    project: {
        type: String, // Legacy: project name as string
        default: 'General'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        default: null // Optional for backward compatibility
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed', 'Done'],
        default: 'To Do'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    dueDate: {
        type: Date
    },
    assignee: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
