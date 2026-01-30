import React, { useState, useEffect } from 'react';
import { getReservations, deleteReservation, cancelReservation } from '../services/api';
import '../styles/ReservationList.css';

const ReservationList = ({ onEdit, onRefresh }) => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, [onRefresh]);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const response = await getReservations();
            setReservations(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch reservations');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this reservation?')) {
            try {
                await deleteReservation(id);
                fetchReservations();
            } catch (err) {
                setError('Failed to delete reservation');
            }
        }
    };

    const handleCancel = async (id) => {
        if (window.confirm('Are you sure you want to cancel this reservation?')) {
            try {
                await cancelReservation(id);
                fetchReservations();
            } catch (err) {
                setError('Failed to cancel reservation');
            }
        }
    };

    if (loading) return <div className="loading">Loading reservations...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="reservation-list-container">
            <h2>Reservations</h2>
            {reservations.length === 0 ? (
                <p>No reservations found</p>
            ) : (
                <table className="reservation-table">
                    <thead>
                        <tr>
                            <th>Guest</th>
                            <th>Hotel</th>
                            <th>Room</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((res) => (
                            <tr key={res._id}>
                                <td>{res.guestId?.firstName} {res.guestId?.lastName}</td>
                                <td>{res.hotelId?.name}</td>
                                <td>Room {res.roomId?.roomNumber}</td>
                                <td>{new Date(res.checkInDate).toLocaleDateString()}</td>
                                <td>{new Date(res.checkOutDate).toLocaleDateString()}</td>
                                <td>{res.status}</td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => onEdit(res)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-cancel" onClick={() => handleCancel(res._id)}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-delete" onClick={() => handleDelete(res._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReservationList;
