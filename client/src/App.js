import "./App.css";
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext'
import WordleEz from "./components/wordle/easy/WordleEz";
import GamePage from "./pages/GamePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { user } = useAuthContext()
  
  return (
    <>
      <Router>
        <Navbar/>
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route path='/signup'  element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path='/home' element={<Home/>}/>
            <Route path='/easy' exact Component={WordleEz}/>
            <Route path='/medium' exact Component={GamePage}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
