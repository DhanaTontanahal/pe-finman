import axios from "axios";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { toast } from "react-toastify";

export const setClients = (clients) => ({
  type: "SET_CLIENTS",
  payload: clients,
});

export const addClient = (client) => ({
  type: "ADD_CLIENT",
  payload: client,
});

export const updateClient = (client) => ({
  type: "UPDATE_CLIENT",
  payload: client,
});

export const deleteClient = (clientId) => ({
  type: "DELETE_CLIENT",
  payload: clientId,
});

export const fetchClients = (useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      const clientsRef = ref(db, "clients");
      onValue(clientsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const clients = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch(setClients(clients));
        } else {
          dispatch(setClients([]));
        }
      });
    } else {
      axios.get("/api/clients").then((response) => {
        dispatch(setClients(response.data));
      });
    }
  };
};

export const saveClient = (client, useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      if (client.id) {
        const clientRef = ref(db, "clients/" + client.id);
        return update(clientRef, client).then(() => {
          dispatch(updateClient(client));
        });
      } else {
        const newClientRef = push(ref(db, "clients"));
        const newClientId = newClientRef.key;
        return set(newClientRef, { ...client, id: newClientId }).then(() => {
          dispatch(addClient({ ...client, id: newClientId }));
        });
      }
    } else {
      if (client.id) {
        return axios
          .put(`/api/clients/${client.id}`, client)
          .then((response) => {
            dispatch(updateClient(response.data));
          });
      } else {
        return axios.post("/api/clients", client).then((response) => {
          dispatch(addClient(response.data));
        });
      }
    }
  };
};

export const deleteClientFromDb = (clientId, useFirebase) => {
  return (dispatch) => {
    if (useFirebase) {
      const db = getDatabase();
      const clientProjectsRef = query(
        ref(db, "projects"),
        orderByChild("clientId"),
        equalTo(clientId)
      );

      return new Promise((resolve, reject) => {
        onValue(
          clientProjectsRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              // Client has associated projects, archive the client
              const clientRef = ref(db, "clients/" + clientId);
              update(clientRef, { archived: true })
                .then(() => {
                  toast.info(
                    "This client is associated with a project and has been archived instead of deleted."
                  );
                  resolve(false); // Return false to indicate the client was archived, not deleted
                })
                .catch((error) => {
                  console.error("Error archiving client:", error);
                  reject(error); // Return false if there was an error
                });
            } else {
              // Client has no associated projects, delete the client
              const clientRef = ref(db, "clients/" + clientId);
              remove(clientRef)
                .then(() => {
                  dispatch(deleteClient(clientId));
                  resolve(true); // Return true if the deletion is successful
                })
                .catch((error) => {
                  console.error("Error deleting client:", error);
                  reject(error); // Return false if there was an error
                });
            }
          },
          { onlyOnce: true }
        );
      });
    } else {
      return axios
        .get(`/api/projects?clientId=${clientId}`)
        .then((response) => {
          const projects = response.data;
          if (projects.length > 0) {
            // Client has associated projects, archive the client
            return axios
              .put(`/api/clients/${clientId}`, { archived: true })
              .then(() => {
                toast.info(
                  "This client is associated with a project and has been archived instead of deleted."
                );
                return false; // Return false to indicate the client was archived, not deleted
              })
              .catch((error) => {
                console.error("Error archiving client:", error);
                return false; // Return false if there was an error
              });
          } else {
            // Client has no associated projects, delete the client
            return axios
              .delete(`/api/clients/${clientId}`)
              .then(() => {
                dispatch(deleteClient(clientId));
                return true; // Return true if the deletion is successful
              })
              .catch((error) => {
                console.error("Error deleting client:", error);
                return false; // Return false if there was an error
              });
          }
        });
    }
  };
};
