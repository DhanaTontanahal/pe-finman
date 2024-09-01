import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageAdmins.css";

const ManageAdmins = () => {
  const [users, setUsers] = useState({});
  const [admins, setAdmins] = useState({});
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "/users/registered");
    const adminsRef = ref(db, "/admins");

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(data);
      } else {
        setUsers({});
      }
    });

    onValue(adminsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAdmins(data);
      } else {
        setAdmins({});
      }
    });
  }, []);

  const handleSelectUser = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleMakeAdmin = () => {
    if (!selectedUser) {
      toast.error("Please select a user.");
      return;
    }

    const db = getDatabase();
    const adminRef = ref(db, `/admins/${selectedUser}`);

    const selectedUserData = users[selectedUser];

    set(adminRef, selectedUserData)
      .then(() => {
        toast.success("User has been made an admin successfully!");
        setSelectedUser("");
      })
      .catch((error) => toast.error("Error making admin: " + error.message));
  };

  const handleRemoveAdmin = (uid) => {
    const db = getDatabase();
    const adminRef = ref(db, `/admins/${uid}`);

    remove(adminRef)
      .then(() => toast.success("Admin removed successfully!"))
      .catch((error) => toast.error("Error removing admin: " + error.message));
  };

  return (
    <div className="manage-admins">
      <ToastContainer />
      <h2>Manage Admins</h2>
      <div className="select-user">
        <select value={selectedUser} onChange={handleSelectUser}>
          <option value="" disabled>
            Select a user
          </option>
          {Object.entries(users).map(([uid, user]) => (
            <option key={uid} value={uid}>
              {user.displayName || user.email}
            </option>
          ))}
        </select>
        <button onClick={handleMakeAdmin}>Make Admin</button>
      </div>
      <h3>Current Admins</h3>
      {Object.keys(admins).length > 0 ? (
        <table className="admins-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Display Name</th>
              <th>Last Logged In</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(admins).map(([uid, admin]) => (
              <tr key={uid}>
                <td>{admin.email}</td>
                <td>{admin.displayName || "N/A"}</td>
                <td>{new Date(admin.lastLoggedIn).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleRemoveAdmin(uid)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No admins found.</p>
      )}
    </div>
  );
};

export default ManageAdmins;
