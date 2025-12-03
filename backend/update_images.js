const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const updates = [
    {
        title: "Shakespeare in the Park",
        images: [
            "https://images.unsplash.com/photo-1503095392237-fc5594291f0d?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1533669955142-6a73332af4db?q=80&w=2070&auto=format&fit=crop"
        ]
    },
    {
        title: "Indie Rock Showcase",
        images: [
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070&auto=format&fit=crop"
        ]
    },
    {
        title: "Improv Comedy Night",
        images: [
            "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
        ]
    },
    {
        title: "Classical Symphony",
        images: [
            "https://images.unsplash.com/photo-1507838153419-347d1b661929?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2000&auto=format&fit=crop"
        ]
    }
];

async function updateImages() {
    const client = await pool.connect();
    try {
        console.log('🔄 Updating event images...');

        for (const update of updates) {
            const result = await client.query(
                'UPDATE events SET images = $1 WHERE title = $2 RETURNING id',
                [update.images, update.title]
            );
            if (result.rowCount > 0) {
                console.log(`✅ Updated images for: ${update.title}`);
            } else {
                console.log(`⚠️ Event not found: ${update.title}`);
            }
        }

        console.log('✨ Update complete!');
    } catch (err) {
        console.error('❌ Error updating images:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

updateImages();
