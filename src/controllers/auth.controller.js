const User = require('../models/User.model');
const sendResponse = require('../utils/response');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return sendResponse(res, 400, false, 'Please add all fields');
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return sendResponse(res, 400, false, 'User already exists');
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            return sendResponse(res, 201, true, 'User registered successfully', {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            });
        } else {
            return sendResponse(res, 400, false, 'Invalid user data');
        }
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendResponse(res, 400, false, 'Please add email and password');
        }

        // Check for user email
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            return sendResponse(res, 200, true, 'Login successful', {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            });
        } else {
            return sendResponse(res, 401, false, 'Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        };
        return sendResponse(res, 200, true, 'User data retrieved', user);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};
