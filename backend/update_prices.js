const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const updates = [
    { title: "Summer Jazz Festival", price: 2500 },
    { title: "Future Tech Summit", price: 8000 },
    { title: "Laugh Out Loud Comedy Night", price: 1500 },
    { title: "City Marathon 2024", price: 3500 },
    { title: "Local Entrepreneurs Meetup", price: 0 },
    { title: "Neon Lights Music Festival", price: 5000 },
    { title: "Shakespeare in the Park", price: 1200 },
    { title: "Indie Rock Showcase", price: 1000 },
    { title: "AI & Ethics Workshop", price: 4500 },
    { title: "Improv Comedy Night", price: 1800 },
    { title: "Championship Basketball Game", price: 6000 },
    { title: "Photography Walk", price: 0 },
    { title: "Food & Wine Festival", price: 7500 },
    { title: "Modern Art Exhibition", price: 1500 },
    { title: "Classical Symphony", price: 3000 },
    { title: "Blockchain Conference", price: 10000 },
    { title: "Stand-up Special Taping", price: 2000 },
    { title: "Tennis Open Finals", price: 9000 },
    { title: "Book Club Monthly", price: 0 },
    { title: "Cherry Blossom Festival", price: 0 }
];

async function updatePrices() {
    const client = await pool.connect();
    try {
        console.log('💰 Updating event prices...');

        for (const update of updates) {
            const result = await client.query(
                'UPDATE events SET price = $1 WHERE title = $2 RETURNING id',
                [update.price, update.title]
            );
            if (result.rowCount > 0) {
                console.log(`✅ Updated price for: ${update.title} to ₹${update.price}`);
            } else {
                console.log(`⚠️ Event not found: ${update.title}`);
            }
        }

        console.log('✨ Price update complete!');
    } catch (err) {
        console.error('❌ Error updating prices:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

updatePrices();
