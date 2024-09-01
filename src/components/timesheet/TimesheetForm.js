import React from "react";
import "./TimesheetForm.css";

const TimesheetForm = ({
  timesheet,
  handleInputChange,
  handleSubmit,
  editMode,
  setShowModal,
}) => {
  return (
    <form onSubmit={handleSubmit} className="timesheet-form">
      <div className="form-row">
        <div className="form-group">
          <label>Enter project name</label>
          <input
            type="text"
            name="projectName"
            value={timesheet.projectName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Select client</label>
          <input
            type="text"
            name="clientName"
            value={timesheet.clientName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input
            type="text"
            name="time"
            value={timesheet.time}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <button type="submit" className="submit-button">
          {editMode ? "Update Timesheet" : "Create"}
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

export default TimesheetForm;
