const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a project title'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    // Removed manual status field - will be computed from task progress
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    theme: {
        type: String,
        enum: ['purple', 'blue', 'green', 'orange'],
        default: 'purple'
    },
    dueDate: {
        type: Date,
        required: [true, 'Please add a due date']
    }
}, {
    timestamps: true
});

// Virtual field for computed status (if needed server-side)
ProjectSchema.virtual('status').get(function() {
    // This could be computed by joining with tasks
    // For now, it's computed on frontend
    return 'Not Started'; // Placeholder
});

module.exports = mongoose.model('Project', ProjectSchema);
