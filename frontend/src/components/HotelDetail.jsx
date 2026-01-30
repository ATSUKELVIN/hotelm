import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/HotelDetail.css';

export default function HotelDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await api.get(`/hotels/${id}`);
                setHotel(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load hotel details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    if (loading) return <div className="loading">Loading hotel details...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!hotel) return <div className="error">Hotel not found</div>;

    return (
        <div className="hotel-detail-container">
            <button className="back-btn" onClick={() => navigate('/')}>
                ← Back to Hotels
            </button>

            <div className="hotel-detail-content">
                <div className="hotel-detail-image">
                    {hotel.image ? (
                        <img src={hotel.image} alt={hotel.name} />
                    ) : (
                        <div className="image-placeholder">No Image</div>
                    )}
                </div>

                <div className="hotel-detail-info">
                    <h1>{hotel.name}</h1>

                    <div className="rating-section">
                        <span className="rating-stars">⭐ {hotel.rating || 'N/A'}</span>
                    </div>

                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">Location</span>
                            <span className="value">
                                {hotel.city}, {hotel.country}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="label">Address</span>
                            <span className="value">{hotel.address}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Phone</span>
                            <span className="value">{hotel.phone || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Email</span>
                            <span className="value">{hotel.email || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Total Rooms</span>
                            <span className="value">{hotel.totalRooms || 'N/A'}</span>
                        </div>
                    </div>

                    <button className="reserve-btn" onClick={() => navigate('/reservations')}>
                        Make a Reservation
                    </button>
                </div>
            </div>
        </div>
    );
}
