import React from "react";

const ClientForm = ({
  client,
  handleInputChange,
  handleSubmit,
  editMode,
  closeModal,
}) => {
  return (
    <form onSubmit={handleSubmit} className="client-form">
      <div className="form-row">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={client.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Currency</label>
          <input
            type="text"
            name="currency"
            value={client.currency}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <button type="submit" className="submit-button">
          {editMode ? "Update Client" : "Create"}
        </button>
        <button type="button" className="cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
