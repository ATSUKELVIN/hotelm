require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB, disconnectDB } = require('./config/database');

// Import routes
const hotelRoutes = require('./routes/hotelRoutes');
const roomRoutes = require('./routes/roomRoutes');
const guestRoutes = require('./routes/guestRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/reservations', reservationRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(async () => {
        console.log('HTTP server closed');
        await disconnectDB();
        process.exit(0);
    });
});
