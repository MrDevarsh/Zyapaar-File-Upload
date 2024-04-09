import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        {children}
        <button className="close-button" onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
