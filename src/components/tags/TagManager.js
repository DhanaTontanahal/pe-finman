import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchTags,
  saveTag,
  deleteTagFromDb,
} from "../../redux/tag/tagActions";
import TagForm from "./TagForm";
import TagTable from "./TagTable";
import "./TagManager.css";

Modal.setAppElement("#root");

const TagManager = ({ useFirebase }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);
  const [tag, setTag] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);
  const [filter, setFilter] = useState("active");

  useEffect(() => {
    dispatch(fetchTags(useFirebase));
  }, [dispatch, useFirebase]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTag({ ...tag, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveTag(tag, useFirebase));
    setTag({
      id: "",
      name: "",
      description: "",
    });
    setShowModal(false);
    setEditMode(false);
  };

  const handleEdit = (tag) => {
    setTag(tag);
    setShowModal(true);
    setEditMode(true);
  };

  const handleDelete = (tagId) => {
    setTagToDelete(tagId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTagFromDb(tagToDelete, useFirebase)).then((response) => {
      if (response) {
        toast.success("Tag deleted successfully!");
      } else {
        toast.error("Failed to delete tag.");
      }
    });
    setShowConfirmModal(false);
    setTagToDelete(null);
  };

  const filteredTags = tags.filter((tag) => {
    if (filter === "active") return !tag.archived;
    if (filter === "archived") return tag.archived;
    return true; // For "all" filter
  });

  return (
    <div className="tag-manager">
      <ToastContainer />
      <h1>Tags</h1>
      <div className="tag-manager-header">
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
            placeholder="Search by name"
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
          <FontAwesomeIcon icon={faPlus} /> Add new tag
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{editMode ? "Edit Tag" : "Create new tag"}</h2>
        <TagForm
          tag={tag}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          editMode={editMode}
          setShowModal={setShowModal}
        />
      </Modal>
      <h2>Tags List</h2>
      <TagTable
        tags={filteredTags}
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
        <p>Are you sure you want to delete this tag?</p>
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

export default TagManager;
