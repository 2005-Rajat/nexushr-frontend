import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import API from "../../services/api";

function EditEmployeeModal({ show, handleClose, employee, loadEmployees }) {

    const [form, setForm] = useState({
        employeeId: "",
        name: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: "",
        status: "Active"
    });

    useEffect(() => {
        if (employee) {
            setForm({
                employeeId: employee.employeeId || "",
                name: employee.name || "",
                email: employee.email || "",
                department: employee.department || "",
                designation: employee.designation || "",
                salary: employee.salary || "",
                joiningDate: employee.joiningDate || "",
                status: employee.status || "Active"
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const updateEmployee = async () => {

        try {

            await API.put(`/employees/${employee.id}`, form);

            alert("Employee Updated Successfully!");

            loadEmployees();

            handleClose();

        } catch (error) {

            console.log(error);

            alert("Unable to Update Employee");

        }

    };

    if (!employee) return null;

    return (

        <Modal show={show} onHide={handleClose} centered size="lg">

            <Modal.Header closeButton>
                <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form>

                    <Row>

                        <Col md={6} className="mb-3">
                            <Form.Label>Employee ID</Form.Label>
                            <Form.Control name="employeeId" value={form.employeeId} onChange={handleChange} />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" value={form.name} onChange={handleChange} />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Control name="department" value={form.department} onChange={handleChange} />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control name="designation" value={form.designation} onChange={handleChange} />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="number" name="salary" value={form.salary} onChange={handleChange} />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Joining Date</Form.Label>
                            <Form.Control type="date" name="joiningDate" value={form.joiningDate} onChange={handleChange} />
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" value={form.status} onChange={handleChange}>
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Resigned">Resigned</option>
                            </Form.Select>
                        </Col>

                    </Row>

                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={updateEmployee}>Update Employee</Button>
            </Modal.Footer>

        </Modal>

    );

}

export default EditEmployeeModal;