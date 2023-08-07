import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTranslation } from 'react-i18next';
import './PageSettings.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProcedurePage() {
  const { t } = useTranslation();
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
                <Button className="edit-button">{t('buttons.editButton')}</Button>
              </Link>
              <Button className="delete-button" onClick={() => handleDelete(procedure.id)}>{t('buttons.deleteButton')}</Button>
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
                <Button className="add-button" style={{float: 'right'}} color="primary" size="sm">
                  {t('procedurePage.addButton')}
                </Button>
              </Link>
            </div>
            <h2>{t('procedurePage.title')}</h2>
            <Table className="mt-4 text-dark">
              <thead>
                <tr>
                  <th width="20%">{t('procedurePage.id')}</th>
                  <th width="20%">{t('procedurePage.name')}</th>
                  <th width="20%">{t('procedurePage.description')}</th>
                  <th width="20%">{t('procedurePage.price')}</th>
                  <th width="20%">{t('procedurePage.appointmentID')}</th>
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
