import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

function ProcedureEdit(props) {
    const [procedure, setProcedure] = useState({
        name: '',
        description: '',
        price: '',
        appointmentId: '',
    });

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (props.match.params.id !== 'new') {
            loadProcedure();
        }
        loadAppointments();
    }, []);

    async function loadProcedure() {
        const response = await fetch(`/api/procedures/${props.match.params.id}`);
        const data = await response.json();
        setProcedure(data);
    }

    async function loadAppointments() {
        const response = await fetch('/api/appointments');
        const appointmentsData = await response.json();

        const proceduresResponse = await fetch('/api/procedures');
        const proceduresData = await proceduresResponse.json();

        const filteredAppointments = appointmentsData.filter((appointment) => {
            return !proceduresData.some((procedure) => procedure.appointment?.id === appointment.id);
        });

        // Fetch patients for each appointment
        for (const appointment of filteredAppointments) {
            const patientResponse = await fetch(`/api/patients/${appointment.patientId}`);
            const patientData = await patientResponse.json();
            appointment.patient = patientData;
        }

        setAppointments(filteredAppointments);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const postData = {
            name: procedure.name,
            description: procedure.description,
            price: procedure.price,
            appointment: {
                id: procedure.appointmentId,
            },
        };

        await fetch('/api/procedures' + (procedure.id ? '/' + procedure.id : ''), {
            method: procedure.id ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        props.history.push('/procedures');
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setProcedure((prevProcedure) => ({
            ...prevProcedure,
            [name]: value,
        }));
    }

    return (
        <div>
            <Container>
                <h2>{procedure.id ? 'Edit Procedure' : 'Add Procedure'}</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={procedure.name}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            type="text"
                            name="description"
                            id="description"
                            value={procedure.description}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input
                            type="text"
                            name="price"
                            id="price"
                            value={procedure.price}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="appointmentId">Appointment</Label>
                        <Input
                            type="select"
                            name="appointmentId"
                            id="appointmentId"
                            value={procedure.appointmentId}
                            onChange={handleChange}
                        >
                            <option value="">Select Appointment</option>
                            {appointments.map((appointment) => (
                                <option key={appointment.id} value={appointment.id}>
                                    {`${appointment.dateTime} - ${appointment.location} - ${appointment.patient.firstName
                                        } ${appointment.patient.lastName}`}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Button>Save</Button>{' '}
                        <Link to="/procedures">
                            <Button>Cancel</Button>
                        </Link>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}

export default withRouter(ProcedureEdit);
