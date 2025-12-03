require('dotenv').config({ path: '../.env' }); // Load env vars
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function reproduceIssue() {
    let client;
    let userId;
    try {
        // Create a user directly in the database
        client = await pool.connect();
        const userRes = await client.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id
        `, ['Test User', `testuser_${Date.now()}@example.com`, 'password123']);
        userId = userRes.rows[0].id;
        console.log('Created test user with ID:', userId);

        const form = new FormData();
        form.append('title', 'Test Event');
        form.append('description', 'This is a test event');
        form.append('date', '2025-12-25');
        form.append('time', '18:00');
        form.append('location', 'Test Location');
        form.append('price', '100');
        form.append('category', 'music');
        form.append('language', 'English');
        form.append('venueType', 'Indoor');
        form.append('capacity', '500');
        form.append('audience', '18+');
        form.append('userId', userId.toString()); // Use the created user ID

        // Create a dummy file for testing with valid PNG content (1x1 pixel red dot)
        const dummyFilePath = path.join(__dirname, 'test_image.png');
        const pngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
        fs.writeFileSync(dummyFilePath, pngBuffer);
        form.append('images', fs.createReadStream(dummyFilePath));

        console.log('Sending request to http://localhost:5001/api/events...');

        const response = await axios.post('http://localhost:5001/api/events', form, {
            headers: {
                ...form.getHeaders()
            },
            timeout: 5000 // 5 seconds timeout
        });

        console.log('Status:', response.status);
        console.log('Headers:', response.headers);
        console.log('Data:', response.data);

        // Clean up dummy file
        fs.unlinkSync(dummyFilePath);

        // Verify fetching user events
        console.log(`\nFetching events for user ${userId}...`);
        const userEventsResponse = await axios.get(`http://localhost:5001/api/events/user/${userId}`);
        console.log('User Events Status:', userEventsResponse.status);
        console.log('User Events Data:', userEventsResponse.data);

        const eventId = userEventsResponse.data[0].id;
        console.log(`\nUpdating event ${eventId}...`);

        const updateForm = new FormData();
        updateForm.append('title', 'Updated Test Event');
        updateForm.append('description', 'This is an updated test event');
        updateForm.append('date', '2025-12-26');
        updateForm.append('time', '19:00');
        updateForm.append('location', 'Updated Location');
        updateForm.append('price', '150');
        updateForm.append('language', 'Spanish');
        updateForm.append('venueType', 'Outdoor');
        updateForm.append('capacity', '1000');
        updateForm.append('audience', 'All Ages');
        // Keep existing image
        updateForm.append('existingImages', userEventsResponse.data[0].images[0]);

        const updateResponse = await axios.put(`http://localhost:5001/api/events/${eventId}`, updateForm, {
            headers: {
                ...updateForm.getHeaders()
            },
            timeout: 5000
        });

        console.log('Update Status:', updateResponse.status);
        console.log('Update Data:', updateResponse.data);

        // Verify update
        console.log(`\nFetching updated event ${eventId}...`);
        // We can use the slug to fetch, but slug might have changed if title changed?
        // Our slug generation logic in backend creates slug from title.
        // But the PUT route doesn't update slug!
        // Let's check PUT route. It updates title but not slug.
        // So slug remains 'test-event'.
        // Wait, if I change title, slug should probably change?
        // Usually slugs are permanent for SEO.
        // Let's assume slug doesn't change.
        // But we can fetch by ID using the user events route again.

        const updatedUserEventsResponse = await axios.get(`http://localhost:5001/api/events/user/${userId}`);
        const updatedEvent = updatedUserEventsResponse.data.find(e => e.id === eventId);
        console.log('Updated Event:', updatedEvent);

        // Verify booking ticket
        console.log(`\nBooking ticket for event ${eventId} by user ${userId}...`);
        const bookingResponse = await axios.post('http://localhost:5001/api/tickets', {
            userId: userId,
            eventId: eventId
        });
        console.log('Booking Status:', bookingResponse.status);
        console.log('Booking Data:', bookingResponse.data);

        // Verify fetching user tickets
        console.log(`\nFetching tickets for user ${userId}...`);
        const userTicketsResponse = await axios.get(`http://localhost:5001/api/tickets/user/${userId}`);
        console.log('User Tickets Status:', userTicketsResponse.status);
        console.log('User Tickets Data:', userTicketsResponse.data);

        // Verify event attendees count updated
        console.log(`\nVerifying event attendees count...`);
        const finalEventsResponse = await axios.get(`http://localhost:5001/api/events/user/${userId}`);
        const finalEvent = finalEventsResponse.data.find(e => e.id === eventId);
        console.log('Final Event Attendees:', finalEvent.attendees);
        console.log('Final Event Attendees Type:', typeof finalEvent.attendees);

        // Verify ticket stats (lifetime)
        console.log(`\nVerifying ticket stats for user ${userId}...`);
        const statsResponse = await axios.get(`http://localhost:5001/api/tickets/stats/user/${userId}`);
        console.log('Ticket Stats Status:', statsResponse.status);
        console.log('Ticket Stats Status:', statsResponse.status);
        console.log('Ticket Stats Data:', statsResponse.data);

        // Verify update profile
        console.log(`\nUpdating profile for user ${userId}...`);
        const profileForm = new FormData();
        profileForm.append('name', 'Updated Test User');
        profileForm.append('age', '25');
        profileForm.append('city', 'New York');
        profileForm.append('state', 'NY');
        // Re-use dummy file for profile image
        const profileImagePath = path.join(__dirname, 'test_profile.png');
        fs.writeFileSync(profileImagePath, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64'));
        profileForm.append('image', fs.createReadStream(profileImagePath));

        const profileUpdateResponse = await axios.put(`http://localhost:5001/api/users/${userId}`, profileForm, {
            headers: {
                ...profileForm.getHeaders()
            }
        });
        console.log('Profile Update Status:', profileUpdateResponse.status);
        console.log('Profile Update Data:', profileUpdateResponse.data);

        // Clean up profile image
        fs.unlinkSync(profileImagePath);

        // Verify delete event
        console.log(`\nDeleting event ${eventId}...`);
        const deleteResponse = await axios.delete(`http://localhost:5001/api/events/${eventId}`);
        console.log('Delete Event Status:', deleteResponse.status);
        console.log('Delete Event Data:', deleteResponse.data);

        // Verify event is gone
        try {
            await axios.get(`http://localhost:5001/api/events/${slug}`);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('Event successfully deleted (404 confirmed)');
            } else {
                console.error('Error checking deleted event:', error.message);
            }
        }

        // Verify pagination
        console.log('\nTesting pagination...');
        const paginationResponse = await axios.get('http://localhost:5001/api/events?page=1&limit=5');
        console.log('Pagination Status:', paginationResponse.status);
        console.log('Pagination Data:', {
            eventsCount: paginationResponse.data.events.length,
            currentPage: paginationResponse.data.currentPage,
            totalPages: paginationResponse.data.totalPages,
            totalEvents: paginationResponse.data.totalEvents
        });

        // Verify filtering
        console.log('\nTesting filtering...');
        // Create another event with a specific category
        const techEventForm = new FormData();
        techEventForm.append('title', 'Tech Conference 2024');
        techEventForm.append('description', 'A great tech event');
        techEventForm.append('date', '2024-12-25');
        techEventForm.append('time', '10:00');
        techEventForm.append('location', 'San Francisco');
        techEventForm.append('price', '100');
        techEventForm.append('category', 'tech');
        techEventForm.append('userId', userId);
        // Dummy image
        const techImagePath = path.join(__dirname, 'tech_test.png');
        fs.writeFileSync(techImagePath, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64'));
        techEventForm.append('images', fs.createReadStream(techImagePath));

        await axios.post('http://localhost:5001/api/events', techEventForm, {
            headers: { ...techEventForm.getHeaders() }
        });
        fs.unlinkSync(techImagePath);

        // Filter by category
        const categoryResponse = await axios.get('http://localhost:5001/api/events?category=tech');
        console.log('Category Filter Count:', categoryResponse.data.events.length);
        console.log('Category Filter Match:', categoryResponse.data.events[0].title === 'Tech Conference 2024');

        // Filter by search
        const searchResponse = await axios.get('http://localhost:5001/api/events?search=Conference');
        console.log('Search Filter Count:', searchResponse.data.events.length);

        // Verify sorting
        console.log('\nTesting sorting...');
        const sortAscResponse = await axios.get('http://localhost:5001/api/events?sort=price_asc');
        const pricesAsc = sortAscResponse.data.events.map(e => parseFloat(e.price));
        const isSortedAsc = pricesAsc.every((val, i, arr) => !i || (val >= arr[i - 1]));
        console.log('Sort Price ASC:', isSortedAsc);

        const sortDescResponse = await axios.get('http://localhost:5001/api/events?sort=price_desc');
        const pricesDesc = sortDescResponse.data.events.map(e => parseFloat(e.price));
        const isSortedDesc = pricesDesc.every((val, i, arr) => !i || (val <= arr[i - 1]));
        console.log('Sort Price DESC:', isSortedDesc);

    } catch (error) {
        if (error.response) {
            console.error('Error Status:', error.response.status);
            console.error('Error Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    } finally {
        if (client) {
            // Clean up user (optional, but good for testing)
            // await client.query('DELETE FROM users WHERE id = $1', [userId]);
            client.release();
        }
        await pool.end();
    }
}

reproduceIssue();
