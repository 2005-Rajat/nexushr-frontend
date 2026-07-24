import { Modal, Button } from "react-bootstrap";
import API from "../../services/api";

function DeleteConfirmModal({ show, handleClose, employee, loadEmployees }) {

    const confirmDelete = async () => {

        try {

            await API.delete(`/employees/${employee.id}`);

            loadEmployees();

            handleClose();

        } catch (error) {

            console.log(error);

            alert("Unable to Delete Employee");

        }

    };

    if (!employee) return null;

    return (

        <Modal show={show} onHide={handleClose} centered>

            <Modal.Header closeButton>
                <Modal.Title>Delete Employee?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure you want to delete <strong>{employee.name}</strong> ({employee.employeeId})? This cannot be undone.
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={confirmDelete}>Delete</Button>
            </Modal.Footer>

        </Modal>

    );

}

export default DeleteConfirmModal;