const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const categories = [
    'music', 'tech', 'comedy', 'sports', 'meetup', 'festival', 'theatre-arts'
];

const eventsData = [
    {
        title: "Summer Jazz Festival",
        description: "A weekend of smooth jazz and good vibes under the stars.",
        date: "2024-07-15",
        time: "18:00",
        location: "Central Park, New York",
        price: 2500,
        category: "music",
        images: [
            "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop"
        ],
        audience: "All Ages",
        venue_type: "Outdoor",
        capacity: 5000,
        language: "English"
    },
    {
        title: "Future Tech Summit",
        description: "Explore the latest in AI, robotics, and quantum computing.",
        date: "2024-09-10",
        time: "09:00",
        location: "Moscone Center, San Francisco",
        price: 8000,
        category: "tech",
        images: [
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2070&auto=format&fit=crop"
        ],
        audience: "Professionals",
        venue_type: "Indoor",
        capacity: 2000,
        language: "English"
    },
    {
        title: "Laugh Out Loud Comedy Night",
        description: "Top stand-up comedians from around the country.",
        date: "2024-08-05",
        time: "20:00",
        location: "The Comedy Store, Los Angeles",
        price: 1500,
        category: "comedy",
        images: [
            "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=2070&auto=format&fit=crop"
        ],
        audience: "18+",
        venue_type: "Indoor",
        capacity: 300,
        language: "English"
    },
    {
        title: "City Marathon 2024",
        description: "Join thousands of runners in the annual city marathon.",
        date: "2024-10-20",
        time: "06:00",
        location: "Downtown, Chicago",
        price: 3500,
        category: "sports",
        images: [
            "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1552674605-46d536d2f6d1?q=80&w=2070&auto=format&fit=crop"
        ],
        audience: "All Ages",
        venue_type: "Outdoor",
        capacity: 10000,
        language: "English"
    },
    {
        title: "Local Entrepreneurs Meetup",
        description: "Network with local business owners and startups.",
        date: "2024-06-25",
        time: "17:00",
        location: "WeWork, Austin",
        price: 0,
        category: "meetup",
        images: [
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop"
        ],
        audience: "Professionals",
        venue_type: "Indoor",
        capacity: 100,
        language: "English"
    },
    {
        title: "Neon Lights Music Festival",
        description: "Electronic dance music festival with stunning visuals.",
        date: "2024-11-15",
        time: "16:00",
        location: "Las Vegas Motor Speedway",
        price: 5000,
        category: "festival",
        images: [
            "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2070&auto=format&fit=crop"
        ],
        audience: "18+",
        venue_type: "Outdoor",
        capacity: 20000,
        language: "English"
    },
    {
        title: "Shakespeare in the Park",
        description: "A modern adaptation of Romeo and Juliet.",
        date: "2024-07-20",
        time: "19:00",
        location: "Golden Gate Park, San Francisco",
        price: 1200,
        category: "theatre-arts",
        images: [
            "https://images.unsplash.com/photo-1503095392237-fc5594291f0d?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1533669955142-6a73332af4db?q=80&w=2070&auto=format&fit=crop"
        ],
        audience: "All Ages",
        venue_type: "Outdoor",
        capacity: 800,
        language: "English"
    },
    {
        title: "Indie Rock Showcase",
        description: "Discover the best up-and-coming indie rock bands.",
        date: "2024-08-12",
        time: "20:00",
        location: "The Basement, Nashville",
        price: 1000,
        category: "music",
        images: [
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070&auto=format&fit=crop"
        ],
        audience: "21+",
        venue_type: "Indoor",
        capacity: 200,
        language: "English"
    },
    {
        title: "AI & Ethics Workshop",
        description: "Deep dive into the ethical implications of artificial intelligence.",
        date: "2024-09-05",
        time: "10:00",
        location: "MIT Media Lab, Cambridge",
        price: 4500,
        category: "tech",
        images: [
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
        ],
        audience: "Students & Professionals",
        venue_type: "Indoor",
        capacity: 150,
        language: "English"
    },
    {
        title: "Improv Comedy Night",
        description: "Unscripted comedy based on audience suggestions.",
        date: "2024-07-28",
        time: "21:00",
        location: "Second City, Chicago",
        price: 1800,
        category: "comedy",
        images: [
            "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
        ],
        audience: "16+",
        venue_type: "Indoor",
        capacity: 250,
        language: "English"
    },
    {
        title: "Championship Basketball Game",
        description: "The finals of the regional basketball league.",
        date: "2024-06-30",
        time: "19:30",
        location: "Madison Square Garden, New York",
        price: 6000,
        category: "sports",
        images: [
            "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop"
        ],
        audience: "All Ages",
        venue_type: "Indoor",
        capacity: 18000,
        language: "English"
    },
    {
        title: "Photography Walk",
        description: "A guided photography walk through the historic district.",
        date: "2024-10-05",
        time: "09:00",
        location: "French Quarter, New Orleans",
        price: 0,
        category: "meetup",
        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=2000&auto=format&fit=crop"
        ],
        audience: "Hobbyists",
        venue_type: "Outdoor",
        capacity: 30,
        language: "English"
    },
    {
        title: "Food & Wine Festival",
        description: "Taste dishes from top chefs and wines from around the world.",
        date: "2024-09-20",
        time: "12:00",
        location: "Napa Valley, California",
        price: 7500,
        category: "festival",
        images: [
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2000&auto=format&fit=crop"
        ],
        audience: "21+",
        venue_type: "Outdoor",
        capacity: 3000,
        language: "English"
    },
    {
        title: "Modern Art Exhibition",
        description: "Showcasing contemporary artists from Europe.",
        date: "2024-11-01",
        time: "10:00",
        location: "MOMA, New York",
        price: 1500,
        category: "theatre-arts",
        images: [
            "https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop"
        ],
        audience: "All Ages",
        venue_type: "Indoor",
        capacity: 1000,
        language: "English"
    },
    {
        title: "Classical Symphony",
        description: "Beethoven's 9th Symphony performed by the City Orchestra.",
        date: "2024-12-10",
        time: "19:30",
        location: "Sydney Opera House",
        price: 3000,
        category: "music",
        images: [
            "https://images.unsplash.com/photo-1507838153419-347d1b661929?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2000&auto=format&fit=crop"
        ],
        audience: "All Ages",
        venue_type: "Indoor",
        capacity: 2500,
        language: "English"
    },
    {
        title: "Blockchain Conference",
        description: "Discussing the future of decentralized finance.",
        date: "2024-10-15",
        time: "09:00",
        location: "Dubai World Trade Centre",
        price: 10000,
        category: "tech",
        images: [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop"
        ],
        audience: "Professionals",
        venue_type: "Indoor",
        capacity: 3000,
        language: "English"
    },
    {
        title: "Stand-up Special Taping",
        description: "Live taping of a new comedy special.",
        date: "2024-08-20",
        time: "19:00",
        location: "Apollo Theater, New York",
        price: 2000,
        category: "comedy",
        images: [
            "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2000&auto=format&fit=crop"
        ],
        audience: "18+",
        venue_type: "Indoor",
        capacity: 1500,
        language: "English"
    },
    {
        title: "Tennis Open Finals",
        description: "Watch the world's best tennis players compete.",
        date: "2024-09-08",
        time: "14:00",
        location: "Arthur Ashe Stadium, New York",
        price: 9000,
        category: "sports",
        images: [
            "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop"
        ],
        audience: "All Ages",
        venue_type: "Outdoor",
        capacity: 23000,
        language: "English"
    },
    {
        title: "Book Club Monthly",
        description: "Discussing 'The Great Gatsby' this month.",
        date: "2024-07-10",
        time: "18:00",
        location: "City Library, Seattle",
        price: 0,
        category: "meetup",
        images: [
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop"
        ],
        audience: "Readers",
        venue_type: "Indoor",
        capacity: 20,
        language: "English"
    },
    {
        title: "Cherry Blossom Festival",
        description: "Celebrating the blooming of cherry blossoms.",
        date: "2025-04-10",
        time: "10:00",
        location: "Ueno Park, Tokyo",
        price: 0,
        category: "festival",
        images: [
            "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop"
        ],
        audience: "All Ages",
        venue_type: "Outdoor",
        capacity: 50000,
        language: "English"
    }
];

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .replace(/^-+|-+$/g, '');
}

async function seedEvents() {
    const client = await pool.connect();
    try {
        console.log('🌱 Seeding events...');

        // Get a user ID to assign as created_by
        const userResult = await client.query('SELECT id FROM users LIMIT 1');
        let userId;
        if (userResult.rows.length > 0) {
            userId = userResult.rows[0].id;
        } else {
            // Create a dummy user if none exists
            const newUser = await client.query(`
        INSERT INTO users (name, email, password) 
        VALUES ('Event Organizer', 'organizer@example.com', 'hashedpassword') 
        RETURNING id
      `);
            userId = newUser.rows[0].id;
        }

        for (const event of eventsData) {
            let slug = generateSlug(event.title);
            let slugExists = await client.query('SELECT id FROM events WHERE slug = $1', [slug]);
            let counter = 1;
            while (slugExists.rows.length > 0) {
                slug = `${generateSlug(event.title)}-${counter}`;
                slugExists = await client.query('SELECT id FROM events WHERE slug = $1', [slug]);
                counter++;
            }

            await client.query(`
        INSERT INTO events (
          title, description, date, time, location, price, 
          images, slug, language, venue_type, capacity, 
          audience, created_by, category
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      `, [
                event.title, event.description, event.date, event.time, event.location, event.price,
                event.images, slug, event.language, event.venue_type, event.capacity,
                event.audience, userId, event.category
            ]);

            console.log(`✅ Created event: ${event.title}`);
        }

        console.log('✨ Seeding complete!');
    } catch (err) {
        console.error('❌ Error seeding events:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

seedEvents();
