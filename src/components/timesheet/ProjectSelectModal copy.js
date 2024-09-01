// src/components/ProjectSelectModal.js
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import "./ProjectSelectModal.css"; // Ensure to create this CSS file for styling

const ProjectSelectModal = ({ show, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const projectsRef = ref(database, "projects");
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      const projectsArray = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setProjects(projectsArray);
    });
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => onClose(null)}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Select Project</h2>
      <input
        type="text"
        placeholder="Search project or client"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="project-list">
        {filteredProjects.map((project) => (
          <li key={project.id} onClick={() => onClose(project)}>
            {project.name} - {project.client}
          </li>
        ))}
      </ul>
      <button onClick={() => onClose(null)} className="cancel-button">
        Cancel
      </button>
    </Modal>
  );
};

export default ProjectSelectModal;
