import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

function AppointmentEdit(props) {
    const [appointment, setAppointment] = useState({
        dateTime: '',
        location: '',
        patientId: '',
    });

    const [appointments, setAppointments] = useState([]); // State to store the list of appointments

    useEffect(() => {
        loadAppointment();
        loadAppointments(); // Fetch the list of existing appointments
    }, []);

    async function loadAppointment() {
        if (props.match.params.id !== 'new') {
            const response = await fetch(`/api/appointments/${props.match.params.id}`);
            const data = await response.json();
            setAppointment(data);
        }
    }

    async function loadAppointments() {
        const response = await fetch('/api/appointments');
        const data = await response.json();
        setAppointments(data);
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
            <Container>
                <h2>{appointment.id ? 'Edit Appointment' : 'Add Appointment'}</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="dateTime">Date and Time</Label>
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
                        <Label for="location">Location</Label>
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
                        <Label for="patientId">Patient</Label>
                        <Input
                            type="select"
                            name="patientId"
                            id="patientId"
                            value={appointment.patientId}
                            onChange={handleChange}
                        >
                            <option value="">Select Patient</option>
                            {appointments.map((appointment) => (
                                <option key={appointment.id} value={appointment.id}>
                                    {`${appointment.dateTime} - ${appointment.location}`}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Button>Save</Button>{' '}
                        <Link to={`/appointments`}>
                            <Button>Cancel</Button>
                        </Link>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}

export default withRouter(AppointmentEdit);
