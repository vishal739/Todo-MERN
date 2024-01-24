import React from 'react';
import { Link } from 'react-router-dom';
 // Assuming you're using React Router for navigation
import "./home.scss"
import todologo from "./todologo.png"
const Home = () => {
   
  return (
    <div className="homepage-container">
      {/* Todo Logo */}
      <div className="detail">
      <div className="logo-container">
        <img src={todologo} alt="" />
        <h1>Todo App</h1>
      </div>

      {/* Buttons: Login and Signup */}
      <div className="buttons-container">
        <Link to="/auth/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/auth/signup">
          <button className="btn-light">Signup</button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Home;
