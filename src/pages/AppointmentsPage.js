import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AppointmentsPage = () => {
    return (
        <div>
          <Navbar />
          <div className="container">
            <div className="right-side">
              <h2>Appointments Page</h2>
            </div>
          </div>
          <Footer />
        </div>
      );
    };

export default AppointmentsPage;
