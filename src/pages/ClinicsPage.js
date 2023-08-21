import React from 'react';
import Navbar from '../components/Navbar';
import Picture from '../components/Picture';
import Footer from '../components/Footer';
import '../components/picture.css';

const ClinicsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="right-side">
          <Picture />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClinicsPage;
