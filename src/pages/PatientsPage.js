import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PatientsPage() {
  const [patients, setPatients] = useState([]);

  async function loadPatients() {
    const response = await fetch("/api/patients");
    const data = await response.json();
    setPatients(data);
  }

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Please cofirm patient deletion!');
    if (isConfirmed) {
      remove(id);
    }
  };

  async function remove(id) {
    await fetch(`/api/patients/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedPatients = patients.filter(patient => patient.id !== id);
      setPatients(updatedPatients);
    });
  }

  useEffect(() => {
    loadPatients();
  }, []);

  const patientsList = patients.map(patient => {
    return (
      <tr key={patient.id}>
        <td>{patient.id}</td>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>{patient.age}</td>
        <td>{patient.gender}</td>
        <td>
          <div className='d-inline-block'>
            <ButtonGroup>
              <Link to={`/patients/${patient.id}/edit`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={() => handleDelete(patient.id)}>Delete</Button>
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

              <Link to={"/patients/new"}>
                <Button color="primary" size="sm">Add Patient</Button>
              </Link>
            </div>
            <h2>Patients</h2>

            <Table className="mt-4 text-dark">
              <thead>
                <tr>
                  <th width="20%">id</th>
                  <th width="20%">First Name</th>
                  <th width="20%">Last Name</th>
                  <th width="20%">Age</th>
                  <th width="20%">Gender</th>
                </tr>
              </thead>
              <tbody>
                {patientsList}
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PatientsPage;
