import { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import API from "../../services/api";

function DepartmentModal({ show, handleClose, loadDepartments }) {

    const [department, setDepartment] = useState({
        name: "",
        headOfDepartment: "",
        location: "",
        description: "",
        budget: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setDepartment({
            ...department,
            [e.target.name]: e.target.value
        });
        if (error) setError("");
    };

    const resetForm = () => {
        setDepartment({
            name: "",
            headOfDepartment: "",
            location: "",
            description: "",
            budget: ""
        });
    };

    const saveDepartment = async () => {

        if (!department.name.trim()) {
            setError("Department name is required.");
            return;
        }

        try {

            await API.post("/departments", department);

            loadDepartments();
            resetForm();
            handleClose();

        } catch (error) {

            const message = error.response?.data?.message || "Unable to add department.";
            setError(message);

        }

    };

    return (

        <Modal show={show} onHide={handleClose} centered size="lg">

            <Modal.Header closeButton>
                <Modal.Title>Add New Department</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form>

                    <Row>

                        <Col md={6} className="mb-3">
                            <Form.Label>Department Name *</Form.Label>
                            <Form.Control
                                name="name"
                                placeholder="e.g. Engineering"
                                value={department.name}
                                onChange={handleChange}
                            />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Head of Department</Form.Label>
                            <Form.Control
                                name="headOfDepartment"
                                placeholder="e.g. Priya Sharma"
                                value={department.headOfDepartment}
                                onChange={handleChange}
                            />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                name="location"
                                placeholder="e.g. Ludhiana HQ, 3rd Floor"
                                value={department.location}
                                onChange={handleChange}
                            />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Annual Budget (₹)</Form.Label>
                            <Form.Control
                                type="number"
                                name="budget"
                                placeholder="e.g. 2500000"
                                value={department.budget}
                                onChange={handleChange}
                            />
                        </Col>

                        <Col md={12} className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="description"
                                placeholder="What does this department do?"
                                value={department.description}
                                onChange={handleChange}
                            />
                        </Col>

                    </Row>

                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={saveDepartment}>Save Department</Button>
            </Modal.Footer>

        </Modal>

    );

}

export default DepartmentModal;
