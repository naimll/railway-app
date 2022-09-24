import React, { Component } from "react";
import { Modal, Button } from "bootstrap";
const ModalDialog = React.forwardRef(({ ...props }, ref) => {
  const [isShow, invokeModal] = React.useState(false);
  const initModal = (props) => {
    return invokeModal(!false);
  };
  return (
    <>
      {/* <Button variant="success" onClick={initModal}>
      <i class="fa-solid fa-eye"></i>
      </Button> */}
      <a onClick={() => initModal()} style={{ cursor: "pointer" }}>
        <i class="fa-solid fa-eye"></i>
      </a>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>{props.attractionName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.description}</Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
          <Button variant="dark" onClick={initModal}>
            Store
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});
export default ModalDialog;
