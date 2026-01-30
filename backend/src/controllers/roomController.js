const Room = require('../models/Room');

// Get all rooms
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('hotelId');
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get rooms by hotel
exports.getRoomsByHotel = async (req, res) => {
    try {
        const rooms = await Room.find({ hotelId: req.params.hotelId });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new room
exports.createRoom = async (req, res) => {
    const room = new Room(req.body);
    try {
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update room
exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete room
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
