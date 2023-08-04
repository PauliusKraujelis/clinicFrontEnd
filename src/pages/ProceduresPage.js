import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProcedurePage() {
  const [procedures, setProcedures] = useState([]);

  async function loadProcedures() {
    const response = await fetch("/api/procedures");
    const data = await response.json();
    setProcedures(data);
  }

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Please confirm procedure deletion!');
    if (isConfirmed) {
      remove(id);
    }
  };

  async function remove(id) {
    await fetch(`/api/procedures/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedProcedures = procedures.filter(procedure => procedure.id !== id);
      setProcedures(updatedProcedures);
    });
  }

  useEffect(() => {
    loadProcedures();
  }, []);

  const proceduresList = procedures.map(procedure => {
    return (
      <tr key={procedure.id}>
        <td>{procedure.id}</td>
        <td>{procedure.name}</td>
        <td>{procedure.description}</td>
        <td>{procedure.price}</td>
        <td>{procedure.appointment.patient?.firstName} {procedure.appointment.patient?.lastName}</td>
        <td>
          <div className='d-inline-block'>
            <ButtonGroup>
              <Link to={`/procedures/${procedure.id}/edit`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={() => handleDelete(procedure.id)}>Delete</Button>
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
              <Link to={"/procedures/new"}>
                <Button color="primary" size="sm">Add Procedure</Button>
              </Link>
            </div>
            <h2>Procedures</h2>
            <Table className="mt-4 text-dark">
              <thead>
                <tr>
                  <th width="20%">ID</th>
                  <th width="20%">Name</th>
                  <th width="20%">Description</th>
                  <th width="20%">Price</th>
                  <th width="20%">Appointment ID</th>
                </tr>
              </thead>
              <tbody>
                {proceduresList}
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProcedurePage;
