import React, { useState, useEffect } from 'react';
import { getHotels, deleteHotel } from '../services/api';
import '../styles/HotelList.css';

const HotelList = ({ onEdit, onRefresh }) => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHotels();
    }, [onRefresh]);

    const fetchHotels = async () => {
        try {
            setLoading(true);
            const response = await getHotels();
            setHotels(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch hotels');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            try {
                await deleteHotel(id);
                fetchHotels();
            } catch (err) {
                setError('Failed to delete hotel');
            }
        }
    };

    if (loading) return <div className="loading">Loading hotels...</div>;
    if (error) return <div className="error">{error}</div>;

    const imageFor = (hotel) => {
        // Use hotel image from backend, or fallback to inline SVG placeholder
        if (hotel.image) {
            // If it starts with /, it's a local path from public/
            if (hotel.image.startsWith('/')) {
                return hotel.image;
            }
            return hotel.image;
        }
        // Fallback: inline SVG data URL
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop offset='0' stop-color='%232b5876'/%3E%3Cstop offset='1' stop-color='%234e4376'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='32' fill='%23fff' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(hotel.name)}%3C/text%3E%3C/svg%3E`;
    };

    return (
        <div className="hotel-list-container">
            <div className="hotel-list-header">
                <h2>Hotels</h2>
                <div>
                    <button className="btn btn-refresh" onClick={fetchHotels}>Refresh</button>
                </div>
            </div>

            {hotels.length === 0 ? (
                <p>No hotels found</p>
            ) : (
                <div className="hotel-grid">
                    {hotels.map((hotel) => (
                        <div className="hotel-card" key={hotel._id}>
                            <div className="hotel-img-wrap">
                                <img
                                    className="hotel-img"
                                    src={imageFor(hotel)}
                                    alt={hotel.name}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '/images/placeholder.svg';
                                    }}
                                />
                                <div className="hotel-overlay">
                                    <h3 className="hotel-title">{hotel.name}</h3>
                                </div>
                            </div>
                            <div className="hotel-info">
                                <div className="hotel-meta">
                                    <span>{hotel.city}, {hotel.country}</span>
                                    <span className="hotel-rating">{hotel.rating ? `${hotel.rating}/5` : 'N/A'}</span>
                                </div>
                                <div className="hotel-actions">
                                    <button className="btn btn-edit" onClick={() => onEdit(hotel)}>Edit</button>
                                    <button className="btn btn-delete" onClick={() => handleDelete(hotel._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HotelList;
