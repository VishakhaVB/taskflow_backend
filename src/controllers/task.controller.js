const Task = require('../models/Task.model');
const sendResponse = require('../utils/response');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        return sendResponse(res, 200, true, 'Tasks retrieved', tasks);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        const task = await Task.create({
            userId: req.user.id,
            ...req.body
        });
        return sendResponse(res, 201, true, 'Task created', task);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 400, false, 'Invalid data');
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return sendResponse(res, 404, false, 'Task not found');
        }

        // Check user
        if (task.userId.toString() !== req.user.id) {
            return sendResponse(res, 401, false, 'Not authorized');
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        return sendResponse(res, 200, true, 'Task updated', task);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return sendResponse(res, 404, false, 'Task not found');
        }

        if (task.userId.toString() !== req.user.id) {
            return sendResponse(res, 401, false, 'Not authorized');
        }

        await task.deleteOne();
        return sendResponse(res, 200, true, 'Task deleted');
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
