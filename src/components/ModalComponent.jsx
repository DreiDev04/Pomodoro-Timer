// ModalComponent.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./modal.scss"; // Import the CSS file for styling

const ModalComponent = ({ show, handleClose, handleSkipBreak, handleTakeBreak }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>It's Break Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>Take a break; rest, refocus, and come back stronger.</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleSkipBreak}>
          Skip Break
        </Button>
        <Button variant="primary" onClick={handleTakeBreak}>
          Take a Break
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
