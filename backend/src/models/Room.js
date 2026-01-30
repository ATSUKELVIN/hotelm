const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['single', 'double', 'suite', 'deluxe'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    amenities: [String],
    status: {
        type: String,
        enum: ['available', 'occupied', 'maintenance'],
        default: 'available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Room', RoomSchema);
