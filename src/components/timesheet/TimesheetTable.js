import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./TimesheetTable.css";

const TimesheetTable = ({ timesheets, handleEdit, handleDelete }) => {
  if (!timesheets || timesheets.length === 0) {
    return <p>No timesheets available.</p>;
  }

  return (
    <table className="timesheets-table">
      <thead>
        <tr>
          <th>Project</th>
          <th>Date</th>
          <th>Hours</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {timesheets.map((timesheet) => (
          <tr key={timesheet.id}>
            <td>{timesheet.project}</td>
            <td>{timesheet.date}</td>
            <td>{timesheet.hours}</td>
            <td>
              <button
                className="action-button"
                onClick={() => handleEdit(timesheet)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="action-button"
                onClick={() => handleDelete(timesheet.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimesheetTable;
