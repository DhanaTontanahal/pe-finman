import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateClientModal from "./CreateClientModal";
import "./CreateProjectModal.css";

const CreateProjectModal = ({ show, onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [client, setClient] = useState("");
  const [color, setColor] = useState("#000000");
  const [publicProject, setPublicProject] = useState(true);
  const [template, setTemplate] = useState("");
  const [clients, setClients] = useState([]);
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const clientsRef = ref(db, "clients");
    onValue(clientsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const clientList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setClients(clientList);
      }
    });
  }, []);

  const handleCreateProject = () => {
    const db = getDatabase();
    const newProjectRef = push(ref(db, "projects"));
    const newProjectId = newProjectRef.key;
    set(newProjectRef, {
      id: newProjectId,
      name: projectName,
      client,
      color,
      public: publicProject,
      template,
    }).then(() => {
      onClose();
    });
  };

  const handleClientCreate = (newClient) => {
    setClients([...clients, newClient]);
    setClient(newClient.id);
    setShowCreateClientModal(false);
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Create new project</h2>
      <div className="form-group">
        <label>Enter project name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
        />
      </div>
      <div className="form-group client-select-group">
        <label>Select client</label>
        <div className="client-select">
          <select value={client} onChange={(e) => setClient(e.target.value)}>
            <option value="" disabled>
              Select client
            </option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <button onClick={() => setShowCreateClientModal(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <div className="form-group">
        <label>Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={publicProject}
            onChange={(e) => setPublicProject(e.target.checked)}
          />
          Public
        </label>
      </div>
      <div className="form-group">
        <label>Template</label>
        <input
          type="text"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          placeholder="No template"
        />
      </div>
      <div className="form-actions">
        <button onClick={handleCreateProject} className="create-button">
          Create
        </button>
        <button onClick={onClose} className="cancel-button">
          Cancel
        </button>
      </div>
      <CreateClientModal
        show={showCreateClientModal}
        onClose={() => setShowCreateClientModal(false)}
        onClientCreate={handleClientCreate}
      />
    </Modal>
  );
};

export default CreateProjectModal;
