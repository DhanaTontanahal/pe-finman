import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import {
  fetchProjects,
  saveProject,
  deleteProjectFromDb,
} from "../../redux/projectActions";
import { fetchClients } from "../../redux/client/clientActions";
import "./ProjectsManager.css";

Modal.setAppElement("#root");

const ProjectsManager = ({ useFirebase }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const clients = useSelector((state) => state.clients);
  const [project, setProject] = useState({
    id: "",
    name: "",
    description: "",
    clientId: "",
    status: "active",
  });
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [filter, setFilter] = useState("active");

  useEffect(() => {
    dispatch(fetchProjects(useFirebase));
    dispatch(fetchClients(useFirebase));
  }, [dispatch, useFirebase]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveProject(project, useFirebase));
    setProject({
      id: "",
      name: "",
      description: "",
      clientId: "",
      status: "active",
    });
    setShowModal(false);
  };

  const handleEdit = (project) => {
    setProject(project);
    setShowModal(true);
  };

  const handleDelete = (projectId) => {
    setProjectToDelete(projectId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProjectFromDb(projectToDelete, useFirebase));
    setShowConfirmModal(false);
    setProjectToDelete(null);
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "active") return !project.archived;
    if (filter === "archived") return project.archived;
    return true; // For "all" filter
  });

  return (
    <div className="projects-manager">
      <h1>Manage Projects</h1>
      <div className="projects-manager-header">
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
          <button className="add-button" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add Project
          </button>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{project.id ? "Edit Project" : "Create new project"}</h2>
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label>Enter project name</label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Select client</label>
            <select
              name="clientId"
              value={project.clientId}
              onChange={handleInputChange}
              required
            >
              <option value="">--Select Client--</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={project.status}
              onChange={handleInputChange}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">
              {project.id ? "Update Project" : "Create"}
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
      </Modal>
      <h2>Projects List</h2>
      <table className="projects-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Client</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                {clients.find((client) => client.id === project.clientId)?.name}
              </td>
              <td>{project.status}</td>
              <td>
                <button
                  className="action-button"
                  onClick={() => handleEdit(project)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="action-button"
                  onClick={() => handleDelete(project.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this project?</p>
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

export default ProjectsManager;
