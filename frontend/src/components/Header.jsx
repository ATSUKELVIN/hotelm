import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
    const location = useLocation();

    return (
        <header className="header">
            <div className="header-container">
                <h1 className="header-title">🏨 Hotel Manager</h1>
                <nav className="header-nav">
                    <Link
                        to="/"
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        Hotels
                    </Link>
                    <Link
                        to="/reservations"
                        className={location.pathname === '/reservations' ? 'active' : ''}
                    >
                        Reservations
                    </Link>
                </nav>
            </div>
        </header>
    );
}
