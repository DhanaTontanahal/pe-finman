// TimesheetRow.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ProjectSelectModal from "./ProjectSelectModal";
import TimeEntryModal from "./TimeEntryModal";
import "./TimesheetRow.css";

const TimesheetRow = ({
  row,
  rowIndex,
  handleProjectSelect,
  handleTimeChange,
  projects,
  isReadOnly,
  useFirebase,
}) => {
  console.log(JSON.stringify(row));
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTimeEntryModal, setShowTimeEntryModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentTimeEntry, setCurrentTimeEntry] = useState(null);

  const handleProjectModalClose = (selection) => {
    setShowProjectModal(false);
    if (selection) {
      setSelectedProject(selection);
      handleProjectSelect(selection, rowIndex);
    }
  };

  const handleTimeEntryModalClose = (entry) => {
    setShowTimeEntryModal(false);
    if (entry) {
      setCurrentTimeEntry(entry);
      handleTimeChange(entry.time, rowIndex, entry.colIndex, selectedProject);
    }
  };

  const handleTaskCreate = (project) => {
    setSelectedProject(project);
    setShowTimeEntryModal(true);
  };

  const projectDetails =
    row.length > 0 && row[0].projectClient ? row[0].projectClient : null;

  return (
    <tr>
      <td onClick={() => !isReadOnly && setShowProjectModal(true)}>
        {projectDetails ? (
          <span className="project-detail">
            <span
              className="project-color"
              style={{
                backgroundColor: selectedProject
                  ? selectedProject.project.color
                  : "#000",
              }}
            ></span>
            {projectDetails}
          </span>
        ) : (
          <span>
            <FontAwesomeIcon icon={faPlus} /> Select project
          </span>
        )}
      </td>
      {row.map((entry, index) => (
        <td key={index}>
          <input
            type="time"
            value={entry.time}
            onChange={(e) =>
              handleTimeChange(e.target.value, rowIndex, index, selectedProject)
            }
            readOnly={isReadOnly}
          />
          {!isReadOnly && (
            <FontAwesomeIcon
              icon={faEllipsisV}
              onClick={() => {
                setCurrentTimeEntry({ ...entry, rowIndex, colIndex: index });
                setShowTimeEntryModal(true);
              }}
            />
          )}
        </td>
      ))}
      <td>
        {row.reduce((total, entry) => total + parseFloat(entry.time || 0), 0)}
      </td>
      {!isReadOnly && (
        <ProjectSelectModal
          show={showProjectModal}
          onClose={handleProjectModalClose}
          onTaskCreate={handleTaskCreate}
        />
      )}
      {showTimeEntryModal && (
        <TimeEntryModal
          show={showTimeEntryModal}
          onClose={handleTimeEntryModalClose}
          timeEntry={currentTimeEntry}
          useFirebase={useFirebase}
        />
      )}
    </tr>
  );
};

export default TimesheetRow;
