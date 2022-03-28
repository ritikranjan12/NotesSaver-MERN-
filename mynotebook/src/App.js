import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Alert from "./Components/Alert";
import NoteState from "./context/notes/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  
  return (
    <div>
      <NoteState>
      <Router>
      <Navbar/>
      <Alert alert={alert} />
      <div className="container">
        <Routes>
        <Route path="/" element={<Home showAlert={showAlert}  />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/login" element={<Login showAlert={showAlert} />}/>
        <Route path="/signup" element={<Signup showAlert={showAlert} />}/>


        </Routes>
      </div>
      </Router>
      </NoteState>

    </div>
    
      

   
  );
}

export default App;
