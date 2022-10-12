import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";

function App() {
  return (
    //Browserrouter component from react-router-dom
    <Router>
      <Routes>
        {/* This section creates the different paths to the different pages*/}
        <Route path="/" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/student" element={<Student />}/>
      </Routes>
    </Router>
  );
}

export default App;

