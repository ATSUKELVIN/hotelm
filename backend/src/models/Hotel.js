const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: String,
    email: String,
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    totalRooms: Number,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Hotel', HotelSchema);
