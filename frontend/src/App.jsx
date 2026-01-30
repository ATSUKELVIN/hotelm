import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HotelList from './components/HotelList';
import HotelDetail from './components/HotelDetail';
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';
import './styles/index.css';

function App() {
    const [editingReservation, setEditingReservation] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleReservationEdit = (reservation) => {
        setEditingReservation(reservation);
    };

    const handleReservationSubmit = () => {
        setEditingReservation(null);
        setRefreshKey(refreshKey + 1);
    };

    return (
        <BrowserRouter>
            <div className="app-container">
                <Header />
                <div className="content">
                    <Routes>
                        <Route
                            path="/"
                            element={<HotelList onEdit={() => {}} onRefresh={refreshKey} />}
                        />
                        <Route path="/hotel/:id" element={<HotelDetail />} />
                        <Route
                            path="/reservations"
                            element={
                                <>
                                    {editingReservation && (
                                        <ReservationForm
                                            reservation={editingReservation}
                                            onSubmit={handleReservationSubmit}
                                        />
                                    )}
                                    <ReservationList
                                        onEdit={handleReservationEdit}
                                        onRefresh={refreshKey}
                                    />
                                </>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
