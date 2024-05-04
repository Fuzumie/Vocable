import { useState, useEffect, useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import Signup from "./Signup"; // Import the Signup component
import "./LoginModal.css";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true); // State to manage login/sign up mode
  const { login, error: loginError, isLoading: loginIsLoading } = useLogin();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener when the modal is mounted
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener when the modal is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSwitchMode = () => {
    setIsLoginMode((prevMode) => !prevMode); // Toggle between login and sign up mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      await login(email, password);
    } else {
      // Handle sign up here
    }
    onClose(); // Close the modal after successful login or sign up
  };

  return (
    <div className="modal-login" ref={modalRef}>
      {isLoginMode ? (
        <form className="login" onSubmit={handleSubmit}>
          <h3>Sign in</h3>

          <label>Email address:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button disabled={loginIsLoading}>Sign in</button>
          {loginError && <div className="error">{loginError}</div>}
        </form>
      ) : (
        <Signup onClose={onClose} /> // Render the Signup component
      )}
      <span className="switch-mode" onClick={handleSwitchMode}>
        {isLoginMode ? "Register" : "Log in"}
      </span>
    </div>
  );
};

export default LoginModal;