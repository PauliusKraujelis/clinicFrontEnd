import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PatientsPage() {
  const [patients, setPatients] = useState([]);

  async function loadPatients() {
    const response = await fetch("/api/patients");
    console.log(response);
    const data = await response.json();
    console.log(data);
    setPatients(data);
  }

  async function remove(id) {
    console.log(`Making DELETE request with id ` + {id});
    await fetch(`/api/patients/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      console.log("Got response");
      let updatedPatients = [...patients].filter(i => i.id !== id);
      setPatients(updatedPatients);
    }
    )
      ;
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
        <td>
          <ButtonGroup>
            <Link to={`/patients/${patient.id}/edit`}>Edit</Link>
            <Button size="sm" color="danger" onClick={() => remove(patient.id)}>Delete</Button>
          </ButtonGroup>
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
              <Button color="success" tag={Link} to="/patients/new">Add Patient</Button>
            </div>
            <h2>Patients</h2>

            <Table className="mt-4 text-dark">
              <thead>
                <tr>
                  <th width="30%">id</th>
                  <th width="30%">First Name</th>
                  <th width="30%">Last Name</th>
                  <th width="40%">Age</th>
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
