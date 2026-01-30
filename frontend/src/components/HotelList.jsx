import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHotels, deleteHotel } from '../services/api';
import '../styles/HotelList.css';

const HotelList = ({ onEdit, onRefresh }) => {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [filterCountry, setFilterCountry] = useState('');
    const [filterRating, setFilterRating] = useState('');

    useEffect(() => {
        fetchHotels();
    }, [onRefresh]);

    useEffect(() => {
        filterHotels();
    }, [hotels, searchTerm, filterCity, filterCountry, filterRating]);

    const filterHotels = () => {
        let filtered = hotels.filter(hotel => {
            const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hotel.country.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCity = filterCity === '' || hotel.city === filterCity;
            const matchesCountry = filterCountry === '' || hotel.country === filterCountry;
            const matchesRating = filterRating === '' || (hotel.rating && hotel.rating >= parseFloat(filterRating));

            return matchesSearch && matchesCity && matchesCountry && matchesRating;
        });
        setFilteredHotels(filtered);
    };

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

    const cities = [...new Set(hotels.map(h => h.city))].sort();
    const countries = [...new Set(hotels.map(h => h.country))].sort();

    return (
        <div className="hotel-list-container">
            <div className="hotel-list-header">
                <h2>Discover Hotels</h2>
                <button className="btn btn-refresh" onClick={fetchHotels}>🔄 Refresh</button>
            </div>

            <div className="search-filter-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search hotels, cities, or countries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
                    <select
                        value={filterCity}
                        onChange={(e) => setFilterCity(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Cities</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>

                    <select
                        value={filterCountry}
                        onChange={(e) => setFilterCountry(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Countries</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>

                    <select
                        value={filterRating}
                        onChange={(e) => setFilterRating(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Ratings</option>
                        <option value="3">⭐ 3+</option>
                        <option value="4">⭐ 4+</option>
                        <option value="4.5">⭐ 4.5+</option>
                        <option value="5">⭐ 5</option>
                    </select>

                    {(searchTerm || filterCity || filterCountry || filterRating) && (
                        <button
                            className="btn btn-clear-filters"
                            onClick={() => {
                                setSearchTerm('');
                                setFilterCity('');
                                setFilterCountry('');
                                setFilterRating('');
                            }}
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>

            {filteredHotels.length === 0 ? (
                <p className="no-results">No hotels found matching your criteria</p>
            ) : (
                <div className="results-info">
                    <p>Found <strong>{filteredHotels.length}</strong> hotel{filteredHotels.length !== 1 ? 's' : ''}</p>
                </div>
            )}

            {filteredHotels.length > 0 && (
                <div className="hotel-grid">
                    {filteredHotels.map((hotel) => (
                        <div className="hotel-card" key={hotel._id} onClick={() => navigate(`/hotel/${hotel._id}`)} style={{ cursor: 'pointer' }}>
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
                                    <p className="hotel-subtitle">Click to view details</p>
                                </div>
                            </div>
                            <div className="hotel-info">
                                <div className="hotel-meta">
                                    <span>{hotel.city}, {hotel.country}</span>
                                    <span className="hotel-rating">⭐ {hotel.rating ? hotel.rating.toFixed(1) : 'N/A'}</span>
                                </div>
                                <div className="hotel-actions">
                                    <button
                                        className="btn btn-edit"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit(hotel);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(hotel._id);
                                        }}
                                    >
                                        Delete
                                    </button>
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
