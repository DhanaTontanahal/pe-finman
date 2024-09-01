import React, { useState } from "react";
import Modal from "react-modal";

const NodeModal = ({ node, isOpen, onRequestClose, editNode }) => {
  const [name, setName] = useState(node.name);
  const [role, setRole] = useState(node.role);
  const [empId, setEmpId] = useState(node.empId || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    editNode(node.id, { name, role, empId });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Edit Node</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Designation:</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <div>
          <label>Employee ID:</label>
          <input value={empId} onChange={(e) => setEmpId(e.target.value)} />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onRequestClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default NodeModal;
