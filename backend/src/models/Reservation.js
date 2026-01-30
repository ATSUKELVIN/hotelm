const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    guestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest',
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    totalPrice: Number,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'],
        default: 'pending'
    },
    specialRequests: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
