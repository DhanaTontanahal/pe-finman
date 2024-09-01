import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchClients,
  saveClient,
  deleteClientFromDb,
} from "../redux/client/clientActions";
import ClientForm from "./ClientForm";
import ClientList from "./ClientList";
import ClientFilter from "./ClientFilter";
import "./ClientManager.css";

Modal.setAppElement("#root");

const ClientManager = ({ useFirebase }) => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const [client, setClient] = useState({
    id: "",
    name: "",
    address: "",
    currency: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [filter, setFilter] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchClients(useFirebase));
  }, [dispatch, useFirebase]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveClient(client, useFirebase));
    setClient({
      id: "",
      name: "",
      address: "",
      currency: "",
    });
    setShowModal(false);
    setEditMode(false);
  };

  const handleEdit = (client) => {
    setClient(client);
    setShowModal(true);
    setEditMode(true);
  };

  const handleDelete = (clientId) => {
    setClientToDelete(clientId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteClientFromDb(clientToDelete, useFirebase)).then(
      (response) => {
        if (response) {
          toast.success("Client deleted successfully!");
        } else {
          toast.info(
            "This client is associated with a project and has been archived instead of deleted."
          );
        }
      }
    );
    setShowConfirmModal(false);
    setClientToDelete(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredClients = clients
    .filter((client) => {
      if (filter === "active" && !client.archived) return true;
      if (filter === "archived" && client.archived) return true;
      if (filter === "all") return true;
      return false;
    })
    .filter((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="client-manager">
      <ToastContainer />
      <h1>Clients</h1>
      <ClientFilter
        filter={filter}
        setFilter={setFilter}
        handleSearch={handleSearch}
      />
      <button
        className="add-button"
        onClick={() => {
          setShowModal(true);
          setEditMode(false);
        }}
      >
        <FontAwesomeIcon icon={faPlus} /> Add new client
      </button>
      <ClientList
        clients={filteredClients}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{editMode ? "Edit Client" : "Create new client"}</h2>
        <ClientForm
          client={client}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          editMode={editMode}
          closeModal={() => setShowModal(false)}
        />
      </Modal>
      <Modal
        isOpen={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Delete</h2>
        <p>
          Are you sure you want to delete this client? If the client has
          associated projects, they will be archived.
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

export default ClientManager;
