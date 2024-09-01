import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./TagTable.css";

const TagTable = ({ tags, handleEdit, handleDelete }) => {
  return (
    <table className="tags-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tags.map((tag) => (
          <tr key={tag.id}>
            <td>{tag.name}</td>
            <td>{tag.description}</td>
            <td>
              <button className="action-button" onClick={() => handleEdit(tag)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="action-button"
                onClick={() => handleDelete(tag.id)}
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

export default TagTable;
