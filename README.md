# Hotel Management System

A full-stack web application for managing hotels, rooms, guests, and reservations.

## Features

- **Hotel Management**: Create, read, update, and delete hotels
- **Room Management**: Manage hotel rooms with details like type, capacity, and amenities
- **Guest Management**: Store and manage guest information
- **Reservations**: Book rooms for guests with check-in/check-out dates and special requests
- **Room Status Tracking**: Automatic room status updates based on reservations
- **Responsive UI**: Clean and intuitive user interface

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for database
- **Mongoose** for ODM
- **CORS** for cross-origin requests

### Frontend
- **React** 18
- **Axios** for API calls
- **CSS3** for styling

## Project Structure

```
hotel-management-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── Hotel.js
│   │   │   ├── Room.js
│   │   │   ├── Guest.js
│   │   │   └── Reservation.js
│   │   ├── controllers/
│   │   │   ├── hotelController.js
│   │   │   ├── roomController.js
│   │   │   ├── guestController.js
│   │   │   └── reservationController.js
│   │   ├── routes/
│   │   │   ├── hotelRoutes.js
│   │   │   ├── roomRoutes.js
│   │   │   ├── guestRoutes.js
│   │   │   └── reservationRoutes.js
│   │   └── index.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HotelList.jsx
│   │   │   ├── HotelForm.jsx
│   │   │   ├── ReservationList.jsx
│   │   │   └── ReservationForm.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── HotelList.css
│   │   │   ├── HotelForm.css
│   │   │   ├── ReservationList.css
│   │   │   ├── ReservationForm.css
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── styles/index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/hotel-management
   PORT=5000
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will open in your browser at `http://localhost:3000`

## API Endpoints

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel by ID
- `POST /api/hotels` - Create new hotel
- `PUT /api/hotels/:id` - Update hotel
- `DELETE /api/hotels/:id` - Delete hotel

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/hotel/:hotelId` - Get rooms by hotel
- `POST /api/rooms` - Create new room
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room

### Guests
- `GET /api/guests` - Get all guests
- `GET /api/guests/:id` - Get guest by ID
- `POST /api/guests` - Create new guest
- `PUT /api/guests/:id` - Update guest
- `DELETE /api/guests/:id` - Delete guest

### Reservations
- `GET /api/reservations` - Get all reservations
- `GET /api/reservations/:id` - Get reservation by ID
- `POST /api/reservations` - Create new reservation
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Delete reservation
- `PATCH /api/reservations/:id/cancel` - Cancel reservation

## Usage

1. **Add Hotels**: Navigate to the Hotels section and click "Add New Hotel" to create hotels
2. **Manage Rooms**: Create rooms within hotels with pricing and amenities
3. **Register Guests**: Add guest information through the system
4. **Make Reservations**: Book rooms for guests with check-in/check-out dates
5. **Manage Reservations**: View, edit, or cancel reservations as needed

## Future Enhancements

- User authentication and authorization
- Payment processing integration
- Email notifications for reservations
- Advanced search and filtering
- Room availability calendar
- Guest reviews and ratings
- Invoice generation
- Dashboard with analytics

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
