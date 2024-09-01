import React, { useState } from "react";
import Modal from "react-modal";
import { getDatabase, ref, push, set } from "firebase/database";
import "./CreateClientModal.css";

const CreateClientModal = ({ show, onClose, onClientCreate }) => {
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientCurrency, setClientCurrency] = useState("");

  const handleCreateClient = () => {
    const db = getDatabase();
    const newClientRef = push(ref(db, "clients"));
    const newClientId = newClientRef.key;
    const newClient = {
      id: newClientId,
      name: clientName,
      address: clientAddress,
      currency: clientCurrency,
    };
    set(newClientRef, newClient).then(() => {
      onClientCreate(newClient);
      onClose();
    });
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Create new client</h2>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          value={clientAddress}
          onChange={(e) => setClientAddress(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Currency</label>
        <input
          type="text"
          value={clientCurrency}
          onChange={(e) => setClientCurrency(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button onClick={handleCreateClient} className="create-button">
          Create
        </button>
        <button onClick={onClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default CreateClientModal;
