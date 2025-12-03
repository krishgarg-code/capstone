require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
const eventRoutes = require('./routes/events');
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 5001;

// Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Make pool available to routes
app.locals.pool = pool;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => {
    res.send('Event Management API is running (PostgreSQL)');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(500).json({
        message: err.message || 'Internal Server Error',
        error: err.message || 'Unknown Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
