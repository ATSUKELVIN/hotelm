import React, { useState } from 'react';
import HotelList from './components/HotelList';
import HotelForm from './components/HotelForm';
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';
import './styles/index.css';

function App() {
    const [currentSection, setCurrentSection] = useState('hotels');
    const [editingHotel, setEditingHotel] = useState(null);
    const [editingReservation, setEditingReservation] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleHotelEdit = (hotel) => {
        setEditingHotel(hotel);
    };

    const handleHotelSubmit = () => {
        setEditingHotel(null);
        setRefreshKey(refreshKey + 1);
    };

    const handleReservationEdit = (reservation) => {
        setEditingReservation(reservation);
    };

    const handleReservationSubmit = () => {
        setEditingReservation(null);
        setRefreshKey(refreshKey + 1);
    };

    return (
        <div className="app-container">
            <header>
                <h1>🏨 Hotel Management System</h1>
                <nav>
                    <button
                        className={currentSection === 'hotels' ? 'active' : ''}
                        onClick={() => {
                            setCurrentSection('hotels');
                            setEditingHotel(null);
                        }}
                    >
                        Hotels
                    </button>
                    <button
                        className={currentSection === 'reservations' ? 'active' : ''}
                        onClick={() => {
                            setCurrentSection('reservations');
                            setEditingReservation(null);
                        }}
                    >
                        Reservations
                    </button>
                </nav>
            </header>

            <div className="content">
                {currentSection === 'hotels' && (
                    <div>
                        {editingHotel || editingHotel === null ? (
                            <HotelForm
                                hotel={editingHotel}
                                onSubmit={handleHotelSubmit}
                                onCancel={() => setEditingHotel(null)}
                            />
                        ) : null}
                        {!editingHotel && (
                            <div>
                                <button
                                    className="btn"
                                    onClick={() => setEditingHotel({})}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#27ae60',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        marginBottom: '20px',
                                        marginLeft: '20px'
                                    }}
                                >
                                    + Add New Hotel
                                </button>
                                <HotelList
                                    onEdit={handleHotelEdit}
                                    onRefresh={refreshKey}
                                />
                            </div>
                        )}
                    </div>
                )}

                {currentSection === 'reservations' && (
                    <div>
                        {editingReservation || editingReservation === null ? (
                            <ReservationForm
                                reservation={editingReservation}
                                onSubmit={handleReservationSubmit}
                                onCancel={() => setEditingReservation(null)}
                            />
                        ) : null}
                        {!editingReservation && (
                            <div>
                                <button
                                    className="btn"
                                    onClick={() => setEditingReservation({})}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#27ae60',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        marginBottom: '20px',
                                        marginLeft: '20px'
                                    }}
                                >
                                    + New Reservation
                                </button>
                                <ReservationList
                                    onEdit={handleReservationEdit}
                                    onRefresh={refreshKey}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <footer>
                <p>&copy; 2026 Hotel Management System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
