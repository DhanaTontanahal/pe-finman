import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ClientList = ({ clients, handleEdit, handleDelete }) => {
  return (
    <table className="clients-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Currency</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.address}</td>
            <td>{client.currency}</td>
            <td>
              <button
                className="action-button"
                onClick={() => handleEdit(client)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="action-button"
                onClick={() => handleDelete(client.id)}
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

export default ClientList;
