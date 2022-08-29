import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/Logo.svg';

const Signpage = ({ props }) => (
  <div className='container'>
    <div className="header">
      <Link to="../login" >Login</Link>
      <div className="theme__wrapper">
        <div className="theme"></div>
      </div>
    </div>
    <img src={Logo} alt="Simplify" className="logo" />
    <div className="form">
      <input type="text" className="input" placeholder='Username' />
      <input type="password" className="input" placeholder='Password' />
      <input type="password" className="input" placeholder='Repeat, password' />
      <div className="checkbox__wrapper">
        <input type="checkbox" className="checkbox" name="terms"/>
        <label htmlFor="terms" className="checkbox__label">I confirmed Term Use</label>
      </div>

      <input type="submit" value="Sign up" className="button" />
    </div>
  </div>
);

export default Signpage;
