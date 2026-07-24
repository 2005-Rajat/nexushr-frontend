import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import API from "../../services/api";

function EmployeeModal({ show, handleClose, loadEmployees }) {

    const [employee, setEmployee] = useState({
        employeeId: "",
        name: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: ""
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const saveEmployee = async () => {

        try {

            await API.post("/employees", employee);

            alert("Employee Added Successfully!");

            loadEmployees();

            setEmployee({
                employeeId: "",
                name: "",
                email: "",
                department: "",
                designation: "",
                salary: "",
                joiningDate: ""
            });

            handleClose();

        } catch (error) {

            console.log(error);

            alert("Unable to Add Employee");

        }

    };

    return (

        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Add New Employee

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <Form>

                    <Row>

                        <Col md={6} className="mb-3">

                            <Form.Label>Employee ID</Form.Label>

                            <Form.Control
                                name="employeeId"
                                value={employee.employeeId}
                                onChange={handleChange}
                            />

                        </Col>

                        <Col md={6} className="mb-3">

                            <Form.Label>Name</Form.Label>

                            <Form.Control
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
                            />

                        </Col>

                        <Col md={6} className="mb-3">

                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                type="email"
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                            />

                        </Col>

                        <Col md={6} className="mb-3">

                            <Form.Label>Department</Form.Label>

                            <Form.Control
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                            />

                        </Col>

                        <Col md={6} className="mb-3">

                            <Form.Label>Designation</Form.Label>

                            <Form.Control
                                name="designation"
                                value={employee.designation}
                                onChange={handleChange}
                            />

                        </Col>

                        <Col md={6} className="mb-3">

                            <Form.Label>Salary</Form.Label>

                            <Form.Control
                                type="number"
                                name="salary"
                                value={employee.salary}
                                onChange={handleChange}
                            />

                        </Col>

                        <Col md={6} className="mb-3">

                            <Form.Label>Joining Date</Form.Label>

                            <Form.Control
                                type="date"
                                name="joiningDate"
                                value={employee.joiningDate}
                                onChange={handleChange}
                            />

                        </Col>

                    </Row>

                </Form>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={handleClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="primary"
                    onClick={saveEmployee}
                >
                    Save Employee
                </Button>

            </Modal.Footer>

        </Modal>

    );

}

export default EmployeeModal;