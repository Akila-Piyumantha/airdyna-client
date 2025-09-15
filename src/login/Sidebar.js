import React from 'react';
import './dashboard.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Admin Dashboard</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li className="nav-item active">
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </li>
                    <li className="nav-item">
                        <i className="fas fa-box"></i>
                        <span>Items Manager</span>
                    </li>
                    <li className="nav-item">
                        <i className="fas fa-users"></i>
                        <span>Users</span>
                    </li>
                    <li className="nav-item">
                        <i className="fas fa-chart-bar"></i>
                        <span>Analytics</span>
                    </li>
                    <li className="nav-item">
                        <i className="fas fa-cog"></i>
                        <span>Settings</span>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
