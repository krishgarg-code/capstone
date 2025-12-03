const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String], // Array of image paths/URLs
        validate: [arrayLimit, '{PATH} exceeds the limit of 3'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

function arrayLimit(val) {
    return val.length <= 3;
}

module.exports = mongoose.model('Event', eventSchema);
