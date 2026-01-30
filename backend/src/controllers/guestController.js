const Guest = require('../models/Guest');

// Get all guests
exports.getAllGuests = async (req, res) => {
    try {
        const guests = await Guest.find();
        res.status(200).json(guests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get guest by ID
exports.getGuestById = async (req, res) => {
    try {
        const guest = await Guest.findById(req.params.id);
        if (!guest) return res.status(404).json({ message: 'Guest not found' });
        res.status(200).json(guest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new guest
exports.createGuest = async (req, res) => {
    const guest = new Guest(req.body);
    try {
        const newGuest = await guest.save();
        res.status(201).json(newGuest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update guest
exports.updateGuest = async (req, res) => {
    try {
        const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!guest) return res.status(404).json({ message: 'Guest not found' });
        res.status(200).json(guest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete guest
exports.deleteGuest = async (req, res) => {
    try {
        const guest = await Guest.findByIdAndDelete(req.params.id);
        if (!guest) return res.status(404).json({ message: 'Guest not found' });
        res.status(200).json({ message: 'Guest deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
