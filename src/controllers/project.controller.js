const Project = require('../models/Project.model');
const sendResponse = require('../utils/response');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.id });
        return sendResponse(res, 200, true, 'Projects retrieved', projects);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
    try {
        const project = await Project.create({
            userId: req.user.id,
            ...req.body
        });
        return sendResponse(res, 201, true, 'Project created', project);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 400, false, 'Invalid data');
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return sendResponse(res, 404, false, 'Project not found');
        }

        if (project.userId.toString() !== req.user.id) {
            return sendResponse(res, 401, false, 'Not authorized');
        }

        project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        return sendResponse(res, 200, true, 'Project updated', project);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return sendResponse(res, 404, false, 'Project not found');
        }

        if (project.userId.toString() !== req.user.id) {
            return sendResponse(res, 401, false, 'Not authorized');
        }

        await project.deleteOne();
        return sendResponse(res, 200, true, 'Project deleted');
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};
