import React from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import Dashboard  from "./Components/Dashboard"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<><Signup/></>} />
      <Route path="/signup" element={<><Signup/></>} />
      <Route path="/login" element={<><Login/></>} /> 
      <Route path="/dashboard" element={<><Navbar /><Dashboard/></>} /> 
    </Routes>
    </BrowserRouter>


  )
}

export default App
