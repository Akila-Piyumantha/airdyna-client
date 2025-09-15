import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './dashboard.css';

const DashboardLayout = ({ children, onSearchChange, onLogout, isAdmin }) => {
    if (isAdmin) {
        return (
            <div className="dashboard">
                <div className="admin-header">
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Header onSearchChange={onSearchChange} onLogout={onLogout} />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
