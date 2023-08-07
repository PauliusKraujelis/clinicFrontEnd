import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTranslation } from 'react-i18next';
import './PageSettings.css';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';




function PatientsPage() {
  const { t } = useTranslation();
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
                <Button className="edit-button">{t('buttons.editButton')}</Button>
              </Link>
              <Button className="delete-button" onClick={() => handleDelete(patient.id)}>{t('buttons.deleteButton')}</Button>
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
                <Button className="add-button" style={{float: 'right'}} color="primary" size="sm">
                  {t('patientsPage.addButton')}
                </Button>
              </Link>
            </div>
            <h2>{t('patientsPage.title')}</h2>
            <Table className="mt-4 text-dark">
              <thead>
                <tr>
                  <th width="20%">{t('patientsPage.id')}</th>
                  <th width="20%">{t('patientsPage.firstName')}</th>
                  <th width="20%">{t('patientsPage.lastName')}</th>
                  <th width="20%">{t('patientsPage.age')}</th>
                  <th width="20%">{t('patientsPage.gender')}</th>
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
