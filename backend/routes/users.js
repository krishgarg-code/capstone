const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage: storage });

// PUT update user profile
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, city, state } = req.body;
        const pool = req.app.locals.pool;

        let imagePath = null;
        if (req.file) {
            imagePath = req.file.path || req.file.filename;
        }

        let query;
        let values;

        if (imagePath) {
            query = `
                UPDATE users
                SET name = $1, profile_image = $2, age = $3, city = $4, state = $5
                WHERE id = $6
                RETURNING id, name, email, profile_image, age, city, state
            `;
            values = [name, imagePath, age, city, state, id];
        } else {
            query = `
                UPDATE users
                SET name = $1, age = $2, city = $3, state = $4
                WHERE id = $5
                RETURNING id, name, email, profile_image, age, city, state
            `;
            values = [name, age, city, state, id];
        }

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Process image URL if needed (similar to events)
        const user = result.rows[0];
        if (user.profile_image && !user.profile_image.startsWith('http')) {
            user.profile_image = `${req.protocol}://${req.get('host')}/uploads/${user.profile_image}`;
        }

        res.json(user);
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// GET user profile
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pool = req.app.locals.pool;

        const result = await pool.query('SELECT id, name, email, profile_image, age, city, state FROM users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        if (user.profile_image && !user.profile_image.startsWith('http')) {
            user.profile_image = `${req.protocol}://${req.get('host')}/uploads/${user.profile_image}`;
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// DELETE user account
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pool = req.app.locals.pool;

        // 1. Delete tickets purchased by the user
        await pool.query('DELETE FROM tickets WHERE user_id = $1', [id]);

        // 2. Delete tickets for events created by the user
        await pool.query('DELETE FROM tickets WHERE event_id IN (SELECT id FROM events WHERE created_by = $1)', [id]);

        // 3. Delete events created by the user
        await pool.query('DELETE FROM events WHERE created_by = $1', [id]);

        // 4. Delete the user
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully', user: result.rows[0] });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
