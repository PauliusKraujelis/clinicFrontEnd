import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await fetch("/api/appointments");
    const data = await response.json();
    setAppointments(data);
  }

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Please cofirm appointment deletion!');
    if (isConfirmed) {
      remove(id);
    }
  };

  async function remove(id) {
    await fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedAppointments = appointments.filter(appointment => appointment.id !== id);
      setAppointments(updatedAppointments);
    });
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  const appointmentsList = appointments.map(appointment => {
    return (
      <tr key={appointment.id}>
        <td>{appointment.id}</td>
        <td>{appointment.dateTime}</td>
        <td>{appointment.location}</td>
        <td>{appointment.patient?.firstName} {appointment.patient?.lastName}</td>
        <td>
          <div className='d-inline-block'>
            <ButtonGroup>
              <Link to={`/appointments/${appointment.id}/edit`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={() => handleDelete(appointment.id)}>Delete</Button>
            </ButtonGroup>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="right-side">
          <Container fluid>
            <div className="float-end mt-2">

              <Link to={"/appointments/new"}>
                <Button color="primary" size="sm">Add Appointment</Button>
              </Link>
            </div>
            <h2>Appointments</h2>

            <Table className="mt-4 text-dark">
              <thead>
                <tr>
                  <th width="10%">id</th>
                  <th width="30%">Date and Time</th>
                  <th width="30%">Location</th>
                  <th width="30%">Patient</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsList}
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppointmentsPage;
