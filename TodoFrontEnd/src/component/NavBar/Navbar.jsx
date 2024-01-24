import React, { useState } from 'react';
import "./navbar.scss";
import LogIn from '../Auth/Login/LogIn';
import { useNavigate } from 'react-router-dom';
const Navbar = ({name}) => {

  const navigate= useNavigate();
  const handleLogOut = () =>{
    localStorage.removeItem(`${name}Token`);
    navigate("/");
  }
  return (
    
    <>
    <div className="navbar">
        <p>Welcome, {name}</p>
        <button className="btn" onClick={handleLogOut}>LogOut</button>
    </div>
    </>
  )
}

export default Navbar;