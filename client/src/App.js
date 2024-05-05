import "./App.css";
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Dashboard from "./pages/Dashboard";
import { useAuthContext } from './hooks/useAuthContext'
import GamePage from "./pages/GamePage";
import LoginModal from "./components/LoginModal";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  const { user } = useAuthContext()
  
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route 
            path="/" 
            exact Component ={Home}
          />
          <Route 
            path='/dashboard'  
            element={user ? <Dashboard /> : <LoginModal/>}
          />
          <Route path='/wordle' exact Component={GamePage}/>
        </Routes>
    </Router>
  </>
  );
}

export default App;
