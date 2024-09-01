// TimeEntryModal.js
import React, { useState } from "react";
import Modal from "react-modal";

const TimeEntryModal = ({ show, onClose, timeEntry, useFirebase }) => {
  const [description, setDescription] = useState(timeEntry?.description || "");
  const [tags, setTags] = useState(timeEntry?.tags || "");
  const [billable, setBillable] = useState(timeEntry?.billable || false);

  const handleSave = () => {
    const updatedEntry = {
      ...timeEntry,
      description,
      tags,
      billable,
    };
    onClose(updatedEntry);
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => onClose(null)}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Time Entry Details</h2>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Tags:</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div>
        <label>Billable:</label>
        <input
          type="checkbox"
          checked={billable}
          onChange={(e) => setBillable(e.target.checked)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => onClose(null)}>Cancel</button>
    </Modal>
  );
};

export default TimeEntryModal;
