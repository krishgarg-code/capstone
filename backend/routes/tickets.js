const express = require('express');
const router = express.Router();

// POST book a ticket
router.post('/', async (req, res) => {
    try {
        const { userId, eventId } = req.body;
        const pool = req.app.locals.pool;

        // Check if event exists and has capacity
        const eventResult = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);
        if (eventResult.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const event = eventResult.rows[0];
        if (event.attendees >= event.capacity) {
            return res.status(400).json({ error: 'Event is sold out' });
        }

        // Create ticket
        const ticketQuery = `
            INSERT INTO tickets (user_id, event_id)
            VALUES ($1, $2)
            RETURNING *
        `;
        const ticketResult = await pool.query(ticketQuery, [userId, eventId]);

        // Update attendees count
        await pool.query('UPDATE events SET attendees = attendees + 1 WHERE id = $1', [eventId]);

        res.status(201).json(ticketResult.rows[0]);
    } catch (err) {
        console.error('Error booking ticket:', err);
        res.status(500).json({ error: 'Failed to book ticket', details: err.message });
    }
});

// GET tickets by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const pool = req.app.locals.pool;

        const query = `
            SELECT t.id, t.booking_date, t.status, 
                   e.title as "eventName", e.date, e.time, e.location as venue, e.slug
            FROM tickets t
            JOIN events e ON t.event_id = e.id
            WHERE t.user_id = $1
            ORDER BY t.booking_date DESC
        `;

        const result = await pool.query(query, [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching user tickets:', err);
        res.status(500).json({ error: 'Failed to fetch user tickets' });
    }
});

// GET ticket stats by user ID (lifetime tickets sold)
router.get('/stats/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const pool = req.app.locals.pool;

        const query = `
            SELECT SUM(attendees) as "totalAttendees"
            FROM events
            WHERE created_by = $1
        `;

        const result = await pool.query(query, [userId]);
        // Handle case where sum is null (no events)
        const total = result.rows[0].totalAttendees || 0;
        res.json({ totalTickets: parseInt(total) });
    } catch (err) {
        console.error('Error fetching ticket stats:', err);
        res.status(500).json({ error: 'Failed to fetch ticket stats' });
    }
});

module.exports = router;
