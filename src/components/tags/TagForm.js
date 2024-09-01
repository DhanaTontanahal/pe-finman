import React from "react";
import "./TagForm.css";

const TagForm = ({
  tag,
  handleInputChange,
  handleSubmit,
  editMode,
  setShowModal,
}) => {
  return (
    <form onSubmit={handleSubmit} className="tag-form">
      <div className="form-row">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={tag.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={tag.description}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <button type="submit" className="submit-button">
          {editMode ? "Update Tag" : "Create"}
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TagForm;
