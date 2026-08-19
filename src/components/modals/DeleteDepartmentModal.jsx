import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import API from "../../services/api";

function DeleteDepartmentModal({ show, handleClose, department, loadDepartments }) {

    const [error, setError] = useState("");

    const confirmDelete = async () => {

        try {

            await API.delete(`/departments/${department.id}`);

            loadDepartments();
            handleClose();

        } catch (error) {

            const message = error.response?.data?.message || "Unable to delete department.";
            setError(message);

        }

    };

    if (!department) return null;

    return (

        <Modal show={show} onHide={handleClose} centered>

            <Modal.Header closeButton>
                <Modal.Title>Delete Department?</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {error && <Alert variant="danger">{error}</Alert>}

                Are you sure you want to delete <strong>{department.name}</strong>? This cannot be undone.
                Employees currently assigned to this department will keep their department field as-is —
                you'll need to reassign them separately.

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={confirmDelete}>Delete</Button>
            </Modal.Footer>

        </Modal>

    );

}

export default DeleteDepartmentModal;
