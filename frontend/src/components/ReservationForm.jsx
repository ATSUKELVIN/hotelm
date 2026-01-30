import React, { useState, useEffect } from 'react';
import { createReservation, updateReservation, getHotels, getRooms, getGuests } from '../services/api';
import '../styles/ReservationForm.css';

const ReservationForm = ({ reservation, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        guestId: '',
        roomId: '',
        hotelId: '',
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: '',
        totalPrice: '',
        specialRequests: ''
    });

    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        loadData();
        if (reservation) {
            setFormData(reservation);
        }
    }, [reservation]);

    const loadData = async () => {
        try {
            const [hotelsRes, roomsRes, guestsRes] = await Promise.all([
                getHotels(),
                getRooms(),
                getGuests()
            ]);
            setHotels(hotelsRes.data);
            setRooms(roomsRes.data);
            setGuests(guestsRes.data);
        } catch (error) {
            console.error('Failed to load data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (reservation && reservation._id) {
                await updateReservation(reservation._id, formData);
            } else {
                await createReservation(formData);
            }
            onSubmit();
        } catch (error) {
            console.error('Failed to save reservation:', error);
        }
    };

    return (
        <div className="reservation-form-container">
            <h2>{reservation ? 'Edit Reservation' : 'New Reservation'}</h2>
            <form onSubmit={handleSubmit} className="reservation-form">
                <select
                    name="guestId"
                    value={formData.guestId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Guest</option>
                    {guests.map((guest) => (
                        <option key={guest._id} value={guest._id}>
                            {guest.firstName} {guest.lastName}
                        </option>
                    ))}
                </select>

                <select
                    name="hotelId"
                    value={formData.hotelId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Hotel</option>
                    {hotels.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                            {hotel.name}
                        </option>
                    ))}
                </select>

                <select
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                        <option key={room._id} value={room._id}>
                            Room {room.roomNumber} - {room.type}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate ? formData.checkInDate.split('T')[0] : ''}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="checkOutDate"
                    value={formData.checkOutDate ? formData.checkOutDate.split('T')[0] : ''}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="numberOfGuests"
                    placeholder="Number of Guests"
                    value={formData.numberOfGuests}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="totalPrice"
                    placeholder="Total Price"
                    value={formData.totalPrice}
                    onChange={handleChange}
                />

                <textarea
                    name="specialRequests"
                    placeholder="Special Requests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                />

                <div className="form-buttons">
                    <button type="submit" className="btn btn-submit">
                        {reservation ? 'Update' : 'Create'}
                    </button>
                    <button type="button" className="btn btn-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;
