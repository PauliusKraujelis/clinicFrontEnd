import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={process.env.PUBLIC_URL + 'logo192.png'} alt="Logo" />
      </div>
      <div className="nav-buttons">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/patients" className="nav-button">Patient</Link>
        <Link to="/appointments" className="nav-button">Appointments</Link>
        <Link to="/procedures" className="nav-button">Procedures</Link>
        <Link to="/clinics" className="nav-button">Clinics</Link>
      </div>
    </nav>
  );
};

export default Navbar;
