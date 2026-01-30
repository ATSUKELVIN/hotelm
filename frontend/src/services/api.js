import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Hotel APIs
export const getHotels = () => api.get('/hotels');
export const getHotelById = (id) => api.get(`/hotels/${id}`);
export const createHotel = (data) => api.post('/hotels', data);
export const updateHotel = (id, data) => api.put(`/hotels/${id}`, data);
export const deleteHotel = (id) => api.delete(`/hotels/${id}`);

// Room APIs
export const getRooms = () => api.get('/rooms');
export const getRoomsByHotel = (hotelId) => api.get(`/rooms/hotel/${hotelId}`);
export const createRoom = (data) => api.post('/rooms', data);
export const updateRoom = (id, data) => api.put(`/rooms/${id}`, data);
export const deleteRoom = (id) => api.delete(`/rooms/${id}`);

// Guest APIs
export const getGuests = () => api.get('/guests');
export const getGuestById = (id) => api.get(`/guests/${id}`);
export const createGuest = (data) => api.post('/guests', data);
export const updateGuest = (id, data) => api.put(`/guests/${id}`, data);
export const deleteGuest = (id) => api.delete(`/guests/${id}`);

// Reservation APIs
export const getReservations = () => api.get('/reservations');
export const getReservationById = (id) => api.get(`/reservations/${id}`);
export const createReservation = (data) => api.post('/reservations', data);
export const updateReservation = (id, data) => api.put(`/reservations/${id}`, data);
export const deleteReservation = (id) => api.delete(`/reservations/${id}`);
export const cancelReservation = (id) => api.patch(`/reservations/${id}/cancel`);

export default api;
