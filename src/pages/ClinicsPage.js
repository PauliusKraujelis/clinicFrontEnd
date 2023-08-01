import React from 'react';
import Navbar from '../components/Navbar';
import LoginRegistration from '../components/LoginRegistration';
import Picture from '../components/Picture';
import Footer from '../components/Footer';
import '../components/picture.css';

const ClinicsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="left-side">
          <LoginRegistration />
        </div>
        <div className="right-side">
          <Picture />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClinicsPage;
