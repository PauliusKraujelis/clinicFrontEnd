import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import './EditSettings.css';
import { useTranslation } from 'react-i18next';

function PatientEdit(props) {
  const { t } = useTranslation();
  const [item, setItem] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: 0,
  });

  useEffect(() => {
    loadPatient();
  }, []);

  async function loadPatient() {
    if (props.match.params.id !== 'new') {
      console.log(props);
      const patient = await (await fetch(`/api/patients/${props.match.params.id}`)).json();
      setItem(patient);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch('/api/patients' + (item.id ? '/' + item.id : ''), {
      method: item.id ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    props.history.push('/patients');
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  }

  return (
    <div>
      <Container className="edit-container">
        <h2>{item.id ? t('patientEdit.editPatient') : t('patientEdit.addPatient')}</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="firstName">{t('patientEdit.firstName')}</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={item.firstName || ''}
              onChange={handleChange}
              autoComplete="firstName"
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">{t('patientEdit.lastName')}</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={item.lastName || ''}
              onChange={handleChange}
              autoComplete="lastName"
            />
          </FormGroup>
          <FormGroup>
            <Label for="gender">{t('patientEdit.gender')}</Label>
            <Input
              type="text"
              name="gender"
              id="gender"
              value={item.gender || ''}
              onChange={handleChange}
              autoComplete="gender"
            />
          </FormGroup>
          <FormGroup>
            <Label for="age">{t('patientEdit.age')}</Label>
            <Input
              type="number"
              name="age"
              id="age"
              value={item.age || ''}
              onChange={handleChange}
              autoComplete="age"
            />
          </FormGroup>
          <FormGroup className="button-group">
            <Button className="save-button">{t('buttons.saveButton')}</Button>{' '}
            <Link to="/patients">
              <Button className="cancel-button">{t('buttons.cancelButton')}</Button>
            </Link>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}

export default withRouter(PatientEdit);
