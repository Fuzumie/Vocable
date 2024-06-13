import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import LoginModal from "./LoginModal";
import './Navbar.css';
import './LoginModal.css';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false); 
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/"); // Redirect to home page
  }

  return (
    <header className="navbar">
      <div className="navbar-items">
        <Link to="/">
          <h1 className="navbar-title">Vocable</h1>
        </Link>
        <nav>
          {user && (
            <div className="navbar-links">
              <Link to="/wordle">Play</Link>
              <Link to="/dashboard">Dashboard</Link>
              <button className='navbar-button' onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div className='navbar-links'>
              <Link to="/wordle">Play</Link>
              <button className='navbar-button' onClick={() => setShowModal(true)}>Sign in</button> {/* Open the modal */}
            </div>
          )}
        </nav>
      </div>
      <div className={ `modal-login-state ${showModal ? 'active' : 'inactive'}` }>
        <LoginModal onClose={() => setShowModal(false)} />
      </div>
    </header>
  );
};

export default Navbar;