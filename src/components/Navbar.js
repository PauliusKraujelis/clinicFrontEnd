import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={process.env.PUBLIC_URL + 'health.png'} alt="Logo" />
        <span className="nav-logo-text">Mc. Gyver Clinics</span>
      </div>
      <div className="nav-language">
        <LanguageSelector />
      </div>
      <div className="nav-buttons">
        <Link to="/" className="nav-button">{t('navbar.home')}</Link>
        <Link to="/patients" className="nav-button">{t('navbar.patient')}</Link>
        <Link to="/appointments" className="nav-button">{t('navbar.appointments')}</Link>
        <Link to="/procedures" className="nav-button">{t('navbar.procedures')}</Link>
        <Link to="/Contacts" className="nav-button">{t('navbar.contacts')}</Link>

      </div>
    </nav>
  );
};

export default Navbar;
