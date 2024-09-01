import React, { useState } from "react";
import Modal from "react-modal";
import { getDatabase, ref, push, set } from "firebase/database";
import "./CreateTaskModal.css";

const CreateTaskModal = ({ isOpen, onRequestClose, project }) => {
  const [taskName, setTaskName] = useState("");

  const handleCreateTask = () => {
    if (!taskName) return;
    const db = getDatabase();
    const newTaskRef = push(ref(db, `projects/${project.id}/tasks`));
    set(newTaskRef, taskName).then(() => {
      setTaskName("");
      onRequestClose();
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Create Task</h2>
      <div className="form-group">
        <label>Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="modal-actions">
        <button className="create-button" onClick={handleCreateTask}>
          Create
        </button>
        <button className="cancel-button" onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default CreateTaskModal;
