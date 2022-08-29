import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/Logo.svg';

const Loginpage = ({ props }) => (
  <div className='container'>
    <div className="header">
      <Link to="../signup" >Sign up</Link>
      <div className="theme__wrapper">
        <div className="theme"></div>
      </div>
    </div>
    <img src={Logo} alt="Simplify" className="logo" />
    <div className="form">
      <input type="text" className="input" placeholder='Username' />
      <input type="password" className="input" placeholder='Password' />
      <input type="submit" value="Login" className="button" />
    </div>
  </div>
);

export default Loginpage;
