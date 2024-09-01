import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchTimesheets,
  saveTimesheet,
  deleteTimesheetFromDb,
} from "../../redux/timesheet/timesheetActions";
import TimesheetForm from "./TimesheetForm";
import TimesheetTable from "./TimesheetTable";
import "./TimesheetManager.css";

Modal.setAppElement("#root");

const TimesheetManager = ({ useFirebase }) => {
  const dispatch = useDispatch();
  const timesheets = useSelector((state) => state.timesheets);
  const [timesheet, setTimesheet] = useState({
    id: "",
    projectName: "",
    clientName: "",
    time: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [timesheetToDelete, setTimesheetToDelete] = useState(null);
  const [filter, setFilter] = useState("active");

  useEffect(() => {
    dispatch(fetchTimesheets(useFirebase));
  }, [dispatch, useFirebase]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTimesheet({ ...timesheet, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveTimesheet(timesheet, useFirebase));
    setTimesheet({
      id: "",
      projectName: "",
      clientName: "",
      time: "",
    });
    setShowModal(false);
    setEditMode(false);
  };

  const handleEdit = (timesheet) => {
    setTimesheet(timesheet);
    setShowModal(true);
    setEditMode(true);
  };

  const handleDelete = (timesheetId) => {
    setTimesheetToDelete(timesheetId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTimesheetFromDb(timesheetToDelete, useFirebase)).then(
      (response) => {
        if (response) {
          toast.success("Timesheet deleted successfully!");
        } else {
          toast.error("Failed to delete timesheet.");
        }
      }
    );
    setShowConfirmModal(false);
    setTimesheetToDelete(null);
  };

  const filteredTimesheets = timesheets?.filter((timesheet) => {
    if (filter === "active") return !timesheet.archived;
    if (filter === "archived") return timesheet.archived;
    return true; // For "all" filter
  });

  return (
    <div className="timesheet-manager">
      <ToastContainer />
      <h1>Timesheets</h1>
      <div className="timesheet-manager-header">
        <div className="filter-container">
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="active">Show active</option>
            <option value="archived">Show archived</option>
            <option value="all">Show all</option>
          </select>
          <input
            type="text"
            placeholder="Search by project name"
            className="search-input"
          />
        </div>
        <button
          className="add-button"
          onClick={() => {
            setShowModal(true);
            setEditMode(false);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Add new timesheet
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{editMode ? "Edit Timesheet" : "Create new timesheet"}</h2>
        <TimesheetForm
          timesheet={timesheet}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          editMode={editMode}
          setShowModal={setShowModal}
        />
      </Modal>
      <h2>Timesheets List</h2>
      <TimesheetTable
        timesheets={filteredTimesheets}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Modal
        isOpen={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Delete</h2>
        <p>
          Are you sure you want to delete this timesheet? If the timesheet has
          associated records, they will be archived.
        </p>
        <div className="form-row">
          <button onClick={confirmDelete} className="submit-button">
            Yes
          </button>
          <button
            onClick={() => setShowConfirmModal(false)}
            className="cancel-button"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TimesheetManager;
