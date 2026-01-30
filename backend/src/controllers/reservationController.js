const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

// Get all reservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('guestId')
            .populate('roomId')
            .populate('hotelId');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get reservation by ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate('guestId')
            .populate('roomId')
            .populate('hotelId');
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new reservation
exports.createReservation = async (req, res) => {
    try {
        // Update room status to occupied
        await Room.findByIdAndUpdate(req.body.roomId, { status: 'occupied' });

        const reservation = new Reservation(req.body);
        const newReservation = await reservation.save();
        await newReservation.populate(['guestId', 'roomId', 'hotelId']);
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update reservation
exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('guestId')
            .populate('roomId')
            .populate('hotelId');
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cancel reservation
exports.cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled' },
            { new: true }
        ).populate('guestId').populate('roomId').populate('hotelId');

        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

        // Update room status back to available
        await Room.findByIdAndUpdate(reservation.roomId, { status: 'available' });

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete reservation
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

        // Update room status back to available
        await Room.findByIdAndUpdate(reservation.roomId, { status: 'available' });

        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
