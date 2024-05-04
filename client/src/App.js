import "./App.css";
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Signup from './components/Signup';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import { useAuthContext } from './hooks/useAuthContext'
import GamePage from "./pages/GamePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {
  const { user } = useAuthContext()
  
  return (
    <>
      <Router>
        <Navbar/>
          <Routes>
            <Route 
              path='/' 
              exact Component={Home}
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path='/signup'  
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route 
              path='/dashboard'  
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route path='/wordle' exact Component={GamePage}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
