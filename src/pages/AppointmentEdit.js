import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import './EditSettings.css';
import { useTranslation } from 'react-i18next';

function AppointmentEdit(props) {
    const { t } = useTranslation();
    const [appointment, setAppointment] = useState({
        dateTime: '',
        location: '',
        patientId: '',
    });

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        loadAppointment();
        loadPatients();
    }, []);

    async function loadAppointment() {
        if (props.match.params.id !== 'new') {
            const response = await fetch(`/api/appointments/${props.match.params.id}`);
            const data = await response.json();
            setAppointment(data);
        }
    }

    async function loadPatients() {
        const response = await fetch("/api/patients");
        const data = await response.json();
        setPatients(data);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const postData = {
            dateTime: appointment.dateTime,
            location: appointment.location,
            patient: {
                id: appointment.patientId,
            },
        };

        await fetch('/api/appointments' + (appointment.id ? '/' + appointment.id : ''), {
            method: appointment.id ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        props.history.push('/appointments');
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            [name]: value,
        }));
    }

    return (
        <div>
            <Container className="edit-container">
                <h2>{appointment.id ? t('appointmentsEdit.editAppointment') : t('appointmentsEdit.addAppointment')}</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="dateTime">{t('appointmentsEdit.dateTime')}</Label>
                        <Input
                            type="datetime-local"
                            name="dateTime"
                            id="dateTime"
                            value={appointment.dateTime}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">{t('appointmentsEdit.location')}</Label>
                        <Input
                            type="text"
                            name="location"
                            id="location"
                            value={appointment.location}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="patientId">{t('appointmentsEdit.patient')}</Label>
                        <Input
                            type="select"
                            name="patientId"
                            id="patientId"
                            value={appointment.patientId}
                            onChange={handleChange}
                        >
                            <option value="">Select Patient</option>
                            {patients.map((patient) => (
                                <option key={patient.id} value={patient.id}>
                                    {`${patient.firstName} ${patient.lastName}`}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>

                    <FormGroup className="button-group">
                        <Button className="save-button">{t('buttons.saveButton')}</Button>{' '}
                        <Link to="/appointments">
                            <Button className="cancel-button">{t('buttons.cancelButton')}</Button>
                        </Link>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}

export default withRouter(AppointmentEdit);
