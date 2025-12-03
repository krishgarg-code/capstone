const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { storage } = require('../config/cloudinary');
const upload = multer({ storage: storage });

// GET all events with pagination
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const offset = (page - 1) * limit;
        const { search, date, category } = req.query;

        const pool = req.app.locals.pool;

        // Build query
        let query = 'SELECT * FROM events';
        let countQuery = 'SELECT COUNT(*) FROM events';
        let conditions = [];
        let values = [];
        let paramIndex = 1;

        if (search) {
            conditions.push(`(title ILIKE $${paramIndex} OR description ILIKE $${paramIndex} OR location ILIKE $${paramIndex})`);
            values.push(`%${search}%`);
            paramIndex++;
        }

        if (category) {
            conditions.push(`category = $${paramIndex}`);
            values.push(category);
            paramIndex++;
        }

        if (date) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            if (date === 'today') {
                conditions.push(`date::date = $${paramIndex}`);
                values.push(today.toISOString().split('T')[0]);
                paramIndex++;
            } else if (date === 'tomorrow') {
                conditions.push(`date::date = $${paramIndex}`);
                values.push(tomorrow.toISOString().split('T')[0]);
                paramIndex++;
            } else if (date === 'weekend') {
                // Simple weekend logic: Friday, Saturday, Sunday
                // This is a bit complex in SQL without knowing the exact dialect features enabled or timezone.
                // Let's assume standard ISO day of week (0=Sun, 6=Sat).
                // EXTRACT(DOW FROM date) IN (0, 5, 6)
                conditions.push(`EXTRACT(DOW FROM date) IN (0, 5, 6)`);
                // No value needed for this static condition
            }
        }

        if (conditions.length > 0) {
            const whereClause = ' WHERE ' + conditions.join(' AND ');
            query += whereClause;
            countQuery += whereClause;
        }

        // Get total count
        const countResult = await pool.query(countQuery, values);
        const totalEvents = parseInt(countResult.rows[0].count);
        const totalPages = Math.ceil(totalEvents / limit);

        // Add sorting
        const { sort } = req.query;
        let orderBy = 'date ASC'; // Default sort

        if (sort === 'price_asc') {
            orderBy = 'price ASC';
        } else if (sort === 'price_desc') {
            orderBy = 'price DESC';
        }

        query += ` ORDER BY ${orderBy} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        values.push(limit, offset);

        // Get paginated events
        const result = await pool.query(query, values);

        // Map events to include full image URLs (handle both local and Cloudinary)
        const eventsWithUrls = result.rows.map(event => {
            const images = event.images || [];
            const imageUrls = images.map(img => {
                if (img.startsWith('http')) {
                    return img; // Cloudinary or other external URL
                }
                return `${req.protocol}://${req.get('host')}/uploads/${img}`; // Local fallback
            });
            return { ...event, images: imageUrls };
        });

        res.json({
            events: eventsWithUrls,
            currentPage: page,
            totalPages: totalPages,
            totalEvents: totalEvents
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET event by slug
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const pool = req.app.locals.pool;
        const result = await pool.query('SELECT * FROM events WHERE slug = $1', [slug]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const event = result.rows[0];
        const images = event.images || [];
        const imageUrls = images.map(img => {
            if (img.startsWith('http')) {
                return img;
            }
            return `${req.protocol}://${req.get('host')}/uploads/${img}`;
        });

        res.json({ ...event, images: imageUrls });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Helper function to generate slug
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .replace(/^-+|-+$/g, '');
}

// POST create a new event
router.post('/', upload.array('images', 3), async (req, res) => {
    try {
        const { title, description, date, time, location, price, language, venueType, capacity, audience, userId, category } = req.body;
        // Use path or secure_url from Cloudinary response
        const imagePaths = req.files.map(file => file.path || file.filename);
        const pool = req.app.locals.pool;

        let slug = generateSlug(title);

        // Check for unique slug
        let slugExists = await pool.query('SELECT id FROM events WHERE slug = $1', [slug]);
        let counter = 1;
        while (slugExists.rows.length > 0) {
            slug = `${generateSlug(title)}-${counter}`;
            slugExists = await pool.query('SELECT id FROM events WHERE slug = $1', [slug]);
            counter++;
        }

        const query = `
      INSERT INTO events (title, description, date, time, location, price, images, slug, language, venue_type, capacity, audience, created_by, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;

        const values = [title, description, date, time, location, price, imagePaths, slug, language, venueType, capacity, audience, userId, category];

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(500).json({ error: 'Failed to create event', details: err.message });
    }
});

// PUT update an event
router.put('/:id', upload.array('images', 3), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, time, location, price, language, venueType, capacity, audience, existingImages, category } = req.body;
        const pool = req.app.locals.pool;

        // Handle images: combine existing (if any) with new uploads
        const newImagePaths = req.files.map(file => file.path || file.filename);
        let finalImages = newImagePaths;

        if (existingImages) {
            const existing = Array.isArray(existingImages) ? existingImages : [existingImages];
            finalImages = [...existing, ...newImagePaths];
        } else if (newImagePaths.length === 0) {
            // If no new images and no existing images sent, we might want to keep what's in DB?
            // But usually PUT replaces. Let's assume frontend sends existingImages if it wants to keep them.
            // However, to be safe, if both are empty, maybe we shouldn't overwrite images?
            // Let's check if we should fetch current images first.
            // For now, let's assume frontend sends everything it wants to keep.
        }

        // If no images provided at all (neither new nor existing), we might want to fetch current ones to avoid clearing them accidentally?
        // Or we can assume the frontend is responsible.
        // Let's assume frontend sends `existingImages` for images it wants to keep.

        // However, if `existingImages` is undefined, it might mean "don't change images" OR "remove all images".
        // To distinguish, we could check if `req.body.images` was sent at all? Multer handles `images` field.
        // Let's stick to: if `existingImages` is provided, use it. If `req.files` has files, append them.
        // If neither, we might end up with empty array if we just use `finalImages`.
        // Let's fetch the event first to be safe if we want to support partial updates, but PUT is usually full update.
        // But `upload.array` might make `req.body` tricky if fields are missing.
        // Let's construct the query dynamically or just update all fields.

        // We need to handle the case where we want to keep existing images if not specified?
        // Let's assume the frontend will send `existingImages` for the ones that are kept.

        // Extract filename from URL for existing images if they are local uploads
        // (This logic depends on how we store them. We store "filename" or "path".
        // The GET route constructs full URLs. The frontend sends back full URLs.
        // We need to strip the domain if it's a local file?)
        // The GET route: `${req.protocol}://${req.get('host')}/uploads/${img}`
        // If we get that back, we should strip the prefix.
        // Cloudinary URLs are stored as is.

        const processedExistingImages = (Array.isArray(existingImages) ? existingImages : [existingImages || []].flat()).map(img => {
            if (img.includes('/uploads/')) {
                return img.split('/uploads/')[1];
            }
            return img;
        });

        finalImages = [...processedExistingImages, ...newImagePaths];

        // If we have 0 images, maybe we shouldn't update the images column?
        // Or maybe user deleted all images.
        // Let's update it.

        const query = `
            UPDATE events
            SET title = $1, description = $2, date = $3, time = $4, location = $5, price = $6,
                images = $7, language = $8, venue_type = $9, capacity = $10, audience = $11, category = $12
            WHERE id = $13
            RETURNING *
        `;

        const values = [
            title, description, date, time, location, price,
            finalImages, language, venueType, capacity, audience, category,
            id
        ];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ error: 'Failed to update event', details: err.message });
    }
});

// GET events by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const pool = req.app.locals.pool;
        const result = await pool.query('SELECT * FROM events WHERE created_by = $1 ORDER BY date ASC', [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching user events:', err);
        res.status(500).json({ error: 'Failed to fetch user events' });
    }
});

// DELETE delete an event
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pool = req.app.locals.pool;

        // First check if event exists
        const checkQuery = 'SELECT * FROM events WHERE id = $1';
        const checkResult = await pool.query(checkQuery, [id]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Delete associated tickets first (foreign key constraint usually requires this, 
        // unless ON DELETE CASCADE is set. Let's assume we need to delete tickets manually or it cascades.
        // If schema doesn't have CASCADE, we must delete tickets.
        // Let's try deleting event directly, if it fails due to FK, we delete tickets first.
        // Actually, better to be safe and delete tickets first if we want to allow deletion.
        // But maybe we want to keep history? The user asked to delete the event.
        // Let's try deleting the event. If it fails, we'll know.
        // Ideally, we should delete tickets too.

        await pool.query('DELETE FROM tickets WHERE event_id = $1', [id]);

        const deleteQuery = 'DELETE FROM events WHERE id = $1 RETURNING *';
        const result = await pool.query(deleteQuery, [id]);

        res.json({ message: 'Event deleted successfully', event: result.rows[0] });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

module.exports = router;
