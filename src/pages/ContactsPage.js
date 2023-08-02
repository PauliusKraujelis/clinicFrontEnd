import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactsPage = () => {
  const clinics = [
    {
      id: 1,
      name: 'ABC Clinic',
      address: '123 Main Street',
      city: 'New York',
      country: 'USA',
      phone: '+1 123-456-7890',
    },
    {
      id: 2,
      name: 'XYZ Clinic',
      address: '456 Elm Street',
      city: 'Los Angeles',
      country: 'USA',
      phone: '+1 987-654-3210',
    },
    {
      id: 3,
      name: 'PQR Clinic',
      address: '789 Oak Street',
      city: 'Chicago',
      country: 'USA',
      phone: '+1 555-555-5555',
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="right-side">
          <h2>Contacts Page</h2>
          <ul>
            {clinics.map((clinic) => (
              <li key={clinic.id}>
                <h3>{clinic.name}</h3>
                <p>Address: {clinic.address}, {clinic.city}, {clinic.country}</p>
                <p>Phone: {clinic.phone}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactsPage;
