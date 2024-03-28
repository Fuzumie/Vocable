import "./App.css";
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Wordle from './pages/Wordle';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
          <Routes>
            <Route path='/' exact Component={Home}/>
            <Route path='/wordle' exact Component={Wordle}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
