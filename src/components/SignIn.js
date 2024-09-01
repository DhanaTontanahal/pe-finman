import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get, update, set } from "firebase/database";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { database, auth } from "../firebase"; // Import the database and auth instances
import { ToastContainer, toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./SignIn.css";
import logo from "../assets/asset.png"; // Import the logo

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const extractUsername = (email) => {
    return email.substring(0, email.indexOf("@"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usersRef = ref(database, "users/registered");
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        let userFound = false;

        for (let userKey in users) {
          const user = users[userKey];
          if (user.email === email && user.password === password) {
            // Update last logged-in timestamp
            const updates = {};
            updates[`users/registered/${userKey}/lastLoggedIn`] =
              new Date().toISOString();
            await update(ref(database), updates);

            // Store user data in localStorage
            localStorage.setItem("authUser", JSON.stringify(user));
            const currentUserName = extractUsername(email);
            localStorage.setItem("currentUserName", currentUserName);

            userFound = true;
            navigate("/dashboard");
            break;
          }
        }

        if (!userFound) {
          toast.error("Invalid email or password");
        }
      } else {
        toast.error("No users registered");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Error signing in. Please try again later.");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user to database if not already registered
      const usersRef = ref(database, `users/registered/${user.uid}`);
      const snapshot = await get(usersRef);

      if (!snapshot.exists()) {
        const newUser = {
          email: user.email,
          displayName: user.displayName,
          lastLoggedIn: new Date().toISOString(),
        };
        await set(usersRef, newUser);
        localStorage.setItem("authUser", JSON.stringify(newUser));
        const currentUserName = extractUsername(user.email);
        localStorage.setItem("currentUserName", currentUserName);
      } else {
        const existingUser = snapshot.val();
        const updates = { lastLoggedIn: new Date().toISOString() };
        await update(usersRef, updates);
        localStorage.setItem("authUser", JSON.stringify(existingUser));
        const currentUserName = extractUsername(existingUser.email);
        localStorage.setItem("currentUserName", currentUserName);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Error signing in with Google. Please try again later.");
    }
  };

  return (
    <div className="signin-container">
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Clock It Logo" className="logo" />
          <h1>Clock It</h1>
        </div>
        <div className="signin-links">
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signin-button">
          Sign In
        </button>
        <button
          type="button"
          className="google-signin-button"
          onClick={handleGoogleSignIn}
        >
          <FaGoogle className="google-icon" /> Sign in with Google
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
