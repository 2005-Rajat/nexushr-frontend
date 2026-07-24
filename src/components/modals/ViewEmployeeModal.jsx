import { Modal, Button, Row, Col } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

function ViewEmployeeModal({ show, handleClose, employee }) {

    if (!employee) return null;

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">

            <Modal.Header closeButton>
                <Modal.Title>Employee Profile</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <div className="text-center mb-4">
                    <FaUserCircle size={80} color="#2563eb" />
                    <h4 className="mt-2 mb-0">{employee.name}</h4>
                    <span className="text-muted">{employee.designation}</span>
                </div>

                <Row>

                    <Col md={6} className="mb-3">
                        <small className="text-muted d-block">Employee ID</small>
                        <strong>{employee.employeeId}</strong>
                    </Col>

                    <Col md={6} className="mb-3">
                        <small className="text-muted d-block">Status</small>
                        <strong>{employee.status || "Active"}</strong>
                    </Col>

                    <Col md={6} className="mb-3">
                        <small className="text-muted d-block">Email</small>
                        <strong>{employee.email}</strong>
                    </Col>

                    <Col md={6} className="mb-3">
                        <small className="text-muted d-block">Department</small>
                        <strong>{employee.department}</strong>
                    </Col>

                    <Col md={6} className="mb-3">
                        <small className="text-muted d-block">Salary</small>
                        <strong>₹ {employee.salary}</strong>
                    </Col>

                    <Col md={6} className="mb-3">
                        <small className="text-muted d-block">Joining Date</small>
                        <strong>{employee.joiningDate}</strong>
                    </Col>

                </Row>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>

        </Modal>
    );
}

export default ViewEmployeeModal;