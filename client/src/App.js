import "./App.css";
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

import WordleEz from "./components/wordle/easy/WordleEz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/easy' exact Component={WordleEz}/>
            
          </Routes>
      </Router>
    </>
  );
}

export default App;
