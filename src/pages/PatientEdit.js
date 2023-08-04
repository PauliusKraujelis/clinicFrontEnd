import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';


function PatientEdit(props) {

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
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    props.history.push('/patients');
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }));
  }

  return (
    <div>
      <Container>
        <h2>{item.id ? 'Edit Patient' : 'Add Patient'}</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
              onChange={handleChange} autoComplete="firstName" />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input type="text" name="lastName" id="lastName" value={item.lastName || ''}
              onChange={handleChange} autoComplete="lastName" />
          </FormGroup>
          <FormGroup>
            <Label for="gender">Gender</Label>
            <Input type="text" name="gender" id="gender" value={item.gender || ''}
              onChange={handleChange} autoComplete="gender" />
          </FormGroup>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input type="number" name="age" id="age" value={item.age || ''}
              onChange={handleChange} autoComplete="age" />
          </FormGroup>
          <FormGroup>
            <Button>Save</Button>{' '}
            <Link to={`/patients`}>
              <Button>Cancel</Button>
            </Link>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}

export default withRouter(PatientEdit);
