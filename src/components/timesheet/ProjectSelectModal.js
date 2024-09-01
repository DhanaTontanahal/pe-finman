import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { getDatabase, ref, onValue } from "firebase/database";
import CreateProjectModal from "./CreateProjectModal";
import CreateTaskModal from "./CreateTaskModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import "./ProjectSelectModal.css";

const ProjectSelectModal = ({ show, onClose, onTaskCreate }) => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState({});
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const projectsRef = ref(db, "projects");
    const clientsRef = ref(db, "clients");

    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const projectList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
          tasks: data[key].tasks
            ? Object.entries(data[key].tasks).map(([taskId, taskName]) => ({
                id: taskId,
                name: taskName,
              }))
            : [],
        }));
        setProjects(projectList);
      }
    });

    onValue(clientsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setClients(data);
      }
    });
  }, []);

  const getClientName = (clientId) => {
    return clients[clientId] ? clients[clientId].name : "Unknown Client";
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getClientName(project.clientId)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (project) => {
    onClose({ project, task: null });
  };

  const handleTaskClick = (project, task, client) => {
    onClose({ client, project, task });
  };

  const handleTaskCreate = (project) => {
    setCurrentProject(project);
    setShowCreateTaskModal(true);
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => onClose(null)}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Select Project</h2>
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search project or client"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <ul className="project-list">
        {filteredProjects.map((project) => (
          <li key={project.id} className="project-item">
            <span
              className="project-color"
              style={{ backgroundColor: project.color || "#000" }}
            ></span>
            <span className="project-name-client">
              {project.name} {getClientName(project.clientId)}
            </span>
            {project.tasks && project.tasks.length > 0 ? (
              <button
                className="expand-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedProjectId(
                    expandedProjectId === project.id ? null : project.id
                  );
                }}
              >
                <FontAwesomeIcon
                  icon={
                    expandedProjectId === project.id ? faAngleUp : faAngleDown
                  }
                />
                {project.tasks.length} task{project.tasks.length > 1 ? "s" : ""}
              </button>
            ) : (
              <button
                className="task-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTaskCreate(project);
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> Create task
              </button>
            )}
            {expandedProjectId === project.id && (
              <ul className="task-list">
                {project.tasks.map((task) => (
                  <li
                    key={task.id}
                    className="task-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskClick(
                        project,
                        task,
                        getClientName(project.clientId)
                      );
                    }}
                  >
                    {task.name}
                  </li>
                ))}
                <li className="task-item" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="task-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskCreate(project);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Create task
                  </button>
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="modal-actions">
        <button
          className="create-button"
          onClick={() => setShowCreateProjectModal(true)}
        >
          + Create new project
        </button>
        <button className="cancel-button" onClick={() => onClose(null)}>
          Cancel
        </button>
      </div>
      <CreateProjectModal
        isOpen={showCreateProjectModal}
        onRequestClose={() => setShowCreateProjectModal(false)}
      />
      <CreateTaskModal
        isOpen={showCreateTaskModal}
        onRequestClose={() => setShowCreateTaskModal(false)}
        project={currentProject}
      />
    </Modal>
  );
};

export default ProjectSelectModal;
