const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', require('./routes/tasks.routes'));
app.use('/api/projects', require('./routes/projects.routes'));

// Root Endpoint
app.get('/', (req, res) => {
    res.send('TaskFlow API is running...');
});

module.exports = app;
