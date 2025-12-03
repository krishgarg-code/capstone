require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const updateTableQuery = `
  CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
  );

  ALTER TABLE events ADD COLUMN IF NOT EXISTS title VARCHAR(255);
  ALTER TABLE events ADD COLUMN IF NOT EXISTS description TEXT;
  ALTER TABLE events ADD COLUMN IF NOT EXISTS date DATE;
  ALTER TABLE events ADD COLUMN IF NOT EXISTS time VARCHAR(50);
  ALTER TABLE events ADD COLUMN IF NOT EXISTS location VARCHAR(255);
  ALTER TABLE events ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2);
  ALTER TABLE events ADD COLUMN IF NOT EXISTS images TEXT[];
  ALTER TABLE events ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;
  ALTER TABLE events ADD COLUMN IF NOT EXISTS language VARCHAR(50);
  ALTER TABLE events ADD COLUMN IF NOT EXISTS venue_type VARCHAR(50);
  ALTER TABLE events ADD COLUMN IF NOT EXISTS capacity INTEGER;
  ALTER TABLE events ADD COLUMN IF NOT EXISTS audience VARCHAR(50);
  ALTER TABLE events ADD COLUMN IF NOT EXISTS attendees INTEGER DEFAULT 0;
  ALTER TABLE events ADD COLUMN IF NOT EXISTS created_by INTEGER;
  ALTER TABLE events ADD COLUMN IF NOT EXISTS category VARCHAR(50);

  ALTER TABLE events ADD COLUMN IF NOT EXISTS created_by INTEGER;

  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

  ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image VARCHAR(255);
  ALTER TABLE users ADD COLUMN IF NOT EXISTS age INTEGER;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS city VARCHAR(255);
  ALTER TABLE users ADD COLUMN IF NOT EXISTS state VARCHAR(255);

  CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    event_id INTEGER REFERENCES events(id),
    booking_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'confirmed'
  );
`;

async function initDB() {
  try {
    const client = await pool.connect();
    try {
      await client.query(updateTableQuery);
      console.log('✅ Events table updated successfully');
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Error updating table:', err);
  } finally {
    await pool.end();
  }
}

initDB();
