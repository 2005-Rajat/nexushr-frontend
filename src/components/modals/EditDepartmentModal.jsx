import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import API from "../../services/api";

function EditDepartmentModal({ show, handleClose, department, loadDepartments }) {

    const [form, setForm] = useState({
        name: "",
        headOfDepartment: "",
        location: "",
        description: "",
        budget: ""
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (department) {
            setForm({
                name: department.name || "",
                headOfDepartment: department.headOfDepartment || "",
                location: department.location || "",
                description: department.description || "",
                budget: department.budget ?? ""
            });
        }
    }, [department]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        if (error) setError("");
    };

    const updateDepartment = async () => {

        if (!form.name.trim()) {
            setError("Department name is required.");
            return;
        }

        try {

            await API.put(`/departments/${department.id}`, form);

            loadDepartments();
            handleClose();

        } catch (error) {

            const message = error.response?.data?.message || "Unable to update department.";
            setError(message);

        }

    };

    if (!department) return null;

    return (

        <Modal show={show} onHide={handleClose} centered size="lg">

            <Modal.Header closeButton>
                <Modal.Title>Edit Department</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form>

                    <Row>

                        <Col md={6} className="mb-3">
                            <Form.Label>Department Name *</Form.Label>
                            <Form.Control name="name" value={form.name} onChange={handleChange} />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Head of Department</Form.Label>
                            <Form.Control name="headOfDepartment" value={form.headOfDepartment} onChange={handleChange} />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control name="location" value={form.location} onChange={handleChange} />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Annual Budget (₹)</Form.Label>
                            <Form.Control type="number" name="budget" value={form.budget} onChange={handleChange} />
                        </Col>

                        <Col md={12} className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </Col>

                    </Row>

                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={updateDepartment}>Update Department</Button>
            </Modal.Footer>

        </Modal>

    );

}

export default EditDepartmentModal;
