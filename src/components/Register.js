import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { database } from "../firebase"; // Import the database instance

const Register = () => {
  const [uid, setUid] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const newUserRef = push(ref(database, "users/registered"));
      await set(newUserRef, {
        uid: uid,
        dobYear: dobYear,
        email: email,
        password: password,
      });

      toast.success("User registered successfully. You can now login.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="uid">UID</label>
          <input
            type="text"
            id="uid"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dobYear">Date of Birth Year</label>
          <input
            type="number"
            id="dobYear"
            value={dobYear}
            onChange={(e) => setDobYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <ToastContainer />
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
