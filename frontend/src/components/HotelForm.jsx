import React, { useState, useEffect } from 'react';
import { createHotel, updateHotel } from '../services/api';
import '../styles/HotelForm.css';

const HotelForm = ({ hotel, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        phone: '',
        email: '',
        rating: '',
        totalRooms: ''
    });

    useEffect(() => {
        if (hotel) {
            setFormData(hotel);
        }
    }, [hotel]);

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
            if (hotel && hotel._id) {
                await updateHotel(hotel._id, formData);
            } else {
                await createHotel(formData);
            }
            onSubmit();
        } catch (error) {
            console.error('Failed to save hotel:', error);
        }
    };

    return (
        <div className="hotel-form-container">
            <h2>{hotel ? 'Edit Hotel' : 'Add New Hotel'}</h2>
            <form onSubmit={handleSubmit} className="hotel-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Hotel Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (0-5)"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.5"
                />
                <input
                    type="number"
                    name="totalRooms"
                    placeholder="Total Rooms"
                    value={formData.totalRooms}
                    onChange={handleChange}
                />
                <div className="form-buttons">
                    <button type="submit" className="btn btn-submit">
                        {hotel ? 'Update' : 'Create'}
                    </button>
                    <button type="button" className="btn btn-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HotelForm;
