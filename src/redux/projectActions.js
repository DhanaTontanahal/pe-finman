import axios from "axios";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  update,
  remove,
} from "firebase/database";
import { useFirebase } from "../config";

export const setProjects = (projects) => ({
  type: "SET_PROJECTS",
  payload: projects,
});

export const addProject = (project) => ({
  type: "ADD_PROJECT",
  payload: project,
});

export const updateProject = (project) => ({
  type: "UPDATE_PROJECT",
  payload: project,
});

export const deleteProject = (projectId) => ({
  type: "DELETE_PROJECT",
  payload: projectId,
});

export const fetchProjects = (useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      const projectsRef = ref(db, "projects");
      onValue(projectsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const projects = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch(setProjects(projects));
        } else {
          dispatch(setProjects([]));
        }
      });
    } else {
      axios.get("/api/projects").then((response) => {
        dispatch(setProjects(response.data));
      });
    }
  };
};

export const saveProject = (project, useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      if (project.id) {
        const projectRef = ref(db, "projects/" + project.id);
        update(projectRef, project);
        dispatch(updateProject(project));
      } else {
        const newProjectRef = push(ref(db, "projects"));
        const newProjectId = newProjectRef.key;
        set(newProjectRef, { ...project, id: newProjectId });
        dispatch(addProject({ ...project, id: newProjectId }));
      }
    } else {
      if (project.id) {
        axios.put(`/api/projects/${project.id}`, project).then((response) => {
          dispatch(updateProject(response.data));
        });
      } else {
        axios.post("/api/projects", project).then((response) => {
          dispatch(addProject(response.data));
        });
      }
    }
  };
};

export const deleteProjectFromDb = (projectId, useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      const projectRef = ref(db, "projects/" + projectId);
      remove(projectRef);
      dispatch(deleteProject(projectId));
    } else {
      axios.delete(`/api/projects/${projectId}`).then(() => {
        dispatch(deleteProject(projectId));
      });
    }
  };
};
