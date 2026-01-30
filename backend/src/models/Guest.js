const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
    address: String,
    city: String,
    country: String,
    passportNumber: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Guest', GuestSchema);
